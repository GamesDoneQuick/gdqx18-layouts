/* tslint:disable:jsdoc-format */
import Random from "./vendor/random.js";
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