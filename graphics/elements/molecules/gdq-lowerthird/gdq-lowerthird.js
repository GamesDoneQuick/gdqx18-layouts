import * as tslib_1 from "tslib";
import { TimelineLite, Power4, Power3, TweenLite } from 'gsap';
import Random from '../../../../shared/lib/vendor/random';
const { customElement, property } = Polymer.decorators;
const NAME_ELEMENT_ENTRANCE_STAGGER = 0.15;
const interviewNames = nodecg.Replicant('interview:names');
const lowerthirdShowing = nodecg.Replicant('interview:lowerthirdShowing');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let GdqLowerthird = class GdqLowerthird extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     */
    constructor() {
        super(...arguments);
        this.preview = false;
        this.tl = new TimelineLite({ autoRemoveChildren: true });
    }
    ready() {
        super.ready();
        this._$nameElements = Array.from(this.shadowRoot.querySelectorAll('#mainNames gdq-lowerthird-nameplate, #hostName'));
        this.reset();
        if (!this.preview && !window.__SCREENSHOT_TESTING__) {
            lowerthirdShowing.on('change', newVal => {
                if (newVal) {
                    this.tl.add(this.show());
                }
                else {
                    this.tl.add(this.hide());
                }
            });
        }
    }
    updatePreview(names) {
        this.show(names).progress(1);
    }
    show(prefilledNames) {
        const tl = new TimelineLite();
        const names = prefilledNames ?
            prefilledNames :
            interviewNames.value && interviewNames.value.filter(({ name }) => {
                return Boolean(name) && name.trim().length > 0;
            });
        if (!names || names.length <= 0) {
            return tl;
        }
        const nameElementsToShow = this._$nameElements.slice(0, names.length);
        const randomizedNameElements = Random.shuffle(Random.engines.browserCrypto, nameElementsToShow.slice(0).concat([this.$.header]));
        this.reset();
        tl.call(() => {
            this.numNames = names.length;
        });
        // Set names
        tl.call(() => {
            this._$nameElements.forEach((nameElement, index) => {
                nameElement.hidden = !names[index] || !names[index].name;
                if (!nameElement.hidden) {
                    nameElement.name = names[index].name;
                    nameElement.title = names[index].title;
                }
            });
        }, undefined, null, '+=0.3'); // Give time for interviewNames replicant to update.
        tl.to(this.$.background, 0.75, {
            y: '0%',
            ease: Power4.easeOut
        });
        tl.addLabel('nameElementsEnter', '+=0');
        tl.call(() => {
            // tl.timeScale(0.2);
        }, undefined, null, 'nameElementsEnter');
        randomizedNameElements.forEach((nameElem, index) => {
            tl.add(nameElem.enter(), `nameElementsEnter+=${NAME_ELEMENT_ENTRANCE_STAGGER * index}`);
        });
        return tl;
    }
    hide() {
        const tl = new TimelineLite();
        tl.to(this, 0.5, {
            y: '100%',
            ease: Power3.easeIn
        });
        return tl;
    }
    reset() {
        this.$.header.reset();
        this._$nameElements.forEach(nameElem => nameElem.reset());
        TweenLite.set(this.$.background, { y: '100%' });
        TweenLite.set(this, { y: '0%', opacity: 1 });
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GdqLowerthird.prototype, "preview", void 0);
tslib_1.__decorate([
    property({ type: Number, reflectToAttribute: true })
], GdqLowerthird.prototype, "numNames", void 0);
GdqLowerthird = tslib_1.__decorate([
    customElement('gdq-lowerthird')
], GdqLowerthird);
export default GdqLowerthird;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWxvd2VydGhpcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtbG93ZXJ0aGlyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU3RCxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUcxRCxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSw2QkFBNkIsR0FBRyxJQUFJLENBQUM7QUFDM0MsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBbUIsaUJBQWlCLENBQUMsQ0FBQztBQUM3RSxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsNkJBQTZCLENBQUMsQ0FBQztBQUVuRjs7OztHQUlHO0FBRUgsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFjLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBTi9FOzs7O09BSUc7SUFDSDs7UUFHQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBS2hCLE9BQUUsR0FBRyxJQUFJLFlBQVksQ0FBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUEwRjVELENBQUM7SUF2RkEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVyxDQUFDLGdCQUFnQixDQUFDLGdEQUFnRCxDQUFDLENBQUMsQ0FBQztRQUN0SCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFFLE1BQWMsQ0FBQyxzQkFBc0IsRUFBRTtZQUM3RCxpQkFBaUIsQ0FBQyxFQUFF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