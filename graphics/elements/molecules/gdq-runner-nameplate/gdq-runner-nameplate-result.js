import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Power3, Sine } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQNameplateResultElement = class GDQNameplateResultElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this._tl = new TimelineLite({ autoRemoveChildren: true });
    }
    ready() {
        super.ready();
        TweenLite.set(this, { x: 0 });
        TweenLite.set(this.$.cover, { scaleX: 1 });
        TweenLite.set(this.$.place, { scaleX: 0 });
    }
    show() {
        const anim = new TimelineLite();
        anim.to(this, 0.5, {
            x: this.side === 'left' ? '-100%' : '100%',
            ease: Power3.easeIn
        });
        anim.to(this.$.cover, 0.5, {
            scaleX: 0,
            ease: Power3.easeOut
        });
        anim.to(this.$.place, 0.182, {
            scaleX: 1,
            ease: Sine.easeOut
        });
        return anim;
    }
    hide() {
        const anim = new TimelineLite();
        anim.to(this.$.place, 0.182, {
            scaleX: 0,
            ease: Sine.easeIn
        });
        anim.to(this.$.cover, 0.5, {
            scaleX: 1,
            ease: Power3.easeIn
        });
        anim.to(this, 0.5, {
            x: '0%',
            ease: Power3.easeOut
        });
        return anim;
    }
    _showingChanged(newVal) {
        const anim = newVal ? this.show() : this.hide();
        this._tl.add(anim);
    }
    _calcPlaceText(place, forfeit) {
        return forfeit ? 'X' : place;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, observer: '_showingChanged' })
], GDQNameplateResultElement.prototype, "showing", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "side", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQNameplateResultElement.prototype, "place", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQNameplateResultElement.prototype, "time", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "firstPlace", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "lastPlace", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "forfeit", void 0);
GDQNameplateResultElement = tslib_1.__decorate([
    customElement('gdq-runner-nameplate-result')
], GDQNameplateResultElement);
export default GDQNameplateResultElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bm5lci1uYW1lcGxhdGUtcmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXJ1bm5lci1uYW1lcGxhdGUtcmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTNELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7O0dBR0c7QUFFSCxJQUFxQix5QkFBeUIsR0FBOUMsTUFBcUIseUJBQTBCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFMdEU7OztPQUdHO0lBQ0g7O1FBdUJTLFFBQUcsR0FBRyxJQUFJLFlBQVksQ0FBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUF5RDVELENBQUM7SUF2REEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDNUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ3pDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSTtRQUNILE1BQU0sSUFBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ2xCLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxD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