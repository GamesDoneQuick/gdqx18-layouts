import { TimelineLite } from 'gsap';
import { SplitText } from './vendor/SplitText';
// Reference GSAP plugins to prevent them from being tree-shaken out of the build.
window._gsapPlugins = [SplitText];
// A simple placeholder empty object used to create empty padding tweens.
const EMPTY_OBJ = {};
// Used to remember what splits and split types have previously been used on elements.
const memoryMap = new WeakMap();
/**
 * Creates an animation for a "type-in" effect on an HTML element.
 * Uses GSAP's SplitText library.
 *
 * @param element - The element to play this animation on.
 * @param options - Optional options.
 * @param options.splitType - Controls whether to split the
 * text into chars, chars and words, or chars, words, and lines.
 * @param options.typeInterval - The amount of time, in seconds,
 * between each individual character being shown.
 * @returns A GSAP TimelineLite instance.
 */
export function typeAnim(element, { splitType = 'chars,words', typeInterval = 0.03 } = {}) {
    const tl = new TimelineLite();
    const split = new SplitText(element, {
        type: splitType,
        charsClass: 'character',
        linesClass: 'line'
    });
    memoryMap.set(element, { split });
    switch (splitType) {
        case 'chars':
            tl.staggerFromTo(split.chars, 0.001, {
                visibility: 'hidden'
            }, {
                visibility: 'visible'
            }, typeInterval);
            break;
        case 'chars,words':
        case 'chars,words,lines':
            split.words.forEach((word) => {
                tl.staggerFromTo(word.children, 0.001, {
                    visibility: 'hidden'
                }, {
                    visibility: 'visible'
                }, typeInterval);
                tl.to(EMPTY_OBJ, typeInterval, EMPTY_OBJ);
            });
            break;
        default:
            throw new Error(`Unexpected splitType "${splitType}"`);
    }
    return tl;
}
/**
 * Creates an animation for a "type-out" or "un-type" effect on an HTML element.
 * The element must have previously used the "typeAnim" method to define its "split" property.
 * Uses GSAP's SplitText library.
 *
 * @param element - The element to play this animation on.
 * @param typeInterval - The amount of time, in seconds, between each individual character being shown.
 * @returns A GSAP TimelineLite instance.
 */
export function untypeAnim(element, typeInterval = 0.03) {
    const tl = new TimelineLite();
    if (!memoryMap.has(element)) {
        return tl;
    }
    const split = memoryMap.get(element).split;
    if (split.words) {
        split.words.forEach((word) => {
            tl.staggerTo(word.children, 0.001, {
                visibility: 'hidden'
            }, typeInterval);
            tl.to(EMPTY_OBJ, typeInterval, EMPTY_OBJ);
        });
    }
    else {
        tl.staggerFrom(split.chars, 0.001, {
            visibility: 'hidden'
        }, typeInterval);
    }
    return tl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZUFuaW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVHlwZUFuaW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRTdDLGtGQUFrRjtBQUNqRixNQUFjLENBQUMsWUFBWSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFM0MseUVBQXlFO0FBQ3pFLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUVyQixzRkFBc0Y7QUFDdEYsTUFBTSxTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQU9oQzs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSxRQUFRLENBQ3ZCLE9BQW9CLEVBQ3BCLEVBQUMsU0FBUyxHQUFHLGFBQWEsRUFBRSxZQUFZLEdBQUcsSUFBSSxLQUE4QixFQUFFO0lBRS9FLE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO1FBQ3BDLElBQUksRUFBRSxTQUFTO1FBQ2YsVUFBVSxFQUFFLFdBQVc7UUFDdkIsVUFBVSxFQUFFLE1BQU07S0FDbEIsQ0FBQyxDQUFDO0lBRUgsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBRWhDLFFBQVEsU0FBUyxFQUFFO1FBQ2xCLEtBQUssT0FBTztZQUNYLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7Z0JBQ3BDLFVBQVUsRUFBRSxRQUFRO2FBQ3BCLEVBQUU7Z0JBQ0YsVUFBVSxFQUFFLFNBQVM7YUFDckIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUVqQixNQUFNO1FBQ1AsS0FBSyxhQUFhLENBQUM7UUFDbkIsS0FBSyxtQkFBbUI7WUFDdkIsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDakMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRTtvQkFDdEMsVUFBVSxFQUFFLFFBQVE7aUJBQ3BCLEVBQUU7b0JBQ0YsVUFBVSxFQUFFLFNBQVM7aUJBQ3JCLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBRWpCLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU07UUFDUDtZQUNDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLFNBQVMsR0FBRyxDQUFDLENBQUM7S0FDeEQ7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNYLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUMsT0FBb0IsRUFBRSxZQUFZLEdBQUcsSUFBSTtJQUNuRSxNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzVCLE9BQU8sRUFBRSxDQUFDO0tBQ1Y7SUFFRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUUzQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7UUFDaEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUNqQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO2dCQUNsQyxVQUFVLEVBQUUsUUFBUTthQUNwQixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRWpCLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztLQUNIO1NBQU07UUFDTixFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ2xDLFVBQVUsRUFBRSxRQUFRO1NBQ3BCLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDakI7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNYLENBQUMifQ==