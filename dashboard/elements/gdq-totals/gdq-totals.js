import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  var cashTotal = nodecg.Replicant('total');
  var autoUpdateTotal = nodecg.Replicant('autoUpdateTotal');

  var GdqTotals =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqTotals, _super);

    function GdqTotals() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.cashTotal = '?';
      _this.bitsTotal = '?';
      return _this;
    }

    GdqTotals.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      cashTotal.on('change', function (newVal) {
        _this.cashTotal = newVal.formatted;
      });
      autoUpdateTotal.on('change', function (newVal) {
        _this.autoUpdateTotal = newVal;
      });
    };

    GdqTotals.prototype.editCashTotal = function () {
      if (!cashTotal.value) {
        return;
      }

      this.$.editTotalInput.value = String(cashTotal.value.raw);
      this._editTarget = 'cash';
      this.$.editDialog.open();
    };

    GdqTotals.prototype._handleAutoUpdateToggleChange = function (e) {
      if (!e.target) {
        return;
      }

      autoUpdateTotal.value = Boolean(e.target.checked);
    };

    GdqTotals.prototype._handleEditDialogConfirmed = function () {
      nodecg.sendMessage('setTotal', {
        type: this._editTarget,
        newValue: parseFloat(String(this.$.editTotalInput.value))
      });
    };

    tslib_1.__decorate([property({
      type: String
    })], GdqTotals.prototype, "cashTotal");

    tslib_1.__decorate([property({
      type: String
    })], GdqTotals.prototype, "bitsTotal");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqTotals.prototype, "autoUpdateTotal");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqTotals.prototype, "recordTrackerEnabled");

    tslib_1.__decorate([property({
      type: String
    })], GdqTotals.prototype, "_editTarget");

    GdqTotals = tslib_1.__decorate([customElement('gdq-totals')], GdqTotals);
    return GdqTotals;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqTotals = GdqTotals;
});