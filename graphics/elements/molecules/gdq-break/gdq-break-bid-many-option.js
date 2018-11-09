import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Power2 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
window.addEventListener('load', () => {
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

  GdqBreakBidManyOption = tslib_1.__decorate([customElement('gdq-break-bid-many-option')], GdqBreakBidManyOption); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqBreakBidManyOption = GdqBreakBidManyOption;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1icmVhay1iaWQtbWFueS1vcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFNBQVEsWUFBUixFQUFzQixNQUF0QixRQUFtQyxvREFBbkM7QUFTQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBSztBQUNwQyxRQUFNO0FBQUMsSUFBQSxhQUFEO0FBQWdCLElBQUE7QUFBaEIsTUFBNEIsT0FBTyxDQUFDLFVBQTFDO0FBRUE7Ozs7O0FBS0EsTUFBTSxxQkFBcUIsR0FBM0IsTUFBTSxxQkFBTixTQUFvQyxPQUFPLENBQUMsT0FBNUMsQ0FBbUQ7QUFPbEQsSUFBQSxLQUFLLEdBQUE7QUFDSixZQUFNLEtBQU47QUFDQSxZQUFNLFVBQVUsR0FBRyxLQUFLLENBQUwsQ0FBTyxNQUExQjtBQUNBLE1BQUEsVUFBVSxDQUFDLElBQVgsR0FBa0IsTUFBTSxDQUFDLE9BQXpCOztBQUNBLE1BQUEsVUFBVSxDQUFDLHFCQUFYLEdBQW1DLFlBQVksSUFBRztBQUNqRCxlQUFPLE1BQU0sWUFBWSxDQUFDLGNBQWIsQ0FBNEIsT0FBNUIsRUFBcUM7QUFDakQsVUFBQSxxQkFBcUIsRUFBRSxDQUQwQjtBQUVqRCxVQUFBLFdBQVcsRUFBRTtBQUZvQyxTQUFyQyxDQUFiO0FBSUEsT0FMRDtBQU1BOztBQUVELElBQUEsS0FBSyxHQUFBO0FBQ0osVUFBSSxZQUFZLEdBQUcsS0FBSyxNQUFMLENBQVksUUFBWixHQUF1QixLQUFLLEdBQUwsQ0FBUyxPQUFULENBQWlCLENBQWpCLEVBQW9CLFFBQTlEO0FBQ0EsTUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxZQUFULEVBQXVCLENBQXZCLENBQWYsQ0FGSSxDQUVzQzs7QUFDMUMsTUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxZQUFULEVBQXVCLENBQXZCLENBQWYsQ0FISSxDQUdzQzs7QUFDMUMsVUFBSSxNQUFNLENBQUMsS0FBUCxDQUFhLFlBQWIsQ0FBSixFQUFnQztBQUMvQixRQUFBLFlBQVksR0FBRyxDQUFmO0FBQ0E7O0FBRUQsWUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFKLEVBQVg7QUFDQSxZQUFNLFFBQVEsR0FBRyxZQUFZLEdBQUcsSUFBaEM7QUFFQSxNQUFBLEVBQUUsQ0FBQyxNQUFILENBQVUsS0FBSyxDQUFMLENBQU8sS0FBakIsRUFBd0IsUUFBeEIsRUFBa0M7QUFDakMsUUFBQSxNQUFNLEVBQUU7QUFEeUIsT0FBbEMsRUFFRztBQUNGLFFBQUEsTUFBTSxFQUFFLFlBRE47QUFFRixRQUFBLElBQUksRUFBRSxNQUFNLENBQUMsT0FGWDtBQUdGLFFBQUEsT0FBTyxFQUFFLE1BQUs7QUFDWixlQUFLLENBQUwsQ0FBTyxNQUFQLENBQXNDLEtBQXRDLENBQTRDLEtBQUssTUFBTCxDQUFZLFFBQXhELEVBQWtFLFFBQWxFO0FBQ0Q7QUFMQyxPQUZIO0FBVUEsYUFBTyxFQUFQO0FBQ0E7O0FBRUQsSUFBQSxlQUFlLENBQUMsTUFBRCxFQUFpQjtBQUMvQixVQUFJLENBQUMsTUFBTCxFQUFhO0FBQ1osZUFBTyxFQUFQO0FBQ0E7O0FBRUQsYUFBTyxNQUFNLENBQUMsV0FBUCxJQUFzQixNQUFNLENBQUMsSUFBcEM7QUFDQTs7QUFqRGlELEdBQW5EOztBQUVDLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSwrQkFBQSxFLEtBQUEsRSxLQUFlLENBQWY7O0FBR0EsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLCtCQUFBLEUsUUFBQSxFLEtBQWlCLENBQWpCOztBQUxLLEVBQUEscUJBQXFCLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUQxQixhQUFhLENBQUMsMkJBQUQsQ0FDYSxDQUFBLEVBQXJCLHFCQUFxQixDQUFyQixDQVI4QixDQTREcEM7O0FBQ0MsRUFBQSxNQUFjLENBQUMscUJBQWYsR0FBdUMscUJBQXZDO0FBQ0QsQ0E5REQiLCJzb3VyY2VSb290IjoiIn0=