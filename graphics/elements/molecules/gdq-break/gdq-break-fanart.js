import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Linear, Sine, Power2 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import InterruptMixin from "../../../mixins/InterruptMixin.js";
import { typeAnim } from "../../../../shared/lib/TypeAnims.js";
import * as DrawSVGPlugin from "../../../../shared/lib/vendor/DrawSVGPlugin.js";
window._gsapPlugins = [DrawSVGPlugin]; // prevent tree shaking

const {
  customElement,
  property
} = Polymer.decorators;
const SVG = window.svgjs || window.SVG;
/**
 * @customElement
 * @polymer
 */

let GdqBreakFanart = class GdqBreakFanart extends InterruptMixin(Polymer.Element) {
  /**
   * @customElement
   * @polymer
   */
  constructor() {
    super(...arguments);
    this.backgroundOpacity = 0.25;
  }

  ready() {
    super.ready();
    this.$.tweet.companionElement = null;

    this._initBackgroundSVG();
  }

  connectedCallback() {
    super.connectedCallback();
    Polymer.RenderStatus.beforeNextRender(this, () => {
      this._addReset();
    });
  }
  /**
   * Adds a reset to the master timeline.
   */


  _addReset() {
    const tl = this.timeline;
    tl.set(this._bgRect.node, {
      drawSVG: '0%',
      'fill-opacity': 0
    });
    tl.set(this.$.label, {
      scaleX: 0,
      color: 'transparent',
      clipPath: ''
    });
    tl.call(this.$.tweet._addReset, undefined, this.$.tweet);
  }
  /**
   * Creates an entrance animation timeline.
   * @param tweet - The tweet to enter.
   * @returns A GSAP animation timeline.
   */


  _createEntranceAnim(tweet) {
    const tl = new TimelineLite();
    const $image = this.$.image;
    const media = tweet.gdqMedia;

    if (!media) {
      return tl;
    }

    let didStartingWork = false; // GSAP likes to run .calls again when you .resume

    tl.call(() => {
      if (didStartingWork) {
        return;
      }

      didStartingWork = true;
      tl.pause();
      $image.$svg.image.load(media[0].media_url_https).loaded(() => {
        tl.resume();
      }).error(error => {
        nodecg.log.error(error);
        tl.clear();
        tl.resume();
      });
    }, undefined, null, '+=0.03');
    tl.addLabel('start', '+=0.03');
    tl.to(this._bgRect.node, 0.75, {
      drawSVG: '100%',
      ease: Linear.easeNone
    }, 'start');
    tl.add($image.enter(), 'start');
    tl.add(this.$.tweet._createEntranceAnim(tweet), 'start+=0.1');
    tl.to(this.$.label, 0.334, {
      scaleX: 1,
      ease: Sine.easeInOut,
      onComplete: () => {
        this.$.label.style.color = '';
        typeAnim(this.$.label);
      }
    }, 'start+=0.4');
    tl.to(this._bgRect.node, 0.5, {
      'fill-opacity': this.backgroundOpacity,
      ease: Sine.easeOut
    }, 'start+=1');

    if (media.length > 1) {
      media.slice(1).forEach(mediaEntity => {
        tl.add(this._createHold());
        tl.add(this._changeImage(mediaEntity.media_url_https));
      });
    }

    return tl;
  }
  /**
   * Creates an animation for changing the currently displayed tweet.
   * This is only used when hot-swapping tweets
   * (i.e., changing tweets while the graphic is already showing).
   * @param tweet - The new tweet to show.
   * @returns A GSAP animation timeline.
   */


  _createChangeAnim(tweet) {
    const tl = new TimelineLite();

    if (!tweet.gdqMedia) {
      return tl;
    }

    let exitedPreviousItem = false; // GSAP likes to run .calls again when you .resume

    tl.call(() => {
      if (exitedPreviousItem) {
        return;
      }

      tl.pause();
      const exitTextTl = new TimelineLite();
      exitTextTl.add(this.$.tweet._createChangeAnim(tweet), 0);
      exitTextTl.call(() => {
        exitedPreviousItem = true;
        tl.resume();
      });
    }, undefined, null, '+=0.03');
    tl.add(this._changeImage(tweet.gdqMedia[0].media_url_https), '+=0.03');

    if (tweet.gdqMedia.length > 1) {
      tweet.gdqMedia.slice(1).forEach(mediaEntity => {
        tl.add(this._createHold());
        tl.add(this._changeImage(mediaEntity.media_url_https));
      });
    }

    return tl;
  }
  /**
   * Changes just the image, without changing the tweet body.
   * Used in tweets which have more than one image (they can have up to four).
   * @param newSrc - The url of the new image to show.
   * @returns A GSAP animation timeline.
   */


  _changeImage(newSrc) {
    const tl = new TimelineLite();
    const $image = this.$.image;
    tl.add($image.exit({
      onComplete: () => {
        tl.pause();
        $image.$svg.image.load(newSrc).loaded(() => {
          tl.resume();
        }).error(error => {
          nodecg.log.error(error);
          tl.resume();
        });
      }
    }));
    tl.add($image.enter(), '+=0.05');
    return tl;
  }
  /**
   * Creates an exit animation timeline.
   * @returns A GSAP animation timeline.
   */


  _createExitAnim() {
    const tl = new TimelineLite();
    tl.add('exit');
    tl.to(this._bgRect.node, 0.5, {
      'fill-opacity': 0,
      ease: Sine.easeOut
    }, 'exit');
    tl.to(this._bgRect.node, 1.5, {
      drawSVG: '0%',
      ease: Power2.easeIn
    }, 'exit');
    tl.fromTo(this.$.label, 0.334, {
      clipPath: 'inset(0 0% 0 0)'
    }, {
      clipPath: 'inset(0 100% 0 0)',
      ease: Sine.easeInOut
    }, 'exit+=0.9');
    tl.add(this.$.tweet._createExitAnim(), 'exit');
    tl.add(this.$.image.exit(), 'exit+=0.1');
    return tl;
  }

  _initBackgroundSVG() {
    const STROKE_SIZE = 1;
    const ELEMENT_WIDTH = this.$.background.clientWidth;
    const ELEMENT_HEIGHT = this.$.background.clientHeight;
    const svgDoc = SVG(this.$.background);
    const bgRect = svgDoc.rect();
    this._bgRect = bgRect;
    svgDoc.size(ELEMENT_WIDTH, ELEMENT_HEIGHT); // Intentionally flip the width and height.
    // This is part of how we get the drawSVG anim to go in the direction we want.

    bgRect.size(ELEMENT_HEIGHT, ELEMENT_WIDTH);
    bgRect.stroke({
      color: 'white',
      // Makes it effectively STROKE_SIZE, because all SVG strokes
      // are center strokes, and the outer half is cut off.
      width: STROKE_SIZE * 2
    });
    bgRect.fill({
      color: 'black',
      opacity: this.backgroundOpacity
    }); // Rotate and translate such that drawSVG anims start from the bottom right
    // and move counter-clockwise to draw, clockwise to un-draw.

    bgRect.style({
      transform: `rotate(90deg) scaleX(-1) translateX(${-ELEMENT_HEIGHT}px) translateY(${-ELEMENT_WIDTH}px)`
    });
  }

};

tslib_1.__decorate([property({
  type: Number
})], GdqBreakFanart.prototype, "backgroundOpacity", void 0);

GdqBreakFanart = tslib_1.__decorate([customElement('gdq-break-fanart')], GdqBreakFanart);
export default GdqBreakFanart;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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