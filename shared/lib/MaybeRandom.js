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

export function getMaybeRandomNumber({
  probability,
  normalValue,
  minValue = 0,
  maxValue = 1
}) {
  if (probability > 0) {
    const randomNumber = Random.real(0, 1, true)(Random.engines.browserCrypto);

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

export function createMaybeRandomTween({
  target,
  propName,
  duration,
  ease = Linear.easeNone,
  delay = 0,
  start,
  end,
  onUpdate
}) {
  const proxy = Object.assign({}, start);
  const tweenProps = Object.assign({
    ease,
    delay
  }, end);

  if (Array.isArray(target)) {
    tweenProps.onUpdate = () => {
      const randomValue = getMaybeRandomNumber(proxy);
      target.forEach(childTarget => {
        childTarget[propName] = randomValue;
      });

      if (onUpdate) {
        onUpdate(randomValue);
      }
    };
  } else {
    tweenProps.onUpdate = () => {
      const randomValue = getMaybeRandomNumber(proxy);
      target[propName] = randomValue;

      if (onUpdate) {
        onUpdate(randomValue);
      }
    };
  }

  return TweenLite.to(proxy, duration, tweenProps);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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