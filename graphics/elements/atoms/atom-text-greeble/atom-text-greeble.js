import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
var AtomTextGreeble_1;
import Random from "../../../../shared/lib/vendor/random.js";
const {
  customElement,
  property
} = Polymer.decorators;
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

    for (let i = 0; i < this.length; i++) {
      // tslint:disable-line:prefer-for-of
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

tslib_1.__decorate([property({
  type: Number
})], AtomTextGreeble.prototype, "length", void 0);

tslib_1.__decorate([property({
  type: Number,
  observer: AtomTextGreeble_1.prototype._tickRateChanged
})], AtomTextGreeble.prototype, "tickRate", void 0);

tslib_1.__decorate([property({
  type: String
})], AtomTextGreeble.prototype, "characters", void 0);

tslib_1.__decorate([property({
  type: String
})], AtomTextGreeble.prototype, "text", void 0);

tslib_1.__decorate([property({
  type: Array,
  computed: '_computeCharactersArray(characters)'
})], AtomTextGreeble.prototype, "_charactersArray", void 0);

AtomTextGreeble = AtomTextGreeble_1 = tslib_1.__decorate([customElement('atom-text-greeble')], AtomTextGreeble);
export default AtomTextGreeble;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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