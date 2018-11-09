import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import Random from "../../../../shared/lib/vendor/random.js";
window.addEventListener('load', () => {
  var AtomTextGreeble_1;
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

  AtomTextGreeble = AtomTextGreeble_1 = tslib_1.__decorate([customElement('atom-text-greeble')], AtomTextGreeble); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtomTextGreeble = AtomTextGreeble;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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