import * as tslib_1 from "tslib";
var GdqOmnibarMilestoneTrackerPoint_1;
const { customElement, property } = Polymer.decorators;
const ONE_MILLION = 1000000;
let GdqOmnibarMilestoneTrackerPoint = GdqOmnibarMilestoneTrackerPoint_1 = class GdqOmnibarMilestoneTrackerPoint extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.align = 'left';
        this.dropTrailingZeroes = false;
    }
    _alignChanged(newVal) {
        const bodyElem = this.$.body;
        if (newVal !== 'center') {
            bodyElem.style.left = '';
        }
        const bodyRect = this.$.body.getBoundingClientRect();
        bodyElem.style.left = `${(bodyRect.width / -2) + 1.5}px`;
    }
    _calcDisplayAmount(amount) {
        return `$${this._formatAmount(amount / ONE_MILLION)}M`;
    }
    _formatAmount(amount) {
        let amountString = String(amount).substr(0, 4);
        if (this.dropTrailingZeroes) {
            while ((amountString.endsWith('0') || amountString.endsWith('.')) &&
                amountString.length > 1) {
                amountString = amountString.slice(0, -1);
            }
        }
        // Use the monospace version of the "1" character in the gdqpixel font.
        return amountString.replace(/1/ig, '\u00C0');
    }
};
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true, observer: GdqOmnibarMilestoneTrackerPoint_1.prototype._alignChanged })
], GdqOmnibarMilestoneTrackerPoint.prototype, "align", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GdqOmnibarMilestoneTrackerPoint.prototype, "amount", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GdqOmnibarMilestoneTrackerPoint.prototype, "dropTrailingZeroes", void 0);
GdqOmnibarMilestoneTrackerPoint = GdqOmnibarMilestoneTrackerPoint_1 = tslib_1.__decorate([
    customElement('gdq-omnibar-milestone-tracker-point')
], GdqOmnibarMilestoneTrackerPoint);
export default GdqOmnibarMilestoneTrackerPoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItbWlsZXN0b25lLXRyYWNrZXItcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtb21uaWJhci1taWxlc3RvbmUtdHJhY2tlci1wb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUM7QUFJNUIsSUFBcUIsK0JBQStCLHVDQUFwRCxNQUFxQiwrQkFBZ0MsU0FBUSxPQUFPLENBQUMsT0FBTztJQUQ1RTs7UUFHQyxVQUFLLEdBQWMsTUFBTSxDQUFDO1FBTTFCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztJQStCckMsQ0FBQztJQTdCQSxhQUFhLENBQUMsTUFBaUI7UUFDOUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFzQixDQUFDO1FBQy9DLElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUN4QixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7U0FDekI7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3JELFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDMUQsQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQWM7UUFDaEMsT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7SUFDeEQsQ0FBQztJQUVELGFBQWEsQ0FBQyxNQUFjO1FBQzNCLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLE9BQ0MsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFELFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNyQjtnQkFDRixZQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6QztTQUNEO1FBRUQsdUVBQXVFO1FBQ3ZFLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNELENBQUE7QUFyQ0E7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsaUNBQStCLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBQyxDQUFDOzhEQUM1RjtBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzsrREFDVjtBQUdmO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDOzJFQUNVO0FBUmhCLCtCQUErQjtJQURuRCxhQUFhLENBQUMscUNBQXFDLENBQUM7R0FDaEMsK0JBQStCLENBdUNuRDtlQXZDb0IsK0JBQStCIn0=