import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
var AtomArrowBlock_1;
import CSSReflectionMixin from "../../../mixins/CSSReflectionMixin.js";
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
AtomArrowBlock.DEFAULT_STROKE_SIZE = 1;
AtomArrowBlock.DEFAULT_CHEVRON_WIDTH = 17;
AtomArrowBlock.DEFAULT_SHADOW_SIZE = 12;

tslib_1.__decorate([property({
  type: Boolean
})], AtomArrowBlock.prototype, "glow", void 0);

AtomArrowBlock = AtomArrowBlock_1 = tslib_1.__decorate([customElement('atom-arrow-block')], AtomArrowBlock);
export default AtomArrowBlock;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tYXJyb3ctYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLGtCQUFQLE1BQStCLHVDQUEvQjtBQUVBLE1BQU07QUFBQyxFQUFBLGFBQUQ7QUFBZ0IsRUFBQTtBQUFoQixJQUE0QixPQUFPLENBQUMsVUFBMUM7QUFDQSxNQUFNLEdBQUcsR0FBSSxNQUFjLENBQUMsS0FBNUI7QUFFQTs7Ozs7QUFLQSxJQUFxQixjQUFjLEdBQUEsZ0JBQUEsR0FBbkMsTUFBcUIsY0FBckIsU0FBNEMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQVQsQ0FBOUQsQ0FBK0U7QUFML0U7Ozs7QUFJQSxFQUFBLFdBQUEsR0FBQTs7QUFHQyxTQUFBLElBQUEsR0FBTyxJQUFQO0FBMkhBO0FBbEhBOzs7Ozs7Ozs7Ozs7Ozs7QUFhQSxTQUFPLGdCQUFQLENBQXdCO0FBQ2pCLElBQUEsTUFEaUI7QUFFakIsSUFBQSxTQUZpQjtBQUdqQixJQUFBLFlBSGlCO0FBSWpCLElBQUEsU0FKaUI7QUFLakIsSUFBQSxXQUxpQjtBQU1qQixJQUFBLFVBTmlCO0FBT2pCLElBQUE7QUFQaUIsR0FBeEIsRUFnQkM7QUFDQSxVQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFSLEVBQWhCO0FBQ0EsVUFBTSxVQUFVLEdBQUcsZ0JBQWMsQ0FBQywwQkFBZixDQUEwQztBQUFDLE1BQUEsTUFBRDtBQUFTLE1BQUEsU0FBVDtBQUFvQixNQUFBO0FBQXBCLEtBQTFDLENBQW5CO0FBQ0EsSUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLFVBQWI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWE7QUFBQyxNQUFBLEtBQUssRUFBRSxTQUFSO0FBQW1CLE1BQUEsT0FBTyxFQUFFO0FBQTVCLEtBQWI7O0FBQ0EsUUFBSSxVQUFVLEdBQUcsQ0FBakIsRUFBb0I7QUFDbkIsTUFBQSxPQUFPLENBQUMsTUFBUixDQUFlO0FBQUMsUUFBQSxLQUFLLEVBQUUsVUFBUjtBQUFvQixRQUFBLEtBQUssRUFBRTtBQUEzQixPQUFmO0FBQ0E7O0FBRUQsV0FBTyxPQUFQO0FBQ0E7O0FBRUQsU0FBTywwQkFBUCxDQUNDO0FBQUMsSUFBQSxNQUFEO0FBQVMsSUFBQSxTQUFUO0FBQW9CLElBQUE7QUFBcEIsR0FERCxFQUU2RDtBQUU1RCxXQUFPLElBQUksR0FBRyxDQUFDLFVBQVIsQ0FBbUIsQ0FDekIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUR5QixFQUV6QixDQUFDLFlBQVksR0FBRyxTQUFoQixFQUEyQixDQUEzQixDQUZ5QixFQUd6QixDQUFFLFlBQVksR0FBRyxDQUFoQixHQUFxQixTQUF0QixFQUFpQyxNQUFNLEdBQUcsQ0FBMUMsQ0FIeUIsRUFJekIsQ0FBQyxZQUFZLEdBQUcsU0FBaEIsRUFBMkIsTUFBM0IsQ0FKeUIsRUFLekIsQ0FBQyxDQUFELEVBQUksTUFBSixDQUx5QixFQU16QixDQUFDLFlBQUQsRUFBZSxNQUFNLEdBQUcsQ0FBeEIsQ0FOeUIsQ0FBbkIsQ0FBUDtBQVFBOztBQUVELEVBQUEsS0FBSyxHQUFBO0FBQ0osVUFBTSxLQUFOO0FBQ0EsU0FBSyxNQUFMLEdBQWMsR0FBRyxDQUFDLEtBQUssVUFBTixDQUFqQjtBQUNBOztBQUVELEVBQUEsTUFBTSxDQUFDO0FBQUMsSUFBQSxlQUFlLEdBQUc7QUFBbkIsTUFBMkIsRUFBNUIsRUFBOEI7QUFDbkMsU0FBSyxNQUFMLENBQVksS0FBWjtBQUNBLFNBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEI7QUFFQSxVQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxxQkFBTCxDQUMzQixnQ0FEMkIsRUFFM0IsZ0JBQWMsQ0FBQyxtQkFGWSxDQUFELEVBR3hCLEVBSHdCLENBQTNCO0FBSUEsVUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLEtBQUsscUJBQUwsQ0FDN0Isa0NBRDZCLEVBRTdCLGdCQUFjLENBQUMscUJBRmMsQ0FBRCxFQUcxQixFQUgwQixDQUE3QjtBQUlBLFVBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFLLHFCQUFMLENBQzdCLGdDQUQ2QixFQUU3QixnQkFBYyxDQUFDLG1CQUZjLENBQUQsQ0FBN0I7QUFJQSxVQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxxQkFBTCxDQUM5QixpQ0FEOEIsRUFFOUIsQ0FGOEIsQ0FBRCxDQUE5QjtBQUtBLFVBQU0sU0FBUyxHQUFHLGVBQWUsR0FDaEMsS0FBSyxDQUFMLENBQU8sT0FBUCxDQUFlLFdBRGlCLEdBRWhDLEtBQUsscUJBQUwsR0FBNkIsS0FBN0IsR0FBc0MsWUFBWSxHQUFHLENBQXJELEdBQTBELFVBRjNEO0FBR0EsVUFBTSxNQUFNLEdBQUcsS0FBSyxZQUFwQjtBQUNBLFVBQU0sS0FBSyxHQUFHLFNBQVMsR0FBSSxZQUFZLEdBQUcsQ0FBNUIsR0FBaUMsVUFBL0M7QUFFQSxVQUFNLFVBQVUsR0FBRyxnQkFBYyxDQUFDLGdCQUFmLENBQWdDO0FBQ2xELE1BQUEsTUFBTSxFQUFFLE1BQU0sR0FBRyxVQURpQztBQUVsRCxNQUFBLFNBRmtEO0FBR2xELE1BQUEsWUFIa0Q7QUFJbEQsTUFBQSxTQUFTLEVBQUUsS0FBSyxxQkFBTCxDQUEyQiwrQkFBM0IsQ0FKdUM7QUFLbEQsTUFBQSxXQUxrRDtBQU1sRCxNQUFBLFVBTmtEO0FBT2xELE1BQUEsV0FBVyxFQUFFLEtBQUsscUJBQUwsQ0FBMkIsaUNBQTNCO0FBUHFDLEtBQWhDLENBQW5CO0FBVUEsUUFBSSxPQUFPLEdBQUksVUFBVSxHQUFHLENBQTVCOztBQUNBLFFBQUksS0FBSyxJQUFULEVBQWU7QUFDZCxNQUFBLFVBQVUsQ0FBQyxJQUFYLENBQWdCO0FBQUMsUUFBQSxNQUFNLEVBQUU7QUFBVCxPQUFoQjtBQUNBLFdBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsV0FBakIsQ0FBNkIsS0FBSyxDQUFMLENBQU8sVUFBcEM7QUFDQSxXQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLEtBQWpCLENBQXVCLFdBQXZCLEdBQXFDLEdBQUcsQ0FBQyxVQUFELEdBQWMsQ0FBQyxJQUF2RDtBQUNBLFdBQUssTUFBTCxDQUFZLFNBQVosQ0FBc0I7QUFBQyxRQUFBLENBQUMsRUFBRSxDQUFDLFVBQUw7QUFBaUIsUUFBQSxDQUFDLEVBQUUsQ0FBQztBQUFyQixPQUF0QjtBQUNBLE1BQUEsT0FBTyxHQUFJLFVBQVUsR0FBRyxDQUFkLEdBQW1CLFVBQTdCO0FBQ0EsV0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixLQUFLLEdBQUksVUFBVSxHQUFHLENBQXZDLEVBQTJDLE1BQU0sR0FBSSxVQUFVLEdBQUcsQ0FBbEU7QUFDQSxLQVBELE1BT087QUFDTixXQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLEtBQWpCLEVBQXdCLE1BQXhCO0FBQ0E7O0FBRUQsU0FBSyxDQUFMLENBQU8sWUFBUCxDQUFvQixNQUFwQjtBQUNBLElBQUEsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsT0FBaEIsRUFBeUIsT0FBekI7QUFDQSxTQUFLLFVBQUwsR0FBa0IsVUFBbEI7QUFDQSxTQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCO0FBQ0E7O0FBNUg2RSxDQUEvRTtBQU9RLGNBQUEsQ0FBQSxtQkFBQSxHQUFzQixDQUF0QjtBQUNBLGNBQUEsQ0FBQSxxQkFBQSxHQUF3QixFQUF4QjtBQUNBLGNBQUEsQ0FBQSxtQkFBQSxHQUFzQixFQUF0Qjs7QUFQUCxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsRUFBQSxJQUFJLEVBQUU7QUFBUCxDQUFELENBQ1QsQ0FBQSxFLHdCQUFBLEUsTUFBQSxFLEtBQVksQ0FBWjs7QUFGb0IsY0FBYyxHQUFBLGdCQUFBLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURsQyxhQUFhLENBQUMsa0JBQUQsQ0FDcUIsQ0FBQSxFQUFkLGNBQWMsQ0FBZDtlQUFBLGMiLCJzb3VyY2VSb290IjoiIn0=