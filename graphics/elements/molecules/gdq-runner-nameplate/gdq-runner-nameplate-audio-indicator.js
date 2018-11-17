import * as tslib_1 from "tslib";
import { TweenLite, Power3 } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQNameplateAudioIndicatorElement = class GDQNameplateAudioIndicatorElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.vertPos = 'top';
        this.horisPos = 'left';
        this.animationDuration = 0.25;
        this._maskProxy = [-10, -10, 0];
    }
    ready() {
        super.ready();
        this.$.body.style.webkitMaskImage = `linear-gradient(
			to right,
			rgba(0,0,0,1) ${this._maskProxy[0]}%,
			rgba(0,0,0,1) ${this._maskProxy[1]}%,
			rgba(0,0,0,0) ${this._maskProxy[2]}%
		)`;
    }
    show() {
        return this._animateMask(100, 100, 110);
    }
    hide() {
        return this._animateMask(-10, -10, 0);
    }
    _animateMask(stopOne, stopTwo, stopThree) {
        return TweenLite.to(this._maskProxy, this.animationDuration, {
            0: stopOne,
            1: stopTwo,
            2: stopThree,
            ease: Power3.easeOut,
            callbackScope: this,
            onUpdate() {
                this.$.body.style.webkitMaskImage = `linear-gradient(
					to right,
					rgba(0,0,0,1) ${this._maskProxy[0]}%,
					rgba(0,0,0,1) ${this._maskProxy[1]}%,
					rgba(0,0,0,0) ${this._maskProxy[2]}%
				)`;
            }
        });
    }
    _showingChanged(newVal) {
        if (newVal) {
            return this.show();
        }
        return this.hide();
    }
};
tslib_1.__decorate([
    property({ type: Boolean, observer: '_showingChanged' })
], GDQNameplateAudioIndicatorElement.prototype, "showing", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], GDQNameplateAudioIndicatorElement.prototype, "vertPos", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], GDQNameplateAudioIndicatorElement.prototype, "horisPos", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQNameplateAudioIndicatorElement.prototype, "animationDuration", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQNameplateAudioIndicatorElement.prototype, "_maskProxy", void 0);
GDQNameplateAudioIndicatorElement = tslib_1.__decorate([
    customElement('gdq-runner-nameplate-audio-indicator')
], GDQNameplateAudioIndicatorElement);
export default GDQNameplateAudioIndicatorElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bm5lci1uYW1lcGxhdGUtYXVkaW8taW5kaWNhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXJ1bm5lci1uYW1lcGxhdGUtYXVkaW8taW5kaWNhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUV2QyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsaUNBQWlDLEdBQXRELE1BQXFCLGlDQUFrQyxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTDlFOzs7T0FHRztJQUNIOztRQU1DLFlBQU8sR0FBVyxLQUFLLENBQUM7UUFHeEIsYUFBUSxHQUFXLE1BQU0sQ0FBQztRQUcxQixzQkFBaUIsR0FBVyxJQUFJLENBQUM7UUFHekIsZUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUE2Q3BDLENBQUM7SUEzQ0EsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBWSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUc7O21CQUU1QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzttQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7bUJBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSTtRQUNILE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxJQUFJO1FBQ0gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxZQUFZLENBQUMsT0FBZSxFQUFFLE9BQWUsRUFBRSxTQUFpQjtRQUMvRCxPQUFPLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDNUQsQ0FBQyxFQUFFLE9BQU87WUFDVixDQUFDLEVBQUUsT0FBTztZQUNWLENBQUMsRUFBRSxTQUFTO1lBQ1osSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3BCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFFBQVE7Z0JBQ1AsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRzs7cUJBRW5CLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3FCQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztxQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7TUFDakMsQ0FBQztZQUNKLENBQUM7U0FDRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZSxDQUFDLE1BQWU7UUFDOUIsSUFBSSxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNuQjtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7Q0FDRCxDQUFBO0FBekRBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQztrRUFDdEM7QUFHakI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDO2tFQUMzQjtBQUd4QjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7bUVBQ3pCO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzRFQUNRO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO3FFQUNXO0FBZGYsaUNBQWlDO0lBRHJELGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQztHQUNqQyxpQ0FBaUMsQ0EyRHJEO2VBM0RvQixpQ0FBaUMifQ==