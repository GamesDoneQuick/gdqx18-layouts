import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import GDQBreakLoopMixin from "../../../mixins/GDQBreakLoopMixin.js";
import { TimelineLite, Power2, Sine, TweenLite } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import { typeAnim } from "../../../../shared/lib/TypeAnims.js";
import { preloadImage } from "../../../../shared/lib/gdq-utils.js";
const {
  customElement
} = Polymer.decorators;
const EMPTY_OBJ = {};
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
const currentPrizes = nodecg.Replicant('currentPrizes');
/**
 * @customElement
 * @polymer
 */

let GdqBreakPrizes = class GdqBreakPrizes extends GDQBreakLoopMixin(Polymer.Element) {
  ready() {
    super.ready();
    currentPrizes.on('change', newVal => {
      this.availableItems = newVal;
    });
  }
  /**
   * Plays the entrance animation and kicks off the infinite loop of
   * showing all available prizes, one at a time.
   * @returns - A GSAP TimelineLite instance.
   */


  show() {
    const tl = new TimelineLite();
    const photoElem = this.$['photo-actual'];
    tl.call(() => {
      // Clear all content.
      this.$['info-description-text'].innerText = '';
      this.$['info-minimumBid-text'].innerText = '';
      this.$.provider.innerText = '';
      photoElem.$svg.image.load('');
    }, undefined, null, '+=0.03');
    tl.addLabel('start', '+=0');
    tl.to(photoElem.$svg.bgRect.node, 1.5, {
      drawSVG: '100%',
      ease: Power2.easeOut
    }, 'start');
    tl.to(this.$.info, 1, {
      x: '0%',
      ease: Power2.easeOut
    }, 'start+=0.5');
    tl.to(this.$['photo-label'], 0.5, {
      opacity: 1,
      x: 0,
      ease: Sine.easeOut
    }, 'start+=1');
    tl.to(photoElem.$svg.bgRect.node, 0.5, {
      'fill-opacity': 0.25,
      ease: Sine.easeOut
    }, 'start+=1');
    tl.call(() => {
      // Re-start the loop once we've finished entering.
      this._loop();
    });
    return tl;
  }
  /**
   * Plays the exit animation and kills the current loop of prize displaying.
   * This animation has a variable length due to it needing to wait for the current
   * loop to be at a good stopping point before beginning the exit animation.
   * @returns - A GSAP TimelineLite instance.
   */


  hide() {
    const tl = new TimelineLite();
    const photoElem = this.$['photo-actual'];
    let handledCall = false; // GSAP likes to run .calls again when you .resume

    tl.call(() => {
      if (handledCall) {
        return;
      }

      handledCall = true;
      tl.pause();

      if (photoElem.exiting) {
        photoElem.addEventListener('exited', () => {
          this._killLoop();

          tl.resume();
        }, {
          once: true,
          passive: true
        });
      } else if (photoElem.entering) {
        photoElem.addEventListener('entered', () => {
          this._killLoop();

          photoElem.exit({
            onComplete: () => {
              tl.resume();
            }
          });
        }, {
          once: true,
          passive: true
        });
      } else {
        this._killLoop();

        photoElem.exit({
          onComplete: () => {
            tl.resume();
          }
        });
      }
    }, undefined, null, '+=0.1');
    tl.addLabel('start', '+=0.5');
    tl.call(() => {
      this.currentItem = null;
    }, undefined, null, 'start');
    tl.to(photoElem.$svg.bgRect.node, 0.5, {
      'fill-opacity': 0,
      ease: Sine.easeIn
    }, 'start');
    tl.to(this.$['photo-label'], 0.5, {
      opacity: 0,
      x: -50,
      ease: Sine.easeIn
    }, 'start');
    tl.to(this.$.info, 1, {
      x: '-100%',
      ease: Power2.easeIn
    }, 'start');
    tl.to(photoElem.$svg.bgRect.node, 1.5, {
      drawSVG: '0%',
      ease: Power2.easeIn
    }, 'start');
    return tl;
  }

  _showItem(prize) {
    let useFallbackImage = !prize.image.trim();
    let changingProvider = true;
    let changingMinimumBid = true;
    const tl = new TimelineLite();
    const photoElem = this.$['photo-actual'];
    const providerTextElem = this.$.provider;
    const descriptionTextElem = this.$['info-description-text'];
    const minimumBidTextElem = this.$['info-minimumBid-text'];
    const minimumBidText = prize.sumdonations ? `${prize.minimumbid} in Total Donations` : `${prize.minimumbid} Single Donation`;
    tl.call(() => {
      tl.pause();
      preloadImage(prize.image).then(() => {
        tl.resume();
      }).catch(() => {
        nodecg.log.error(`Image "${prize.image}" failed to load for prize #${prize.id}.`);
        useFallbackImage = true;
        tl.resume();
      });
    }, undefined, null, '+=0.03');
    tl.addLabel('exit', '+=0');
    tl.add(photoElem.exit({
      onComplete: () => {
        const newSrc = useFallbackImage ? photoElem.fallbackSrc : prize.image;
        tl.pause();
        photoElem.$svg.image.load(newSrc).loaded(() => {
          tl.resume();
        }).error(error => {
          nodecg.log.error(error);
          photoElem.$svg.image.load(photoElem.fallbackSrc);
          tl.resume();
        });
      }
    }), 'exit');
    tl.call(() => {
      if (!providerTextElem.innerText && !descriptionTextElem.innerText) {
        return;
      }

      changingProvider = false;

      if (providerTextElem.innerText.trim() !== prize.provided) {
        changingProvider = true;
        TweenLite.to(this.$.provider, 0.5, {
          opacity: 0,
          ease: Sine.easeInOut
        });
      }

      changingMinimumBid = false;

      if (minimumBidTextElem.innerText.trim() !== minimumBidText) {
        changingMinimumBid = true;
        TweenLite.to(minimumBidTextElem, 0.5, {
          opacity: 0,
          ease: Sine.easeInOut
        });
      }

      TweenLite.to(this.$['info-description-text'], 0.5, {
        opacity: 0,
        ease: Sine.easeInOut
      });
    }, undefined, null, 'exit+=0.1');
    tl.addLabel('enter', '+=0');
    tl.call(() => {
      if (!changingProvider) {
        return;
      }

      providerTextElem.innerText = prize.provided;
      typeAnim(providerTextElem);
      TweenLite.set(providerTextElem, {
        opacity: 1
      });
    }, undefined, null, 'enter+=0.03');
    tl.add(photoElem.enter(), 'enter+=0.1');
    tl.call(() => {
      descriptionTextElem.innerText = prize.description;
      typeAnim(descriptionTextElem);
      TweenLite.set(descriptionTextElem, {
        opacity: 1
      });
    }, undefined, null, 'enter+=0.2');
    tl.call(() => {
      if (!changingMinimumBid) {
        return;
      }

      minimumBidTextElem.innerText = minimumBidText;
      typeAnim(minimumBidTextElem);
      TweenLite.set(minimumBidTextElem, {
        opacity: 1
      });
    }, undefined, null, 'enter+=0.3'); // Give the prize some time to show.

    tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
    return tl;
  }

  _resetState() {
    this.$['photo-actual'].exiting = false;
  }

};
GdqBreakPrizes = tslib_1.__decorate([customElement('gdq-break-prizes')], GdqBreakPrizes);
export default GdqBreakPrizes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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