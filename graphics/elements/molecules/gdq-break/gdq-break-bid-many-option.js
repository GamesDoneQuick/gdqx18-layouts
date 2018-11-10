import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Power2 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
const {
  customElement,
  property
} = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */

let GdqBreakBidManyOption = class GdqBreakBidManyOption extends Polymer.Element {
  ready() {
    super.ready();
    const amountElem = this.$.amount;
    amountElem.ease = Power2.easeOut;

    amountElem.displayValueTransform = displayValue => {
      return '$' + displayValue.toLocaleString('en-US', {
        maximumFractionDigits: 0,
        useGrouping: false
      });
    };
  }

  enter() {
    let meterPercent = this.option.rawTotal / this.bid.options[0].rawTotal;
    meterPercent = Math.max(meterPercent, 0); // Clamp to min 0

    meterPercent = Math.min(meterPercent, 1); // Clamp to max 1

    if (Number.isNaN(meterPercent)) {
      meterPercent = 0;
    }

    const tl = new TimelineLite();
    const duration = meterPercent * 0.75;
    tl.fromTo(this.$.meter, duration, {
      scaleX: 0
    }, {
      scaleX: meterPercent,
      ease: Power2.easeOut,
      onStart: () => {
        this.$.amount.tween(this.option.rawTotal, duration);
      }
    });
    return tl;
  }

  _calcOptionName(option) {
    if (!option) {
      return '';
    }

    return option.description || option.name;
  }

};

tslib_1.__decorate([property({
  type: Object
})], GdqBreakBidManyOption.prototype, "bid", void 0);

tslib_1.__decorate([property({
  type: Object
})], GdqBreakBidManyOption.prototype, "option", void 0);

GdqBreakBidManyOption = tslib_1.__decorate([customElement('gdq-break-bid-many-option')], GdqBreakBidManyOption);
export default GdqBreakBidManyOption;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1icmVhay1iaWQtbWFueS1vcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFNBQVEsWUFBUixFQUFzQixNQUF0QixRQUFtQyxvREFBbkM7QUFHQSxNQUFNO0FBQUMsRUFBQSxhQUFEO0FBQWdCLEVBQUE7QUFBaEIsSUFBNEIsT0FBTyxDQUFDLFVBQTFDO0FBRUE7Ozs7O0FBS0EsSUFBcUIscUJBQXFCLEdBQTFDLE1BQXFCLHFCQUFyQixTQUFtRCxPQUFPLENBQUMsT0FBM0QsQ0FBa0U7QUFPakUsRUFBQSxLQUFLLEdBQUE7QUFDSixVQUFNLEtBQU47QUFDQSxVQUFNLFVBQVUsR0FBRyxLQUFLLENBQUwsQ0FBTyxNQUExQjtBQUNBLElBQUEsVUFBVSxDQUFDLElBQVgsR0FBa0IsTUFBTSxDQUFDLE9BQXpCOztBQUNBLElBQUEsVUFBVSxDQUFDLHFCQUFYLEdBQW1DLFlBQVksSUFBRztBQUNqRCxhQUFPLE1BQU0sWUFBWSxDQUFDLGNBQWIsQ0FBNEIsT0FBNUIsRUFBcUM7QUFDakQsUUFBQSxxQkFBcUIsRUFBRSxDQUQwQjtBQUVqRCxRQUFBLFdBQVcsRUFBRTtBQUZvQyxPQUFyQyxDQUFiO0FBSUEsS0FMRDtBQU1BOztBQUVELEVBQUEsS0FBSyxHQUFBO0FBQ0osUUFBSSxZQUFZLEdBQUcsS0FBSyxNQUFMLENBQVksUUFBWixHQUF1QixLQUFLLEdBQUwsQ0FBUyxPQUFULENBQWlCLENBQWpCLEVBQW9CLFFBQTlEO0FBQ0EsSUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxZQUFULEVBQXVCLENBQXZCLENBQWYsQ0FGSSxDQUVzQzs7QUFDMUMsSUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxZQUFULEVBQXVCLENBQXZCLENBQWYsQ0FISSxDQUdzQzs7QUFDMUMsUUFBSSxNQUFNLENBQUMsS0FBUCxDQUFhLFlBQWIsQ0FBSixFQUFnQztBQUMvQixNQUFBLFlBQVksR0FBRyxDQUFmO0FBQ0E7O0FBRUQsVUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFKLEVBQVg7QUFDQSxVQUFNLFFBQVEsR0FBRyxZQUFZLEdBQUcsSUFBaEM7QUFFQSxJQUFBLEVBQUUsQ0FBQyxNQUFILENBQVUsS0FBSyxDQUFMLENBQU8sS0FBakIsRUFBd0IsUUFBeEIsRUFBa0M7QUFDakMsTUFBQSxNQUFNLEVBQUU7QUFEeUIsS0FBbEMsRUFFRztBQUNGLE1BQUEsTUFBTSxFQUFFLFlBRE47QUFFRixNQUFBLElBQUksRUFBRSxNQUFNLENBQUMsT0FGWDtBQUdGLE1BQUEsT0FBTyxFQUFFLE1BQUs7QUFDWixhQUFLLENBQUwsQ0FBTyxNQUFQLENBQXFDLEtBQXJDLENBQTJDLEtBQUssTUFBTCxDQUFZLFFBQXZELEVBQWlFLFFBQWpFO0FBQ0Q7QUFMQyxLQUZIO0FBVUEsV0FBTyxFQUFQO0FBQ0E7O0FBRUQsRUFBQSxlQUFlLENBQUMsTUFBRCxFQUFpQjtBQUMvQixRQUFJLENBQUMsTUFBTCxFQUFhO0FBQ1osYUFBTyxFQUFQO0FBQ0E7O0FBRUQsV0FBTyxNQUFNLENBQUMsV0FBUCxJQUFzQixNQUFNLENBQUMsSUFBcEM7QUFDQTs7QUFqRGdFLENBQWxFOztBQUVDLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxFQUFBLElBQUksRUFBRTtBQUFQLENBQUQsQ0FDVCxDQUFBLEUsK0JBQUEsRSxLQUFBLEUsS0FBZSxDQUFmOztBQUdBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxFQUFBLElBQUksRUFBRTtBQUFQLENBQUQsQ0FDVCxDQUFBLEUsK0JBQUEsRSxRQUFBLEUsS0FBaUIsQ0FBakI7O0FBTG9CLHFCQUFxQixHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEekMsYUFBYSxDQUFDLDJCQUFELENBQzRCLENBQUEsRUFBckIscUJBQXFCLENBQXJCO2VBQUEscUIiLCJzb3VyY2VSb290IjoiIn0=