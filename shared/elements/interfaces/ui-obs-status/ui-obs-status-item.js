import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const cyclingRecordingsRep = nodecg.Replicant('obs:cyclingRecordings');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let UiObsStatusItem = class UiObsStatusItem extends Polymer.MutableData(Polymer.Element) {
    static get observers() {
        return [
            '_updateStatus(_websocket.status, _cyclingRecordings)'
        ];
    }
    ready() {
        super.ready();
        cyclingRecordingsRep.on('change', newVal => {
            this._cyclingRecordings = newVal;
        });
    }
    _transformsNamespace(namespace) {
        return namespace.slice(0, -3);
    }
    _updateStatus(websocketStatus, cyclingRecordings) {
        this.status = this._calcStatus(websocketStatus, cyclingRecordings);
    }
    _calcStatus(websocketStatus, cyclingRecordings) {
        if (websocketStatus === 'connected') {
            return cyclingRecordings ? 'cycling' : websocketStatus;
        }
        return websocketStatus;
    }
};
tslib_1.__decorate([
    property({ type: String })
], UiObsStatusItem.prototype, "namespace", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], UiObsStatusItem.prototype, "status", void 0);
UiObsStatusItem = tslib_1.__decorate([
    customElement('ui-obs-status-item')
], UiObsStatusItem);
export default UiObsStatusItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktb2JzLXN0YXR1cy1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktb2JzLXN0YXR1cy1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFnQkEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBeUIsdUJBQXVCLENBQUMsQ0FBQztBQUUvRjs7OztHQUlHO0FBRUgsSUFBcUIsZUFBZSxHQUFwQyxNQUFxQixlQUFnQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQVVoRixNQUFNLEtBQUssU0FBUztRQUNuQixPQUFPO1lBQ04sc0RBQXNEO1NBQ3RELENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxTQUFpQjtRQUNyQyxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGFBQWEsQ0FBQyxlQUFnRCxFQUFFLGlCQUEwQjtRQUN6RixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELFdBQVcsQ0FBQyxlQUFnRCxFQUFFLGlCQUEwQjtRQUN2RixJQUFJLGVBQWUsS0FBSyxXQUFXLEVBQUU7WUFDcEMsT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7U0FDdkQ7UUFFRCxPQUFPLGVBQWUsQ0FBQztJQUN4QixDQUFDO0NBQ0QsQ0FBQTtBQXBDQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztrREFDUDtBQUdsQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7K0NBQ3BDO0FBTEssZUFBZTtJQURuQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7R0FDZixlQUFlLENBc0NuQztlQXRDb0IsZUFBZSJ9