import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  const cashTotal = nodecg.Replicant('total');
  const autoUpdateTotal = nodecg.Replicant('autoUpdateTotal');
  let GdqTotals = class GdqTotals extends Polymer.Element {
    constructor() {
      super(...arguments);
      this.cashTotal = '?';
      this.bitsTotal = '?';
    }

    ready() {
      super.ready();
      cashTotal.on('change', newVal => {
        this.cashTotal = newVal.formatted;
      });
      autoUpdateTotal.on('change', newVal => {
        this.autoUpdateTotal = newVal;
      });
    }

    editCashTotal() {
      if (!cashTotal.value) {
        return;
      }

      this.$.editTotalInput.value = String(cashTotal.value.raw);
      this._editTarget = 'cash';
      this.$.editDialog.open();
    }

    _handleAutoUpdateToggleChange(e) {
      if (!e.target) {
        return;
      }

      autoUpdateTotal.value = Boolean(e.target.checked);
    }

    _handleEditDialogConfirmed() {
      nodecg.sendMessage('setTotal', {
        type: this._editTarget,
        newValue: parseFloat(String(this.$.editTotalInput.value))
      });
    }

  };

  tslib_1.__decorate([property({
    type: String
  })], GdqTotals.prototype, "cashTotal", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqTotals.prototype, "bitsTotal", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], GdqTotals.prototype, "autoUpdateTotal", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], GdqTotals.prototype, "recordTrackerEnabled", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqTotals.prototype, "_editTarget", void 0);

  GdqTotals = tslib_1.__decorate([customElement('gdq-totals')], GdqTotals); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqTotals = GdqTotals;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS10b3RhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxNQUFLO0FBQ3BDLFFBQU07QUFBQyxJQUFBLGFBQUQ7QUFBZ0IsSUFBQTtBQUFoQixNQUE0QixPQUFPLENBQUMsVUFBMUM7QUFFQSxRQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUF3QixPQUF4QixDQUFsQjtBQUNBLFFBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFQLENBQTBCLGlCQUExQixDQUF4QjtBQUdBLE1BQU0sU0FBUyxHQUFmLE1BQU0sU0FBTixTQUF3QixPQUFPLENBQUMsT0FBaEMsQ0FBdUM7QUFEdkMsSUFBQSxXQUFBLEdBQUE7O0FBR0MsV0FBQSxTQUFBLEdBQVksR0FBWjtBQUdBLFdBQUEsU0FBQSxHQUFZLEdBQVo7QUEyQ0E7O0FBaENBLElBQUEsS0FBSyxHQUFBO0FBQ0osWUFBTSxLQUFOO0FBQ0EsTUFBQSxTQUFTLENBQUMsRUFBVixDQUFhLFFBQWIsRUFBdUIsTUFBTSxJQUFHO0FBQy9CLGFBQUssU0FBTCxHQUFpQixNQUFNLENBQUMsU0FBeEI7QUFDQSxPQUZEO0FBR0EsTUFBQSxlQUFlLENBQUMsRUFBaEIsQ0FBbUIsUUFBbkIsRUFBNkIsTUFBTSxJQUFHO0FBQ3JDLGFBQUssZUFBTCxHQUF1QixNQUF2QjtBQUNBLE9BRkQ7QUFHQTs7QUFFRCxJQUFBLGFBQWEsR0FBQTtBQUNaLFVBQUksQ0FBQyxTQUFTLENBQUMsS0FBZixFQUFzQjtBQUNyQjtBQUNBOztBQUNBLFdBQUssQ0FBTCxDQUFPLGNBQVAsQ0FBNEMsS0FBNUMsR0FBb0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFWLENBQWdCLEdBQWpCLENBQTFEO0FBQ0QsV0FBSyxXQUFMLEdBQW1CLE1BQW5CO0FBQ0MsV0FBSyxDQUFMLENBQU8sVUFBUCxDQUF5QyxJQUF6QztBQUNEOztBQUVELElBQUEsNkJBQTZCLENBQUMsQ0FBRCxFQUFTO0FBQ3JDLFVBQUksQ0FBQyxDQUFDLENBQUMsTUFBUCxFQUFlO0FBQ2Q7QUFDQTs7QUFDRCxNQUFBLGVBQWUsQ0FBQyxLQUFoQixHQUF3QixPQUFPLENBQUUsQ0FBQyxDQUFDLE1BQUYsQ0FBc0MsT0FBeEMsQ0FBL0I7QUFDQTs7QUFFRCxJQUFBLDBCQUEwQixHQUFBO0FBQ3pCLE1BQUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsVUFBbkIsRUFBK0I7QUFDOUIsUUFBQSxJQUFJLEVBQUUsS0FBSyxXQURtQjtBQUU5QixRQUFBLFFBQVEsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFFLEtBQUssQ0FBTCxDQUFPLGNBQVAsQ0FBNEMsS0FBOUMsQ0FBUDtBQUZVLE9BQS9CO0FBSUE7O0FBL0NxQyxHQUF2Qzs7QUFFQyxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRTtBQUFQLEdBQUQsQ0FDVCxDQUFBLEUsbUJBQUEsRSxXQUFBLEUsS0FBZ0IsQ0FBaEI7O0FBR0EsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLG1CQUFBLEUsV0FBQSxFLEtBQWdCLENBQWhCOztBQUdBLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSxtQkFBQSxFLGlCQUFBLEUsS0FBeUIsQ0FBekI7O0FBR0EsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLG1CQUFBLEUsc0JBQUEsRSxLQUE4QixDQUE5Qjs7QUFHQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRTtBQUFQLEdBQUQsQ0FDVCxDQUFBLEUsbUJBQUEsRSxhQUFBLEUsS0FBb0IsQ0FBcEI7O0FBZEssRUFBQSxTQUFTLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURkLGFBQWEsQ0FBQyxZQUFELENBQ0MsQ0FBQSxFQUFULFNBQVMsQ0FBVCxDQVA4QixDQXlEcEM7O0FBQ0MsRUFBQSxNQUFjLENBQUMsU0FBZixHQUEyQixTQUEzQjtBQUNELENBM0REIiwic291cmNlUm9vdCI6IiJ9