import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const cashTotal = nodecg.Replicant('total');
const bitsTotal = nodecg.Replicant('bits:total');
let DashHostTotals = class DashHostTotals extends Polymer.Element {
    connectedCallback() {
        super.connectedCallback();
        cashTotal.on('change', newVal => {
            this.cashTotal = newVal.formatted;
        });
        bitsTotal.on('change', newVal => {
            this.bitsTotal = newVal.toLocaleString('en-US');
        });
    }
};
tslib_1.__decorate([
    property({ type: String })
], DashHostTotals.prototype, "cashTotal", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashHostTotals.prototype, "bitsTotal", void 0);
DashHostTotals = tslib_1.__decorate([
    customElement('dash-host-totals')
], DashHostTotals);
export default DashHostTotals;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LXRvdGFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaG9zdC10b3RhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFRLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWMsWUFBWSxDQUFDLENBQUM7QUFHOUQsSUFBcUIsY0FBYyxHQUFuQyxNQUFxQixjQUFlLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFPMUQsaUJBQWlCO1FBQ2hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRCxDQUFBO0FBZEE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7aURBQ1A7QUFHbEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7aURBQ1A7QUFMRSxjQUFjO0lBRGxDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztHQUNiLGNBQWMsQ0FnQmxDO2VBaEJvQixjQUFjIn0=