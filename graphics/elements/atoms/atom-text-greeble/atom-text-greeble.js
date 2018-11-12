import * as tslib_1 from "tslib";
var AtomTextGreeble_1;
import Random from '../../../../shared/lib/vendor/random';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtomTextGreeble = AtomTextGreeble_1 = class AtomTextGreeble extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        /**
         * The number of characters this greeble should be in length.
         */
        this.length = 15;
        /**
         * How many times per second to update the text.
         */
        this.tickRate = 5;
        /**
         * The set of characters from which to create the random strings.
         */
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    update() {
        let str = '';
        for (let i = 0; i < this.length; i++) { // tslint:disable-line:prefer-for-of
            str += Random.pick(Random.engines.browserCrypto, this._charactersArray);
        }
        if (window.__SCREENSHOT_TESTING__) {
            str = new Array(this.length).fill('0').join('');
        }
        this.text = str;
    }
    _tickRateChanged(newVal) {
        if (this._tickInterval) {
            clearInterval(this._tickInterval);
        }
        this._tickInterval = window.setInterval(() => {
            this.update();
        }, 1000 / newVal);
    }
    _computeCharactersArray(characters) {
        return characters.split('');
    }
};
tslib_1.__decorate([
    property({ type: Number })
], AtomTextGreeble.prototype, "length", void 0);
tslib_1.__decorate([
    property({ type: Number, observer: AtomTextGreeble_1.prototype._tickRateChanged })
], AtomTextGreeble.prototype, "tickRate", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomTextGreeble.prototype, "characters", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomTextGreeble.prototype, "text", void 0);
tslib_1.__decorate([
    property({ type: Array, computed: '_computeCharactersArray(characters)' })
], AtomTextGreeble.prototype, "_charactersArray", void 0);
AtomTextGreeble = AtomTextGreeble_1 = tslib_1.__decorate([
    customElement('atom-text-greeble')
], AtomTextGreeble);
export default AtomTextGreeble;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS10ZXh0LWdyZWVibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLXRleHQtZ3JlZWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBRTFELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7O0dBR0c7QUFFSCxJQUFxQixlQUFlLHVCQUFwQyxNQUFxQixlQUFnQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTDVEOzs7T0FHRztJQUNIOztRQUVDOztXQUVHO1FBRUgsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUVwQjs7V0FFRztRQUVILGFBQVEsR0FBVyxDQUFDLENBQUM7UUFFckI7O1dBRUc7UUFFSCxlQUFVLEdBQVcsc0NBQXNDLENBQUM7SUF1QzdELENBQUM7SUExQkEsTUFBTTtRQUNMLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsb0NBQW9DO1lBQzNFLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsSUFBSyxNQUFjLENBQUMsc0JBQXNCLEVBQUU7WUFDM0MsR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztJQUVELGdCQUFnQixDQUFDLE1BQWM7UUFDOUIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbEM7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQzVDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLENBQUMsRUFBRSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELHVCQUF1QixDQUFDLFVBQWtCO1FBQ3pDLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0QsQ0FBQTtBQW5EQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzsrQ0FDTDtBQU1wQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGlCQUFlLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFDLENBQUM7aURBQzFEO0FBTXJCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO21EQUNtQztBQU01RDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs2Q0FDWjtBQUdiO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUscUNBQXFDLEVBQUMsQ0FBQzt5REFDOUM7QUExQlAsZUFBZTtJQURuQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7R0FDZCxlQUFlLENBd0RuQztlQXhEb0IsZUFBZSJ9