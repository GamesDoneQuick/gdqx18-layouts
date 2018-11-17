import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const checklist = nodecg.Replicant('checklist');
/**
 * @customElement
 * @polymer
 */
let DashProducerChecklist = class DashProducerChecklist extends Polymer.MutableData(Polymer.Element) {
    ready() {
        super.ready();
        checklist.on('change', newVal => {
            this.extraContent = newVal.extraContent;
            this.techStationDuties = newVal.techStationDuties;
            this.stageTechDuties = newVal.stageTechDuties;
            this.audioEngineerDuties = newVal.audioEngineerDuties;
            this.specialDuties = newVal.special;
        });
    }
    _calcItemName(item) {
        return item ? (item.shortName || item.name) : '';
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklist.prototype, "stageTechDuties", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklist.prototype, "extraContent", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklist.prototype, "audioReady", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklist.prototype, "techStationDuties", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklist.prototype, "audioEngineerDuties", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklist.prototype, "specialDuties", void 0);
DashProducerChecklist = tslib_1.__decorate([
    customElement('dash-producer-checklist')
], DashProducerChecklist);
export default DashProducerChecklist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1wcm9kdWNlci1jaGVja2xpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLXByb2R1Y2VyLWNoZWNrbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFFM0Q7OztHQUdHO0FBRUgsSUFBcUIscUJBQXFCLEdBQTFDLE1BQXFCLHFCQUFzQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQW1CdEYsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUN4QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUM5QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDO1lBQ3RELElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBbUI7UUFDaEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0NBQ0QsQ0FBQTtBQS9CQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzs4REFDUTtBQUdoQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzsyREFDSztBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzt5REFDRztBQUczQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztnRUFDVTtBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztrRUFDWTtBQUdwQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzs0REFDTTtBQWpCVixxQkFBcUI7SUFEekMsYUFBYSxDQUFDLHlCQUF5QixDQUFDO0dBQ3BCLHFCQUFxQixDQWlDekM7ZUFqQ29CLHFCQUFxQiJ9