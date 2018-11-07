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

  var AtomArrowBlock =
  /** @class */
  function (_super) {
    tslib_1.__extends(AtomArrowBlock, _super);

    function AtomArrowBlock() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.glow = true;
      return _this;
    }

    AtomArrowBlock_1 = AtomArrowBlock;
    /**
     * Creates a new arrow block shape as an SVG.js Polygon.
     * The chevron always points right.
     * If you need it to point another way, apply a transform to it.
     * @param height - How tall, in pixels, to draw the arrow block.
     * @param bodyWidth - How wide, in pixels, to draw the straight body part of the arrow block.
     * @param chevronWidth - How wide, in pixels, to draw the chevron ends of the arrow block;
     * @param fillColor - The color to apply to the interior of the arrow block.
     * @param fillOpacity - The opacity to apply to the fillColor.
     * @param strokeSize - The thickness of the arrow block border.
     * @param strokeColor - The color to apply to the border of the arrow block.
     * @returns - The constructed SVG.js Polygon instance.
     */

    AtomArrowBlock.createArrowBlock = function (_a) {
      var height = _a.height,
          bodyWidth = _a.bodyWidth,
          chevronWidth = _a.chevronWidth,
          fillColor = _a.fillColor,
          fillOpacity = _a.fillOpacity,
          strokeSize = _a.strokeSize,
          strokeColor = _a.strokeColor;
      var chevron = new SVG.Polygon();
      var pointArray = AtomArrowBlock_1.createArrowBlockPointArray({
        height: height,
        bodyWidth: bodyWidth,
        chevronWidth: chevronWidth
      });
      chevron.plot(pointArray);
      chevron.fill({
        color: fillColor,
        opacity: fillOpacity
      });

      if (strokeSize > 0) {
        chevron.stroke({
          width: strokeSize,
          color: strokeColor
        });
      }

      return chevron;
    };

    AtomArrowBlock.createArrowBlockPointArray = function (_a) {
      var height = _a.height,
          bodyWidth = _a.bodyWidth,
          chevronWidth = _a.chevronWidth;
      return new SVG.PointArray([[0, 0], [chevronWidth + bodyWidth, 0], [chevronWidth * 2 + bodyWidth, height / 2], [chevronWidth + bodyWidth, height], [0, height], [chevronWidth, height / 2]]);
    };

    AtomArrowBlock.prototype.ready = function () {
      _super.prototype.ready.call(this);

      this.svgDoc = SVG(this.shadowRoot);
    };

    AtomArrowBlock.prototype.render = function (_a) {
      var _b = (_a === void 0 ? {} : _a).useContentWidth,
          useContentWidth = _b === void 0 ? true : _b;
      this.svgDoc.clear();
      this.svgDoc.size(0, 0);
      var strokeSize = parseInt(this.readCSSCustomProperty('--atom-arrow-block-stroke-size', AtomArrowBlock_1.DEFAULT_STROKE_SIZE), 10);
      var chevronWidth = parseInt(this.readCSSCustomProperty('--atom-arrow-block-chevron-width', AtomArrowBlock_1.DEFAULT_CHEVRON_WIDTH), 10);
      var shadowSize = parseFloat(this.readCSSCustomProperty('--atom-arrow-block-shadow-size', AtomArrowBlock_1.DEFAULT_SHADOW_SIZE));
      var fillOpacity = parseFloat(this.readCSSCustomProperty('--atom-arrow-block-fill-opacity', 1));
      var bodyWidth = useContentWidth ? this.$.content.clientWidth : this.getBoundingClientRect().width - chevronWidth * 2 - strokeSize;
      var height = this.clientHeight;
      var width = bodyWidth + chevronWidth * 2 + strokeSize;
      var arrowBlock = AtomArrowBlock_1.createArrowBlock({
        height: height - strokeSize,
        bodyWidth: bodyWidth,
        chevronWidth: chevronWidth,
        fillColor: this.readCSSCustomProperty('--atom-arrow-block-fill-color'),
        fillOpacity: fillOpacity,
        strokeSize: strokeSize,
        strokeColor: this.readCSSCustomProperty('--atom-arrow-block-stroke-color')
      });
      var moveAmt = strokeSize / 2;

      if (this.glow) {
        arrowBlock.attr({
          filter: 'url(#glowFilter)'
        });
        this.svgDoc.node.appendChild(this.$.filterDefs);
        this.svgDoc.node.style.marginRight = -shadowSize * 2 + "px";
        this.svgDoc.transform({
          x: -shadowSize,
          y: -shadowSize
        });
        moveAmt = strokeSize / 2 + shadowSize;
        this.svgDoc.size(width + shadowSize * 2, height + shadowSize * 2);
      } else {
        this.svgDoc.size(width, height);
      }

      this.$.filterHolder.remove();
      arrowBlock.move(moveAmt, moveAmt);
      this.arrowBlock = arrowBlock;
      this.svgDoc.add(arrowBlock);
    };

    var AtomArrowBlock_1;

    tslib_1.__decorate([property({
      type: Boolean
    })], AtomArrowBlock.prototype, "glow");

    AtomArrowBlock = AtomArrowBlock_1 = tslib_1.__decorate([customElement('atom-arrow-block')], AtomArrowBlock);
    return AtomArrowBlock;
  }(CSSReflectionMixin(Polymer.Element)); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.AtomArrowBlock = AtomArrowBlock;
});