import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
var AtomTweeningNumber_1;
import { TweenLite, Power2 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
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

AtomTweeningNumber = AtomTweeningNumber_1 = tslib_1.__decorate([customElement('atom-tweening-number')], AtomTweeningNumber);
export default AtomTweeningNumber;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tdHdlZW5pbmctbnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBUSxTQUFSLEVBQXlCLE1BQXpCLFFBQXNDLG9EQUF0QztBQUlBLE1BQU07QUFBQyxFQUFBLGFBQUQ7QUFBZ0IsRUFBQTtBQUFoQixJQUE0QixPQUFPLENBQUMsVUFBMUMsQyxDQUVBOztBQUNBLE1BQU0sNEJBQTRCLEdBQUksWUFBRCxJQUF5QjtBQUM3RCxTQUFPLFlBQVksQ0FBQyxjQUFiLENBQTRCLE9BQTVCLEVBQXFDO0FBQzNDLElBQUEscUJBQXFCLEVBQUU7QUFEb0IsR0FBckMsQ0FBUDtBQUdBLENBSkQ7QUFNQTs7Ozs7O0FBS0EsSUFBcUIsa0JBQWtCLEdBQUEsb0JBQUEsR0FBdkMsTUFBcUIsa0JBQXJCLFNBQWdELE9BQU8sQ0FBQyxPQUF4RCxDQUErRDtBQUwvRDs7OztBQUlBLEVBQUEsV0FBQSxHQUFBOztBQVFDOzs7Ozs7QUFNQSxTQUFBLHFCQUFBLEdBQStDLDRCQUEvQztBQUdBLFNBQUEsY0FBQSxHQUF5QixDQUF6QjtBQUVBOzs7OztBQUtBLFNBQUEsb0JBQUEsR0FBK0IsSUFBL0I7QUFFQTs7OztBQUlBLFNBQUEsV0FBQSxHQUFzQixDQUF0QjtBQUVBOzs7O0FBSUEsU0FBQSxJQUFBLEdBQWEsTUFBTSxDQUFDLE9BQXBCO0FBRUE7Ozs7QUFJQSxTQUFBLFdBQUEsR0FBdUIsSUFBdkI7QUFFQTs7OztBQUlBLFNBQUEsYUFBQSxHQUF3QixDQUF4QjtBQUVBOzs7OztBQUtBLFNBQUEsWUFBQSxHQUF3QixLQUF4QjtBQUVBLFNBQUEsTUFBQSxHQUEyQixJQUEzQjtBQXFDQTtBQW5DQTs7Ozs7OztBQUtBLEVBQUEsaUJBQWlCLENBQUMsVUFBRCxFQUFtQjtBQUNuQyxVQUFNLGNBQWMsR0FBRyxVQUFVLEdBQUcsS0FBSyxjQUF6QztBQUNBLFdBQU8sSUFBSSxDQUFDLEdBQUwsQ0FBUyxjQUFjLEdBQUcsS0FBSyxvQkFBL0IsRUFBcUQsS0FB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