import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import Random from "../../../../shared/lib/vendor/random.js";
window.addEventListener('load', () => {
  var AtomBinaryClock_1;
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

  AtomBinaryClock = AtomBinaryClock_1 = tslib_1.__decorate([customElement('atom-arrow-block')], AtomBinaryClock); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtomBinaryClock = AtomBinaryClock;

  function numberPlace(num, place) {
    if (typeof place !== 'number') {
      throw new Error('must provide a place and it must be a number');
    }

    if (place === 1) {
      return num % 10;
    }

    return Math.floor(num / place);
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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