import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
const {
  customElement
} = Polymer.decorators;
let TimeValidator = class TimeValidator extends Polymer.mixinBehaviors([Polymer.IronValidatorBehavior], Polymer.Element) {
  validate(value) {
    // This regex validates incomplete times (by design)
    return !value || value.match(/^[0-9]{0,2}:[0-9]{0,2}$/);
  }

};
TimeValidator = tslib_1.__decorate([customElement('time-validator')], TimeValidator);
export default TimeValidator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWUtdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNO0FBQUMsRUFBQTtBQUFELElBQWtCLE9BQU8sQ0FBQyxVQUFoQztBQUdBLElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBckIsU0FBMkMsT0FBTyxDQUFDLGNBQVIsQ0FBdUIsQ0FBQyxPQUFPLENBQUMscUJBQVQsQ0FBdkIsRUFBd0QsT0FBTyxDQUFDLE9BQWhFLENBQTNDLENBQW1IO0FBQ2xILEVBQUEsUUFBUSxDQUFDLEtBQUQsRUFBYztBQUNyQjtBQUNBLFdBQU8sQ0FBQyxLQUFELElBQVUsS0FBSyxDQUFDLEtBQU4sQ0FBWSx5QkFBWixDQUFqQjtBQUNBOztBQUppSCxDQUFuSDtBQUFxQixhQUFhLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURqQyxhQUFhLENBQUMsZ0JBQUQsQ0FDb0IsQ0FBQSxFQUFiLGFBQWEsQ0FBYjtlQUFBLGEiLCJzb3VyY2VSb290IjoiIn0=