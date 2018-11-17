import * as tslib_1 from "tslib";
import { Power1, TimelineMax, TweenLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const NAME_FADE_IN_EASE = Power1.easeOut;
const NAME_FADE_OUT_EASE = Power1.easeIn;
let AtomNameplateElement = class AtomNameplateElement extends Polymer.Element {
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
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
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
        });
    }
    updateName({ alias = '?', twitchAlias = '', rotate = true } = {}) {
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
], AtomNameplateElement.prototype, "noLeftCap", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomNameplateElement.prototype, "noRightCap", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomNameplateElement.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomNameplateElement.prototype, "twitch", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomNameplateElement.prototype, "nameFadeDuration", void 0);
tslib_1.__decorate([
    property({ type: Object })
], AtomNameplateElement.prototype, "_nameTL", void 0);
AtomNameplateElement = tslib_1.__decorate([
    customElement('atom-nameplate')
], AtomNameplateElement);
export default AtomNameplateElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1uYW1lcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLW5hbWVwbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXBELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDekMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBR3pDLElBQXFCLG9CQUFvQixHQUF6QyxNQUFxQixvQkFBcUIsU0FBUSxPQUFPLENBQUMsT0FBTztJQURqRTs7UUFHQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBRzNCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFHNUIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUdsQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBRXBCOzs7OztXQUtHO1FBRUgscUJBQWdCLEdBQVcsSUFBSSxDQUFDO1FBR2YsWUFBTyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBa0Z4RSxDQUFDO0lBaEZBLGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDaEQsK0VBQStFO1lBQy9FLElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFxQixFQUFFLEVBQUU7Z0JBQ3BGLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBZ0MsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxD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