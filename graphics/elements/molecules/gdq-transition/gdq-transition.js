import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Sine } from 'gsap';
import * as gdqUtils from '../../../../shared/lib/gdq-utils';
import CustomEase from '../../../../shared/lib/vendor/CustomEase';
const { customElement } = Polymer.decorators;
const HOME_POSITION = { x: 0, y: 0 };
const HERO_HOLD_TIME = 1.5;
const GENERIC_HOLD_TIME = 0.5;
const MEDIA_READY_STATES = {
    HAVE_NOTHING: 0,
    HAVE_METADATA: 1,
    HAVE_CURRENT_DATA: 2,
    HAVE_FUTURE_DATA: 3,
    HAVE_ENOUGH_DATA: 4
};
const currentLayoutRep = nodecg.Replicant('gdq:currentLayout');
CustomEase.create('ModifiedPower2EaseInOut', 'M0,0 C0.66,0 0.339,1 1,1');
/**
 * @customElement
 * @polymer
 */
let GdqTransition = class GdqTransition extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.masterTimeline = new TimelineLite({ autoRemoveChildren: true });
        this._initialized = false;
    }
    ready() {
        super.ready();
        const videos = Array.from(this.shadowRoot.querySelectorAll('video'));
        const videoLoadPromises = videos.map(this.waitForVideoToLoad);
        Promise.all(videoLoadPromises).then(() => this.init());
        this._$videos = videos;
        if (window.__SCREENSHOT_TESTING__) {
            TweenLite.set(this, { opacity: 1 });
        }
        else {
            currentLayoutRep.once('change', newVal => {
                if (newVal.toLowerCase() === 'break') {
                    this.fromClosedToPartial().progress(1);
                }
                else {
                    this.fromClosedToOpen().progress(1);
                }
                TweenLite.set(this, { opacity: 1 });
            });
        }
    }
    init() {
        if (this._initialized) {
            throw new Error('already initialized');
        }
        this._initialized = true;
        this.dispatchEvent(new CustomEvent('initialized'));
        if (window.__SCREENSHOT_TESTING__) {
            this._$videos.forEach(video => {
                video.currentTime = video.duration;
            });
        }
        // Hide all videos to start.
        this.hideVideos(...this._$videos);
        nodecg.listenFor('compositingOBS:transitioning', data => {
            console.log('compositingOBS:transitioning |', data);
            if (!data || !data.fromScene || !data.toScene) {
                return;
            }
            if (data.name !== 'Blank Stinger') {
                return;
            }
            let animationTimeline;
            if (data.fromScene === 'Break') {
                if (data.toScene === 'Break') {
                    animationTimeline = this.genericBoth();
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.heroExit();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
                    animationTimeline = this.genericExit();
                }
            }
            else if (gdqUtils.isGameScene(data.fromScene)) {
                if (data.toScene === 'Break') {
                    animationTimeline = this.heroEnter();
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.genericNone();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
                    animationTimeline = this.genericNone();
                }
            }
            else if (data.fromScene === 'Interview') {
                if (data.toScene === 'Break') {
                    this.genericEnter();
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.genericNone();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
                    animationTimeline = this.genericNone();
                }
            }
            else if (data.fromScene === 'Countdown') {
                if (data.toScene === 'Break') {
                    animationTimeline = this.heroEnter();
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.genericNone();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
                    animationTimeline = this.genericNone();
                }
            }
            else if (data.fromScene === 'Advertisements') {
                if (data.toScene === 'Break') {
                    this.genericEnter();
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.genericNone();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
                    animationTimeline = this.genericNone();
                }
            }
            else if (data.fromScene === 'Technical Difficulties') {
                if (data.toScene === 'Break') {
                    animationTimeline = this.genericNone();
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.genericNone();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
                    animationTimeline = this.genericNone();
                }
            }
            if (animationTimeline) {
                this.masterTimeline.clear();
                this.masterTimeline.add(animationTimeline);
            }
        });
        console.log('listening for transition events...');
    }
    genericNone() {
        console.log('genericNone');
        return this.genericBase({ startPartial: false, endPartial: false });
    }
    genericEnter() {
        console.log('genericEnter');
        return this.genericBase({ startPartial: false, endPartial: true });
    }
    genericExit() {
        console.log('genericExit');
        return this.genericBase({ startPartial: true, endPartial: false });
    }
    genericBoth() {
        console.log('genericBoth');
        return this.genericBase({ startPartial: true, endPartial: true });
    }
    genericBase({ startPartial = false, endPartial = false }) {
        const videos = [
            this.$['bottomTrapAnimation-enter'],
            this.$['bottomTrapAnimation-exit'],
            this.$.bottomRectAnimation,
            this.$.topTrapAnimation,
            this.$.topRectAnimation
        ];
        const tl = new TimelineLite({
            onStart: () => {
                this.hideVideos(...videos);
                nodecg.playSound('transition-general');
            }
        });
        const closingAnim = startPartial ? this.fromPartialToClosed() : this.fromOpenToClosed();
        closingAnim.call(() => {
            this.playVideos(this.$.genericAnimation);
        }, undefined, null, 'frontRects');
        tl.add(closingAnim);
        tl.add(endPartial ? this.fromClosedToPartial() : this.fromClosedToOpen(), `+=${GENERIC_HOLD_TIME}`);
        return tl;
    }
    heroEnter() {
        console.log('heroEnter');
        const videos = [
            this.$['bottomTrapAnimation-enter'],
            this.$.bottomRectAnimation,
            this.$.topTrapAnimation,
            this.$.topRectAnimation
        ];
        const tl = new TimelineLite({
            onStart: () => {
                this.playVideos(...videos);
                nodecg.playSound('transition-hero-enter');
            }
        });
        tl.add(this.fromOpenToClosed());
        tl.add(this.fromClosedToPartial({ fadeOutVideos: true }), `+=${HERO_HOLD_TIME}`);
        return tl;
    }
    heroExit() {
        console.log('heroExit');
        const videos = [
            this.$['bottomTrapAnimation-exit'],
            this.$.bottomRectAnimation,
            this.$.topTrapAnimation,
            this.$.topRectAnimation
        ];
        const tl = new TimelineLite({
            onStart: () => {
                this.playVideos(...videos);
                nodecg.playSound('transition-hero-exit');
            }
        });
        tl.add(this.fromPartialToClosed());
        tl.add(this.fromClosedToOpen({ fadeOutVideos: true }), `+=${HERO_HOLD_TIME}`);
        return tl;
    }
    fromOpenToClosed() {
        const tl = new TimelineLite();
        tl.add(this.closeGeometry());
        return tl;
    }
    fromClosedToOpen({ fadeOutVideos = false } = {}) {
        return this.openGeometry({
            bottomFrontRect: { x: 26, y: 413 },
            topFrontRect: { x: -10, y: -418 },
            bottomFrontTrapezoid: { x: -667, y: 488 },
            topFrontTrapezoid: { x: 14, y: -521 },
            bottomBackRect: { x: 0, y: 421 },
            topBackRect: { x: -10, y: -437 },
            bottomBackTrapezoid: { x: -666, y: 510 },
            topBackTrapezoid: { x: 0, y: -543 },
            fadeOutVideos,
            fadeOutAll: true
        });
    }
    fromPartialToClosed() {
        const tl = new TimelineLite();
        tl.to([
            this.$.topFrameContent,
            this.$.bottomFrameContent
        ], 0.333, {
            opacity: 0,
            ease: Sine.easeInOut
        }, 0);
        tl.add(this.closeGeometry(), 0);
        return tl;
    }
    fromClosedToPartial({ fadeOutVideos = false } = {}) {
        const tl = new TimelineLite();
        tl.add(this.openGeometry({
            bottomFrontRect: { x: 26, y: 321 },
            topFrontRect: { x: -10, y: -349 },
            bottomFrontTrapezoid: { x: -503, y: 364 },
            topFrontTrapezoid: { x: 8, y: -417 },
            bottomBackRect: { x: 0, y: 323 },
            topBackRect: { x: 0, y: -351 },
            bottomBackTrapezoid: { x: -490, y: 374 },
            topBackTrapezoid: { x: 0, y: -426 },
            fadeOutVideos
        }));
        tl.to([
            this.$.topFrameContent,
            this.$.bottomFrameContent
        ], 0.333, {
            opacity: 1,
            ease: Sine.easeInOut
        });
        return tl;
    }
    openGeometry({ bottomFrontRect, topFrontRect, bottomFrontTrapezoid, topFrontTrapezoid, bottomBackRect, topBackRect, bottomBackTrapezoid, topBackTrapezoid, fadeOutVideos = false, fadeOutAll = false }) {
        const tl = new TimelineLite();
        tl.addLabel('start', 0.03);
        tl.addLabel('frontRects', 'start');
        tl.addLabel('frontTraps', 'start+=0.1');
        tl.addLabel('backRects', 'start+=0.1667');
        tl.addLabel('backTraps', 'start+=0.2334');
        // Front rects.
        tl.to(this.$.bottomFrontRect, 0.2167, Object.assign({}, bottomFrontRect, { ease: 'ModifiedPower2EaseInOut' }), 'frontRects');
        tl.to(this.$.topFrontRect, 0.2167, Object.assign({}, topFrontRect, { ease: 'ModifiedPower2EaseInOut' }), 'frontRects');
        // Front traps.
        tl.to(this.$.bottomFrontTrapezoid, 0.2667, Object.assign({}, bottomFrontTrapezoid, { ease: 'ModifiedPower2EaseInOut' }), 'frontTraps');
        tl.to(this.$.topFrontTrapezoid, 0.2667, Object.assign({}, topFrontTrapezoid, { ease: 'ModifiedPower2EaseInOut' }), 'frontTraps');
        // Back rects.
        tl.to(this.$.bottomBackRect, 0.2334, Object.assign({}, bottomBackRect, { ease: 'ModifiedPower2EaseInOut' }), 'backRects');
        tl.to(this.$.topBackRect, 0.2334, Object.assign({}, topBackRect, { ease: 'ModifiedPower2EaseInOut' }), 'backRects');
        // Back traps.
        tl.to(this.$.bottomBackTrapezoid, 0.2334, Object.assign({}, bottomBackTrapezoid, { ease: 'ModifiedPower2EaseInOut' }), 'backTraps');
        tl.to(this.$.topBackTrapezoid, 0.2334, Object.assign({}, topBackTrapezoid, { ease: 'ModifiedPower2EaseInOut' }), 'backTraps');
        if (fadeOutVideos) {
            tl.to(this._$videos, 0.25, {
                opacity: 0,
                ease: Sine.easeInOut,
                onComplete: () => {
                    console.log('hide all videos');
                    this.hideVideos(...this._$videos);
                }
            }, tl.duration() / 2);
        }
        if (fadeOutAll) {
            tl.to(this, 0.25, {
                opacity: 0,
                ease: Sine.easeInOut
            });
        }
        return tl;
    }
    closeGeometry() {
        const tl = new TimelineLite();
        tl.addLabel('start', 0.03);
        tl.addLabel('backTraps', 'start');
        tl.addLabel('backRects', 'start+=0.0667');
        tl.addLabel('frontTraps', 'start+=0.1334');
        tl.addLabel('frontRects', 'start+=0.2334');
        tl.set(this, { opacity: 1 }, 'start');
        // Back traps.
        tl.to(this.$.bottomBackTrapezoid, 0.2334, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'backTraps');
        tl.to(this.$.topBackTrapezoid, 0.2334, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'backTraps');
        // Back rects.
        tl.to(this.$.bottomBackRect, 0.2334, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'backRects');
        tl.to(this.$.topBackRect, 0.2334, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'backRects');
        // Front traps.
        tl.to(this.$.bottomFrontTrapezoid, 0.2667, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'frontTraps');
        tl.to(this.$.topFrontTrapezoid, 0.2667, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'frontTraps');
        // Front rects.
        tl.to(this.$.bottomFrontRect, 0.2167, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'frontRects');
        tl.to(this.$.topFrontRect, 0.2167, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'frontRects');
        return tl;
    }
    waitForInit() {
        return new Promise(resolve => {
            if (this._initialized) {
                return resolve();
            }
            this.addEventListener('initialized', () => {
                resolve();
            }, { once: true, passive: true });
        });
    }
    waitForVideoToLoad(videoElem) {
        return new Promise(resolve => {
            if (videoElem.readyState >= MEDIA_READY_STATES.HAVE_ENOUGH_DATA) {
                return resolve();
            }
            videoElem.addEventListener('canplaythrough', () => {
                resolve();
            }, { once: true, passive: true });
        });
    }
    playVideos(...videoElems) {
        if (window.__SCREENSHOT_TESTING__) {
            return;
        }
        this.showVideos(...videoElems);
        videoElems.forEach(videoElem => {
            videoElem.play().then(() => {
                console.log('started playing', videoElem.id);
            }).catch(() => {
                console.error('failed to play', videoElem.id);
            });
        });
    }
    showVideos(...videoElems) {
        if (window.__SCREENSHOT_TESTING__) {
            return;
        }
        videoElems.forEach(videoElem => {
            videoElem.style.display = '';
            videoElem.style.opacity = '';
        });
    }
    hideVideos(...videoElems) {
        if (window.__SCREENSHOT_TESTING__) {
            return;
        }
        videoElems.forEach(videoElem => {
            videoElem.pause();
            videoElem.currentTime = 0;
            requestAnimationFrame(() => {
                videoElem.style.display = 'none';
                videoElem.style.opacity = '0';
            });
        });
    }
};
GdqTransition = tslib_1.__decorate([
    customElement('gdq-transition')
], GdqTransition);
export default GdqTransition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRyYW5zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtdHJhbnNpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sS0FBSyxRQUFRLE1BQU0sa0NBQWtDLENBQUM7QUFFN0QsT0FBTyxVQUFVLE1BQU0sMENBQTBDLENBQUM7QUFFbEUsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDM0MsTUFBTSxhQUFhLEdBQUcsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztBQUNuQyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFDM0IsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUM7QUFDOUIsTUFBTSxrQkFBa0IsR0FBRztJQUMxQixZQUFZLEVBQUUsQ0FBQztJQUNmLGFBQWEsRUFBRSxDQUFDO0lBQ2hCLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuQixnQkFBZ0IsRUFBRSxDQUFDO0NBQ25CLENBQUM7QUFFRixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXFCLG1CQUFtQixDQUFDLENBQUM7QUFNbkYsVUFBVSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0FBRXpFOzs7R0FHRztBQUVILElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTDFEOzs7T0FHRztJQUNIOztRQUVrQixtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFDLEVBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUN2RSxpQkFBWSxHQUFZLEtBQUssQ0FBQztJQXNkdkMsQ0FBQztJQW5kQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDdEUsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFFdkIsSUFBSyxNQUFjLENBQUMsc0JBQXNCLEVBQUU7WUFDM0MsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUNsQzthQUFNO1lBQ04sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDeEMsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO29CQUNyQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNOLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEM7Z0JBQ0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUVELElBQUk7UUFDSCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBRW5ELElBQUssTUFBYyxDQUFDLHNCQUFzQixFQUFFO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM3QixLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7U0FDSDtRQUVELDRCQUE0QjtRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxTQUFTLENBQUMsOEJBQThCLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQzlDLE9BQU87YUFDUDtZQUVELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxlQUFlLEVBQUU7Z0JBQ2xDLE9BQU87YUFDUDtZQUVELElBQUksaUJBQWlCLENBQUM7WUFDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sRUFBRTtnQkFDL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtvQkFDN0IsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN2QztxQkFBTSxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM5QyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3BDO3FCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxnQkFBZ0IsRUFBRTtvQkFDN0csaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN2QzthQUNEO2lCQUFNLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ2hELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7b0JBQzdCLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDckM7cUJBQU0sSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDOUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN2QztxQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssZ0JBQWdCLEVBQUU7b0JBQzdHLGlCQUFpQixHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDdkM7YUFDRDtpQkFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssV0FBVyxFQUFFO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO29CQUM3QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3BCO3FCQUFNLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzlDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDdkM7cUJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLGdCQUFnQixFQUFFO29CQUM3RyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3ZDO2FBQ0Q7aUJBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFdBQVcsRUFBRTtnQkFDMUMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtvQkFDN0IsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUNyQztxQkFBTSxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM5QyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3ZDO3FCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxnQkFBZ0IsRUFBRTtvQkFDN0csaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN2QzthQUNEO2lCQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxnQkFBZ0IsRUFBRTtnQkFDL0MsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtvQkFDN0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNwQjtxQkFBTSxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM5QyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3ZDO3FCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxnQkFBZ0IsRUFBRTtvQkFDN0csaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN2QzthQUNEO2lCQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyx3QkFBd0IsRUFBRTtnQkFDdkQsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtvQkFDN0IsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN2QztxQkFBTSxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM5QyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3ZDO3FCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxnQkFBZ0IsRUFBRTtvQkFDN0csaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN2QzthQUNEO1lBRUQsSUFBSSxpQkFBaUIsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUMzQztRQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxXQUFXO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxZQUFZO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxXQUFXO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxXQUFXO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxXQUFXLENBQUMsRUFBQyxZQUFZLEdBQUcsS0FBSyxFQUFFLFVBQVUsR0FBRyxLQUFLLEVBQUM7UUFDckQsTUFBTSxNQUFNLEdBQUc7WUFDZCxJQUFJLENBQUMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDO1lBQ25DLElBQUksQ0FBQyxDQUFDLENBQUMsMEJBQTBCLENBQUM7WUFDbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7WUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7WUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7U0FDRCxDQUFDO1FBRXhCLE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDO1lBQzNCLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDeEMsQ0FBQztTQUNELENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hGLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBb0MsQ0FBQyxDQUFDO1FBQzlELENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRWxDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUNwRyxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxTQUFTO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QixNQUFNLE1BQU0sR0FBRztZQUNkLElBQUksQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUM7WUFDbkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7WUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7WUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7U0FDRCxDQUFDO1FBRXhCLE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDO1lBQzNCLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDM0MsQ0FBQztTQUNELENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxFQUFFLEtBQUssY0FBYyxFQUFFLENBQUMsQ0FBQztRQUMvRSxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxRQUFRO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixNQUFNLE1BQU0sR0FBRztZQUNkLElBQUksQ0FBQyxDQUFDLENBQUMsMEJBQTBCLENBQUM7WUFDbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7WUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7WUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7U0FDRCxDQUFDO1FBRXhCLE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDO1lBQzNCLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDMUMsQ0FBQztTQUNELENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxFQUFFLEtBQUssY0FBYyxFQUFFLENBQUMsQ0FBQztRQUM1RSxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxnQkFBZ0I7UUFDZixNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBQyxhQUFhLEdBQUcsS0FBSyxFQUFDLEdBQUcsRUFBRTtRQUM1QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDeEIsZUFBZSxFQUFFLEVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFDO1lBQ2hDLFlBQVksRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUM7WUFDL0Isb0JBQW9CLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBQztZQUN2QyxpQkFBaUIsRUFBRSxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDO1lBQ25DLGNBQWMsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBQztZQUM5QixXQUFXLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDO1lBQzlCLG1CQUFtQixFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUM7WUFDdEMsZ0JBQWdCLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQztZQUNqQyxhQUFhO1lBQ2IsVUFBVSxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUFtQjtRQUNsQixNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDTCxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWU7WUFDdEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0I7U0FDekIsRUFBRSxLQUFLLEVBQUU7WUFDVCxPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztTQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4sRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFaEMsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsRUFBQyxhQUFhLEdBQUcsS0FBSyxFQUFDLEdBQUcsRUFBRTtRQUMvQyxNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN4QixlQUFlLEVBQUUsRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUM7WUFDaEMsWUFBWSxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQztZQUMvQixvQkFBb0IsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFDO1lBQ3ZDLGlCQUFpQixFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUM7WUFDbEMsY0FBYyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFDO1lBQzlCLFdBQVcsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDO1lBQzVCLG1CQUFtQixFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUM7WUFDdEMsZ0JBQWdCLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQztZQUNqQyxhQUFhO1NBQ2IsQ0FBQyxDQUFDLENBQUM7UUFFSixFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ0wsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlO1lBQ3RCLElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQWtCO1NBQ3pCLEVBQUUsS0FBSyxFQUFFO1lBQ1QsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsWUFBWSxDQUFDLEVBQ1osZUFBZSxFQUNmLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixhQUFhLEdBQUcsS0FBSyxFQUNyQixVQUFVLEdBQUcsS0FBSyxFQVlsQjtRQUNBLE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDeEMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFMUMsZUFBZTtRQUNmLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsTUFBTSxvQkFDaEMsZUFBZSxJQUNsQixJQUFJLEVBQUUseUJBQXlCLEtBQzdCLFlBQVksQ0FBQyxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsTUFBTSxvQkFDN0IsWUFBWSxJQUNmLElBQUksRUFBRSx5QkFBeUIsS0FDN0IsWUFBWSxDQUFDLENBQUM7UUFFakIsZUFBZTtRQUNmLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLG9CQUNyQyxvQkFBb0IsSUFDdkIsSUFBSSxFQUFFLHlCQUF5QixLQUM3QixZQUFZLENBQUMsQ0FBQztRQUNqQixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxvQkFDbEMsaUJBQWlCLElBQ3BCLElBQUksRUFBRSx5QkFBeUIsS0FDN0IsWUFBWSxDQUFDLENBQUM7UUFFakIsY0FBYztRQUNkLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsTUFBTSxvQkFDL0IsY0FBYyxJQUNqQixJQUFJLEVBQUUseUJBQXlCLEtBQzdCLFdBQVcsQ0FBQyxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxvQkFDNUIsV0FBVyxJQUNkLElBQUksRUFBRSx5QkFBeUIsS0FDN0IsV0FBVyxDQUFDLENBQUM7UUFFaEIsY0FBYztRQUNkLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLG9CQUNwQyxtQkFBbUIsSUFDdEIsSUFBSSxFQUFFLHlCQUF5QixLQUM3QixXQUFXLENBQUMsQ0FBQztRQUNoQixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxvQkFDakMsZ0JBQWdCLElBQ25CLElBQUksRUFBRSx5QkFBeUIsS0FDN0IsV0FBVyxDQUFDLENBQUM7UUFFaEIsSUFBSSxhQUFhLEVBQUU7WUFDbEIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRTtnQkFDMUIsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUNwQixVQUFVLEVBQUUsR0FBRyxFQUFFO29CQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7YUFDRCxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN0QjtRQUNELElBQUksVUFBVSxFQUFFO1lBQ2YsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO2dCQUNqQixPQUFPLEVBQUUsQ0FBQztnQkFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7YUFDcEIsQ0FBQyxDQUFDO1NBQ0g7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxhQUFhO1FBQ1osTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMzQyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQztRQUUzQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVwQyxjQUFjO1FBQ2QsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sb0JBQ3BDLGFBQWEsSUFDaEIsSUFBSSxFQUFFLHlCQUF5QixLQUM3QixXQUFXLENBQUMsQ0FBQztRQUNoQixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxvQkFDakMsYUFBYSxJQUNoQixJQUFJLEVBQUUseUJBQXlCLEtBQzdCLFdBQVcsQ0FBQyxDQUFDO1FBRWhCLGNBQWM7UUFDZCxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLE1BQU0sb0JBQy9CLGFBQWEsSUFDaEIsSUFBSSxFQUFFLHlCQUF5QixLQUM3QixXQUFXLENBQUMsQ0FBQztRQUNoQixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sb0JBQzVCLGFBQWEsSUFDaEIsSUFBSSxFQUFFLHlCQUF5QixLQUM3QixXQUFXLENBQUMsQ0FBQztRQUVoQixlQUFlO1FBQ2YsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixFQUFFLE1BQU0sb0JBQ3JDLGFBQWEsSUFDaEIsSUFBSSxFQUFFLHlCQUF5QixLQUM3QixZQUFZLENBQUMsQ0FBQztRQUNqQixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxvQkFDbEMsYUFBYSxJQUNoQixJQUFJLEVBQUUseUJBQXlCLEtBQzdCLFlBQVksQ0FBQyxDQUFDO1FBRWpCLGVBQWU7UUFDZixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLE1BQU0sb0JBQ2hDLGFBQWEsSUFDaEIsSUFBSSxFQUFFLHlCQUF5QixLQUM3QixZQUFZLENBQUMsQ0FBQztRQUNqQixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLE1BQU0sb0JBQzdCLGFBQWEsSUFDaEIsSUFBSSxFQUFFLHlCQUF5QixLQUM3QixZQUFZLENBQUMsQ0FBQztRQUVqQixPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxXQUFXO1FBQ1YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3RCLE9BQU8sT0FBTyxFQUFFLENBQUM7YUFDakI7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtnQkFDekMsT0FBTyxFQUFFLENBQUM7WUFDWCxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGtCQUFrQixDQUFDLFNBQTJCO1FBQzdDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxTQUFTLENBQUMsVUFBVSxJQUFJLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFO2dCQUNoRSxPQUFPLE9BQU8sRUFBRSxDQUFDO2FBQ2pCO1lBRUQsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtnQkFDakQsT0FBTyxFQUFFLENBQUM7WUFDWCxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFHLFVBQThCO1FBQzNDLElBQUssTUFBYyxDQUFDLHNCQUFzQixFQUFFO1lBQzNDLE9BQU87U0FDUDtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUMvQixVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzlCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsVUFBVSxDQUFDLEdBQUcsVUFBOEI7UUFDM0MsSUFBSyxNQUFjLENBQUMsc0JBQXNCLEVBQUU7WUFDM0MsT0FBTztTQUNQO1FBRUQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM5QixTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDN0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFHLFVBQThCO1FBQzNDLElBQUssTUFBYyxDQUFDLHNCQUFzQixFQUFFO1lBQzNDLE9BQU87U0FDUDtRQUVELFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDOUIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xCLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLHFCQUFxQixDQUFDLEdBQUcsRUFBRTtnQkFDMUIsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2dCQUNqQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRCxDQUFBO0FBeGRvQixhQUFhO0lBRGpDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztHQUNYLGFBQWEsQ0F3ZGpDO2VBeGRvQixhQUFhIn0=