import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GdqOmnibarPrize = class GdqOmnibarPrize extends Polymer.Element {
    enter() {
        return this.$.listItem.enter();
    }
    exit() {
        return this.$.listItem.exit();
    }
    calcBidAmountText(prize) {
        return prize.sumdonations ?
            `${prize.minimumbid} in Total Donations` :
            `${prize.minimumbid} Single Donation`;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GdqOmnibarPrize.prototype, "prize", void 0);
GdqOmnibarPrize = tslib_1.__decorate([
    customElement('gdq-omnibar-prize')
], GdqOmnibarPrize);
export default GdqOmnibarPrize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItcHJpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtb21uaWJhci1wcml6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLGVBQWUsR0FBcEMsTUFBcUIsZUFBZ0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQUkzRCxLQUFLO1FBQ0osT0FBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQStCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELElBQUk7UUFDSCxPQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBK0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBWTtRQUM3QixPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQixHQUFHLEtBQUssQ0FBQyxVQUFVLHFCQUFxQixDQUFDLENBQUM7WUFDMUMsR0FBRyxLQUFLLENBQUMsVUFBVSxrQkFBa0IsQ0FBQztJQUN4QyxDQUFDO0NBQ0QsQ0FBQTtBQWZBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzhDQUNaO0FBRk8sZUFBZTtJQURuQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7R0FDZCxlQUFlLENBaUJuQztlQWpCb0IsZUFBZSJ9