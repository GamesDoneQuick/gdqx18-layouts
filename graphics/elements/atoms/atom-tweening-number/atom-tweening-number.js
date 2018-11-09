import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TweenLite, Power2 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
window.addEventListener('load', () => {
  var AtomTweeningNumber_1;
  const {
    customElement,
    property
  } = Polymer.decorators; // By default, displayValueTransform converts displayValue to a display with no fraction.

  const defaultDisplayValueTransform = displayValue => {
    return displayValue.toLocaleString('en-US', {
      maximumFractionDigits: 0
    });
  };
  /**
   * @customElement
   * @polymer
   */


  let AtomTweeningNumber = AtomTweeningNumber_1 = class AtomTweeningNumber extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
      super(...arguments);
      /**
       * An optional function which takes in the currently displaying value
       * and transforms it in some way. By default, it converts _displayValue
       * to USD with no cents (whole integer dollar amounts only).
       */

      this.displayValueTransform = defaultDisplayValueTransform;
      this.intervalLength = 1;
      /**
       * How much time to add to the duration of the tween for
       * each "interval" in the value. (Default interval length is 1).
       */

      this.timePerValueInterval = 0.03;
      /**
       * The maximum duration, in seconds, that a single value tween can be.
       */

      this.maxDuration = 3;
      /**
       * The ease to use when tweening between the old value and the new value.
       */

      this.ease = Power2.easeOut;
      /**
       * If true, doesn't tween the first time value is set.
       */

      this.skipInitial = true;
      /**
       * The value displaying right now, this is what actually gets tweened.
       */

      this._displayValue = 0;
      /**
       * Whether or not we have done the first-time setup of the value, which simply sets
       * it with no tween.
       */

      this._initialized = false;
      this._tween = null;
    }
    /**
     * Computes how long the tween will be for a given value delta.
     * @param deltaValue - The delta to compute a tween duration for.
     * @returns - The computed tween duration, in seconds.
     */


    calcTweenDuration(deltaValue) {
      const deltaIntervals = deltaValue / this.intervalLength;
      return Math.min(deltaIntervals * this.timePerValueInterval, this.maxDuration);
    }

    _valueChanged(newValue) {
      if (this.skipInitial && !this._initialized) {
        this._initialized = true;
        this._displayValue = newValue;
        return;
      }

      const deltaValue = newValue - this._displayValue;
      const duration = this.calcTweenDuration(deltaValue);
      this.tween(newValue, duration);
    }

    tween(newValue, duration) {
      if (this._tween) {
        this._tween.kill();

        this._tween = null;
      }

      this._tween = TweenLite.to(this, duration, {
        _displayValue: newValue,
        ease: this.ease
      });
      return this._tween;
    }

  };

  tslib_1.__decorate([property({
    type: Number,
    observer: AtomTweeningNumber_1.prototype._valueChanged
  })], AtomTweeningNumber.prototype, "value", void 0);

  tslib_1.__decorate([property({
    type: Object
  })], AtomTweeningNumber.prototype, "displayValueTransform", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], AtomTweeningNumber.prototype, "intervalLength", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], AtomTweeningNumber.prototype, "timePerValueInterval", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], AtomTweeningNumber.prototype, "maxDuration", void 0);

  tslib_1.__decorate([property({
    type: Object
  })], AtomTweeningNumber.prototype, "ease", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], AtomTweeningNumber.prototype, "skipInitial", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], AtomTweeningNumber.prototype, "_displayValue", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], AtomTweeningNumber.prototype, "_initialized", void 0);

  AtomTweeningNumber = AtomTweeningNumber_1 = tslib_1.__decorate([customElement('atom-tweening-number')], AtomTweeningNumber); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtomTweeningNumber = AtomTweeningNumber;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tdHdlZW5pbmctbnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFRLFNBQVIsRUFBeUIsTUFBekIsUUFBc0Msb0RBQXRDO0FBZ0JBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxNQUFLOztBQUNwQyxRQUFNO0FBQUMsSUFBQSxhQUFEO0FBQWdCLElBQUE7QUFBaEIsTUFBNEIsT0FBTyxDQUFDLFVBQTFDLENBRG9DLENBR3BDOztBQUNBLFFBQU0sNEJBQTRCLEdBQUksWUFBRCxJQUF5QjtBQUM3RCxXQUFPLFlBQVksQ0FBQyxjQUFiLENBQTRCLE9BQTVCLEVBQXFDO0FBQzNDLE1BQUEscUJBQXFCLEVBQUU7QUFEb0IsS0FBckMsQ0FBUDtBQUdBLEdBSkQ7QUFNQTs7Ozs7O0FBS0EsTUFBTSxrQkFBa0IsR0FBQSxvQkFBQSxHQUF4QixNQUFNLGtCQUFOLFNBQWlDLE9BQU8sQ0FBQyxPQUF6QyxDQUFnRDtBQUxoRDs7OztBQUlBLElBQUEsV0FBQSxHQUFBOztBQVFDOzs7Ozs7QUFNQSxXQUFBLHFCQUFBLEdBQStDLDRCQUEvQztBQUdBLFdBQUEsY0FBQSxHQUF5QixDQUF6QjtBQUVBOzs7OztBQUtBLFdBQUEsb0JBQUEsR0FBK0IsSUFBL0I7QUFFQTs7OztBQUlBLFdBQUEsV0FBQSxHQUFzQixDQUF0QjtBQUVBOzs7O0FBSUEsV0FBQSxJQUFBLEdBQWEsTUFBTSxDQUFDLE9BQXBCO0FBRUE7Ozs7QUFJQSxXQUFBLFdBQUEsR0FBdUIsSUFBdkI7QUFFQTs7OztBQUlBLFdBQUEsYUFBQSxHQUF3QixDQUF4QjtBQUVBOzs7OztBQUtBLFdBQUEsWUFBQSxHQUF3QixLQUF4QjtBQUVBLFdBQUEsTUFBQSxHQUEyQixJQUEzQjtBQXFDQTtBQW5DQTs7Ozs7OztBQUtBLElBQUEsaUJBQWlCLENBQUMsVUFBRCxFQUFtQjtBQUNuQyxZQUFNLGNBQWMsR0FBRyxVQUFVLEdBQUcsS0FBSyxjQUF6QztBQUNBLGFBQU8sSUFB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