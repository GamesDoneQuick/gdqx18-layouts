import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
const {
  customElement
} = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */

let GdqBreakTopFrame = class GdqBreakTopFrame extends Polymer.Element {
  ready() {
    super.ready();
    const totalTextAmountElem = this.$.totalTextAmount;
    totalTextAmountElem.displayValueTransform = this._totalDisplayValueTransform.bind(this);
    nodecg.readReplicant('total', totalVal => {
      totalTextAmountElem.value = totalVal.raw;
      nodecg.listenFor('donation', this._handleDonation.bind(this));
    });
    nodecg.listenFor('total:manuallyUpdated', totalVal => {
      totalTextAmountElem.value = totalVal.raw;
    });
  }

  addDonationAlert(formattedAmount, rawAmount) {
    let backgroundColor = 'white';

    if (rawAmount >= 500) {
      backgroundColor = '#FF68B9';
    } else if (rawAmount >= 100) {
      backgroundColor = '#FFFBBD';
    } else if (rawAmount >= 20) {
      backgroundColor = '#00ffff';
    }

    this.$.donationAlerts.addAlert({
      text: formattedAmount,
      backgroundColor,
      holdDuration: rawAmount >= 500 ? 1 : 0.067
    });
  }

  _handleDonation({
    amount,
    rawAmount,
    rawNewTotal
  }) {
    this.addDonationAlert(amount, rawAmount);
    this.$.totalTextAmount.value = rawNewTotal;
  }

  _totalDisplayValueTransform(displayValue) {
    return displayValue.toLocaleString('en-US', {
      maximumFractionDigits: 0
    }).replace(/1/ig, '\u00C0');
  }

};
GdqBreakTopFrame = tslib_1.__decorate([customElement('gdq-break-top-frame')], GdqBreakTopFrame);
export default GdqBreakTopFrame;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1icmVhay10b3AtZnJhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE1BQU07QUFBQyxFQUFBO0FBQUQsSUFBa0IsT0FBTyxDQUFDLFVBQWhDO0FBRUE7Ozs7O0FBS0EsSUFBcUIsZ0JBQWdCLEdBQXJDLE1BQXFCLGdCQUFyQixTQUE4QyxPQUFPLENBQUMsT0FBdEQsQ0FBNkQ7QUFDNUQsRUFBQSxLQUFLLEdBQUE7QUFDSixVQUFNLEtBQU47QUFDQSxVQUFNLG1CQUFtQixHQUFHLEtBQUssQ0FBTCxDQUFPLGVBQW5DO0FBQ0EsSUFBQSxtQkFBbUIsQ0FBQyxxQkFBcEIsR0FBNEMsS0FBSywyQkFBTCxDQUFpQyxJQUFqQyxDQUFzQyxJQUF0QyxDQUE1QztBQUVBLElBQUEsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsT0FBckIsRUFBK0IsUUFBRCxJQUFvQjtBQUNqRCxNQUFBLG1CQUFtQixDQUFDLEtBQXBCLEdBQTRCLFFBQVEsQ0FBQyxHQUFyQztBQUNBLE1BQUEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsVUFBakIsRUFBNkIsS0FBSyxlQUFMLENBQXFCLElBQXJCLENBQTBCLElBQTFCLENBQTdCO0FBQ0EsS0FIRDtBQUtBLElBQUEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsdUJBQWpCLEVBQTJDLFFBQUQsSUFBb0I7QUFDN0QsTUFBQSxtQkFBbUIsQ0FBQyxLQUFwQixHQUE0QixRQUFRLENBQUMsR0FBckM7QUFDQSxLQUZEO0FBR0E7O0FBRUQsRUFBQSxnQkFBZ0IsQ0FBQyxlQUFELEVBQTBCLFNBQTFCLEVBQTJDO0FBQzFELFFBQUksZUFBZSxHQUFHLE9BQXRCOztBQUNBLFFBQUksU0FBUyxJQUFJLEdBQWpCLEVBQXNCO0FBQ3JCLE1BQUEsZUFBZSxHQUFHLFNBQWxCO0FBQ0EsS0FGRCxNQUVPLElBQUksU0FBUyxJQUFJLEdBQWpCLEVBQXNCO0FBQzVCLE1BQUEsZUFBZSxHQUFHLFNBQWxCO0FBQ0EsS0FGTSxNQUVBLElBQUksU0FBUyxJQUFJLEVBQWpCLEVBQXFCO0FBQzNCLE1BQUEsZUFBZSxHQUFHLFNBQWxCO0FBQ0E7O0FBRUEsU0FBSyxDQUFMLENBQU8sY0FBUCxDQUF5QyxRQUF6QyxDQUFrRDtBQUNsRCxNQUFBLElBQUksRUFBRSxlQUQ0QztBQUVsRCxNQUFBLGVBRmtEO0FBR2xELE1BQUEsWUFBWSxFQUFFLFNBQVMsSUFBSSxHQUFiLEdBQW1CLENBQW5CLEdBQXVCO0FBSGEsS0FBbEQ7QUFLRDs7QUFFRCxFQUFBLGVBQWUsQ0FDZDtBQUFDLElBQUEsTUFBRDtBQUFTLElBQUEsU0FBVDtBQUFvQixJQUFBO0FBQXBCLEdBRGMsRUFDOEU7QUFFNUYsU0FBSyxnQkFBTCxDQUFzQixNQUF0QixFQUE4QixTQUE5QjtBQUNDLFNBQUssQ0FBTCxDQUFPLGVBQVAsQ0FBOEMsS0FBOUMsR0FBc0QsV0FBdEQ7QUFDRDs7QUFFRCxFQUFBLDJCQUEyQixDQUFDLFlBQUQsRUFBcUI7QUFDL0MsV0FBTyxZQUFZLENBQUMsY0FBYixDQUE0QixPQUE1QixFQUFxQztBQUMzQyxNQUFBLHFCQUFxQixFQUFFO0FBRG9CLEtBQXJDLEVBRUosT0FGSSxDQUVJLEtBRkosRUFFVyxRQUZYLENBQVA7QUFHQTs7QUE1QzJELENBQTdEO0FBQXFCLGdCQUFnQixHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEcEMsYUFBYSxDQUFDLHFCQUFELENBQ3VCLENBQUEsRUFBaEIsZ0JBQWdCLENBQWhCO2VBQUEsZ0IiLCJzb3VyY2VSb290IjoiIn0=