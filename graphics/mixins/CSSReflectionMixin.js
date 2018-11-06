/**
 * @mixinFunction
 * @polymer
 */
export default Polymer.dedupingMixin(base => {
  /**
   * @mixinClass
   * @polymer
   */
  class CSSReflectionMixin extends base {
    /**
     * Gets the value of a Custom CSS Property.
     * @param prop - The property name to get the value of.
     * @param [fallback] - An optional fallback value to use if the property is not defined.
     * @returns - The value of the Custom CSS Property, which is always a string.
     */
    readCSSCustomProperty(prop, fallback) {
      let value;

      if ('ShadyCSS' in window) {
        value = window.ShadyCSS.getComputedStyleValue(this, prop);
      } else {
        value = getComputedStyle(this, prop);
      }

      return value || fallback;
    }

  }

  return CSSReflectionMixin;
});