import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Power4 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import { createMaybeRandomTween } from "../../../../shared/lib/MaybeRandom.js";
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

GdqBreakBidMany = tslib_1.__decorate([customElement('gdq-break-bid-many')], GdqBreakBidMany);
export default GdqBreakBidMany;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1icmVhay1iaWQtbWFueS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUSxZQUFSLEVBQXNCLE1BQXRCLFFBQW1DLG9EQUFuQztBQUVBLFNBQVEsc0JBQVIsUUFBcUMsdUNBQXJDO0FBSUEsTUFBTTtBQUFDLEVBQUEsYUFBRDtBQUFnQixFQUFBO0FBQWhCLElBQTRCLE9BQU8sQ0FBQyxVQUExQztBQUVBOzs7OztBQUtBLElBQXFCLGVBQWUsR0FBcEMsTUFBcUIsZUFBckIsU0FBNkMsT0FBTyxDQUFDLE9BQXJELENBQTREO0FBSTNELEVBQUEsS0FBSyxHQUFBO0FBQ0gsU0FBSyxDQUFMLENBQU8sWUFBUCxDQUEwQyxNQUExQztBQUVELFVBQU0sRUFBRSxHQUFHLElBQUksWUFBSixFQUFYO0FBQ0EsVUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxLQUFLLFVBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLDJCQUFsQyxDQUFYLENBQXZCO0FBRUEsSUFBQSxFQUFFLENBQUMsUUFBSCxDQUFZLGdCQUFaLEVBQThCLEtBQTlCO0FBQ0EsSUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixDQUFDLGFBQUQsRUFBZ0IsS0FBaEIsS0FBeUI7QUFDL0MsTUFBQSxhQUFhLENBQUMsS0FBZCxDQUFvQixPQUFwQixHQUE4QixHQUE5QjtBQUNBLE1BQUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxzQkFBc0IsQ0FBQztBQUM3QixRQUFBLE1BQU0sRUFBRSxhQUFhLENBQUMsS0FETztBQUU3QixRQUFBLFFBQVEsRUFBRSxTQUZtQjtBQUc3QixRQUFBLFFBQVEsRUFBRSxLQUhtQjtBQUk3QixRQUFBLElBQUksRUFBRSxNQUFNLENBQUMsTUFKZ0I7QUFLN0IsUUFBQSxLQUFLLEVBQUU7QUFBQyxVQUFBLFdBQVcsRUFBRSxDQUFkO0FBQWlCLFVBQUEsV0FBVyxFQUFFO0FBQTlCLFNBTHNCO0FBTTdCLFFBQUEsR0FBRyxFQUFFO0FBQUMsVUFBQSxXQUFXLEVBQUUsQ0FBZDtBQUFpQixVQUFBLFdBQVcsRUFBRTtBQUE5QjtBQU53QixPQUFELENBQTdCLEVBT0ksbUJBQW1CLEtBQUssR0FBRyxHQUFHLEVBUGxDO0FBUUEsS0FWRDtBQVlBLElBQUEsRUFBRSxDQUFDLFFBQUgsQ0FBWSxjQUFaLEVBQTRCLEtBQTVCO0FBQ0EsSUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixDQUFDLGFBQUQsRUFBZ0IsS0FBaEIsS0FBeUI7QUFDL0MsTUFBQSxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQWEsQ0FBQyxLQUFkLEVBQVAsRUFBOEIsaUJBQWlCLEtBQUssR0FBRyxHQUFHLEVBQTFEO0FBQ0EsS0FGRDtBQUlBLFdBQU8sRUFBUDtBQUNBOztBQUVELEVBQUEsSUFBSSxHQUFBO0FBQ0gsVUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFKLEVBQVg7QUFFQSxVQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBTixDQUFXLEtBQUssVUFBTCxDQUFpQixnQkFBakIsQ0FBa0MsMkJBQWxDLENBQVgsQ0FBdkI7QUFFQSxJQUFBLEVBQUUsQ0FBQyxRQUFILENBQVksZ0JBQVosRUFBOEIsS0FBOUI7QUFDQSxJQUFBLGNBQWMsQ0FBQyxLQUFmLENBQXFCLENBQXJCLEVBQXdCLE9BQXhCLEdBQWtDLE9BQWxDLENBQTBDLENBQUMsYUFBRCxFQUFnQixLQUFoQixLQUF5QjtBQUNsRSxNQUFBLEVBQUUsQ0FBQyxHQUFILENBQU8sc0JBQXNCLENBQUM7QUFDN0IsUUFBQSxNQUFNLEVBQUUsYUFBYSxDQUFDLEtBRE87QUFFN0IsUUFBQSxRQUFRLEVBQUUsU0FGbUI7QUFHN0IsUUFBQSxRQUFRLEVBQUUsR0FIbUI7QUFJN0IsUUFBQSxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BSmdCO0FBSzdCLFFBQUEsS0FBSyxFQUFFO0FBQUMsVUFBQSxXQUFXLEVBQUUsQ0FBZDtBQUFpQixVQUFBLFdBQVcsRUFBRTtBQUE5QixTQUxzQjtBQU03QixRQUFBLEdBQUcsRUFBRTtBQUFDLFVBQUEsV0FBVyxFQUFFLENBQWQ7QUFBaUIsVUFBQSxXQUFXLEVBQUU7QUFBOUI7QUFOd0IsT0FBRCxDQUE3QixFQU9JLG1CQUFtQixLQUFLLEdBQUcsR0FBRyxFQVBsQztBQVFBLEtBVEQ7QUFXQSxXQUFPLEVBQVA7QUFDQTs7QUFFRCxFQUFBLFlBQVksQ0FBQyxHQUFELEVBQWU7QUFDMUIsUUFBSSxDQUFDLEdBQUwsRUFBVTtBQUNULGFBQU8sRUFBUDtBQUNBOztBQUVELFdBQU8sR0FBRyxDQUFDLE9BQUosQ0FBWSxLQUFaLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLENBQVA7QUFDQTs7QUF6RDBELENBQTVEOztBQUVDLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxFQUFBLElBQUksRUFBRTtBQUFQLENBQUQsQ0FDVCxDQUFBLEUseUJBQUEsRSxLQUFBLEUsS0FBZSxDQUFmOztBQUZvQixlQUFlLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURuQyxhQUFhLENBQUMsb0JBQUQsQ0FDc0IsQ0FBQSxFQUFmLGVBQWUsQ0FBZjtlQUFBLGUiLCJzb3VyY2VSb290IjoiIn0=