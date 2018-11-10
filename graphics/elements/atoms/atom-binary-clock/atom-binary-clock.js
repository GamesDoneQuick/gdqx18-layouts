import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
var AtomBinaryClock_1;
import Random from "../../../../shared/lib/vendor/random.js";
const NUM_BITS = 4;
const {
  customElement,
  property
} = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */

let AtomBinaryClock = AtomBinaryClock_1 = class AtomBinaryClock extends Polymer.Element {
  /**
   * @customElement
   * @polymer
   */
  constructor() {
    super(...arguments);
    this.pulsating = false;
    this.randomized = false;
  }

  ready() {
    super.ready();
    const cells = Array.from(this.shadowRoot.querySelectorAll('.cell'));
    ['hourOnes', 'minuteTens', 'minuteOnes', 'secondTens', 'secondOnes', 'millisecondHundredths'].forEach((columnName, index) => {
      const offset = index * NUM_BITS;
      this[`_$${columnName}Cells`] = cells.slice(offset, offset + NUM_BITS);
    });
  }

  startRandomFlashing() {
    if (window.__SCREENSHOT_TESTING__) {
      return;
    }

    if (this._randomFlashingInterval) {
      return this._randomFlashingInterval;
    }

    this._randomFlashingInterval = window.setInterval(() => {
      this.flashRandomCell();
    }, 100);
    return this._randomFlashingInterval;
  }

  stopRandomFlashing() {
    const cells = Array.from(this.shadowRoot.querySelectorAll('.cell--flash'));
    cells.forEach(cell => cell.classList.remove('cell--flash'));
    clearInterval(this._randomFlashingInterval);
    this._randomFlashingInterval = undefined;
  }

  flashRandomCell() {
    const availableCells = Array.from(this.shadowRoot.querySelectorAll('.cell:not(.cell--flash)'));

    if (availableCells.length === 0) {
      return;
    }

    const cell = Random.pick(Random.engines.browserCrypto, availableCells);
    cell.classList.add('cell--flash');
    setTimeout(() => {
      cell.classList.remove('cell--flash', 'cell--on');
    }, 450);
  }

  _updateHours() {
    this._setColumn(numberPlace(this.hours, 1), this._$hourOnesCells);
  }

  _updateMinutes() {
    this._setColumn(numberPlace(this.minutes, 10), this._$minuteTensCells);

    this._setColumn(numberPlace(this.minutes, 1), this._$minuteOnesCells);
  }

  _updateSeconds() {
    this._setColumn(numberPlace(this.seconds, 10), this._$secondTensCells);

    this._setColumn(numberPlace(this.seconds, 1), this._$secondOnesCells);
  }

  _updateMilliseconds() {
    this._setColumn(numberPlace(this.milliseconds, 100), this._$millisecondHundredthsCells);
  }

  _randomizedChanged(newVal) {
    if (newVal) {
      this.startRandomFlashing();
    } else {
      this.stopRandomFlashing();
    }
  }

  _setColumn(num, cells) {
    num.toString(2).padStart(NUM_BITS, '0').split('').forEach((oneOrZero, index) => {
      const on = oneOrZero === '1';
      cells[index].classList.toggle('cell--on', on);
    });
  }

};

tslib_1.__decorate([property({
  type: Number,
  observer: AtomBinaryClock_1.prototype._updateHours
})], AtomBinaryClock.prototype, "hours", void 0);

tslib_1.__decorate([property({
  type: Number,
  observer: AtomBinaryClock_1.prototype._updateMinutes
})], AtomBinaryClock.prototype, "minutes", void 0);

tslib_1.__decorate([property({
  type: Number,
  observer: AtomBinaryClock_1.prototype._updateSeconds
})], AtomBinaryClock.prototype, "seconds", void 0);

tslib_1.__decorate([property({
  type: Number,
  observer: AtomBinaryClock_1.prototype._updateSeconds
})], AtomBinaryClock.prototype, "milliseconds", void 0);

tslib_1.__decorate([property({
  type: Boolean,
  reflectToAttribute: true
})], AtomBinaryClock.prototype, "pulsating", void 0);

tslib_1.__decorate([property({
  type: Boolean,
  reflectToAttribute: true,
  observer: AtomBinaryClock_1.prototype._randomizedChanged
})], AtomBinaryClock.prototype, "randomized", void 0);

AtomBinaryClock = AtomBinaryClock_1 = tslib_1.__decorate([customElement('atom-arrow-block')], AtomBinaryClock);
export default AtomBinaryClock;

function numberPlace(num, place) {
  if (typeof place !== 'number') {
    throw new Error('must provide a place and it must be a number');
  }

  if (place === 1) {
    return num % 10;
  }

  return Math.floor(num / place);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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