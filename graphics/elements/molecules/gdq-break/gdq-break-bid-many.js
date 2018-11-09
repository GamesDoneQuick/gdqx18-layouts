import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Power4 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import { createMaybeRandomTween } from "../../../../shared/lib/MaybeRandom.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  /**
   * @customElement
   * @polymer
   */

  let GdqBreakBidMany = class GdqBreakBidMany extends Polymer.Element {
    enter() {
      this.$.optionRepeat.render();
      const tl = new TimelineLite();
      const optionElements = Array.from(this.shadowRoot.querySelectorAll('gdq-break-bid-many-option'));
      tl.addLabel('flickerOptions', '+=0');
      optionElements.forEach((optionElement, index) => {
        optionElement.style.opacity = '0';
        tl.add(createMaybeRandomTween({
          target: optionElement.style,
          propName: 'opacity',
          duration: 0.465,
          ease: Power4.easeIn,
          start: {
            probability: 1,
            normalValue: 0
          },
          end: {
            probability: 0,
            normalValue: 1
          }
        }), `flickerOptions+=${index * 0.1}`);
      });
      tl.addLabel('enterOptions', '+=0');
      optionElements.forEach((optionElement, index) => {
        tl.add(optionElement.enter(), `enterOptions+=${index * 0.1}`);
      });
      return tl;
    }

    exit() {
      const tl = new TimelineLite();
      const optionElements = Array.from(this.shadowRoot.querySelectorAll('gdq-break-bid-many-option'));
      tl.addLabel('flickerOptions', '+=0');
      optionElements.slice(0).reverse().forEach((optionElement, index) => {
        tl.add(createMaybeRandomTween({
          target: optionElement.style,
          propName: 'opacity',
          duration: 0.2,
          ease: Power4.easeIn,
          start: {
            probability: 1,
            normalValue: 1
          },
          end: {
            probability: 0,
            normalValue: 0
          }
        }), `flickerOptions+=${index * 0.1}`);
      });
      return tl;
    }

    _calcOptions(bid) {
      if (!bid) {
        return [];
      }

      return bid.options.slice(0, 5);
    }

  };

  tslib_1.__decorate([property({
    type: Object
  })], GdqBreakBidMany.prototype, "bid", void 0);

  GdqBreakBidMany = tslib_1.__decorate([customElement('gdq-break-bid-many')], GdqBreakBidMany); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqBreakBidMany = GdqBreakBidMany;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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