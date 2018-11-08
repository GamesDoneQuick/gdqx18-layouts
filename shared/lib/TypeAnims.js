import { TimelineLite } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import { SplitText } from "./vendor/SplitText.js"; // Reference GSAP plugins to prevent them from being tree-shaken out of the build.

window._gsapPlugins = [SplitText]; // A simple placeholder empty object used to create empty padding tweens.

const EMPTY_OBJ = {}; // Used to remember what splits and split types have previously been used on elements.

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

export function typeAnim(element, {
  splitType = 'chars,words',
  typeInterval = 0.03
} = {}) {
  const tl = new TimelineLite();
  const split = new SplitText(element, {
    type: splitType,
    charsClass: 'character',
    linesClass: 'line'
  });
  memoryMap.set(element, {
    split
  });

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
      split.words.forEach(word => {
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
    split.words.forEach(word => {
      tl.staggerTo(word.children, 0.001, {
        visibility: 'hidden'
      }, typeInterval);
      tl.to(EMPTY_OBJ, typeInterval, EMPTY_OBJ);
    });
  } else {
    tl.staggerFrom(split.chars, 0.001, {
      visibility: 'hidden'
    }, typeInterval);
  }

  return tl;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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