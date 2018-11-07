import { TimelineLite } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import { SplitText } from "./vendor/SplitText.js"; // Reference GSAP plugins to prevent them from being tree-shaken out of the build.

window._gsapPlugins = [SplitText]; // A simple placeholder empty object used to create empty padding tweens.

var EMPTY_OBJ = {}; // Used to remember what splits and split types have previously been used on elements.

var memoryMap = new WeakMap();
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

export function typeAnim(element, _a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.splitType,
      splitType = _c === void 0 ? 'chars,words' : _c,
      _d = _b.typeInterval,
      typeInterval = _d === void 0 ? 0.03 : _d;

  var tl = new TimelineLite();
  var split = new SplitText(element, {
    type: splitType,
    charsClass: 'character',
    linesClass: 'line'
  });
  memoryMap.set(element, {
    split: split
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
      split.words.forEach(function (word) {
        tl.staggerFromTo(word.children, 0.001, {
          visibility: 'hidden'
        }, {
          visibility: 'visible'
        }, typeInterval);
        tl.to(EMPTY_OBJ, typeInterval, EMPTY_OBJ);
      });
      break;

    default:
      throw new Error("Unexpected splitType \"" + splitType + "\"");
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

export function untypeAnim(element, typeInterval) {
  if (typeInterval === void 0) {
    typeInterval = 0.03;
  }

  var tl = new TimelineLite();

  if (!memoryMap.has(element)) {
    return tl;
  }

  var split = memoryMap.get(element).split;

  if (split.words) {
    split.words.forEach(function (word) {
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