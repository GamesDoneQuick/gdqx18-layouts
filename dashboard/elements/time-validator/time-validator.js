import * as tslib_1 from "tslib";
const { customElement } = Polymer.decorators;
let TimeValidator = class TimeValidator extends Polymer.mixinBehaviors([Polymer.IronValidatorBehavior], Polymer.Element) {
    validate(value) {
        // This regex validates incomplete times (by design)
        return !value || value.match(/^[0-9]{0,2}:[0-9]{0,2}$/);
    }
};
TimeValidator = tslib_1.__decorate([
    customElement('time-validator')
], TimeValidator);
export default TimeValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS12YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aW1lLXZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFHM0MsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFjLFNBQVEsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDbEgsUUFBUSxDQUFDLEtBQWE7UUFDckIsb0RBQW9EO1FBQ3BELE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRCxDQUFBO0FBTG9CLGFBQWE7SUFEakMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0dBQ1gsYUFBYSxDQUtqQztlQUxvQixhQUFhIn0=