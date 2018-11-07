import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import CSSReflectionMixin from "../../../mixins/CSSReflectionMixin.js";
var SVG = window.svgjs;
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  /**
   * @customElement
   * @polymer
   */

  var AtomChevron =
  /** @class */
  function (_super) {
    tslib_1.__extends(AtomChevron, _super);

    function AtomChevron() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      /**
       * The direction the chevron should point.
       */


      _this.direction = 'right';
      _this.noAutoRender = false;
      return _this;
    }

    AtomChevron_1 = AtomChevron;
    /**
     * Creates a new chevron shape as an SVG.js Polygon.
     * The chevron always points right.
     * If you need it to point another way, apply a transform to it.
     * @param width - How wide, in pixels, to draw the chevron.
     * @param height - How tall, in pixels, to draw the chevron.
     * @param thickness - How thick, in pixels, to draw the chevron.
     * @param fillColor - The color to apply to the interior of the chevron.
     * @param strokeSize - The thickness of the chevron border.
     * @param strokeColor - The color to apply to the border of the chevron.
     * @returns The constructed SVG.js Polygon instance.
     */

    AtomChevron.createChevron = function (_a) {
      var width = _a.width,
          height = _a.height,
          thickness = _a.thickness,
          fillColor = _a.fillColor,
          strokeSize = _a.strokeSize,
          strokeColor = _a.strokeColor;
      var chevron = new SVG.Polygon();
      var pointArray = AtomChevron_1.createChevronPointArray({
        width: width,
        height: height,
        thickness: thickness
      });
      chevron.plot(pointArray);
      chevron.fill(fillColor);

      if (strokeSize > 0) {
        chevron.stroke({
          width: strokeSize,
          color: strokeColor
        });
      }

      return chevron;
    };

    AtomChevron.createChevronPointArray = function (_a) {
      var width = _a.width,
          height = _a.height,
          thickness = _a.thickness;
      return new SVG.PointArray([[0, 0], [thickness, 0], [width, height / 2], [thickness, height], [0, height], [width - thickness, height / 2]]);
    };

    AtomChevron.prototype.ready = function () {
      _super.prototype.ready.call(this);

      this.svgDoc = SVG(this.shadowRoot);
    };

    AtomChevron.prototype.connectedCallback = function () {
      var _this = this;

      _super.prototype.connectedCallback.call(this);

      if (!this.noAutoRender) {
        if (document.readyState === 'complete') {
          Polymer.RenderStatus.afterNextRender(this, this.render);
        } else {
          window.addEventListener('load', function () {
            Polymer.RenderStatus.afterNextRender(_this, _this.render);
          });
        }
      }
    };

    AtomChevron.prototype.render = function (width, height) {
      this.svgDoc.clear();
      /* tslint:disable:no-parameter-reassignment */

      width = typeof width === 'number' ? width : this.scrollWidth;
      height = typeof height === 'number' ? height : this.clientHeight;
      /* tslint:enable:no-parameter-reassignment */

      var strokeSize = parseInt(this.readCSSCustomProperty('--atom-chevron-stroke-size', AtomChevron_1.DEFAULT_STROKE_SIZE), 10);
      var thickness = parseInt(this.readCSSCustomProperty('--atom-chevron-thickness', AtomChevron_1.DEFAULT_THICKNESS), 10);
      this.svgDoc.size(width, height);
      var chevron = AtomChevron_1.createChevron({
        width: width - strokeSize,
        height: height - strokeSize,
        thickness: thickness,
        fillColor: this.readCSSCustomProperty('--atom-chevron-fill-color'),
        strokeSize: strokeSize,
        strokeColor: this.readCSSCustomProperty('--atom-chevron-stroke-color')
      });
      chevron.move(strokeSize / 2, strokeSize / 2);
      this.chevron = chevron;
      this.svgDoc.add(chevron);

      if (this.direction === 'left' && this._lastDirection !== 'left') {
        this.svgDoc.transform({
          scaleX: -1
        });
        this._lastDirection = 'left';
      }
    };

    var AtomChevron_1;

    tslib_1.__decorate([property({
      type: String,
      reflectToAttribute: true
    })], AtomChevron.prototype, "direction");

    tslib_1.__decorate([property({
      type: Boolean
    })], AtomChevron.prototype, "noAutoRender");

    AtomChevron = AtomChevron_1 = tslib_1.__decorate([customElement('atom-chevron')], AtomChevron);
    return AtomChevron;
  }(CSSReflectionMixin(Polymer.Element)); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.AtomChevron = AtomChevron;
});