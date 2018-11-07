import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
/**
 * @mixinFunction
 * @polymer
 */

export default Polymer.dedupingMixin(function (base) {
  /**
   * @mixinClass
   * @polymer
   */
  var CSSReflectionMixin =
  /** @class */
  function (_super) {
    tslib_1.__extends(CSSReflectionMixin, _super);

    function CSSReflectionMixin() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the value of a Custom CSS Property.
     * @param prop - The property name to get the value of.
     * @param [fallback] - An optional fallback value to use if the property is not defined.
     * @returns - The value of the Custom CSS Property, which is always a string.
     */


    CSSReflectionMixin.prototype.readCSSCustomProperty = function (prop, fallback) {
      var value;

      if ('ShadyCSS' in window) {
        value = window.ShadyCSS.getComputedStyleValue(this, prop);
      } else {
        value = getComputedStyle(this, prop);
      }

      return value || fallback;
    };

    return CSSReflectionMixin;
  }(base);

  return CSSReflectionMixin;
});