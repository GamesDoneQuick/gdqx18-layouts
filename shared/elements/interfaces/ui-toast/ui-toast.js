import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  /**
   * @customElement
   * @polymer
   */

  let UiToast = class UiToast extends Polymer.Element {
    showSuccessToast(text) {
      this._successToastText = text;
      this.$.successToast.show();
    }

    showErrorToast(text) {
      this._errorToastText = text;
      this.$.errorToast.show();
    }

  };

  tslib_1.__decorate([property({
    type: String
  })], UiToast.prototype, "_successToastText", void 0);

  tslib_1.__decorate([property({
    type: String
  })], UiToast.prototype, "_errorToastText", void 0);

  UiToast = tslib_1.__decorate([customElement('ui-toast')], UiToast); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.UiToast = UiToast;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpLXRvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBSztBQUNwQyxRQUFNO0FBQUMsSUFBQSxhQUFEO0FBQWdCLElBQUE7QUFBaEIsTUFBNEIsT0FBTyxDQUFDLFVBQTFDO0FBRUE7Ozs7O0FBS0EsTUFBTSxPQUFPLEdBQWIsTUFBTSxPQUFOLFNBQXNCLE9BQU8sQ0FBQyxPQUE5QixDQUFxQztBQU9wQyxJQUFBLGdCQUFnQixDQUFDLElBQUQsRUFBYTtBQUM1QixXQUFLLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0MsV0FBSyxDQUFMLENBQU8sWUFBUCxDQUEwQyxJQUExQztBQUNEOztBQUVELElBQUEsY0FBYyxDQUFDLElBQUQsRUFBYTtBQUMxQixXQUFLLGVBQUwsR0FBdUIsSUFBdkI7QUFDQyxXQUFLLENBQUwsQ0FBTyxVQUFQLENBQXdDLElBQXhDO0FBQ0Q7O0FBZm1DLEdBQXJDOztBQUVDLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSxpQkFBQSxFLG1CQUFBLEUsS0FBMEIsQ0FBMUI7O0FBR0EsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLGlCQUFBLEUsaUJBQUEsRSxLQUF3QixDQUF4Qjs7QUFMSyxFQUFBLE9BQU8sR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBRFosYUFBYSxDQUFDLFVBQUQsQ0FDRCxDQUFBLEVBQVAsT0FBTyxDQUFQLENBUjhCLENBMEJwQzs7QUFDQyxFQUFBLE1BQWMsQ0FBQyxPQUFmLEdBQXlCLE9BQXpCO0FBQ0QsQ0E1QkQiLCJzb3VyY2VSb290IjoiIn0=