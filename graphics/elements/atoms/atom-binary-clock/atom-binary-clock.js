"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

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

  __decorate([property({
    type: Number,
    observer: AtomBinaryClock_1.prototype._updateHours
  })], AtomBinaryClock.prototype, "hours", void 0);

  __decorate([property({
    type: Number,
    observer: AtomBinaryClock_1.prototype._updateMinutes
  })], AtomBinaryClock.prototype, "minutes", void 0);

  __decorate([property({
    type: Number,
    observer: AtomBinaryClock_1.prototype._updateSeconds
  })], AtomBinaryClock.prototype, "seconds", void 0);

  __decorate([property({
    type: Number,
    observer: AtomBinaryClock_1.prototype._updateSeconds
  })], AtomBinaryClock.prototype, "milliseconds", void 0);

  __decorate([property({
    type: Boolean,
    reflectToAttribute: true
  })], AtomBinaryClock.prototype, "pulsating", void 0);

  __decorate([property({
    type: Boolean,
    reflectToAttribute: true,
    observer: AtomBinaryClock_1.prototype._randomizedChanged
  })], AtomBinaryClock.prototype, "randomized", void 0);

  AtomBinaryClock = AtomBinaryClock_1 = __decorate([customElement('atom-arrow-block')], AtomBinaryClock); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

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