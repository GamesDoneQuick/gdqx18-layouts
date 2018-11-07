import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
/* tslint:disable:jsdoc-format */

import * as Random from "/bundles/gdqx18-layouts/node_modules/random-js/lib/random.js";
import { TweenLite, Linear } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
/**
 * Returns a number that has a chance of being random.
 *
 * @param args - The args.
 * @returns The final calculated number.
 *
 * @example <caption>Example usage with default minValue and maxValue.</caption>
 * getMaybeRandomValue({
 *   probability: 0.5,
 *   normalValue: 1
 * });
 *
 * @example <caption>Example usage with specified minValue and maxValue.</caption>
 * getMaybeRandomValue({
 * 	probability: 0.25,
 *	normalValue: 10,
 *	minValue: 2,
 *	maxValue: 20
 * });
 */

export function getMaybeRandomNumber(_a) {
  var probability = _a.probability,
      normalValue = _a.normalValue,
      _b = _a.minValue,
      minValue = _b === void 0 ? 0 : _b,
      _c = _a.maxValue,
      maxValue = _c === void 0 ? 1 : _c;

  if (probability > 0) {
    var randomNumber = Random.real(0, 1, true)(Random.engines.browserCrypto);

    if (randomNumber <= probability) {
      return Random.real(minValue, maxValue, true)(Random.engines.browserCrypto);
    }
  }

  return normalValue;
}
/**
 * Creates a tween which uses getMaybeRandomNumber.
 *
 * @param target - The object to tween, or an array of objects.
 * @param propName - The name of the property to tween on the target object.
 * @param duration - The duration of the tween.
 * @param [ease=Linear.easeNone] - An easing function which accepts a single "progress" argument,
 * which is a float in the range 0 - 1. All GSAP eases are supported, as they follow this signature.
 * @param [delay=0] - How long, in seconds, to delay the start of the tween.
 * @param start - The starting getMaybeRandomNumber arguments.
 * @param end - The ending getMaybeRandomNumber arguments.
 * @param [onUpdate] - An optional callback which will be invoked on every tick with the new MaybeRandom value.
 * @returns A GSAP TweenLite tween.
 *
 * @example
 * createMaybeRandomTween({
 *	target: element.style,
 *	propName: 'opacity',
 *	duration: 1,
 *	ease: Sine.easeOut,
 *	start: {probability: 1, normalValue: 0},
 *	end: {probability: 0, normalValue: 1}
 * });
 */

export function createMaybeRandomTween(_a) {
  var target = _a.target,
      propName = _a.propName,
      duration = _a.duration,
      _b = _a.ease,
      ease = _b === void 0 ? Linear.easeNone : _b,
      _c = _a.delay,
      delay = _c === void 0 ? 0 : _c,
      start = _a.start,
      end = _a.end,
      onUpdate = _a.onUpdate;

  var proxy = tslib_1.__assign({}, start);

  var tweenProps = tslib_1.__assign({
    ease: ease,
    delay: delay
  }, end);

  if (Array.isArray(target)) {
    tweenProps.onUpdate = function () {
      var randomValue = getMaybeRandomNumber(proxy);
      target.forEach(function (childTarget) {
        childTarget[propName] = randomValue;
      });

      if (onUpdate) {
        onUpdate(randomValue);
      }
    };
  } else {
    tweenProps.onUpdate = function () {
      var randomValue = getMaybeRandomNumber(proxy);
      target[propName] = randomValue;

      if (onUpdate) {
        onUpdate(randomValue);
      }
    };
  }

  return TweenLite.to(proxy, duration, tweenProps);
}