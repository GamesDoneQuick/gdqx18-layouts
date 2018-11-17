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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktb2JzLXN0YXR1cy1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktb2JzLXN0YXR1cy1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUF5Qix1QkFBdUIsQ0FBQyxDQUFDO0FBRS9GOzs7O0dBSUc7QUFFSCxJQUFxQixlQUFlLEdBQXBDLE1BQXFCLGVBQWdCLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBVWhGLE1BQU0sS0FBSyxTQUFTO1FBQ25CLE9BQU87WUFDTixzREFBc0Q7U0FDdEQsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2Qsb0JBQW9CLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG9CQUFvQixDQUFDLFNBQWlCO1FBQ3JDLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsYUFBYSxDQUFDLGVBQWtDLEVBQUUsaUJBQTBCO1FBQzNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsV0FBVyxDQUFDLGVBQWtDLEVBQUUsaUJBQTBCO1FBQ3pFLElBQUksZUFBZSxLQUFLLFdBQVcsRUFBRTtZQUNwQyxPQUFPLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQztTQUN2RDtRQUVELE9BQU8sZUFBZSxDQUFDO0lBQ3hCLENBQUM7Q0FDRCxDQUFBO0FBcENBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2tEQUNQO0FBR2xCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzsrQ0FDcEM7QUFMSyxlQUFlO0lBRG5DLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztHQUNmLGVBQWUsQ0FzQ25DO2VBdENvQixlQUFlIn0=