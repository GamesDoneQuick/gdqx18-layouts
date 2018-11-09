import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Linear, Sine, Power2 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import InterruptMixin from "../../../mixins/InterruptMixin.js";
import { typeAnim, untypeAnim } from "../../../../shared/lib/TypeAnims.js";
import { createMaybeRandomTween } from "../../../../shared/lib/MaybeRandom.js";
import * as DrawSVGPlugin from "../../../../shared/lib/vendor/DrawSVGPlugin.js";
window._gsapPlugins = [DrawSVGPlugin]; // prevent tree shaking

window.addEventListener('load', () => {
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

  GdqTweet = tslib_1.__decorate([customElement('gdq-tweet')], GdqTweet); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqTweet = GdqTweet;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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