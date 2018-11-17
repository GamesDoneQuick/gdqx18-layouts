import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashInterviewLowerthirdRefillOption = class DashInterviewLowerthirdRefillOption extends Polymer.Element {
    accept() {
        this.dispatchEvent(new CustomEvent('accepted', {
            detail: {
                names: this.names
                    .filter(name => name !== '(none)')
                    .map(name => {
                    return { name };
                })
            }
        }));
    }
};
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], DashInterviewLowerthirdRefillOption.prototype, "type", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashInterviewLowerthirdRefillOption.prototype, "names", void 0);
DashInterviewLowerthirdRefillOption = tslib_1.__decorate([
    customElement('dash-interview-lowerthird-refill-option')
], DashInterviewLowerthirdRefillOption);
export default DashInterviewLowerthirdRefillOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbG93ZXJ0aGlyZC1yZWZpbGwtb3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaC1pbnRlcnZpZXctbG93ZXJ0aGlyZC1yZWZpbGwtb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFHckQsSUFBcUIsbUNBQW1DLEdBQXhELE1BQXFCLG1DQUFvQyxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTy9FLE1BQU07UUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRTtZQUM5QyxNQUFNLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3FCQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUM7cUJBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDWCxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDO2FBQ0g7U0FDRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRCxDQUFBO0FBaEJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQztpRUFDdEM7QUFHYjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztrRUFDUjtBQUxJLG1DQUFtQztJQUR2RCxhQUFhLENBQUMseUNBQXlDLENBQUM7R0FDcEMsbUNBQW1DLENBa0J2RDtlQWxCb0IsbUNBQW1DIn0=