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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1uYW1lcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLW5hbWVwbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXBELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDekMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBR3pDLElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBRDFEOztRQUdDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFHM0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUc1QixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBR2xCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFFcEI7Ozs7O1dBS0c7UUFFSCxxQkFBZ0IsR0FBVyxJQUFJLENBQUM7UUFHZixZQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFrRnhFLENBQUM7SUFoRkEsaUJBQWlCO1FBQ2hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNoRCwrRUFBK0U7WUFDL0UsSUFBSSxDQUFDLFVBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQXFCLEVBQUUsRUFBRTtnQkFDcEYsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFnQyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUM7WUFDOUUsQ0FBQyxDQUFDLENBQUM7WUFFSCwwQ0FBMEM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFO29CQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLGlCQUFpQjthQUN2QixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3BELE9BQU8sRUFBRSxDQUFDO2dCQUNWLElBQUksRUFBRSxrQkFBa0I7YUFDeEIsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDcEQsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQkFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO2dCQUNELE9BQU8sRUFBRSxDQUFDO2dCQUNWLElBQUksRUFBRSxpQkFBaUI7YUFDdkIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNwRCxPQUFPLEVBQUUsQ0FBQztnQkFDVixJQUFJLEVBQUUsa0JBQWtCO2FBQ3hCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsRUFBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLFdBQVcsR0FBRyxFQUFFLEVBQUUsTUFBTSxHQUFHLElBQUksRUFBQyxHQUFHLEVBQUU7UUFDN0QsTUFBTSxjQUFjLEdBQUcsR0FBRyxFQUFFO1lBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1lBRTFCLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU5QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDM0MsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUM7YUFDekY7aUJBQU0sSUFBSSxNQUFNLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkI7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUM7YUFDekY7WUFFRCxPQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQztRQUVGLElBQUssTUFBYyxDQUFDLHNCQUFzQixFQUFFO1lBQzNDLGNBQWMsRUFBRSxDQUFDO1lBQ2pCLE9BQU87U0FDUDtRQUVELFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ2pELE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixhQUFhLEVBQUUsSUFBSTtZQUNuQixVQUFVLEVBQUUsY0FBYztTQUMxQixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTztRQUNOLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoQixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JELE1BQU0sZ0JBQWdCLEdBQUcsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUM3QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQWlCLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUNuRCxVQUFrQixDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztJQUNqRCxDQUFDO0NBQ0QsQ0FBQTtBQXZHQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0RBQ3pCO0FBRzNCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQztpREFDeEI7QUFHNUI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7MkNBQ1A7QUFHbEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7NkNBQ0w7QUFTcEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7dURBQ087QUFHaEM7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7OENBQzhDO0FBdkJuRCxhQUFhO0lBRGpDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztHQUNYLGFBQWEsQ0F5R2pDO2VBekdvQixhQUFhIn0=