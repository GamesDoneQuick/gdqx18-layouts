/**
 * @mixinFunction
 * @polymer
 */
export default Polymer.dedupingMixin((base) => {
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
            }
            else {
                value = getComputedStyle(this, prop);
            }
            return value || fallback;
        }
    }
    return CSSReflectionMixin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ1NTUmVmbGVjdGlvbk1peGluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ1NTUmVmbGVjdGlvbk1peGluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILGVBQWUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQWlDLEVBQUUsRUFBRTtJQUMxRTs7O09BR0c7SUFDSCxNQUFNLGtCQUFtQixTQUFRLElBQUk7UUFDcEM7Ozs7O1dBS0c7UUFDSCxxQkFBcUIsQ0FBQyxJQUFZLEVBQUUsUUFBYztZQUNqRCxJQUFJLEtBQUssQ0FBQztZQUNWLElBQUksVUFBVSxJQUFJLE1BQU0sRUFBRTtnQkFDekIsS0FBSyxHQUFJLE1BQWMsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ25FO2lCQUFNO2dCQUNOLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxJQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDNUM7WUFFRCxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUM7UUFDMUIsQ0FBQztLQUNEO0lBRUQsT0FBTyxrQkFBa0IsQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQyJ9