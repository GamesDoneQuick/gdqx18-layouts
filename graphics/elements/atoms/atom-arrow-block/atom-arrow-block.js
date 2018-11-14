import * as tslib_1 from "tslib";
var AtomArrowBlock_1;
import CSSReflectionMixin from '../../../mixins/CSSReflectionMixin';
const { customElement, property } = Polymer.decorators;
const SVG = window.SVG;
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
    static createArrowBlock({ height, bodyWidth, chevronWidth, fillColor, fillOpacity, strokeSize, strokeColor }) {
        const chevron = new SVG.Polygon();
        const pointArray = AtomArrowBlock_1.createArrowBlockPointArray({ height, bodyWidth, chevronWidth });
        chevron.plot(pointArray);
        chevron.fill({ color: fillColor, opacity: fillOpacity });
        if (strokeSize > 0) {
            chevron.stroke({ width: strokeSize, color: strokeColor });
        }
        return chevron;
    }
    static createArrowBlockPointArray({ height, bodyWidth, chevronWidth }) {
        return new SVG.PointArray([
            [0, 0],
            [chevronWidth + bodyWidth, 0],
            [(chevronWidth * 2) + bodyWidth, height / 2],
            [chevronWidth + bodyWidth, height],
            [0, height],
            [chevronWidth, height / 2]
        ]);
    }
    ready() {
        super.ready();
        this.svgDoc = SVG(this.shadowRoot);
    }
    render({ useContentWidth = true } = {}) {
        this.svgDoc.clear();
        this.svgDoc.size(0, 0);
        const strokeSize = parseInt(this.readCSSCustomProperty('--atom-arrow-block-stroke-size', AtomArrowBlock_1.DEFAULT_STROKE_SIZE), 10);
        const chevronWidth = parseInt(this.readCSSCustomProperty('--atom-arrow-block-chevron-width', AtomArrowBlock_1.DEFAULT_CHEVRON_WIDTH), 10);
        const shadowSize = parseFloat(this.readCSSCustomProperty('--atom-arrow-block-shadow-size', AtomArrowBlock_1.DEFAULT_SHADOW_SIZE));
        const fillOpacity = parseFloat(this.readCSSCustomProperty('--atom-arrow-block-fill-opacity', 1));
        const bodyWidth = useContentWidth ?
            this.$.content.clientWidth :
            this.getBoundingClientRect().width - (chevronWidth * 2) - strokeSize;
        const height = this.clientHeight;
        const width = bodyWidth + (chevronWidth * 2) + strokeSize;
        const arrowBlock = AtomArrowBlock_1.createArrowBlock({
            height: height - strokeSize,
            bodyWidth,
            chevronWidth,
            fillColor: this.readCSSCustomProperty('--atom-arrow-block-fill-color'),
            fillOpacity,
            strokeSize,
            strokeColor: this.readCSSCustomProperty('--atom-arrow-block-stroke-color')
        });
        let moveAmt = (strokeSize / 2);
        if (this.glow) {
            arrowBlock.attr({ filter: 'url(#glowFilter)' });
            this.svgDoc.node.appendChild(this.$.filterDefs);
            this.svgDoc.node.style.marginRight = `${-shadowSize * 2}px`;
            this.svgDoc.transform({ x: -shadowSize, y: -shadowSize });
            moveAmt = (strokeSize / 2) + shadowSize;
            this.svgDoc.size(width + (shadowSize * 2), height + (shadowSize * 2));
        }
        else {
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
tslib_1.__decorate([
    property({ type: Boolean })
], AtomArrowBlock.prototype, "glow", void 0);
AtomArrowBlock = AtomArrowBlock_1 = tslib_1.__decorate([
    customElement('atom-arrow-block')
], AtomArrowBlock);
export default AtomArrowBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1hcnJvdy1ibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0b20tYXJyb3ctYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLGtCQUFrQixNQUFNLG9DQUFvQyxDQUFDO0FBRXBFLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLEdBQUcsR0FBSSxNQUFjLENBQUMsR0FBb0IsQ0FBQztBQUVqRDs7O0dBR0c7QUFFSCxJQUFxQixjQUFjLHNCQUFuQyxNQUFxQixjQUFlLFNBQVEsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUwvRTs7O09BR0c7SUFDSDs7UUFHQyxTQUFJLEdBQUcsSUFBSSxDQUFDO0lBMkhiLENBQUM7SUFsSEE7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQ3ZCLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxXQUFXLEVBQ1gsVUFBVSxFQUNWLFdBQVcsRUFTWDtRQUNBLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xDLE1BQU0sVUFBVSxHQUFHLGdCQUFjLENBQUMsMEJBQTBCLENBQUMsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7UUFDaEcsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7U0FDeEQ7UUFF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