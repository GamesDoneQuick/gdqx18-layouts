import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
var AtomRefreshIndicator_1;
const {
  customElement,
  property
} = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */

let AtomRefreshIndicator = AtomRefreshIndicator_1 = class AtomRefreshIndicator extends Polymer.Element {
  /**
   * @customElement
   * @polymer
   */
  constructor() {
    super(...arguments);
    this.indeterminate = true;
    this.timeUntilRefresh = ':??';
  }

  startCountdown(seconds) {
    const meterFillElem = this.$['meter-fill'];
    this.indeterminate = false;
    this.stopCountdown();
    meterFillElem.style.transform = '';
    const startTimestamp = Date.now();
    this._countdownInterval = window.setInterval(() => {
      const nowTimestamp = Date.now();
      const millisecondsElapsed = nowTimestamp - startTimestamp;
      const secondsRemaining = seconds - Math.ceil(millisecondsElapsed / 1000);
      const percentElapsed = Math.min(millisecondsElapsed / (seconds * 1000), 1) * 100;
      meterFillElem.style.transform = `translateX(-${percentElapsed}%)`;
      this.timeUntilRefresh = `:${String(secondsRemaining).padStart(2, '0')}`;

      if (secondsRemaining <= 0) {
        clearInterval(this._countdownInterval);
        this.indeterminate = true;
      }
    }, 1 / 60);
  }

  stopCountdown() {
    if (this._countdownInterval) {
      clearInterval(this._countdownInterval);
    }
  }

  _indeterminateChanged(newVal) {
    if (newVal) {
      this.stopCountdown();
      this.timeUntilRefresh = ':00';
    }
  }

};

tslib_1.__decorate([property({
  type: Boolean,
  reflectToAttribute: true,
  observer: AtomRefreshIndicator_1.prototype._indeterminateChanged
})], AtomRefreshIndicator.prototype, "indeterminate", void 0);

tslib_1.__decorate([property({
  type: String
})], AtomRefreshIndicator.prototype, "timeUntilRefresh", void 0);

AtomRefreshIndicator = AtomRefreshIndicator_1 = tslib_1.__decorate([customElement('atom-refresh-indicator')], AtomRefreshIndicator);
export default AtomRefreshIndicator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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