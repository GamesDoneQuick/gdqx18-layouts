import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import GDQBreakLoopMixin from "../../../mixins/GDQBreakLoopMixin.js";
import { TimelineLite, Power2, Sine, TweenLite } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import { typeAnim } from "../../../../shared/lib/TypeAnims.js";
import { preloadImage } from "../../../../shared/lib/gdq-utils.js";
window.addEventListener('load', () => {
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
  GdqBreakPrizes = tslib_1.__decorate([customElement('gdq-break-prizes')], GdqBreakPrizes); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqBreakPrizes = GdqBreakPrizes;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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