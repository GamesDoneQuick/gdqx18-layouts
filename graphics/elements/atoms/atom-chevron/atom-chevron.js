import * as tslib_1 from "tslib";
var AtomChevron_1;
import CSSReflectionMixin from '../../../mixins/CSSReflectionMixin';
const { customElement, property } = Polymer.decorators;
const SVG = (window.svgjs || window.SVG);
/**
 * @customElement
 * @polymer
 */
let AtomChevron = AtomChevron_1 = class AtomChevron extends CSSReflectionMixin(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        /**
         * The direction the chevron should point.
         */
        this.direction = 'right';
        this.noAutoRender = false;
    }
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
    static createChevron({ width, height, thickness, fillColor, strokeSize, strokeColor }) {
        const chevron = new SVG.Polygon();
        const pointArray = AtomChevron_1.createChevronPointArray({ width, height, thickness });
        chevron.plot(pointArray);
        chevron.fill(fillColor);
        if (strokeSize > 0) {
            chevron.stroke({ width: strokeSize, color: strokeColor });
        }
        return chevron;
    }
    static createChevronPointArray({ width, height, thickness }) {
        return new SVG.PointArray([
            [0, 0],
            [thickness, 0],
            [width, height / 2],
            [thickness, height],
            [0, height],
            [width - thickness, height / 2]
        ]);
    }
    ready() {
        super.ready();
        this.svgDoc = SVG(this.shadowRoot);
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.noAutoRender) {
            if (document.readyState === 'complete') {
                Polymer.RenderStatus.afterNextRender(this, this.render);
            }
            else {
                window.addEventListener('load', () => {
                    Polymer.RenderStatus.afterNextRender(this, this.render);
                });
            }
        }
    }
    render(width, height) {
        this.svgDoc.clear();
        /* tslint:disable:no-parameter-reassignment */
        width = typeof width === 'number' ? width : this.scrollWidth;
        height = typeof height === 'number' ? height : this.clientHeight;
        /* tslint:enable:no-parameter-reassignment */
        const strokeSize = parseInt(this.readCSSCustomProperty('--atom-chevron-stroke-size', AtomChevron_1.DEFAULT_STROKE_SIZE), 10);
        const thickness = parseInt(this.readCSSCustomProperty('--atom-chevron-thickness', AtomChevron_1.DEFAULT_THICKNESS), 10);
        this.svgDoc.size(width, height);
        const chevron = AtomChevron_1.createChevron({
            width: width - strokeSize,
            height: height - strokeSize,
            thickness,
            fillColor: this.readCSSCustomProperty('--atom-chevron-fill-color'),
            strokeSize,
            strokeColor: this.readCSSCustomProperty('--atom-chevron-stroke-color')
        });
        chevron.move(strokeSize / 2, strokeSize / 2);
        this.chevron = chevron;
        this.svgDoc.add(chevron);
        if (this.direction === 'left' && this._lastDirection !== 'left') {
            this.svgDoc.transform({ scaleX: -1 });
            this._lastDirection = 'left';
        }
    }
};
AtomChevron.DEFAULT_THICKNESS = 6;
AtomChevron.DEFAULT_STROKE_SIZE = 1;
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], AtomChevron.prototype, "direction", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], AtomChevron.prototype, "noAutoRender", void 0);
AtomChevron = AtomChevron_1 = tslib_1.__decorate([
    customElement('atom-chevron')
], AtomChevron);
export default AtomChevron;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1jaGV2cm9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXRvbS1jaGV2cm9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxrQkFBa0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUVwRSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxHQUFHLEdBQUcsQ0FBRSxNQUFjLENBQUMsS0FBSyxJQUFLLE1BQWMsQ0FBQyxHQUFHLENBQWtCLENBQUM7QUFFNUU7OztHQUdHO0FBRUgsSUFBcUIsV0FBVyxtQkFBaEMsTUFBcUIsV0FBWSxTQUFRLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFMNUU7OztPQUdHO0lBQ0g7O1FBRUM7O1dBRUc7UUFFSCxjQUFTLEdBQXFCLE9BQU8sQ0FBQztRQUd0QyxpQkFBWSxHQUFHLEtBQUssQ0FBQztJQW9IdEIsQ0FBQztJQTFHQTs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFDcEIsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBUVg7UUFDQSxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQyxNQUFNLFVBQVUsR0FBRyxhQUFXLENBQUMsdUJBQXVCLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7UUFDbkYsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNuQixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztT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