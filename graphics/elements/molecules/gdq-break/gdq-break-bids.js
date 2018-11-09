import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Sine, Power2 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import GDQBreakLoopMixin from "../../../mixins/GDQBreakLoopMixin.js";
import { typeAnim } from "../../../../shared/lib/TypeAnims.js";
const {
  customElement
} = Polymer.decorators;
window.addEventListener('load', () => {
  const EMPTY_OBJ = {};
  const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
  const currentBids = nodecg.Replicant('currentBids');
  /**
   * @customElement
   * @polymer
   */

  let GdqBreakBids = class GdqBreakBids extends GDQBreakLoopMixin(Polymer.Element) {
    ready() {
      super.ready();
      this.maxNoMoreItemsRetries = 30;
      currentBids.on('change', newVal => {
        this.availableItems = newVal;
      });
    }

    show() {
      const tl = new TimelineLite();
      tl.to(this, 0.333, {
        opacity: 1,
        ease: Sine.easeInOut
      }, 0);
      tl.to(this, 1, {
        x: '0%',
        ease: Power2.easeOut
      }, 0);
      return tl;
    }

    hide() {
      const tl = new TimelineLite();
      tl.to(this, 1, {
        x: '-100%',
        ease: Power2.easeIn
      });
      tl.to(this, 0.333, {
        opacity: 0,
        ease: Sine.easeInOut
      }, '-=0.333');
      return tl;
    }

    _showItem(bid) {
      let elementTagName;

      if (bid.type === 'choice-many') {
        elementTagName = 'gdq-break-bid-many';
      } else if (bid.type === 'choice-binary') {
        elementTagName = 'gdq-break-bid-binary';
      } else if (bid.type === 'challenge') {
        elementTagName = 'gdq-break-bid-challenge';
      } else {
        nodecg.log.error('Got bid of unexpected type (%s):', bid.type, JSON.stringify(bid, null, 2));
      }

      const tl = new TimelineLite();

      if (!elementTagName) {
        return tl;
      }

      const previousElement = this._previousBidElement;
      const element = document.createElement(elementTagName);
      element.bid = bid;
      this._previousBidElement = element;
      this.$.content.appendChild(element);

      if (previousElement) {
        tl.add(previousElement.exit());
        tl.call(() => {
          previousElement.remove();
        });
      }

      tl.call(() => {
        const contentElem = this.$.content;
        contentElem.selectIndex(contentElem.indexOf(element));
        this.$['description-actual'].innerHTML = bid.description.replace(/\\n/g, '</br>');
        typeAnim(this.$['description-actual']);
      }, undefined, null, '+=0.1');
      tl.add(element.enter()); // Give the bid some time to show.

      tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
      return tl;
    }

  };
  GdqBreakBids = tslib_1.__decorate([customElement('gdq-break-bids')], GdqBreakBids); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqBreakBids = GdqBreakBids;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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