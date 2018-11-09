import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, TweenLite, Power2, Power4 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
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

  let GdqBreakBidChallenge = class GdqBreakBidChallenge extends Polymer.Element {
    ready() {
      super.ready();
      const amountElem = this.$.amount;
      const percentElem = this.$.percent;
      amountElem.ease = Power2.easeOut;

      amountElem.displayValueTransform = displayValue => {
        return '$' + displayValue.toLocaleString('en-US', {
          maximumFractionDigits: 0,
          useGrouping: false
        });
      };

      percentElem.ease = Power2.easeOut;

      percentElem.displayValueTransform = displayValue => {
        return displayValue.toLocaleString('en-US', {
          maximumFractionDigits: 0,
          useGrouping: false
        }) + '%';
      };

      TweenLite.set(this, {
        opacity: 0
      });
      TweenLite.set(this.$.meter, {
        scaleX: 0
      });
      TweenLite.set(this.$['meter-line'], {
        scaleY: 0
      });
    }

    enter() {
      let meterPercent = this.bid.rawTotal / this.bid.rawGoal;
      meterPercent = Math.max(meterPercent, 0); // Clamp to min 0

      meterPercent = Math.min(meterPercent, 1); // Clamp to max 1

      if (Number.isNaN(meterPercent)) {
        meterPercent = 0;
      }

      const tl = new TimelineLite();
      const meterDuration = meterPercent * 0.75;
      tl.set(this.$.left, {
        width: `${meterPercent * 100}%`
      });
      tl.call(() => {
        this.$.goal.textContent = '$' + this.bid.rawGoal.toLocaleString('en-US', {
          maximumFractionDigits: 0,
          useGrouping: false
        });

        if (this.$.meter.clientWidth < this.$.amount.clientWidth) {
          TweenLite.set(this.$.amount, {
            right: '',
            left: '100%'
          });
        }
      }, undefined, null, '+=0.03');
      tl.add(createMaybeRandomTween({
        target: this.style,
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
      }));
      tl.to(this.$['meter-line'], 0.324, {
        scaleY: 1,
        ease: Power2.easeInOut
      });
      tl.to(this.$.meter, meterDuration, {
        scaleX: 1,
        ease: Power2.easeOut,
        onStart: () => {
          this.$.amount.tween(this.bid.rawTotal, meterDuration);
          this.$.percent.tween(Math.floor(meterPercent * 100), meterDuration);
        }
      });
      return tl;
    }

    exit() {
      const tl = new TimelineLite();
      tl.add(createMaybeRandomTween({
        target: this.style,
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
      }));
      return tl;
    }

  };

  tslib_1.__decorate([property({
    type: Object
  })], GdqBreakBidChallenge.prototype, "bid", void 0);

  GdqBreakBidChallenge = tslib_1.__decorate([customElement('gdq-break-bid-challenge')], GdqBreakBidChallenge); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqBreakBidChallenge = GdqBreakBidChallenge;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1icmVhay1iaWQtY2hhbGxlbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFRLFlBQVIsRUFBc0IsU0FBdEIsRUFBaUMsTUFBakMsRUFBeUMsTUFBekMsUUFBc0Qsb0RBQXREO0FBRUEsU0FBUSxzQkFBUixRQUFxQyx1Q0FBckM7QUFJQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBSztBQUNwQyxRQUFNO0FBQUMsSUFBQSxhQUFEO0FBQWdCLElBQUE7QUFBaEIsTUFBNEIsT0FBTyxDQUFDLFVBQTFDO0FBRUE7Ozs7O0FBS0EsTUFBTSxvQkFBb0IsR0FBMUIsTUFBTSxvQkFBTixTQUFtQyxPQUFPLENBQUMsT0FBM0MsQ0FBa0Q7QUFJakQsSUFBQSxLQUFLLEdBQUE7QUFDSixZQUFNLEtBQU47QUFDQSxZQUFNLFVBQVUsR0FBRyxLQUFLLENBQUwsQ0FBTyxNQUExQjtBQUNBLFlBQU0sV0FBVyxHQUFHLEtBQUssQ0FBTCxDQUFPLE9BQTNCO0FBRUEsTUFBQSxVQUFVLENBQUMsSUFBWCxHQUFrQixNQUFNLENBQUMsT0FBekI7O0FBQ0EsTUFBQSxVQUFVLENBQUMscUJBQVgsR0FBb0MsWUFBRCxJQUF5QjtBQUMzRCxlQUFPLE1BQU0sWUFBWSxDQUFDLGNBQWIsQ0FBNEIsT0FBNUIsRUFBcUM7QUFDakQsVUFBQSxxQkFBcUIsRUFBRSxDQUQwQjtBQUVqRCxVQUFBLFdBQVcsRUFBRTtBQUZvQyxTQUFyQyxDQUFiO0FBSUEsT0FMRDs7QUFPQSxNQUFBLFdBQVcsQ0FBQyxJQUFaLEdBQW1CLE1BQU0sQ0FBQyxPQUExQjs7QUFDQSxNQUFBLFdBQVcsQ0FBQyxxQkFBWixHQUFxQyxZQUFELElBQXlCO0FBQzVELGVBQU8sWUFBWSxDQUFDLGNBQWIsQ0FBNEIsT0FBNUIsRUFBcUM7QUFDM0MsVUFBQSxxQkFBcUIsRUFBRSxDQURvQjtBQUUzQyxVQUFBLFdBQVcsRUFBRTtBQUY4QixTQUFyQyxJQUdGLEdBSEw7QUFJQSxP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