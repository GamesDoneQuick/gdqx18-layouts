import * as tslib_1 from "tslib";
const { customElement, property, observe } = Polymer.decorators;
let TimeInput = class TimeInput extends Polymer.mixinBehaviors([Polymer.IronValidatableBehavior], Polymer.Element) {
    constructor() {
        super(...arguments);
        this.invalid = false;
        this.validator = 'time-validator';
    }
    _computeValue(minutes, seconds) {
        this.value = `${minutes}:${seconds}`;
    }
    setMS(m, s) {
        this._minutes = m < 10 ? `0${m}` : m;
        this._seconds = s < 10 ? `0${s}` : s;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], TimeInput.prototype, "invalid", void 0);
tslib_1.__decorate([
    property({ type: String, notify: true })
], TimeInput.prototype, "value", void 0);
tslib_1.__decorate([
    property({ type: Number })
], TimeInput.prototype, "_minutes", void 0);
tslib_1.__decorate([
    property({ type: Number })
], TimeInput.prototype, "_seconds", void 0);
tslib_1.__decorate([
    property({ type: String })
], TimeInput.prototype, "validator", void 0);
tslib_1.__decorate([
    observe('_minutes', '_seconds')
], TimeInput.prototype, "_computeValue", null);
TimeInput = tslib_1.__decorate([
    customElement('time-input')
], TimeInput);
export default TimeInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWUtaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFHOUQsSUFBcUIsU0FBUyxHQUE5QixNQUFxQixTQUFVLFNBQVEsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFEakg7O1FBR0MsWUFBTyxHQUFZLEtBQUssQ0FBQztRQVl6QixjQUFTLEdBQUcsZ0JBQWdCLENBQUM7SUFXOUIsQ0FBQztJQVJBLGFBQWEsQ0FBQyxPQUFlLEVBQUUsT0FBZTtRQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsT0FBTyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxLQUFLLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNELENBQUE7QUF2QkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDOzBDQUMzQjtBQUd6QjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO3dDQUN6QjtBQUdkO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzJDQUNDO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzJDQUNDO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzRDQUNJO0FBRzdCO0lBREMsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7OENBRy9CO0FBbkJtQixTQUFTO0lBRDdCLGFBQWEsQ0FBQyxZQUFZLENBQUM7R0FDUCxTQUFTLENBeUI3QjtlQXpCb0IsU0FBUyJ9