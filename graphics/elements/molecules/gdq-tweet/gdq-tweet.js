import * as tslib_1 from "tslib";
import { TimelineLite, Linear, Sine, Power2 } from 'gsap';
import InterruptMixin from '../../../mixins/InterruptMixin';
import { typeAnim, untypeAnim } from '../../../../shared/lib/TypeAnims';
import { createMaybeRandomTween } from '../../../../shared/lib/MaybeRandom';
import * as DrawSVGPlugin from '../../../../shared/lib/vendor/DrawSVGPlugin';
window._gsapPlugins = [DrawSVGPlugin]; // prevent tree shaking
const { customElement, property } = Polymer.decorators;
const SVG = (window.svgjs || window.SVG);
/**
 * @customElement
 * @polymer
 */
let GDQTweetElement = class GDQTweetElement extends InterruptMixin(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.label = '';
        this.companionElement = document.querySelector('gdq-sponsors');
        this.bindToMessage = 'showTweet';
        this.backgroundOpacity = 0.25;
    }
    ready() {
        super.ready();
        this._initBackgroundSVG();
        this._addReset();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            const layoutAppElement = document.querySelector('layout-app');
            if (!this.companionElement && layoutAppElement) {
                const sponsorsElement = layoutAppElement.shadowRoot.querySelector('gdq-sponsors');
                if (sponsorsElement) {
                    this.companionElement = sponsorsElement;
                }
            }
        });
    }
    /**
     * Adds a reset to the master timeline.
     */
    _addReset() {
        const tl = this.timeline;
        tl.call(() => {
            this.$['body-actual'].innerHTML = '';
            this.$.name.innerHTML = '';
        }, undefined, null, '+=0.03');
        tl.set(this.$svg.bgRect.node, { drawSVG: '0%', 'fill-opacity': 0 });
        tl.set([this.$.label, this.$.name], { scaleX: 0, color: 'transparent', clipPath: '' });
        tl.set(this.$['body-actual'], { opacity: 1 });
    }
    /**
     * Creates an entrance animation timeline.
     * @param tweet - The tweet to enter.
     * @returns A GSAP animation timeline.
     */
    _createEntranceAnim(tweet) {
        const tl = new TimelineLite();
        tl.addLabel('start', '+=0.03');
        tl.call(() => {
            this.$.name.innerText = `@${tweet.user.screen_name}`;
        }, undefined, null, 'start');
        tl.to(this.$svg.bgRect.node, 0.75, {
            drawSVG: '100%',
            ease: Linear.easeNone
        }, 'start');
        tl.to(this.$.name, 0.334, {
            scaleX: 1,
            ease: Sine.easeInOut,
            onComplete: () => {
                this.$.name.style.color = '';
                typeAnim(this.$.name);
            }
        }, 'start+=0.05');
        tl.to(this.$.label, 0.334, {
            scaleX: 1,
            ease: Sine.easeInOut,
            onComplete: () => {
                this.$.label.style.color = '';
                typeAnim(this.$.label);
            }
        }, 'start+=0.4');
        tl.to(this.$svg.bgRect.node, 0.5, {
            'fill-opacity': this.backgroundOpacity,
            ease: Sine.easeOut
        }, 'start+=1');
        tl.call(() => {
            this.$['body-actual'].innerHTML = tweet.text;
            typeAnim(this.$['body-actual'], { typeInterval: 0.01 });
        });
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
        let exitedPreviousTweet = false;
        tl.call(() => {
            if (exitedPreviousTweet) {
                return;
            }
            tl.pause();
            const exitTextTl = new TimelineLite();
            exitTextTl.add(untypeAnim(this.$.name, 0.01), 0);
            exitTextTl.add(untypeAnim(this.$['body-actual'], 0.01), 0.08);
            exitTextTl.call(() => {
                exitedPreviousTweet = true;
                tl.resume();
            });
        }, undefined, null, '+=0.03');
        tl.call(() => {
            this.$.name.innerText = `@${tweet.user.screen_name}`;
            this.$['body-actual'].innerHTML = tweet.text;
            const enterTextTl = new TimelineLite();
            enterTextTl.add(typeAnim(this.$.name, { typeInterval: 0.01 }), 0);
            enterTextTl.add(typeAnim(this.$['body-actual'], { typeInterval: 0.01 }), 0.08);
        }, undefined, null, '+=0.03');
        return tl;
    }
    /**
     * Creates an exit animation timeline.
     * @returns A GSAP animation timeline.
     */
    _createExitAnim() {
        const tl = new TimelineLite();
        tl.add('exit');
        tl.add(createMaybeRandomTween({
            target: this.$['body-actual'].style,
            propName: 'opacity',
            duration: 0.465,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 0 }
        }), 'exit');
        tl.to(this.$svg.bgRect.node, 0.5, {
            'fill-opacity': 0,
            ease: Sine.easeOut
        }, 'exit');
        tl.to(this.$svg.bgRect.node, 1.5, {
            drawSVG: '0%',
            ease: Power2.easeIn
        }, 'exit');
        tl.fromTo(this.$.label, 0.334, {
            clipPath: 'inset(0 0% 0 0)'
        }, {
            clipPath: 'inset(0 100% 0 0)',
            ease: Sine.easeInOut
        }, 'exit+=0.9');
        tl.fromTo(this.$.name, 0.334, {
            clipPath: 'inset(0 0 0 0%)'
        }, {
            clipPath: 'inset(0 0 0 100%)',
            ease: Sine.easeInOut
        }, 'exit+=1.3');
        return tl;
    }
    _initBackgroundSVG() {
        if (this._initialized) {
            throw new Error('this element has already been initialized');
        }
        this._initialized = true;
        const STROKE_SIZE = 1;
        this.$svg = {};
        const svgDoc = SVG(this.$.background);
        const bgRect = svgDoc.rect();
        this.$svg.svgDoc = svgDoc;
        this.$svg.bgRect = bgRect;
        // Intentionally flip the width and height.
        // This is part of how we get the drawSVG anim to go in the direction we want.
        bgRect.stroke({
            color: 'white',
            // Makes it effectively STROKE_SIZE, because all SVG strokes
            // are center strokes, and the outer half is cut off.
            width: STROKE_SIZE * 2
        });
        bgRect.fill({ color: 'black', opacity: this.backgroundOpacity });
        this.resize();
    }
    resize() {
        if (!this._initialized) {
            return;
        }
        const ELEMENT_WIDTH = this.$.background.clientWidth;
        const ELEMENT_HEIGHT = this.$.background.clientHeight;
        this.$svg.svgDoc.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);
        this.$svg.bgRect.size(ELEMENT_HEIGHT, ELEMENT_WIDTH);
        // Rotate and translate such that drawSVG anims start from the top right
        // and move clockwise to un-draw, counter-clockwise to un-draw.
        this.$svg.bgRect.style({ transform: `rotate(90deg) translateY(${-ELEMENT_WIDTH}px)` });
    }
    _falsey(value) {
        return !value;
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQTweetElement.prototype, "label", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GDQTweetElement.prototype, "companionElement", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQTweetElement.prototype, "bindToMessage", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTweetElement.prototype, "backgroundOpacity", void 0);
GDQTweetElement = tslib_1.__decorate([
    customElement('gdq-tweet')
], GDQTweetElement);
export default GDQTweetElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXR3ZWV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXR3ZWV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sY0FBbUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVqRixPQUFPLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sS0FBSyxhQUFhLE1BQU0sNkNBQTZDLENBQUM7QUFDNUUsTUFBYyxDQUFDLFlBQVksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO0FBRXZFLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLEdBQUcsR0FBRyxDQUFFLE1BQWMsQ0FBQyxLQUFLLElBQUssTUFBYyxDQUFDLEdBQUcsQ0FBa0IsQ0FBQztBQUU1RTs7O0dBR0c7QUFFSCxJQUFxQixlQUFlLEdBQXBDLE1BQXFCLGVBQWdCLFNBQVEsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFMNUU7OztPQUdHO0lBQ0g7O1FBR0MsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUduQixxQkFBZ0IsR0FBK0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUd0RixrQkFBYSxHQUFXLFdBQVcsQ0FBQztRQUdwQyxzQkFBaUIsR0FBVyxJQUFJLENBQUM7SUEyTmxDLENBQUM7SUFsTkEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixPQUFPLENBQUMs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