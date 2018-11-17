import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashProducer = class DashProducer extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.selectedContentTab = 0;
        this.selectedBidsAndPrizesTab = 0;
    }
    connectedCallback() {
        super.connectedCallback();
        this.updateCurrentTime = this.updateCurrentTime.bind(this);
        this.updateCurrentTime();
        setInterval(this.updateCurrentTime, 1000);
    }
    updateCurrentTime() {
        const date = new Date();
        this.currentTime = date.toLocaleTimeString('en-US', { hour12: true });
    }
};
tslib_1.__decorate([
    property({ type: String })
], DashProducer.prototype, "currentTime", void 0);
tslib_1.__decorate([
    property({ type: Number })
], DashProducer.prototype, "selectedContentTab", void 0);
tslib_1.__decorate([
    property({ type: Number })
], DashProducer.prototype, "selectedBidsAndPrizesTab", void 0);
DashProducer = tslib_1.__decorate([
    customElement('dash-producer')
], DashProducer);
export default DashProducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1wcm9kdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtcHJvZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQixZQUFZLEdBQWpDLE1BQXFCLFlBQWEsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFEOUU7O1FBTUMsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRy9CLDZCQUF3QixHQUFXLENBQUMsQ0FBQztJQWF0QyxDQUFDO0lBWEEsaUJBQWlCO1FBQ2hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELGlCQUFpQjtRQUNoQixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDRCxDQUFBO0FBbkJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2lEQUNMO0FBR3BCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3dEQUNNO0FBRy9CO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzhEQUNZO0FBUmpCLFlBQVk7SUFEaEMsYUFBYSxDQUFDLGVBQWUsQ0FBQztHQUNWLFlBQVksQ0FxQmhDO2VBckJvQixZQUFZIn0=