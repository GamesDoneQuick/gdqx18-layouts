/* tslint:disable:jsdoc-format */
import Random from './vendor/random';
import { TweenLite, Linear } from 'gsap';
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
export function getMaybeRandomNumber({ probability, normalValue, minValue = 0, maxValue = 1 }) {
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
export function createMaybeRandomTween({ target, propName, duration, ease = Linear.easeNone, delay = 0, start, end, onUpdate }) {
    const proxy = Object.assign({}, start);
    const tweenProps = Object.assign({ ease,
        delay }, end);
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
    }
    else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF5YmVSYW5kb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNYXliZVJhbmRvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQ0FBaUM7QUFDakMsT0FBTyxNQUFNLE1BQU0saUJBQWlCLENBQUM7QUFDckMsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQW9CLE1BQU0sTUFBTSxDQUFDO0FBNkIxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxFQUNwQyxXQUFXLEVBQ1gsV0FBVyxFQUNYLFFBQVEsR0FBRyxDQUFDLEVBQ1osUUFBUSxHQUFHLENBQUMsRUFDYTtJQUN6QixJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUU7UUFDcEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0UsSUFBSSxZQUFZLElBQUksV0FBVyxFQUFFO1lBQ2hDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDM0U7S0FDRDtJQUVELE9BQU8sV0FBVyxDQUFDO0FBQ3BCLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsRUFDdEMsTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQ3RCLEtBQUssR0FBRyxDQUFDLEVBQ1QsS0FBSyxFQUNMLEdBQUcsRUFDSCxRQUFRLEVBQ2dCO0lBQ3hCLE1BQU0sS0FBSyxxQkFBTyxLQUFLLENBQUMsQ0FBQztJQUN6QixNQUFNLFVBQVUsR0FBRyxnQkFDbEIsSUFBSTtRQUNKLEtBQUssSUFDRixHQUFHLENBQ2tCLENBQUM7SUFFMUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzFCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQzFCLE1BQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzNCLFdBQW1CLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxRQUFRLEVBQUU7Z0JBQ2IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3RCO1FBQ0YsQ0FBQyxDQUFDO0tBQ0Y7U0FBTTtRQUNOLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQzFCLE1BQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLE1BQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLENBQUM7WUFDeEMsSUFBSSxRQUFRLEVBQUU7Z0JBQ2IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3RCO1FBQ0YsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxPQUFPLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNsRCxDQUFDIn0=