import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import CSSReflectionMixin from "../../../mixins/CSSReflectionMixin.js";
window.addEventListener('load', () => {
  var AtomArrowBlock_1;
  const {
    customElement,
    property
  } = Polymer.decorators;
  const SVG = window.svgjs;
  /**
   * @customElement
   * @polymer
   */

  let AtomArrowBlock = AtomArrowBlock_1 = class AtomArrowBlock extends CSSReflectionMixin(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
      super(...arguments);
      this.glow = true;
    }
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


    static createArrowBlock({
      height,
      bodyWidth,
      chevronWidth,
      fillColor,
      fillOpacity,
      strokeSize,
      strokeColor
    }) {
      const chevron = new SVG.Polygon();
      const pointArray = AtomArrowBlock_1.createArrowBlockPointArray({
        height,
        bodyWidth,
        chevronWidth
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
    }

    static createArrowBlockPointArray({
      height,
      bodyWidth,
      chevronWidth
    }) {
      return new SVG.PointArray([[0, 0], [chevronWidth + bodyWidth, 0], [chevronWidth * 2 + bodyWidth, height / 2], [chevronWidth + bodyWidth, height], [0, height], [chevronWidth, height / 2]]);
    }

    ready() {
      super.ready();
      this.svgDoc = SVG(this.shadowRoot);
    }

    render({
      useContentWidth = true
    } = {}) {
      this.svgDoc.clear();
      this.svgDoc.size(0, 0);
      const strokeSize = parseInt(this.readCSSCustomProperty('--atom-arrow-block-stroke-size', AtomArrowBlock_1.DEFAULT_STROKE_SIZE), 10);
      const chevronWidth = parseInt(this.readCSSCustomProperty('--atom-arrow-block-chevron-width', AtomArrowBlock_1.DEFAULT_CHEVRON_WIDTH), 10);
      const shadowSize = parseFloat(this.readCSSCustomProperty('--atom-arrow-block-shadow-size', AtomArrowBlock_1.DEFAULT_SHADOW_SIZE));
      const fillOpacity = parseFloat(this.readCSSCustomProperty('--atom-arrow-block-fill-opacity', 1));
      const bodyWidth = useContentWidth ? this.$.content.clientWidth : this.getBoundingClientRect().width - chevronWidth * 2 - strokeSize;
      const height = this.clientHeight;
      const width = bodyWidth + chevronWidth * 2 + strokeSize;
      const arrowBlock = AtomArrowBlock_1.createArrowBlock({
        height: height - strokeSize,
        bodyWidth,
        chevronWidth,
        fillColor: this.readCSSCustomProperty('--atom-arrow-block-fill-color'),
        fillOpacity,
        strokeSize,
        strokeColor: this.readCSSCustomProperty('--atom-arrow-block-stroke-color')
      });
      let moveAmt = strokeSize / 2;

      if (this.glow) {
        arrowBlock.attr({
          filter: 'url(#glowFilter)'
        });
        this.svgDoc.node.appendChild(this.$.filterDefs);
        this.svgDoc.node.style.marginRight = `${-shadowSize * 2}px`;
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
    }

  };

  tslib_1.__decorate([property({
    type: Boolean
  })], AtomArrowBlock.prototype, "glow", void 0);

  AtomArrowBlock = AtomArrowBlock_1 = tslib_1.__decorate([customElement('atom-arrow-block')], AtomArrowBlock); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtomArrowBlock = AtomArrowBlock;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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