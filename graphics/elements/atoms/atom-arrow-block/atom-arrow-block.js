import * as tslib_1 from "tslib";
var AtomArrowBlock_1;
import CSSReflectionMixin from '../../../mixins/CSSReflectionMixin';
const { customElement, property } = Polymer.decorators;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1hcnJvdy1ibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0b20tYXJyb3ctYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLGtCQUFrQixNQUFNLG9DQUFvQyxDQUFDO0FBRXBFLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLEdBQUcsR0FBSSxNQUFjLENBQUMsS0FBc0IsQ0FBQztBQUVuRDs7O0dBR0c7QUFFSCxJQUFxQixjQUFjLHNCQUFuQyxNQUFxQixjQUFlLFNBQVEsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUwvRTs7O09BR0c7SUFDSDs7UUFHQyxTQUFJLEdBQUcsSUFBSSxDQUFDO0lBMkhiLENBQUM7SUFsSEE7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQ2pCLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxXQUFXLEVBQ1gsVUFBVSxFQUNWLFdBQVcsRUFTakI7UUFDQSxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQyxNQUFNLFVBQVUsR0FBRyxnQkFBYyxDQUFDLDBCQUEwQixDQUFDLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO1FBQ2hHLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FB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