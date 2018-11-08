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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tYmluYXJ5LWNsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBSzs7QUFDcEMsUUFBTSxRQUFRLEdBQUcsQ0FBakI7QUFDQSxRQUFNO0FBQUMsSUFBQSxhQUFEO0FBQWdCLElBQUE7QUFBaEIsTUFBNEIsT0FBTyxDQUFDLFVBQTFDO0FBRUE7Ozs7O0FBS0EsTUFBTSxlQUFlLEdBQUEsaUJBQUEsR0FBckIsTUFBTSxlQUFOLFNBQThCLE9BQU8sQ0FBQyxPQUF0QyxDQUE2QztBQUw3Qzs7OztBQUlBLElBQUEsV0FBQSxHQUFBOztBQWVDLFdBQUEsU0FBQSxHQUFZLEtBQVo7QUFHQSxXQUFBLFVBQUEsR0FBYSxLQUFiO0FBa0dBOztBQXhGQSxJQUFBLEtBQUssR0FBQTtBQUNKLFlBQU0sS0FBTjtBQUNBLFlBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsS0FBSyxVQUFMLENBQWlCLGdCQUFqQixDQUFrQyxPQUFsQyxDQUFYLENBQWQ7QUFFQSxPQUNDLFVBREQsRUFFQyxZQUZELEVBR0MsWUFIRCxFQUlDLFlBSkQsRUFLQyxZQUxELEVBTUMsdUJBTkQsRUFPRSxPQVBGLENBT1UsQ0FBQyxVQUFELEVBQWEsS0FBYixLQUFzQjtBQUMvQixjQUFNLE1BQU0sR0FBRyxLQUFLLEdBQUcsUUFBdkI7QUFDQyxhQUFhLEtBQUssVUFBVSxPQUE1QixJQUF1QyxLQUFLLENBQUMsS0FBTixDQUFZLE1BQVosRUFBb0IsTUFBTSxHQUFHLFFBQTdCLENBQXZDO0FBQ0QsT0FWRDtBQVdBOztBQUVELElBQUEsbUJBQW1CLEdBQUE7QUFDbEIsVUFBSyxNQUFjLENBQUMsc0JBQXBCLEVBQTRDO0FBQzNDO0FBQ0E7O0FBRUQsVUFBSSxLQUFLLHVCQUFULEVBQWtDO0FBQ2pDLGVBQU8sS0FBSyx1QkFBWjtBQUNBOztBQUVELFdBQUssdUJBQUwsR0FBK0IsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsTUFBSztBQUN0RCxhQUFLLGVBQUw7QUFDQSxPQUY4QixFQUU1QixHQUY0QixDQUEvQjtBQUdBLGFBQU8sS0FBSyx1QkFBWjtBQUNBOztBQUVELElBQUEsa0JBQWtCLEdBQUE7QUFDakIsWUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxLQUFLLFVBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLGNBQWxDLENBQVgsQ0FBZDtBQUNBLE1BQUEsS0FBSyxDQUFDLE9BQU4sQ0FBYyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLENBQXNCLGFBQXRCLENBQXRCO0FBQ0EsTUFBQSxhQUFhLENBQUMsS0FBSyx1QkFBTixDQUFiO0FBQ0EsV0FBSyx1QkFBTCxHQUErQixTQUEvQjtBQUNBOztBQUVELElBQUEsZUFBZSxHQUFBO0FBQ2QsWUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxLQUFLLFVBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLHlCQUFsQyxDQUFYLENBQXZCOztBQUNBLFVBQUksY0FBYyxDQUFDLE1BQWYsS0FBMEIsQ0FBOUIsRUFBaUM7QUFDaEM7QUFDQTs7QUFFRCxZQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBUCxDQUFZLE1BQU0sQ0FBQyxPQUFQLENBQWUsYUFBM0IsRUFBMEMsY0FBMUMsQ0FBYjtBQUNBLE1BQUEsSUFBSSxDQUFDLFNBQUwsQ0FBZSxHQUFmLENBQW1CLGFBQW5CO0FBQ0EsTUFBQSxVQUFVLENBQUMsTUFBSztBQUNmLFFBQUEsSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLENBQXNCLGFBQXRCLEVBQXFDLFVBQXJDO0FBQ0EsT0FGUyxFQUVQLEdBRk8sQ0FBVjtBQUdBOztBQUVELElBQUEsWUFBWSxHQUFBO0FBQ1gsV0FBSyxVQUFMLENBQWdCLFdBQVcsQ0FBQyxLQUFLLEtBQU4sRUFBYSxDQUFiLENBQTNCLEVBQTRDLEtBQUssZUFBakQ7QUFDQTs7QUFFRCxJQUFBLGNBQWMsR0FBQTtBQUNiLFdBQUssVUFBTCxDQUFnQixXQUFXLENBQUMsS0FBSyxPQUFOLEVBQWUsRUFBZixDQUEzQixFQUErQyxLQUFLLGlCQUFwRDs7QUFDQSxXQUFLLFVBQUwsQ0FBZ0IsV0FBVyxDQUFDLEtBQUssT0FBTixFQUFlLENBQWYsQ0FBM0IsRUFBOEMsS0FBSyxpQkFBbkQ7QUFDQTs7QUFFRCxJQUFBLGNBQWMsR0FBQTtBQUNiLFdBQUssVUFBTCxDQUFnQixXQUFXLENBQUMsS0FBSyxPQUFOLEVBQWUsRUFBZixDQUEzQixFQUErQyxLQUFLLGlCQUFwRDs7QUFDQSxXQUFLLFVBQUwsQ0FBZ0IsV0FBVyxDQUFDLEtBQUssT0FBTixFQUFlLENBQWYsQ0FBM0IsRUFBOEMsS0FBSyxpQkFBbkQ7QUFDQTs7QUFFRCxJQUFBLG1CQUFtQixHQUFBO0FBQ2xCLFdBQUssVUFBTCxDQUFnQixXQUFXLENBQUMsS0FBSyxZQUFOLEVBQW9CLEdBQXBCLENBQTNCLEVBQXFELEtBQUssNEJBQTFEO0FBQ0E7O0FBRUQsSUFBQSxrQkFBa0IsQ0FBQyxNQUFELEVBQWdCO0FBQ2pDLFVBQUksTUFBSixFQUFZO0FBQ1gsYUFBSyxtQkFBTDtBQUNBLE9BRkQsTUFFTztBQUNOLGFBQUssa0JBQUw7QUFDQTtBQUNEOztBQUVELElBQUEsVUFBVSxDQUFDLEdBQUQsRUFBYyxLQUFkLEVBQStDO0FBQ3hELE1BQUEsR0FBRyxDQUNELFFBREYsQ0FDVyxDQURYLEVBRUUsUUFGRixDQUVXLFFBRlgsRUFFcUIsR0FGckIsRUFHRSxLQUhGLENBR1EsRUFIUixFQUlFLE9BSkYsQ0FJVSxDQUFDLFNBQUQsRUFBWSxLQUFaLEtBQXFCO0FBQzdCLGNBQU0sRUFBRSxHQUFHLFNBQVMsS0FBSyxHQUF6QjtBQUNBLFFBQUEsS0FBSyxDQUFDLEtBQUQsQ0FBTCxDQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsVUFBOUIsRUFBMEMsRUFBMUM7QUFDQSxPQVBGO0FBUUE7O0FBbEgyQyxHQUE3Qzs7QUFFQyxFQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFLE1BQVA7QUFBZSxJQUFBLFFBQVEsRUFBRSxpQkFBZSxDQUFDLFNBQWhCLENBQTBCO0FBQW5ELEdBQUQsQ0FDVCxDQUFBLEUseUJBQUEsRSxPQUFBLEUsS0FBYyxDQUFkLENBQUE7O0FBR0EsRUFBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRSxNQUFQO0FBQWUsSUFBQSxRQUFRLEVBQUUsaUJBQWUsQ0FBQyxTQUFoQixDQUEwQjtBQUFuRCxHQUFELENBQ1QsQ0FBQSxFLHlCQUFBLEUsU0FBQSxFLEtBQWdCLENBQWhCLENBQUE7O0FBR0EsRUFBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRSxNQUFQO0FBQWUsSUFBQSxRQUFRLEVBQUUsaUJBQWUsQ0FBQyxTQUFoQixDQUEwQjtBQUFuRCxHQUFELENBQ1QsQ0FBQSxFLHlCQUFBLEUsU0FBQSxFLEtBQWdCLENBQWhCLENBQUE7O0FBR0EsRUFBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRSxNQUFQO0FBQWUsSUFBQSxRQUFRLEVBQUUsaUJBQWUsQ0FBQyxTQUFoQixDQUEwQjtBQUFuRCxHQUFELENBQ1QsQ0FBQSxFLHlCQUFBLEUsY0FBQSxFLEtBQXFCLENBQXJCLENBQUE7O0FBR0EsRUFBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRSxPQUFQO0FBQWdCLElBQUEsa0JBQWtCLEVBQUU7QUFBcEMsR0FBRCxDQUNULENBQUEsRSx5QkFBQSxFLFdBQUEsRSxLQUFrQixDQUFsQixDQUFBOztBQUdBLEVBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUUsT0FBUDtBQUFnQixJQUFBLGtCQUFrQixFQUFFLElBQXBDO0FBQTBDLElBQUEsUUFBUSxFQUFFLGlCQUFlLENBQUMsU0FBaEIsQ0FBMEI7QUFBOUUsR0FBRCxDQUNULENBQUEsRSx5QkFBQSxFLFlBQUEsRSxLQUFtQixDQUFuQixDQUFBOztBQWpCSyxFQUFBLGVBQWUsR0FBQSxpQkFBQSxHQUFBLFVBQUEsQ0FBQSxDQURwQixhQUFhLENBQUMsa0JBQUQsQ0FDTyxDQUFBLEVBQWYsZUFBZSxDQUFmLENBVDhCLENBOEhwQzs7QUFDQyxFQUFBLE1BQWMsQ0FBQyxlQUFmLEdBQWlDLGVBQWpDOztBQUVELFdBQVMsV0FBVCxDQUFxQixHQUFyQixFQUFrQyxLQUFsQyxFQUErQztBQUM5QyxRQUFJLE9BQU8sS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM5QixZQUFNLElBQUksS0FBSixDQUFVLDhDQUFWLENBQU47QUFDQTs7QUFFRCxRQUFJLEtBQUssS0FBSyxDQUFkLEVBQWlCO0FBQ2hCLGFBQU8sR0FBRyxHQUFHLEVBQWI7QUFDQTs7QUFFRCxXQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBRyxHQUFHLEtBQWpCLENBQVA7QUFDQTtBQUNELENBNUlEIiwic291cmNlUm9vdCI6IiJ9