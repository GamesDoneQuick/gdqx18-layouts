import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import GDQBreakLoopMixin from "../../../mixins/GDQBreakLoopMixin.js";
import { TimelineLite, Power1, TweenLite } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
const {
  customElement
} = Polymer.decorators;
const DISPLAY_DURATION = 20;
const EMPTY_OBJ = {};
let GdqSponsors = class GdqSponsors extends GDQBreakLoopMixin(Polymer.Element) {
  ready() {
    this.itemIdField = 'sum';
    this.noAutoLoop = true;
    super.ready();
    let sponsors = nodecg.Replicant('assets:sponsors-standard_1');
    const layoutName = window.location.pathname.split('/').pop();

    switch (layoutName) {
      case 'widescreen_1.html':
      case 'gba_1.html':
        sponsors = nodecg.Replicant('assets:sponsors-widescreen_1');
        break;

      default: // Do nothing.

    }

    Polymer.RenderStatus.beforeNextRender(this, () => {
      sponsors.on('change', newVal => {
        this.availableItems = newVal; // If no sponsor is showing yet, show the first sponsor immediately

        if (!this.currentItem && newVal.length > 0) {
          this.currentItem = newVal[0];
          this.$.image.$svg.image.load(newVal[0].url);
        }
      });

      this._loop();
    });
  }

  show() {
    const tl = new TimelineLite();
    tl.call(() => {
      // Clear all content.
      this.$.image.$svg.image.load('');
    }, undefined, null, '+=0.03');
    tl.to(this, 0.334, {
      opacity: 1,
      ease: Power1.easeIn
    });
    tl.call(() => {
      // Re-start the loop once we've finished entering.
      this._loop();
    });
    return tl;
  }

  hide() {
    const tl = new TimelineLite();
    const imageElem = this.$.image;
    tl.call(() => {
      tl.pause();

      if (imageElem.exiting) {
        imageElem.addEventListener('exited', () => {
          this._killLoop();

          tl.resume();
        }, {
          once: true,
          passive: true
        });
      } else if (imageElem.entering) {
        imageElem.addEventListener('entered', () => {
          this._killLoop();

          imageElem.exit({
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

        imageElem.exit({
          onComplete: () => {
            tl.resume();
          }
        });
      }
    }, undefined, null, '+=0.1');
    tl.to(this, 0.334, {
      opacity: 0,
      ease: Power1.easeOut
    });
    return tl;
  }

  resize() {
    this.$.image.resize();
  }

  _showItem(sponsorAsset) {
    const tl = new TimelineLite();
    const imageElem = this.$.image;
    tl.addLabel('exit', '+=0');
    tl.add(imageElem.exit({
      onComplete: () => {
        const newSrc = sponsorAsset.url;
        tl.pause();
        imageElem.$svg.image.load(newSrc).loaded(() => {
          tl.resume();
        }).error(error => {
          nodecg.log.error('Failed to load sponsor image:', error);
          TweenLite.set(imageElem, {
            opacity: 0
          });
          tl.clear();

          this._loop();
        });
      }
    }), 'exit');
    tl.addLabel('enter', '+=0');
    tl.set(imageElem, {
      opacity: 1
    });
    tl.add(imageElem.enter(), 'enter+=0.1'); // Give the prize some time to show.

    tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
    return tl;
  }

};
GdqSponsors = tslib_1.__decorate([customElement('gdq-sponsors')], GdqSponsors);
export default GdqSponsors;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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