import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Linear, Sine, Power2 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import InterruptMixin from "../../../mixins/InterruptMixin.js";
import { typeAnim } from "../../../../shared/lib/TypeAnims.js";
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

  GdqBreakFanart = tslib_1.__decorate([customElement('gdq-break-fanart')], GdqBreakFanart); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqBreakFanart = GdqBreakFanart;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1icmVhay1mYW5hcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVEsWUFBUixFQUFzQixNQUF0QixFQUE4QixJQUE5QixFQUFvQyxNQUFwQyxRQUFpRCxvREFBakQ7QUFDQSxPQUFPLGNBQVAsTUFBOEMsbUNBQTlDO0FBR0EsU0FBUSxRQUFSLFFBQXVCLHFDQUF2QjtBQUVBLE9BQU8sS0FBSyxhQUFaLE1BQStCLGdEQUEvQjtBQUNDLE1BQWMsQ0FBQyxZQUFmLEdBQThCLENBQUMsYUFBRCxDQUE5QixDLENBQStDOztBQUVoRCxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBSztBQUNwQyxRQUFNO0FBQUMsSUFBQSxhQUFEO0FBQWdCLElBQUE7QUFBaEIsTUFBNEIsT0FBTyxDQUFDLFVBQTFDO0FBQ0EsUUFBTSxHQUFHLEdBQUssTUFBYyxDQUFDLEtBQWYsSUFBeUIsTUFBYyxDQUFDLEdBQXREO0FBRUE7Ozs7O0FBS0EsTUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBTixTQUE2QixjQUFjLENBQUMsT0FBTyxDQUFDLE9BQVQsQ0FBM0MsQ0FBNEQ7QUFMNUQ7Ozs7QUFJQSxJQUFBLFdBQUEsR0FBQTs7QUFHQyxXQUFBLGlCQUFBLEdBQTRCLElBQTVCO0FBdU5BOztBQW5OQSxJQUFBLEtBQUssR0FBQTtBQUNKLFlBQU0sS0FBTjtBQUNDLFdBQUssQ0FBTCxDQUFPLEtBQVAsQ0FBaUMsZ0JBQWpDLEdBQW9ELElBQXBEOztBQUNELFdBQUssa0JBQUw7O0FBQ0EsTUFBQSxPQUFPLENBQUMsWUFBUixDQUFxQixnQkFBckIsQ0FBc0MsSUFBdEMsRUFBNEMsTUFBSztBQUNoRCxhQUFLLFNBQUw7QUFDQSxPQUZEO0FBR0E7QUFFRDs7Ozs7QUFHQSxJQUFBLFNBQVMsR0FBQTtBQUNSLFlBQU0sRUFBRSxHQUFHLEtBQUssUUFBaEI7QUFDQSxNQUFBLEVBQUUsQ0FBQyxHQUFILENBQU8sS0FBSyxPQUFMLENBQWEsSUFBcEIsRUFBMEI7QUFBQyxRQUFBLE9BQU8sRUFBRSxJQUFWO0FBQWdCLHdCQUFnQjtBQUFoQyxPQUExQjtBQUNBLE1BQUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxLQUFLLENBQUwsQ0FBTyxLQUFkLEVBQXFCO0FBQUMsUUFBQSxNQUFNLEVBQUUsQ0FBVDtBQUFZLFFBQUEsS0FBSyxFQUFFLGFBQW5CO0FBQWtDLFFBQUEsUUFBUSxFQUFFO0FBQTVDLE9BQXJCO0FBQ0EsTUFBQSxFQUFFLENBQUMsSUFBSCxDQUFTLEtBQUssQ0FBTCxDQUFPLEtBQVAsQ0FBaUMsU0FBMUMsRUFBcUQsU0FBckQsRUFBZ0UsS0FBSyxDQUFMLENBQU8sS0FBdkU7QUFDQTtBQUVEOzs7Ozs7O0FBS0EsSUFBQSxtQkFBbUIsQ0FBQyxLQUFELEVBQWE7QUFDL0IsWUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFKLEVBQVg7QUFDQSxZQUFNLE1BQU0sR0FBRyxLQUFLLENBQUwsQ0FBTyxLQUF0QjtBQUVBLFlBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFwQjs7QUFDQSxVQUFJLENBQUMsS0FBTCxFQUFZO0FBQ1gsZUFBTyxFQUFQO0FBQ0E7O0FBRUQsVUFBSSxlQUFlLEdBQUcsS0FBdEIsQ0FUK0IsQ0FTRjs7QUFDN0IsTUFBQSxFQUFFLENBQUMsSUFBSCxDQUFRLE1BQUs7QUFDWixZQUFJLGVBQUosRUFBcUI7QUFDcEI7QUFDQTs7QUFDRCxRQUFBLGVBQWUsR0FBRyxJQUFsQjtBQUVBLFFBQUEsRUFBRSxDQUFDLEtBQUg7QUFDQSxRQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBWixDQUFrQixJQUFsQixDQUF1QixLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVMsZUFBaEMsRUFBaUQsTUFBakQsQ0FBd0QsTUFBSztBQUM1RCxVQUFBLEVBQUUsQ0FBQyxNQUFIO0FBQ0EsU0FGRCxFQUVHLEtBRkgsQ0FFUyxLQUFLLElBQUc7QUFDaEIsVUFBQSxNQUFNLENBQUMsR0FBUCxDQUFXLEtBQVgsQ0FBaUIsS0FBakI7QUFDQSxVQUFBLEVBQUUsQ0FBQyxLQUFIO0FBQ0EsVUFBQSxFQUFFLENBQUMsTUFBSDtBQUNBLFNBTkQ7QUFPQSxPQWRELEVBY0csU0FkSCxFQWNjLElBZGQsRUFjb0IsUUFkcEI7QUFnQkEsTUFBQSxFQUFFLENBQUMsUUFBSCxDQUFZLE9BQVosRUFBcUIsUUFBckI7QUFFQSxNQUFBLEVBQUUsQ0FBQyxFQUFILENBQU0sS0FBSyxPQUFMLENBQWEsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0I7QUFDOUIsUUFBQSxPQUFPLEVBQUUsTUFEcUI7QUFFOUIsUUFBQSxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBRmlCLE9BQS9CLEVBR0csT0FISDtBQUtBLE1BQUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxNQUFNLENBQUMsS0FBUCxFQUFQLEVBQXVCLE9BQXZCO0FBQ0EsTUFBQSxFQUFFLENBQUMsR0FBSCxDQUFRLEtBQUssQ0FBTCxDQUFPLEtBQVAsQ0FBMkIsbUJBQTNCLENBQStDLEtBQS9DLENBQVIsRUFBK0QsWUFBL0Q7QUFFQSxNQUFBLEVBQUUsQ0FBQyxFQUFILENBQU0sS0FBSyxDQUFMLENBQU8sS0FBYixFQUFvQixLQUFwQixFQUEyQjtBQUMxQixRQUFBLE1BQU0sRUFBRSxDQURrQjtBQUUxQixRQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FGZTtBQUcxQixRQUFBLFVBQVUsRUFBRSxNQUFLO0FBQ2YsZUFBSyxDQUFMLENBQU8sS0FBUCxDQUFnQyxLQUFoQyxDQUFzQyxLQUF0QyxHQUE4QyxFQUE5QztBQUNELFVBQUEsUUFBUSxDQUFDLEtBQUssQ0FBTCxDQUFPLEtBQVIsQ0FBUjtBQUNBO0FBTnlCLE9BQTNCLEVBT0csWUFQSDtBQVNBLE1BQUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxLQUFLLE9BQUwsQ0FBYSxJQUFuQixFQUF5QixHQUF6QixFQUE4QjtBQUM3Qix3QkFBZ0IsS0FBSyxpQkFEUTtBQUU3QixRQUFBLElBQUksRUFBRSxJQUFJLENBQUM7QUFGa0IsT0FBOUIsRUFHRyxVQUhIOztBQUtBLFVBQUksS0FBSyxDQUFDLE1BQU4sR0FBZSxDQUFuQixFQUFzQjtBQUNyQixRQUFBLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBWixFQUFlLE9BQWYsQ0FBdUIsV0FBVyxJQUFHO0FBQ3BDLFVBQUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxLQUFLLFdBQUwsRUFBUDtBQUNBLFVBQUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxLQUFLLFlBQUwsQ0FBa0IsV0FBVyxDQUFDLGVBQTlCLENBQVA7QUFDQSxTQUhEO0FBSUE7O0FBRUQsYUFBTyxFQUFQO0FBQ0E7QUFFRDs7Ozs7Ozs7O0FBT0EsSUFBQSxpQkFBaUIsQ0FBQyxLQUFELEVBQWE7QUFDN0IsWUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFKLEVBQVg7O0FBRUEsVUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFYLEVBQXFCO0FBQ3BCLGVBQU8sRUFBUDtBQUNBOztBQUVELFVBQUksa0JBQWtCLEdBQUcsS0FBekIsQ0FQNkIsQ0FPRzs7QUFDaEMsTUFBQSxFQUFFLENBQUMsSUFBSCxDQUFRLE1BQUs7QUFDWixZQUFJLGtCQUFKLEVBQXdCO0FBQ3ZCO0FBQ0E7O0FBRUQsUUFBQSxFQUFFLENBQUMsS0FBSDtBQUNBLGNBQU0sVUFBVSxHQUFHLElBQUksWUFBSixFQUFuQjtBQUNBLFFBQUEsVUFBVSxDQUFDLEdBQVgsQ0FBZ0IsS0FBSyxDQUFMLENBQU8sS0FBUCxDQUEyQixpQkFBM0IsQ0FBNkMsS0FBN0MsQ0FBaEIsRUFBcUUsQ0FBckU7QUFDQSxRQUFBLFVBQVUsQ0FBQyxJQUFYLENBQWdCLE1BQUs7QUFDcEIsVUFBQSxrQkFBa0IsR0FBRyxJQUFyQjtBQUNBLFVBQUEsRUFBRSxDQUFDLE1BQUg7QUFDQSxTQUhEO0FBSUEsT0FaRCxFQVlHLFNBWkgsRUFZYyxJQVpkLEVBWW9CLFFBWnBCO0FBY0EsTUFBQSxFQUFFLENBQUMsR0FBSCxDQUFPLEtBQUssWUFBTCxDQUFrQixLQUFLLENBQUMsUUFBTixDQUFlLENBQWYsRUFBa0IsZUFBcEMsQ0FBUCxFQUE2RCxRQUE3RDs7QUFFQSxVQUFJLEtBQUssQ0FBQyxRQUFOLENBQWUsTUFBZixHQUF3QixDQUE1QixFQUErQjtBQUM5QixRQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsS0FBZixDQUFxQixDQUFyQixFQUF3QixPQUF4QixDQUFnQyxXQUFXLElBQUc7QUFDN0MsVUFBQSxFQUFFLENBQUMsR0FBSCxDQUFPLEtBQUssV0FBTCxFQUFQO0FBQ0EsVUFBQSxFQUFFLENBQUMsR0FBSCxDQUFPLEtBQUssWUFBTCxDQUFrQixXQUFXLENBQUMsZUFBOUIsQ0FBUDtBQUNBLFNBSEQ7QUFJQTs7QUFFRCxhQUFPLEVBQVA7QUFDQTtBQUVEOzs7Ozs7OztBQU1BLElBQUEsWUFBWSxDQUFDLE1BQUQsRUFBZTtBQUMxQixZQUFNLEVBQUUsR0FBRyxJQUFJLFlBQUosRUFBWDtBQUNBLFlBQU0sTUFBTSxHQUFHLEtBQUssQ0FBTCxDQUFPLEtBQXRCO0FBRUEsTUFBQSxFQUFFLENBQUMsR0FBSCxDQUFPLE1BQU0sQ0FBQyxJQUFQLENBQVk7QUFDbEIsUUFBQSxVQUFVLEVBQUUsTUFBSztBQUNoQixVQUFBLEVBQUUsQ0FBQyxLQUFIO0FBQ0EsVUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZLEtBQVosQ0FBa0IsSUFBbEIsQ0FBdUIsTUFBdkIsRUFBK0IsTUFBL0IsQ0FBc0MsTUFBSztBQUMxQyxZQUFBLEVBQUUsQ0FBQyxNQUFIO0FBQ0EsV0FGRCxFQUVHLEtBRkgsQ0FFUyxLQUFLLElBQUc7QUFDaEIsWUFBQSxNQUFNLENBQUMsR0FBUCxDQUFXLEtBQVgsQ0FBaUIsS0FBakI7QUFDQSxZQUFBLEVBQUUsQ0FBQyxNQUFIO0FBQ0EsV0FMRDtBQU1BO0FBVGlCLE9BQVosQ0FBUDtBQVlBLE1BQUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxNQUFNLENBQUMsS0FBUCxFQUFQLEVBQXVCLFFBQXZCO0FBRUEsYUFBTyxFQUFQO0FBQ0E7QUFFRDs7Ozs7O0FBSUEsSUFBQSxlQUFlLEdBQUE7QUFDZCxZQUFNLEVBQUUsR0FBRyxJQUFJLFlBQUosRUFBWDtBQUVBLE1BQUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxNQUFQO0FBRUEsTUFBQSxFQUFFLENBQUMsRUFBSCxDQUFNLEtBQUssT0FBTCxDQUFhLElBQW5CLEVBQXlCLEdBQXpCLEVBQThCO0FBQzdCLHdCQUFnQixDQURhO0FBRTdCLFFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQztBQUZrQixPQUE5QixFQUdHLE1BSEg7QUFLQSxNQUFBLEVBQUUsQ0FBQyxFQUFILENBQU0sS0FBSyxPQUFMLENBQWEsSUFBbkIsRUFBeUIsR0FBekIsRUFBOEI7QUFDN0IsUUFBQSxPQUFPLEVBQUUsSUFEb0I7QUFFN0IsUUFBQSxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBRmdCLE9BQTlCLEVBR0csTUFISDtBQUtBLE1BQUEsRUFBRSxDQUFDLE1BQUgsQ0FBVSxLQUFLLENBQUwsQ0FBTyxLQUFqQixFQUF3QixLQUF4QixFQUErQjtBQUM5QixRQUFBLFFBQVEsRUFBRTtBQURvQixPQUEvQixFQUVHO0FBQ0YsUUFBQSxRQUFRLEVBQUUsbUJBRFI7QUFFRixRQUFBLElBQUksRUFBRSxJQUFJLENBQUM7QUFGVCxPQUZILEVBS0csV0FMSDtBQU9BLE1BQUEsRUFBRSxDQUFDLEdBQUgsQ0FBUSxLQUFLLENBQUwsQ0FBTyxLQUFQLENBQTJCLGVBQTNCLEVBQVIsRUFBc0QsTUFBdEQ7QUFDQSxNQUFBLEVBQUUsQ0FBQyxHQUFILENBQVEsS0FBSyxDQUFMLENBQU8sS0FBUCxDQUFvQyxJQUFwQyxFQUFSLEVBQW9ELFdBQXBEO0FBRUEsYUFBTyxFQUFQO0FBQ0E7O0FBRUQsSUFBQSxrQkFBa0IsR0FBQTtBQUNqQixZQUFNLFdBQVcsR0FBRyxDQUFwQjtBQUNBLFlBQU0sYUFBYSxHQUFHLEtBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsV0FBeEM7QUFDQSxZQUFNLGNBQWMsR0FBRyxLQUFLLENBQUwsQ0FBTyxVQUFQLENBQWtCLFlBQXpDO0FBRUEsWUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBTCxDQUFPLFVBQVIsQ0FBbEI7QUFDQSxZQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBUCxFQUFmO0FBQ0EsV0FBSyxPQUFMLEdBQWUsTUFBZjtBQUVBLE1BQUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxhQUFaLEVBQTJCLGNBQTNCLEVBVGlCLENBV2pCO0FBQ0E7O0FBQ0EsTUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZLGNBQVosRUFBNEIsYUFBNUI7QUFDQSxNQUFBLE1BQU0sQ0FBQyxNQUFQLENBQWM7QUFDYixRQUFBLEtBQUssRUFBRSxPQURNO0FBR2I7QUFDQTtBQUNBLFFBQUEsS0FBSyxFQUFFLFdBQVcsR0FBRztBQUxSLE9BQWQ7QUFPQSxNQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVk7QUFBQyxRQUFBLEtBQUssRUFBRSxPQUFSO0FBQWlCLFFBQUEsT0FBTyxFQUFFLEtBQUs7QUFBL0IsT0FBWixFQXJCaUIsQ0F1QmpCO0FBQ0E7O0FBQ0EsTUFBQSxNQUFNLENBQUMsS0FBUCxDQUFhO0FBQUMsUUFBQSxTQUFTLEVBQUUsdUNBQXVDLENBQUMsY0FBYyxrQkFBa0IsQ0FBQyxhQUFhO0FBQWxHLE9BQWI7QUFDQTs7QUF4TjBELEdBQTVEOztBQUVDLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSx3QkFBQSxFLG1CQUFBLEUsS0FBaUMsQ0FBakM7O0FBRkssRUFBQSxjQUFjLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURuQixhQUFhLENBQUMsa0JBQUQsQ0FDTSxDQUFBLEVBQWQsY0FBYyxDQUFkLENBVDhCLENBb09wQzs7QUFDQyxFQUFBLE1BQWMsQ0FBQyxjQUFmLEdBQWdDLGNBQWhDO0FBQ0QsQ0F0T0QiLCJzb3VyY2VSb290IjoiIn0=