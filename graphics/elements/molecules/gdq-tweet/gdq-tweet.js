import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Linear, Sine, Power2 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import InterruptMixin from "../../../mixins/InterruptMixin.js";
import { typeAnim, untypeAnim } from "../../../../shared/lib/TypeAnims.js";
import { createMaybeRandomTween } from "../../../../shared/lib/MaybeRandom.js";
const SVG = window.svgjs || window.SVG;
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS10d2VldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUSxZQUFSLEVBQXNCLE1BQXRCLEVBQThCLElBQTlCLEVBQW9DLE1BQXBDLFFBQWlELG9EQUFqRDtBQUNBLE9BQU8sY0FBUCxNQUFpRSxtQ0FBakU7QUFFQSxTQUFRLFFBQVIsRUFBa0IsVUFBbEIsUUFBbUMscUNBQW5DO0FBQ0EsU0FBUSxzQkFBUixRQUFxQyx1Q0FBckM7QUFDQSxNQUFNLEdBQUcsR0FBSyxNQUFjLENBQUMsS0FBZixJQUF5QixNQUFjLENBQUMsR0FBdEQ7QUFhQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBSztBQUNwQyxRQUFNO0FBQUMsSUFBQSxhQUFEO0FBQWdCLElBQUE7QUFBaEIsTUFBNEIsT0FBTyxDQUFDLFVBQTFDO0FBRUE7Ozs7O0FBS0EsTUFBTSxRQUFRLEdBQWQsTUFBTSxRQUFOLFNBQXVCLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBVCxDQUFyQyxDQUFzRDtBQUx0RDs7OztBQUlBLElBQUEsV0FBQSxHQUFBOztBQUdDLFdBQUEsS0FBQSxHQUFnQixFQUFoQjtBQUdBLFdBQUEsZ0JBQUEsR0FBK0MsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBL0M7QUFHQSxXQUFBLGFBQUEsR0FBd0IsV0FBeEI7QUFHQSxXQUFBLGlCQUFBLEdBQTRCLElBQTVCO0FBMk5BOztBQWxOQSxJQUFBLEtBQUssR0FBQTtBQUNKLFlBQU0sS0FBTjs7QUFDQSxXQUFLLGtCQUFMOztBQUNBLFdBQUssU0FBTDs7QUFFQSxNQUFBLE9BQU8sQ0FBQyxZQUFSLENBQXFCLGdCQUFyQixDQUFzQyxJQUF0QyxFQUE0QyxNQUFLO0FBQ2hELGNBQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBekI7O0FBQ0EsWUFBSSxDQUFDLEtBQUssZ0JBQU4sSUFBMEIsZ0JBQTlCLEVBQWdEO0FBQy9DLGdCQUFNLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFqQixDQUE2QixhQUE3QixDQUEyQyxjQUEzQyxDQUF4Qjs7QUFDQSxjQUFJLGVBQUosRUFBcUI7QUFDcEIsaUJBQUssZ0JBQUwsR0FBd0IsZUFBeEI7QUFDQTtBQUNEO0FBQ0QsT0FSRDtBQVNBO0FBRUQ7Ozs7O0FBR0EsSUFBQSxTQUFTLEdBQUE7QUFDUixZQUFNLEVBQUUsR0FBRyxLQUFLLFFBQWhCO0FBQ0EsTUFBQSxFQUFFLENBQUMsSUFBSCxDQUFRLE1BQUs7QUFDWixhQUFLLENBQUwsQ0FBTyxhQUFQLEVBQXNCLFNBQXRCLEdBQWtDLEVBQWxDO0FBQ0EsYUFBSyxDQUFMLENBQU8sSUFBUCxDQUFZLFNBQVosR0FBd0IsRUFBeEI7QUFDQSxPQUhELEVBR0csU0FISCxFQUdjLElBSGQsRUFHb0IsUUFIcEI7QUFJQSxNQUFBLEVBQUUsQ0FBQyxHQUFILENBQU8sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixJQUF4QixFQUE4QjtBQUFDLFFBQUEsT0FBTyxFQUFFLElBQVY7QUFBZ0Isd0JBQWdCO0FBQWhDLE9BQTlCO0FBQ0EsTUFBQSxFQUFFLENBQUMsR0FBSCxDQUFPLENBQUMsS0FBSyxDQUFMLENBQU8sS0FBUixFQUFlLEtBQUssQ0FBTCxDQUFPLElBQXRCLENBQVAsRUFBb0M7QUFBQyxRQUFBLE1BQU0sRUFBRSxDQUFUO0FBQVksUUFBQSxLQUFLLEVBQUUsYUFBbkI7QUFBa0MsUUFBQSxRQUFRLEVBQUU7QUFBNUMsT0FBcEM7QUFDQSxNQUFBLEVBQUUsQ0FBQyxHQUFILENBQU8sS0FBSyxDQUFMLENBQU8sYUFBUCxDQUFQLEVBQThCO0FBQUMsUUFBQSxPQUFPLEVBQUU7QUFBVixPQUE5QjtBQUNBO0FBRUQ7Ozs7Ozs7QUFLQSxJQUFBLG1CQUFtQixDQUFDLEtBQUQsRUFBYTtBQUMvQixZQUFNLEVBQUUsR0FBRyxJQUFJLFlBQUosRUFBWDtBQUVBLE1BQUEsRUFBRSxDQUFDLFFBQUgsQ0FBWSxPQUFaLEVBQXFCLFFBQXJCO0FBRUEsTUFBQSxFQUFFLENBQUMsSUFBSCxDQUFRLE1BQUs7QUFDWCxhQUFLLENBQUwsQ0FBTyxJQUFQLENBQStCLFNBQS9CLEdBQTJDLElBQUksS0FBSyxDQUFDLElBQU4sQ0FBVyxXQUFXLEVBQXJFO0FBQ0QsT0FGRCxFQUVHLFNBRkgsRUFFYyxJQUZkLEVBRW9CLE9BRnBCO0FBSUEsTUFBQSxFQUFFLENBQUMsRUFBSCxDQUFNLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsSUFBdkIsRUFBNkIsSUFBN0IsRUFBbUM7QUFDbEMsUUFBQSxPQUFPLEVBQUUsTUFEeUI7QUFFbEMsUUFBQSxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBRnFCLE9BQW5DLEVBR0csT0FISDtBQUtBLE1BQUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxLQUFLLENBQUwsQ0FBTyxJQUFiLEVBQW1CLEtBQW5CLEVBQTBCO0FBQ3pCLFFBQUEsTUFBTSxFQUFFLENBRGlCO0FBRXpCLFFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUZjO0FBR3pCLFFBQUEsVUFBVSxFQUFFLE1BQUs7QUFDZixlQUFLLENBQUwsQ0FBTyxJQUFQLENBQStCLEtBQS9CLENBQXFDLEtBQXJDLEdBQTZDLEVBQTdDO0FBQ0QsVUFBQSxRQUFRLENBQUMsS0FBSyxDQUFMLENBQU8sSUFBUixDQUFSO0FBQ0E7QUFOd0IsT0FBMUIsRUFPRyxhQVBIO0FBU0EsTUFBQSxFQUFFLENBQUMsRUFBSCxDQUFNLEtBQUssQ0FBTCxDQUFPLEtBQWIsRUFBb0IsS0FBcEIsRUFBMkI7QUFDMUIsUUFBQSxNQUFNLEVBQUUsQ0FEa0I7QUFFMUIsUUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBRmU7QUFHMUIsUUFBQSxVQUFVLEVBQUUsTUFBSztBQUNmLGVBQUssQ0FBTCxDQUFPLEtBQVAsQ0FBZ0MsS0FBaEMsQ0FBc0MsS0FBdEMsR0FBOEMsRUFBOUM7QUFDRCxVQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUwsQ0FBTyxLQUFSLENBQVI7QUFDQTtBQU55QixPQUEzQixFQU9HLFlBUEg7QUFTQSxNQUFBLEVBQUUsQ0FBQyxFQUFILENBQU0sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixJQUF2QixFQUE2QixHQUE3QixFQUFrQztBQUNqQyx3QkFBZ0IsS0FBSyxpQkFEWTtBQUVqQyxRQUFBLElBQUksRUFBRSxJQUFJLENBQUM7QUFGc0IsT0FBbEMsRUFHRyxVQUhIO0FBS0EsTUFBQSxFQUFFLENBQUMsSUFBSCxDQUFRLE1BQUs7QUFDWixhQUFLLENBQUwsQ0FBTyxhQUFQLEVBQXNCLFNBQXRCLEdBQWtDLEtBQUssQ0FBQyxJQUF4QztBQUNBLFFBQUEsUUFBUSxDQUFDLEtBQUssQ0FBTCxDQUFPLGFBQVAsQ0FBRCxFQUF1QztBQUFDLFVBQUEsWUFBWSxFQUFFO0FBQWYsU0FBdkMsQ0FBUjtBQUNBLE9BSEQ7QUFLQSxhQUFPLEVBQVA7QUFDQTtBQUVEOzs7Ozs7Ozs7QUFPQSxJQUFBLGlCQUFpQixDQUFDLEtBQUQsRUFBYTtBQUM3QixZQUFNLEVBQUUsR0FBRyxJQUFJLFlBQUosRUFBWDtBQUNBLFVBQUksbUJBQW1CLEdBQUcsS0FBMUI7QUFFQSxNQUFBLEVBQUUsQ0FBQyxJQUFILENBQVEsTUFBSztBQUNaLFlBQUksbUJBQUosRUFBeUI7QUFDeEI7QUFDQTs7QUFFRCxRQUFBLEVBQUUsQ0FBQyxLQUFIO0FBQ0EsY0FBTSxVQUFVLEdBQUcsSUFBSSxZQUFKLEVBQW5CO0FBQ0EsUUFBQSxVQUFVLENBQUMsR0FBWCxDQUFlLFVBQVUsQ0FBQyxLQUFLLENBQUwsQ0FBTyxJQUFSLEVBQTZCLElBQTdCLENBQXpCLEVBQTZELENBQTdEO0FBQ0EsUUFBQSxVQUFVLENBQUMsR0FBWCxDQUFlLFVBQVUsQ0FBQyxLQUFLLENBQUwsQ0FBTyxhQUFQLENBQUQsRUFBdUMsSUFBdkMsQ0FBekIsRUFBdUUsSUFBdkU7QUFDQSxRQUFBLFVBQVUsQ0FBQyxJQUFYLENBQWdCLE1BQUs7QUFDcEIsVUFBQSxtQkFBbUIsR0FBRyxJQUF0QjtBQUNBLFVBQUEsRUFBRSxDQUFDLE1BQUg7QUFDQSxTQUhEO0FBSUEsT0FiRCxFQWFHLFNBYkgsRUFhYyxJQWJkLEVBYW9CLFFBYnBCO0FBZUEsTUFBQSxFQUFFLENBQUMsSUFBSCxDQUFRLE1BQUs7QUFDWCxhQUFLLENBQUwsQ0FBTyxJQUFQLENBQStCLFNBQS9CLEdBQTJDLElBQUksS0FBSyxDQUFDLElBQU4sQ0FBVyxXQUFXLEVBQXJFO0FBQ0QsYUFBSyxDQUFMLENBQU8sYUFBUCxFQUFzQixTQUF0QixHQUFrQyxLQUFLLENBQUMsSUFBeEM7QUFFQSxjQUFNLFdBQVcsR0FBRyxJQUFJLFlBQUosRUFBcEI7QUFDQSxRQUFBLFdBQVcsQ0FBQyxHQUFaLENBQWdCLFFBQVEsQ0FBQyxLQUFLLENBQUwsQ0FBTyxJQUFSLEVBQTZCO0FBQUMsVUFBQSxZQUFZLEVBQUU7QUFBZixTQUE3QixDQUF4QixFQUE0RSxDQUE1RTtBQUNBLFFBQUEsV0FBVyxDQUFDLEdBQVosQ0FBZ0IsUUFBUSxDQUFDLEtBQUssQ0FBTCxDQUFPLGFBQVAsQ0FBRCxFQUF1QztBQUFDLFVBQUEsWUFBWSxFQUFFO0FBQWYsU0FBdkMsQ0FBeEIsRUFBc0YsSUFBdEY7QUFDQSxPQVBELEVBT0csU0FQSCxFQU9jLElBUGQsRUFPb0IsUUFQcEI7QUFTQSxhQUFPLEVBQVA7QUFDQTtBQUVEOzs7Ozs7QUFJQSxJQUFBLGVBQWUsR0FBQTtBQUNkLFlBQU0sRUFBRSxHQUFHLElBQUksWUFBSixFQUFYO0FBRUEsTUFBQSxFQUFFLENBQUMsR0FBSCxDQUFPLE1BQVA7QUFFQSxNQUFBLEVBQUUsQ0FBQyxHQUFILENBQU8sc0JBQXNCLENBQUM7QUFDN0IsUUFBQSxNQUFNLEVBQUcsS0FBSyxDQUFMLENBQU8sYUFBUCxFQUF5QyxLQURyQjtBQUU3QixRQUFBLFFBQVEsRUFBRSxTQUZtQjtBQUc3QixRQUFBLFFBQVEsRUFBRSxLQUhtQjtBQUk3QixRQUFBLEtBQUssRUFBRTtBQUFDLFVBQUEsV0FBVyxFQUFFLENBQWQ7QUFBaUIsVUFBQSxXQUFXLEVBQUU7QUFBOUIsU0FKc0I7QUFLN0IsUUFBQSxHQUFHLEVBQUU7QUFBQyxVQUFBLFdBQVcsRUFBRSxDQUFkO0FBQWlCLFVBQUEsV0FBVyxFQUFFO0FBQTlCO0FBTHdCLE9BQUQsQ0FBN0IsRUFNSSxNQU5KO0FBUUEsTUFBQSxFQUFFLENBQUMsRUFBSCxDQUFNLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsSUFBdkIsRUFBNkIsR0FBN0IsRUFBa0M7QUFDakMsd0JBQWdCLENBRGlCO0FBRWpDLFFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQztBQUZzQixPQUFsQyxFQUdHLE1BSEg7QUFLQSxNQUFBLEVBQUUsQ0FBQyxFQUFILENBQU0sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixJQUF2QixFQUE2QixHQUE3QixFQUFrQztBQUNqQyxRQUFBLE9BQU8sRUFBRSxJQUR3QjtBQUVqQyxRQUFBLElBQUksRUFBRSxNQUFNLENBQUM7QUFGb0IsT0FBbEMsRUFHRyxNQUhIO0FBS0EsTUFBQSxFQUFFLENBQUMsTUFBSCxDQUFVLEtBQUssQ0FBTCxDQUFPLEtBQWpCLEVBQXdCLEtBQXhCLEVBQStCO0FBQzlCLFFBQUEsUUFBUSxFQUFFO0FBRG9CLE9BQS9CLEVBRUc7QUFDRixRQUFBLFFBQVEsRUFBRSxtQkFEUjtBQUVGLFFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQztBQUZULE9BRkgsRUFLRyxXQUxIO0FBT0EsTUFBQSxFQUFFLENBQUMsTUFBSCxDQUFVLEtBQUssQ0FBTCxDQUFPLElBQWpCLEVBQXVCLEtBQXZCLEVBQThCO0FBQzdCLFFBQUEsUUFBUSxFQUFFO0FBRG1CLE9BQTlCLEVBRUc7QUFDRixRQUFBLFFBQVEsRUFBRSxtQkFEUjtBQUVGLFFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQztBQUZULE9BRkgsRUFLRyxXQUxIO0FBT0EsYUFBTyxFQUFQO0FBQ0E7O0FBRUQsSUFBQSxrQkFBa0IsR0FBQTtBQUNqQixVQUFJLEtBQUssWUFBVCxFQUF1QjtBQUN0QixjQUFNLElBQUksS0FBSixDQUFVLDJDQUFWLENBQU47QUFDQTs7QUFFRCxXQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFFQSxZQUFNLFdBQVcsR0FBRyxDQUFwQjtBQUNDLFdBQWEsSUFBYixHQUFvQixFQUFwQjtBQUVELFlBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUwsQ0FBTyxVQUFSLENBQWxCO0FBQ0EsWUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQVAsRUFBZjtBQUNBLFdBQUssSUFBTCxDQUFVLE1BQVYsR0FBbUIsTUFBbkI7QUFDQSxXQUFLLElBQUwsQ0FBVSxNQUFWLEdBQW1CLE1BQW5CLENBYmlCLENBZWpCO0FBQ0E7O0FBQ0EsTUFBQSxNQUFNLENBQUMsTUFBUCxDQUFjO0FBQ2IsUUFBQSxLQUFLLEVBQUUsT0FETTtBQUdiO0FBQ0E7QUFDQSxRQUFBLEtBQUssRUFBRSxXQUFXLEdBQUc7QUFMUixPQUFkO0FBT0EsTUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZO0FBQUMsUUFBQSxLQUFLLEVBQUUsT0FBUjtBQUFpQixRQUFBLE9BQU8sRUFBRSxLQUFLO0FBQS9CLE9BQVo7QUFFQSxXQUFLLE1BQUw7QUFDQTs7QUFFRCxJQUFBLE1BQU0sR0FBQTtBQUNMLFVBQUksQ0FBQyxLQUFLLFlBQVYsRUFBd0I7QUFDdkI7QUFDQTs7QUFFRCxZQUFNLGFBQWEsR0FBRyxLQUFLLENBQUwsQ0FBTyxVQUFQLENBQWtCLFdBQXhDO0FBQ0EsWUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFMLENBQU8sVUFBUCxDQUFrQixZQUF6QztBQUVBLFdBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FBc0IsYUFBdEIsRUFBcUMsY0FBckM7QUFDQSxXQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLElBQWpCLENBQXNCLGNBQXRCLEVBQXNDLGFBQXRDLEVBVEssQ0FXTDtBQUNBOztBQUNBLFdBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsS0FBakIsQ0FBdUI7QUFBQyxRQUFBLFNBQVMsRUFBRSw0QkFBNEIsQ0FBQyxhQUFhO0FBQXRELE9BQXZCO0FBQ0E7O0FBRUQsSUFBQSxPQUFPLENBQUMsS0FBRCxFQUFXO0FBQ2pCLGFBQU8sQ0FBQyxLQUFSO0FBQ0E7O0FBck9vRCxHQUF0RDs7QUFFQyxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRTtBQUFQLEdBQUQsQ0FDVCxDQUFBLEUsa0JBQUEsRSxPQUFBLEUsS0FBbUIsQ0FBbkI7O0FBR0EsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLGtCQUFBLEUsa0JBQUEsRSxLQUFzRixDQUF0Rjs7QUFHQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRTtBQUFQLEdBQUQsQ0FDVCxDQUFBLEUsa0JBQUEsRSxlQUFBLEUsS0FBb0MsQ0FBcEM7O0FBR0EsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLGtCQUFBLEUsbUJBQUEsRSxLQUFpQyxDQUFqQzs7QUFYSyxFQUFBLFFBQVEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBRGIsYUFBYSxDQUFDLFdBQUQsQ0FDQSxDQUFBLEVBQVIsUUFBUSxDQUFSLENBUjhCLENBZ1BwQzs7QUFDQyxFQUFBLE1BQWMsQ0FBQyxRQUFmLEdBQTBCLFFBQTFCO0FBQ0QsQ0FsUEQiLCJzb3VyY2VSb290IjoiIn0=