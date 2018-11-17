import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentHost = nodecg.Replicant('currentHost');
/**
 * @customElement
 * @polymer
 */
let DashHostName = class DashHostName extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this._enteredName = '';
    }
    ready() {
        super.ready();
        currentHost.on('change', newVal => {
            this.currentHost = newVal;
        });
    }
    take() {
        currentHost.value = this._enteredName;
        this._enteredName = '';
    }
    _falsey(value) {
        return !value;
    }
};
tslib_1.__decorate([
    property({ type: String })
], DashHostName.prototype, "currentHost", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashHostName.prototype, "_enteredName", void 0);
DashHostName = tslib_1.__decorate([
    customElement('dash-host-name')
], DashHostName);
export default DashHostName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LW5hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWhvc3QtbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWMsYUFBYSxDQUFDLENBQUM7QUFFakU7OztHQUdHO0FBRUgsSUFBcUIsWUFBWSxHQUFqQyxNQUFxQixZQUFhLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFMekQ7OztPQUdHO0lBQ0g7O1FBTUMsaUJBQVksR0FBVyxFQUFFLENBQUM7SUFpQjNCLENBQUM7SUFmQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSTtRQUNILFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQVU7UUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRCxDQUFBO0FBcEJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2lEQUNMO0FBR3BCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2tEQUNDO0FBTE4sWUFBWTtJQURoQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7R0FDWCxZQUFZLENBc0JoQztlQXRCb0IsWUFBWSJ9