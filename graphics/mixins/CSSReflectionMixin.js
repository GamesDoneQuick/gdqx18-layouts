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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNTU1JlZmxlY3Rpb25NaXhpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUlBLGVBQWUsT0FBTyxDQUFDLGFBQVIsQ0FBdUIsSUFBRCxJQUFzQztBQUMxRTs7OztBQUlBLFFBQU0sa0JBQU4sU0FBaUMsSUFBakMsQ0FBcUM7QUFDcEM7Ozs7OztBQU1BLElBQUEscUJBQXFCLENBQUMsSUFBRCxFQUFlLFFBQWYsRUFBNkI7QUFDakQsVUFBSSxLQUFKOztBQUNBLFVBQUksY0FBYyxNQUFsQixFQUEwQjtBQUN6QixRQUFBLEtBQUssR0FBSSxNQUFjLENBQUMsUUFBZixDQUF3QixxQkFBeEIsQ0FBOEMsSUFBOUMsRUFBb0QsSUFBcEQsQ0FBVDtBQUNBLE9BRkQsTUFFTztBQUNOLFFBQUEsS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUQsRUFBYyxJQUFkLENBQXhCO0FBQ0E7O0FBRUQsYUFBTyxLQUFLLElBQUksUUFBaEI7QUFDQTs7QUFoQm1DOztBQW1CckMsU0FBTyxrQkFBUDtBQUNBLENBekJjLENBQWYiLCJzb3VyY2VSb290IjoiIn0=