import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, TweenLite, Sine } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import Random from "../../../../shared/lib/vendor/random.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  const SVG = window.svgjs || window.SVG;
  /**
   * @customElement
   * @polymer
   */

  let AtomGridmaskImage = class AtomGridmaskImage extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
      super(...arguments);
      this.strokeSize = 0;
      this.withBackground = false;
      this.cellSize = 21;
      this.cellStagger = 0.002;
      /**
       * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
       */

      this.preserveAspectRatio = 'xMidYMid';
      this.entering = false;
      this.exiting = false;
      this._initialized = false;
    }

    ready() {
      super.ready();
      Polymer.RenderStatus.beforeNextRender(this, () => {
        this._initSVG();

        TweenLite.set(this.$svg.imageMaskCells, {
          opacity: 0
        });
      });
    }

    enter() {
      const tl = new TimelineLite();
      const shuffledMaskCells = Random.shuffle(Random.engines.browserCrypto, this.$svg.imageMaskCells.slice(0));
      let didImageEntranceOnStart;
      tl.staggerTo(shuffledMaskCells, 0.224, {
        opacity: 1,
        ease: Sine.easeInOut,
        onStart: () => {
          // We only want this onStart handler to run once.
          // There is no "onStartAll" equivalent, only an "onCompleteAll".
          if (didImageEntranceOnStart) {
            return;
          }

          didImageEntranceOnStart = true;
          this.entering = true;
        }
      }, this.cellStagger, 0, () => {
        this.entering = false;
        this.dispatchEvent(new CustomEvent('entered'));
      });
      return tl;
    }

    exit(options = {}) {
      const tl = new TimelineLite();
      const shuffledMaskCells = Random.shuffle(Random.engines.browserCrypto, this.$svg.imageMaskCells.slice(0));
      let didOnStart = false;
      tl.staggerTo(shuffledMaskCells, 0.224, {
        opacity: 0,
        ease: Sine.easeInOut,
        onStart: () => {
          // We only want this onStart handler to run once.
          // There is no "onStartAll" equivalent, only an "onCompleteAll".
          if (didOnStart) {
            return;
          }

          didOnStart = true;
          this.exiting = true;
        }
      }, this.cellStagger, 0, () => {
        if (typeof options.onComplete === 'function') {
          options.onComplete();
        }

        this.exiting = false;
        this.dispatchEvent(new CustomEvent('exited'));
      });
      return tl;
    }

    _initSVG() {
      if (this._initialized) {
        throw new Error('this element has already been initialized');
      }

      this._initialized = true;
      this.$svg = {};
      const STROKE_SIZE = this.strokeSize;
      const ELEMENT_WIDTH = this.clientWidth;
      const ELEMENT_HEIGHT = this.clientHeight;
      const IMAGE_MASK_CELL_SIZE = this.cellSize;
      const IMAGE_MASK_ROWS = Math.ceil(ELEMENT_HEIGHT / IMAGE_MASK_CELL_SIZE);
      const IMAGE_MASK_COLUMNS = Math.ceil(ELEMENT_WIDTH / IMAGE_MASK_CELL_SIZE);
      const svgDoc = SVG(this);
      const mask = svgDoc.mask();
      const image = svgDoc.image(this.fallbackSrc);
      this.$svg.svgDoc = svgDoc;
      this.$svg.image = image;
      this.$svg.imageMaskCells = [];
      image.attr({
        preserveAspectRatio: this.preserveAspectRatio
      });

      if (this.withBackground) {
        const bgRect = svgDoc.rect();
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


      for (let r = 0; r < IMAGE_MASK_ROWS; r++) {
        const y = r * IMAGE_MASK_CELL_SIZE;

        for (let c = 0; c < IMAGE_MASK_COLUMNS; c++) {
          const x = c * IMAGE_MASK_CELL_SIZE;
          const rect = svgDoc.rect(IMAGE_MASK_CELL_SIZE, IMAGE_MASK_CELL_SIZE);
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
    }

    resize() {
      if (!this._initialized) {
        return;
      }

      const STROKE_SIZE = this.strokeSize;
      const ELEMENT_WIDTH = this.clientWidth;
      const ELEMENT_HEIGHT = this.clientHeight;
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
    }

  };

  tslib_1.__decorate([property({
    type: Number
  })], AtomGridmaskImage.prototype, "strokeSize", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], AtomGridmaskImage.prototype, "withBackground", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], AtomGridmaskImage.prototype, "cellSize", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], AtomGridmaskImage.prototype, "cellStagger", void 0);

  tslib_1.__decorate([property({
    type: String
  })], AtomGridmaskImage.prototype, "fallbackSrc", void 0);

  tslib_1.__decorate([property({
    type: String
  })], AtomGridmaskImage.prototype, "preserveAspectRatio", void 0);

  tslib_1.__decorate([property({
    type: Boolean,
    notify: true
  })], AtomGridmaskImage.prototype, "entering", void 0);

  tslib_1.__decorate([property({
    type: Boolean,
    notify: true
  })], AtomGridmaskImage.prototype, "exiting", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], AtomGridmaskImage.prototype, "_initialized", void 0);

  AtomGridmaskImage = tslib_1.__decorate([customElement('atom-gridmask-image')], AtomGridmaskImage); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtomGridmaskImage = AtomGridmaskImage;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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