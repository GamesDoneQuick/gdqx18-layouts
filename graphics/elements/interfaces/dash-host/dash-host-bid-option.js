import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let DashHostBidOption = class DashHostBidOption extends Polymer.Element {
    calcOptionMeterFillStyle(bid, option) {
        if (!bid || !option || !bid.options || bid.options.length <= 0) {
            return '';
        }
        let percent = option.rawTotal / bid.options[0].rawTotal;
        percent = Math.max(percent, 0); // Clamp to min 0
        percent = Math.min(percent, 1); // Clamp to max 1
        if (Number.isNaN(percent)) {
            percent = 0;
        }
        return `transform: scaleX(${percent});`;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], DashHostBidOption.prototype, "bid", void 0);
tslib_1.__decorate([
    property({ type: Object })
], DashHostBidOption.prototype, "option", void 0);
tslib_1.__decorate([
    property({ type: Number, reflectToAttribute: true })
], DashHostBidOption.prototype, "index", void 0);
DashHostBidOption = tslib_1.__decorate([
    customElement('dash-host-bid-option')
], DashHostBidOption);
export default DashHostBidOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LWJpZC1vcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWhvc3QtYmlkLW9wdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLGlCQUFpQixHQUF0QyxNQUFxQixpQkFBa0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQVU3RCx3QkFBd0IsQ0FBQyxHQUFjLEVBQUUsTUFBZ0I7UUFDeEQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQy9ELE9BQU8sRUFBRSxDQUFDO1NBQ1Y7UUFFRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3hELE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQjtRQUNqRCxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7UUFDakQsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFCLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FDWjtRQUNELE9BQU8scUJBQXFCLE9BQU8sSUFBSSxDQUFDO0lBQ3pDLENBQUM7Q0FDRCxDQUFBO0FBckJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzhDQUNWO0FBR2Y7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7aURBQ1I7QUFHakI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDO2dEQUNyQztBQVJNLGlCQUFpQjtJQURyQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7R0FDakIsaUJBQWlCLENBdUJyQztlQXZCb0IsaUJBQWlCIn0=