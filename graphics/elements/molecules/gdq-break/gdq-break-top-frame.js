import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
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
  GdqBreakTopFrame = tslib_1.__decorate([customElement('gdq-break-top-frame')], GdqBreakTopFrame); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqBreakTopFrame = GdqBreakTopFrame;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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