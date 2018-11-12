import * as tslib_1 from "tslib";
import { TimelineLite, Linear, Sine, Power2 } from 'gsap';
import InterruptMixin from '../../../mixins/InterruptMixin';
import { typeAnim } from '../../../../shared/lib/TypeAnims';
import * as DrawSVGPlugin from '../../../../shared/lib/vendor/DrawSVGPlugin';
window._gsapPlugins = [DrawSVGPlugin]; // prevent tree shaking
const { customElement, property } = Polymer.decorators;
const SVG = (window.svgjs || window.SVG);
/**
 * @customElement
 * @polymer
 */
let GdqBreakFanart = class GdqBreakFanart extends InterruptMixin(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.backgroundOpacity = 0.25;
    }
    ready() {
        super.ready();
        this.$.tweet.companionElement = null;
        this._initBackgroundSVG();
    }
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            this._addReset();
        });
    }
    /**
     * Adds a reset to the master timeline.
     */
    _addReset() {
        const tl = this.timeline;
        tl.set(this._bgRect.node, { drawSVG: '0%', 'fill-opacity': 0 });
        tl.set(this.$.label, { scaleX: 0, color: 'transparent', clipPath: '' });
        tl.call(this.$.tweet._addReset, undefined, this.$.tweet);
    }
    /**
     * Creates an entrance animation timeline.
     * @param tweet - The tweet to enter.
     * @returns A GSAP animation timeline.
     */
    _createEntranceAnim(tweet) {
        const tl = new TimelineLite();
        const $image = this.$.image;
        const media = tweet.gdqMedia;
        if (!media) {
            return tl;
        }
        let didStartingWork = false; // GSAP likes to run .calls again when you .resume
        tl.call(() => {
            if (didStartingWork) {
                return;
            }
            didStartingWork = true;
            tl.pause();
            $image.$svg.image.load(media[0].media_url_https).loaded(() => {
                tl.resume();
            }).error(error => {
                nodecg.log.error(error);
                tl.clear();
                tl.resume();
            });
        }, undefined, null, '+=0.03');
        tl.addLabel('start', '+=0.03');
        tl.to(this._bgRect.node, 0.75, {
            drawSVG: '100%',
            ease: Linear.easeNone
        }, 'start');
        tl.add($image.enter(), 'start');
        tl.add(this.$.tweet._createEntranceAnim(tweet), 'start+=0.1');
        tl.to(this.$.label, 0.334, {
            scaleX: 1,
            ease: Sine.easeInOut,
            onComplete: () => {
                this.$.label.style.color = '';
                typeAnim(this.$.label);
            }
        }, 'start+=0.4');
        tl.to(this._bgRect.node, 0.5, {
            'fill-opacity': this.backgroundOpacity,
            ease: Sine.easeOut
        }, 'start+=1');
        if (media.length > 1) {
            media.slice(1).forEach(mediaEntity => {
                tl.add(this._createHold());
                tl.add(this._changeImage(mediaEntity.media_url_https));
            });
        }
        return tl;
    }
    /**
     * Creates an animation for changing the currently displayed tweet.
     * This is only used when hot-swapping tweets
     * (i.e., changing tweets while the graphic is already showing).
     * @param tweet - The new tweet to show.
     * @returns A GSAP animation timeline.
     */
    _createChangeAnim(tweet) {
        const tl = new TimelineLite();
        if (!tweet.gdqMedia) {
            return tl;
        }
        let exitedPreviousItem = false; // GSAP likes to run .calls again when you .resume
        tl.call(() => {
            if (exitedPreviousItem) {
                return;
            }
            tl.pause();
            const exitTextTl = new TimelineLite();
            exitTextTl.add(this.$.tweet._createChangeAnim(tweet), 0);
            exitTextTl.call(() => {
                exitedPreviousItem = true;
                tl.resume();
            });
        }, undefined, null, '+=0.03');
        tl.add(this._changeImage(tweet.gdqMedia[0].media_url_https), '+=0.03');
        if (tweet.gdqMedia.length > 1) {
            tweet.gdqMedia.slice(1).forEach(mediaEntity => {
                tl.add(this._createHold());
                tl.add(this._changeImage(mediaEntity.media_url_https));
            });
        }
        return tl;
    }
    /**
     * Changes just the image, without changing the tweet body.
     * Used in tweets which have more than one image (they can have up to four).
     * @param newSrc - The url of the new image to show.
     * @returns A GSAP animation timeline.
     */
    _changeImage(newSrc) {
        const tl = new TimelineLite();
        const $image = this.$.image;
        tl.add($image.exit({
            onComplete: () => {
                tl.pause();
                $image.$svg.image.load(newSrc).loaded(() => {
                    tl.resume();
                }).error(error => {
                    nodecg.log.error(error);
                    tl.resume();
                });
            }
        }));
        tl.add($image.enter(), '+=0.05');
        return tl;
    }
    /**
     * Creates an exit animation timeline.
     * @returns A GSAP animation timeline.
     */
    _createExitAnim() {
        const tl = new TimelineLite();
        tl.add('exit');
        tl.to(this._bgRect.node, 0.5, {
            'fill-opacity': 0,
            ease: Sine.easeOut
        }, 'exit');
        tl.to(this._bgRect.node, 1.5, {
            drawSVG: '0%',
            ease: Power2.easeIn
        }, 'exit');
        tl.fromTo(this.$.label, 0.334, {
            clipPath: 'inset(0 0% 0 0)'
        }, {
            clipPath: 'inset(0 100% 0 0)',
            ease: Sine.easeInOut
        }, 'exit+=0.9');
        tl.add(this.$.tweet._createExitAnim(), 'exit');
        tl.add(this.$.image.exit(), 'exit+=0.1');
        return tl;
    }
    _initBackgroundSVG() {
        const STROKE_SIZE = 1;
        const ELEMENT_WIDTH = this.$.background.clientWidth;
        const ELEMENT_HEIGHT = this.$.background.clientHeight;
        const svgDoc = SVG(this.$.background);
        const bgRect = svgDoc.rect();
        this._bgRect = bgRect;
        svgDoc.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);
        // Intentionally flip the width and height.
        // This is part of how we get the drawSVG anim to go in the direction we want.
        bgRect.size(ELEMENT_HEIGHT, ELEMENT_WIDTH);
        bgRect.stroke({
            color: 'white',
            // Makes it effectively STROKE_SIZE, because all SVG strokes
            // are center strokes, and the outer half is cut off.
            width: STROKE_SIZE * 2
        });
        bgRect.fill({ color: 'black', opacity: this.backgroundOpacity });
        // Rotate and translate such that drawSVG anims start from the bottom right
        // and move counter-clockwise to draw, clockwise to un-draw.
        bgRect.style({ transform: `rotate(90deg) scaleX(-1) translateX(${-ELEMENT_HEIGHT}px) translateY(${-ELEMENT_WIDTH}px)` });
    }
};
tslib_1.__decorate([
    property({ type: Number })
], GdqBreakFanart.prototype, "backgroundOpacity", void 0);
GdqBreakFanart = tslib_1.__decorate([
    customElement('gdq-break-fanart')
], GdqBreakFanart);
export default GdqBreakFanart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWZhbmFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1icmVhay1mYW5hcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxjQUFpQyxNQUFNLGdDQUFnQyxDQUFDO0FBRy9FLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUUxRCxPQUFPLEtBQUssYUFBYSxNQUFNLDZDQUE2QyxDQUFDO0FBRTVFLE1BQWMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtBQUV2RSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxHQUFHLEdBQUcsQ0FBRSxNQUFjLENBQUMsS0FBSyxJQUFLLE1BQWMsQ0FBQyxHQUFHLENBQWtCLENBQUM7QUFFNUU7OztHQUdHO0FBRUgsSUFBcUIsY0FBYyxHQUFuQyxNQUFxQixjQUFlLFNBQVEsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFMM0U7OztPQUdHO0lBQ0g7O1FBR0Msc0JBQWlCLEdBQVcsSUFBSSxDQUFDO0lBMk5sQyxDQUFDO0lBdk5BLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQXlCLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzFELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxpQkFBaUI7UUFDaEIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ2hELElBQUksQ0FBQyxTQUFTLEVB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