import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Linear, Sine, Power2 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import InterruptMixin from "../../../mixins/InterruptMixin.js";
import { typeAnim, untypeAnim } from "../../../../shared/lib/TypeAnims.js";
import { createMaybeRandomTween } from "../../../../shared/lib/MaybeRandom.js";
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

let GdqTweet = class GdqTweet extends InterruptMixin(Polymer.Element) {
  /**
   * @customElement
   * @polymer
   */
  constructor() {
    super(...arguments);
    this.label = '';
    this.companionElement = document.querySelector('gdq-sponsors');
    this.bindToMessage = 'showTweet';
    this.backgroundOpacity = 0.25;
  }

  ready() {
    super.ready();

    this._initBackgroundSVG();

    this._addReset();

    Polymer.RenderStatus.beforeNextRender(this, () => {
      const layoutAppElement = document.querySelector('layout-app');

      if (!this.companionElement && layoutAppElement) {
        const sponsorsElement = layoutAppElement.shadowRoot.querySelector('gdq-sponsors');

        if (sponsorsElement) {
          this.companionElement = sponsorsElement;
        }
      }
    });
  }
  /**
   * Adds a reset to the master timeline.
   */


  _addReset() {
    const tl = this.timeline;
    tl.call(() => {
      this.$['body-actual'].innerHTML = '';
      this.$.name.innerHTML = '';
    }, undefined, null, '+=0.03');
    tl.set(this.$svg.bgRect.node, {
      drawSVG: '0%',
      'fill-opacity': 0
    });
    tl.set([this.$.label, this.$.name], {
      scaleX: 0,
      color: 'transparent',
      clipPath: ''
    });
    tl.set(this.$['body-actual'], {
      opacity: 1
    });
  }
  /**
   * Creates an entrance animation timeline.
   * @param tweet - The tweet to enter.
   * @returns A GSAP animation timeline.
   */


  _createEntranceAnim(tweet) {
    const tl = new TimelineLite();
    tl.addLabel('start', '+=0.03');
    tl.call(() => {
      this.$.name.innerText = `@${tweet.user.screen_name}`;
    }, undefined, null, 'start');
    tl.to(this.$svg.bgRect.node, 0.75, {
      drawSVG: '100%',
      ease: Linear.easeNone
    }, 'start');
    tl.to(this.$.name, 0.334, {
      scaleX: 1,
      ease: Sine.easeInOut,
      onComplete: () => {
        this.$.name.style.color = '';
        typeAnim(this.$.name);
      }
    }, 'start+=0.05');
    tl.to(this.$.label, 0.334, {
      scaleX: 1,
      ease: Sine.easeInOut,
      onComplete: () => {
        this.$.label.style.color = '';
        typeAnim(this.$.label);
      }
    }, 'start+=0.4');
    tl.to(this.$svg.bgRect.node, 0.5, {
      'fill-opacity': this.backgroundOpacity,
      ease: Sine.easeOut
    }, 'start+=1');
    tl.call(() => {
      this.$['body-actual'].innerHTML = tweet.text;
      typeAnim(this.$['body-actual'], {
        typeInterval: 0.01
      });
    });
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
    let exitedPreviousTweet = false;
    tl.call(() => {
      if (exitedPreviousTweet) {
        return;
      }

      tl.pause();
      const exitTextTl = new TimelineLite();
      exitTextTl.add(untypeAnim(this.$.name, 0.01), 0);
      exitTextTl.add(untypeAnim(this.$['body-actual'], 0.01), 0.08);
      exitTextTl.call(() => {
        exitedPreviousTweet = true;
        tl.resume();
      });
    }, undefined, null, '+=0.03');
    tl.call(() => {
      this.$.name.innerText = `@${tweet.user.screen_name}`;
      this.$['body-actual'].innerHTML = tweet.text;
      const enterTextTl = new TimelineLite();
      enterTextTl.add(typeAnim(this.$.name, {
        typeInterval: 0.01
      }), 0);
      enterTextTl.add(typeAnim(this.$['body-actual'], {
        typeInterval: 0.01
      }), 0.08);
    }, undefined, null, '+=0.03');
    return tl;
  }
  /**
   * Creates an exit animation timeline.
   * @returns A GSAP animation timeline.
   */


  _createExitAnim() {
    const tl = new TimelineLite();
    tl.add('exit');
    tl.add(createMaybeRandomTween({
      target: this.$['body-actual'].style,
      propName: 'opacity',
      duration: 0.465,
      start: {
        probability: 1,
        normalValue: 1
      },
      end: {
        probability: 0,
        normalValue: 0
      }
    }), 'exit');
    tl.to(this.$svg.bgRect.node, 0.5, {
      'fill-opacity': 0,
      ease: Sine.easeOut
    }, 'exit');
    tl.to(this.$svg.bgRect.node, 1.5, {
      drawSVG: '0%',
      ease: Power2.easeIn
    }, 'exit');
    tl.fromTo(this.$.label, 0.334, {
      clipPath: 'inset(0 0% 0 0)'
    }, {
      clipPath: 'inset(0 100% 0 0)',
      ease: Sine.easeInOut
    }, 'exit+=0.9');
    tl.fromTo(this.$.name, 0.334, {
      clipPath: 'inset(0 0 0 0%)'
    }, {
      clipPath: 'inset(0 0 0 100%)',
      ease: Sine.easeInOut
    }, 'exit+=1.3');
    return tl;
  }

  _initBackgroundSVG() {
    if (this._initialized) {
      throw new Error('this element has already been initialized');
    }

    this._initialized = true;
    const STROKE_SIZE = 1;
    this.$svg = {};
    const svgDoc = SVG(this.$.background);
    const bgRect = svgDoc.rect();
    this.$svg.svgDoc = svgDoc;
    this.$svg.bgRect = bgRect; // Intentionally flip the width and height.
    // This is part of how we get the drawSVG anim to go in the direction we want.

    bgRect.stroke({
      color: 'white',
      // Makes it effectively STROKE_SIZE, because all SVG strokes
      // are center strokes, and the outer half is cut off.
      width: STROKE_SIZE * 2
    });
    bgRect.fill({
      color: 'black',
      opacity: this.backgroundOpacity
    });
    this.resize();
  }

  resize() {
    if (!this._initialized) {
      return;
    }

    const ELEMENT_WIDTH = this.$.background.clientWidth;
    const ELEMENT_HEIGHT = this.$.background.clientHeight;
    this.$svg.svgDoc.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);
    this.$svg.bgRect.size(ELEMENT_HEIGHT, ELEMENT_WIDTH); // Rotate and translate such that drawSVG anims start from the top right
    // and move clockwise to un-draw, counter-clockwise to un-draw.

    this.$svg.bgRect.style({
      transform: `rotate(90deg) translateY(${-ELEMENT_WIDTH}px)`
    });
  }

  _falsey(value) {
    return !value;
  }

};

tslib_1.__decorate([property({
  type: String
})], GdqTweet.prototype, "label", void 0);

tslib_1.__decorate([property({
  type: Object
})], GdqTweet.prototype, "companionElement", void 0);

tslib_1.__decorate([property({
  type: String
})], GdqTweet.prototype, "bindToMessage", void 0);

tslib_1.__decorate([property({
  type: Number
})], GdqTweet.prototype, "backgroundOpacity", void 0);

GdqTweet = tslib_1.__decorate([customElement('gdq-tweet')], GdqTweet);
export default GdqTweet;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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