import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  /**
   * @customElement
   * @polymer
   */

  var UiToast =
  /** @class */
  function (_super) {
    tslib_1.__extends(UiToast, _super);

    function UiToast() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    UiToast.prototype.showSuccessToast = function (text) {
      this._successToastText = text;
      this.$.successToast.show();
    };

    UiToast.prototype.showErrorToast = function (text) {
      this._errorToastText = text;
      this.$.errorToast.show();
    };

    tslib_1.__decorate([property({
      type: String
    })], UiToast.prototype, "_successToastText");

    tslib_1.__decorate([property({
      type: String
    })], UiToast.prototype, "_errorToastText");

    UiToast = tslib_1.__decorate([customElement('ui-toast')], UiToast);
    return UiToast;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.UiToast = UiToast;
});