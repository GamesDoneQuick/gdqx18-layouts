import * as tslib_1 from "tslib";
import { Power1, TimelineMax, TweenLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const NAME_FADE_IN_EASE = Power1.easeOut;
const NAME_FADE_OUT_EASE = Power1.easeIn;
let AtomNameplate = class AtomNameplate extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.noLeftCap = false;
        this.noRightCap = false;
        this.name = '';
        this.twitch = '';
        /**
         * How long, in seconds, to fade names in/out.
         *
         * For example, a value of 0.33 means that the fade out will take 0.33
         * seconds, and then the subsequent fade in will take another 0.33 seconds.
         */
        this.nameFadeDuration = 0.33;
        this._nameTL = new TimelineMax({ repeat: -1, paused: true });
    }
    ready() {
        super.ready();
        // Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880
        this.shadowRoot.querySelectorAll('sc-fitted-text').forEach((node) => {
            node.$.fittedContent.style.webkitBackgroundClip = 'text';
        });
        // Create looping anim for main nameplate.
        this._nameTL.to(this.$.names, this.nameFadeDuration, {
            onStart: () => {
                this.$.namesTwitch.classList.remove('hidden');
                this.$.namesName.classList.add('hidden');
            },
            opacity: 1,
            ease: NAME_FADE_IN_EASE
        });
        this._nameTL.to(this.$.names, this.nameFadeDuration, {
            opacity: 0,
            ease: NAME_FADE_OUT_EASE
        }, '+=10');
        this._nameTL.to(this.$.names, this.nameFadeDuration, {
            onStart: () => {
                this.$.namesTwitch.classList.add('hidden');
                this.$.namesName.classList.remove('hidden');
            },
            opacity: 1,
            ease: NAME_FADE_IN_EASE
        });
        this._nameTL.to(this.$.names, this.nameFadeDuration, {
            opacity: 0,
            ease: NAME_FADE_OUT_EASE
        }, '+=80');
    }
    updateName({ alias = '?', twitchAlias = '?', rotate = true } = {}) {
        const doTheDangThing = () => {
            this.name = alias;
            this.twitch = twitchAlias;
            this.$.namesName.classList.add('hidden');
            this.$.namesTwitch.classList.remove('hidden');
            if (!this.twitch) {
                this._nameTL.pause();
                this.$.namesName.classList.remove('hidden');
                this.$.namesTwitch.classList.add('hidden');
                TweenLite.to(this.$.names, this.nameFadeDuration, { opacity: 1, ease: NAME_FADE_IN_EASE });
            }
            else if (rotate) {
                this._nameTL.restart();
            }
            else {
                this._nameTL.pause();
                TweenLite.to(this.$.names, this.nameFadeDuration, { opacity: 1, ease: NAME_FADE_IN_EASE });
            }
            Polymer.RenderStatus.afterNextRender(this, this.fitName);
        };
        if (window.__SCREENSHOT_TESTING__) {
            doTheDangThing();
            return;
        }
        TweenLite.to(this.$.names, this.nameFadeDuration, {
            opacity: 0,
            ease: NAME_FADE_OUT_EASE,
            callbackScope: this,
            onComplete: doTheDangThing
        });
    }
    fitName() {
        Polymer.flush();
        const MAX_NAME_WIDTH = this.$.names.clientWidth - 32;
        const MAX_TWITCH_WIDTH = MAX_NAME_WIDTH - 20;
        const twitchText = this.$.namesTwitch.querySelector('sc-fitted-text');
        this.$.namesName.maxWidth = MAX_NAME_WIDTH;
        twitchText.maxWidth = MAX_TWITCH_WIDTH;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomNameplate.prototype, "noLeftCap", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomNameplate.prototype, "noRightCap", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomNameplate.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomNameplate.prototype, "twitch", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomNameplate.prototype, "nameFadeDuration", void 0);
tslib_1.__decorate([
    property({ type: Object })
], AtomNameplate.prototype, "_nameTL", void 0);
AtomNameplate = tslib_1.__decorate([
    customElement('atom-nameplate')
], AtomNameplate);
export default AtomNameplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1uYW1lcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLW5hbWVwbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXBELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDekMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBR3pDLElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBRDFEOztRQUdDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFHM0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUc1QixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBR2xCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFFcEI7Ozs7O1dBS0c7UUFFSCxxQkFBZ0IsR0FBVyxJQUFJLENBQUM7UUFHZixZQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFpRnhFLENBQUM7SUEvRUEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLCtFQUErRTtRQUMvRSxJQUFJLENBQUMsVUFBVyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBcUIsRUFBRSxFQUFFO1lBQ3BGLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBZ0MsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxDQUFDO1FBQzlFLENBQUMsQ0FBQyxDQUFDO1FBRUgsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxD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