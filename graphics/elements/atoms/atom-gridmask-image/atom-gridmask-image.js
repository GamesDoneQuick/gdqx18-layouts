import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Sine } from 'gsap';
import Random from '../../../../shared/lib/vendor/random';
const { customElement, property } = Polymer.decorators;
const SVG = (window.svgjs || window.SVG);
/**
 * @customElement
 * @polymer
 */
let AtomGridmaskImageElement = class AtomGridmaskImageElement extends Polymer.Element {
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
        this._initSVG();
    }
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            TweenLite.set(this.$svg.imageMaskCells, { opacity: 0 });
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
        image.attr({ preserveAspectRatio: this.preserveAspectRatio });
        if (this.withBackground) {
            const bgRect = svgDoc.rect();
            bgRect.fill({ color: 'black', opacity: 0.25 });
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
        }
        // Generate the exitMask rects
        for (let r = 0; r < IMAGE_MASK_ROWS; r++) {
            const y = r * IMAGE_MASK_CELL_SIZE;
            for (let c = 0; c < IMAGE_MASK_COLUMNS; c++) {
                const x = c * IMAGE_MASK_CELL_SIZE;
                const rect = svgDoc.rect(IMAGE_MASK_CELL_SIZE, IMAGE_MASK_CELL_SIZE);
                rect.move(x, y);
                rect.fill({ color: '#FFFFFF' });
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
                this.$svg.bgRect.transform({ scaleX: -1, x: ELEMENT_WIDTH });
                this.$svg.image.size(ELEMENT_WIDTH - (STROKE_SIZE * 2), ELEMENT_HEIGHT - (STROKE_SIZE * 2));
            }
        }
    }
};
tslib_1.__decorate([
    property({ type: Number })
], AtomGridmaskImageElement.prototype, "strokeSize", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], AtomGridmaskImageElement.prototype, "withBackground", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomGridmaskImageElement.prototype, "cellSize", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomGridmaskImageElement.prototype, "cellStagger", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomGridmaskImageElement.prototype, "fallbackSrc", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomGridmaskImageElement.prototype, "preserveAspectRatio", void 0);
tslib_1.__decorate([
    property({ type: Boolean, notify: true })
], AtomGridmaskImageElement.prototype, "entering", void 0);
tslib_1.__decorate([
    property({ type: Boolean, notify: true })
], AtomGridmaskImageElement.prototype, "exiting", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], AtomGridmaskImageElement.prototype, "_initialized", void 0);
AtomGridmaskImageElement = tslib_1.__decorate([
    customElement('atom-gridmask-image')
], AtomGridmaskImageElement);
export default AtomGridmaskImageElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1ncmlkbWFzay1pbWFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0b20tZ3JpZG1hc2staW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRCxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxHQUFHLEdBQUcsQ0FBRSxNQUFjLENBQUMsS0FBSyxJQUFLLE1BQWMsQ0FBQyxHQUFHLENBQWtCLENBQUM7QUFFNUU7OztHQUdHO0FBRUgsSUFBcUIsd0JBQXdCLEdBQTdDLE1BQXFCLHdCQUF5QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTHJFOzs7T0FHRztJQUNIOztRQUdDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFHZixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUd2QixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFLcEI7O1dBRUc7UUFFSCx3QkFBbUIsR0FBRyxVQUFVLENBQUM7UUFHakMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR2hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBc0t0QixDQUFDO0lBN0pBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDaEQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFD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