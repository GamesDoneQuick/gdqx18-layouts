/* global CSSReflectionMixin */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import CSSReflectionMixin from '../../../mixins/CSSReflectionMixin';
const SVG = window.svgjs;
window.addEventListener('load', () => {
    var AtomArrowBlock_1;
    const { customElement, property } = Polymer.decorators;
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
    __decorate([
        property({ type: Boolean })
    ], AtomArrowBlock.prototype, "glow", void 0);
    AtomArrowBlock = AtomArrowBlock_1 = __decorate([
        customElement('atom-arrow-block')
    ], AtomArrowBlock);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.AtomArrowBlock = AtomArrowBlock;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1hcnJvdy1ibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0b20tYXJyb3ctYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCOzs7Ozs7O0FBRS9CLE9BQU8sa0JBQWtCLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsTUFBTSxHQUFHLEdBQUksTUFBYyxDQUFDLEtBQXNCLENBQUM7QUFFbkQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7O0lBQ3BDLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUVyRDs7O09BR0c7SUFFSCxJQUFNLGNBQWMsc0JBQXBCLE1BQU0sY0FBZSxTQUFRLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFMaEU7OztXQUdHO1FBQ0g7O1lBR0MsU0FBSSxHQUFHLElBQUksQ0FBQztRQTJIYixDQUFDO1FBbEhBOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUN2QixNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsV0FBVyxFQUNYLFVBQVUsRUFDVixXQUFXLEVBU1g7WUFDQSxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQyxNQUFNLFVBQVUsR0FBRyxnQkFBYyxDQUFDLDBCQUEwQixDQUFDLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO1lBQ2hHLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixPQUFPLENBQUMsTUFBTSxDQUFD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