var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import CSSReflectionMixin from "../../../mixins/CSSReflectionMixin.js";
const SVG = window.svgjs;
window.addEventListener('load', () => {
  var AtomArrowBlock_1;
  const {
    customElement,
    property
  } = Polymer.decorators;
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

  __decorate([property({
    type: Boolean
  })], AtomArrowBlock.prototype, "glow", void 0);

  AtomArrowBlock = AtomArrowBlock_1 = __decorate([customElement('atom-arrow-block')], AtomArrowBlock); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtomArrowBlock = AtomArrowBlock;
});