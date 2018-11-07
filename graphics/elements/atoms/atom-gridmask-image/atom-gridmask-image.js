import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, TweenLite, Sine } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import * as Random from "/bundles/gdqx18-layouts/node_modules/random-js/lib/random.js";
var SVG = window.svgjs;
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  /**
   * @customElement
   * @polymer
   */

  var AtomGridmaskImage =
  /** @class */
  function (_super) {
    tslib_1.__extends(AtomGridmaskImage, _super);

    function AtomGridmaskImage() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.strokeSize = 0;
      _this.withBackground = false;
      _this.cellSize = 21;
      _this.cellStagger = 0.002;
      /**
       * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
       */

      _this.preserveAspectRatio = 'xMidYMid';
      _this.entering = false;
      _this.exiting = false;
      _this._initialized = false;
      return _this;
    }

    AtomGridmaskImage.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      Polymer.RenderStatus.beforeNextRender(this, function () {
        _this._initSVG();

        TweenLite.set(_this.$svg.imageMaskCells, {
          opacity: 0
        });
      });
    };

    AtomGridmaskImage.prototype.enter = function () {
      var _this = this;

      var tl = new TimelineLite();
      var shuffledMaskCells = Random.shuffle(Random.engines.browserCrypto, this.$svg.imageMaskCells.slice(0));
      var didImageEntranceOnStart;
      tl.staggerTo(shuffledMaskCells, 0.224, {
        opacity: 1,
        ease: Sine.easeInOut,
        onStart: function () {
          // We only want this onStart handler to run once.
          // There is no "onStartAll" equivalent, only an "onCompleteAll".
          if (didImageEntranceOnStart) {
            return;
          }

          didImageEntranceOnStart = true;
          _this.entering = true;
        }
      }, this.cellStagger, 0, function () {
        _this.entering = false;

        _this.dispatchEvent(new CustomEvent('entered'));
      });
      return tl;
    };

    AtomGridmaskImage.prototype.exit = function (_a) {
      var _this = this;

      var _b = (_a === void 0 ? {} : _a).onComplete,
          onComplete = _b === void 0 ? function () {} : _b;
      var tl = new TimelineLite();
      var shuffledMaskCells = Random.shuffle(Random.engines.browserCrypto, this.$svg.imageMaskCells.slice(0));
      var didOnStart = false;
      tl.staggerTo(shuffledMaskCells, 0.224, {
        opacity: 0,
        ease: Sine.easeInOut,
        onStart: function () {
          // We only want this onStart handler to run once.
          // There is no "onStartAll" equivalent, only an "onCompleteAll".
          if (didOnStart) {
            return;
          }

          didOnStart = true;
          _this.exiting = true;
        }
      }, this.cellStagger, 0, function () {
        if (typeof onComplete === 'function') {
          onComplete();
        }

        _this.exiting = false;

        _this.dispatchEvent(new CustomEvent('exited'));
      });
      return tl;
    };

    AtomGridmaskImage.prototype._initSVG = function () {
      if (this._initialized) {
        throw new Error('this element has already been initialized');
      }

      this._initialized = true;
      this.$svg = {};
      var STROKE_SIZE = this.strokeSize;
      var ELEMENT_WIDTH = this.clientWidth;
      var ELEMENT_HEIGHT = this.clientHeight;
      var IMAGE_MASK_CELL_SIZE = this.cellSize;
      var IMAGE_MASK_ROWS = Math.ceil(ELEMENT_HEIGHT / IMAGE_MASK_CELL_SIZE);
      var IMAGE_MASK_COLUMNS = Math.ceil(ELEMENT_WIDTH / IMAGE_MASK_CELL_SIZE);
      var svgDoc = SVG(this);
      var mask = svgDoc.mask();
      var image = svgDoc.image(this.fallbackSrc);
      this.$svg.svgDoc = svgDoc;
      this.$svg.image = image;
      this.$svg.imageMaskCells = [];
      image.attr({
        preserveAspectRatio: this.preserveAspectRatio
      });

      if (this.withBackground) {
        var bgRect = svgDoc.rect();
        bgRect.fill({
          color: 'black',
          opacity: 0.25
        });
        this.$svg.bgRect = bgRect;

        if (STROKE_SIZE > 0) {
          bgRect.stroke({
            color: 'white',
            // Makes it effectively STROKE_SIZE, because all SVG strokes
            // are center strokes, and the outer half is cut off.
            width: STROKE_SIZE * 2
          });
          image.move(STROKE_SIZE, STROKE_SIZE);
        }
      } // Generate the exitMask rects


      for (var r = 0; r < IMAGE_MASK_ROWS; r++) {
        var y = r * IMAGE_MASK_CELL_SIZE;

        for (var c = 0; c < IMAGE_MASK_COLUMNS; c++) {
          var x = c * IMAGE_MASK_CELL_SIZE;
          var rect = svgDoc.rect(IMAGE_MASK_CELL_SIZE, IMAGE_MASK_CELL_SIZE);
          rect.move(x, y);
          rect.fill({
            color: '#FFFFFF'
          });
          mask.add(rect);
          this.$svg.imageMaskCells.push(rect);
        }
      }

      image.front();
      image.maskWith(mask);
      this.resize();
    };

    AtomGridmaskImage.prototype.resize = function () {
      if (!this._initialized) {
        return;
      }

      var STROKE_SIZE = this.strokeSize;
      var ELEMENT_WIDTH = this.clientWidth;
      var ELEMENT_HEIGHT = this.clientHeight;
      this.$svg.svgDoc.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);
      this.$svg.image.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);

      if (this.withBackground) {
        this.$svg.bgRect.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);

        if (STROKE_SIZE > 0) {
          // Mirror such that drawSVG anims start from the top right
          // and move clockwise to un-draw, counter-clockwise to draw.
          this.$svg.bgRect.transform({
            scaleX: -1,
            x: ELEMENT_WIDTH
          });
          this.$svg.image.size(ELEMENT_WIDTH - STROKE_SIZE * 2, ELEMENT_HEIGHT - STROKE_SIZE * 2);
        }
      }
    };

    tslib_1.__decorate([property({
      type: Number
    })], AtomGridmaskImage.prototype, "strokeSize");

    tslib_1.__decorate([property({
      type: Boolean
    })], AtomGridmaskImage.prototype, "withBackground");

    tslib_1.__decorate([property({
      type: Number
    })], AtomGridmaskImage.prototype, "cellSize");

    tslib_1.__decorate([property({
      type: Number
    })], AtomGridmaskImage.prototype, "cellStagger");

    tslib_1.__decorate([property({
      type: String
    })], AtomGridmaskImage.prototype, "fallbackSrc");

    tslib_1.__decorate([property({
      type: String
    })], AtomGridmaskImage.prototype, "preserveAspectRatio");

    tslib_1.__decorate([property({
      type: Boolean,
      notify: true
    })], AtomGridmaskImage.prototype, "entering");

    tslib_1.__decorate([property({
      type: Boolean,
      notify: true
    })], AtomGridmaskImage.prototype, "exiting");

    tslib_1.__decorate([property({
      type: Boolean
    })], AtomGridmaskImage.prototype, "_initialized");

    AtomGridmaskImage = tslib_1.__decorate([customElement('atom-gridmask-image')], AtomGridmaskImage);
    return AtomGridmaskImage;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.AtomGridmaskImage = AtomGridmaskImage;
});