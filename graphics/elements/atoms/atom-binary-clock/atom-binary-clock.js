"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

window.addEventListener('load', function () {
  var NUM_BITS = 4;
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  /**
   * @customElement
   * @polymer
   */

  var AtomBinaryClock =
  /** @class */
  function (_super) {
    __extends(AtomBinaryClock, _super);

    function AtomBinaryClock() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.pulsating = false;
      _this.randomized = false;
      return _this;
    }

    AtomBinaryClock_1 = AtomBinaryClock;

    AtomBinaryClock.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      var cells = Array.from(this.shadowRoot.querySelectorAll('.cell'));
      ['hourOnes', 'minuteTens', 'minuteOnes', 'secondTens', 'secondOnes', 'millisecondHundredths'].forEach(function (columnName, index) {
        var offset = index * NUM_BITS;
        _this["_$" + columnName + "Cells"] = cells.slice(offset, offset + NUM_BITS);
      });
    };

    AtomBinaryClock.prototype.startRandomFlashing = function () {
      var _this = this;

      if (window.__SCREENSHOT_TESTING__) {
        return;
      }

      if (this._randomFlashingInterval) {
        return this._randomFlashingInterval;
      }

      this._randomFlashingInterval = window.setInterval(function () {
        _this.flashRandomCell();
      }, 100);
      return this._randomFlashingInterval;
    };

    AtomBinaryClock.prototype.stopRandomFlashing = function () {
      var cells = Array.from(this.shadowRoot.querySelectorAll('.cell--flash'));
      cells.forEach(function (cell) {
        return cell.classList.remove('cell--flash');
      });
      clearInterval(this._randomFlashingInterval);
      this._randomFlashingInterval = undefined;
    };

    AtomBinaryClock.prototype.flashRandomCell = function () {
      var availableCells = Array.from(this.shadowRoot.querySelectorAll('.cell:not(.cell--flash)'));

      if (availableCells.length === 0) {
        return;
      }

      var cell = Random.pick(Random.engines.browserCrypto, availableCells);
      cell.classList.add('cell--flash');
      setTimeout(function () {
        cell.classList.remove('cell--flash', 'cell--on');
      }, 450);
    };

    AtomBinaryClock.prototype._updateHours = function () {
      this._setColumn(numberPlace(this.hours, 1), this._$hourOnesCells);
    };

    AtomBinaryClock.prototype._updateMinutes = function () {
      this._setColumn(numberPlace(this.minutes, 10), this._$minuteTensCells);

      this._setColumn(numberPlace(this.minutes, 1), this._$minuteOnesCells);
    };

    AtomBinaryClock.prototype._updateSeconds = function () {
      this._setColumn(numberPlace(this.seconds, 10), this._$secondTensCells);

      this._setColumn(numberPlace(this.seconds, 1), this._$secondOnesCells);
    };

    AtomBinaryClock.prototype._updateMilliseconds = function () {
      this._setColumn(numberPlace(this.milliseconds, 100), this._$millisecondHundredthsCells);
    };

    AtomBinaryClock.prototype._randomizedChanged = function (newVal) {
      if (newVal) {
        this.startRandomFlashing();
      } else {
        this.stopRandomFlashing();
      }
    };

    AtomBinaryClock.prototype._setColumn = function (num, cells) {
      num.toString(2).padStart(NUM_BITS, '0').split('').forEach(function (oneOrZero, index) {
        var on = oneOrZero === '1';
        cells[index].classList.toggle('cell--on', on);
      });
    };

    var AtomBinaryClock_1;

    __decorate([property({
      type: Number,
      observer: AtomBinaryClock_1.prototype._updateHours
    })], AtomBinaryClock.prototype, "hours");

    __decorate([property({
      type: Number,
      observer: AtomBinaryClock_1.prototype._updateMinutes
    })], AtomBinaryClock.prototype, "minutes");

    __decorate([property({
      type: Number,
      observer: AtomBinaryClock_1.prototype._updateSeconds
    })], AtomBinaryClock.prototype, "seconds");

    __decorate([property({
      type: Number,
      observer: AtomBinaryClock_1.prototype._updateSeconds
    })], AtomBinaryClock.prototype, "milliseconds");

    __decorate([property({
      type: Boolean,
      reflectToAttribute: true
    })], AtomBinaryClock.prototype, "pulsating");

    __decorate([property({
      type: Boolean,
      reflectToAttribute: true,
      observer: AtomBinaryClock_1.prototype._randomizedChanged
    })], AtomBinaryClock.prototype, "randomized");

    AtomBinaryClock = AtomBinaryClock_1 = __decorate([customElement('atom-arrow-block')], AtomBinaryClock);
    return AtomBinaryClock;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


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