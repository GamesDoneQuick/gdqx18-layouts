import * as tslib_1 from "tslib";
import AtomTinyAlerts from '../atom-tiny-alerts/atom-tiny-alerts';
const { customElement } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtomSubAlerts = class AtomSubAlerts extends AtomTinyAlerts {
    ready() {
        super.ready();
        nodecg.listenFor('subscription', this._handleSubscription.bind(this));
    }
    _handleSubscription(subscription) {
        let backgroundColor = 'white';
        let holdDuration = 0.067;
        let text = 'New';
        if (subscription.sub_plan && subscription.sub_plan.toLowerCase() === 'prime') {
            backgroundColor = '#6441a4';
            text = 'Prime';
        }
        else if (subscription.context && subscription.context.toLowerCase() === 'subgift') {
            backgroundColor = '#00ffff';
            text = 'Gift';
        }
        else if (subscription.sub_plan === '2000') {
            backgroundColor = '#ffba00';
            holdDuration *= 3;
            text = '$9.99';
        }
        else if (subscription.sub_plan === '3000') {
            backgroundColor = '#ff0099';
            holdDuration *= 6;
            text = '$24.99';
        }
        if (subscription.months <= 1) {
            text += ' Sub';
        }
        else {
            text += ` Resub x${subscription.months}`;
        }
        this.addAlert({
            text,
            backgroundColor,
            holdDuration
        });
    }
};
AtomSubAlerts = tslib_1.__decorate([
    customElement('atom-sub-alerts')
], AtomSubAlerts);
export default AtomSubAlerts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1zdWItYWxlcnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXRvbS1zdWItYWxlcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLGNBQWMsTUFBTSxzQ0FBc0MsQ0FBQztBQW1CbEUsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFM0M7OztHQUdHO0FBRUgsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFjLFNBQVEsY0FBYztJQUN4RCxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxZQUFnQztRQUNuRCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUM7UUFDOUIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUVqQixJQUFJLFlBQVksQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUU7WUFDN0UsZUFBZSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ2Y7YUFBTSxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxTQUFTLEVBQUU7WUFDcEYsZUFBZSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLEdBQUcsTUFBTSxDQUFDO1NBQ2Q7YUFBTSxJQUFJLFlBQVksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1lBQzVDLGVBQWUsR0FBRyxTQUFTLENBQUM7WUFDNUIsWUFBWSxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ2Y7YUFBTSxJQUFJLFlBQVksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1lBQzVDLGVBQWUsR0FBRyxTQUFTLENBQUM7WUFDNUIsWUFBWSxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUM3QixJQUFJLElBQUksTUFBTSxDQUFDO1NBQ2Y7YUFBTTtZQUNOLElBQUksSUFBSSxXQUFXLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN6QztRQUVELElBQUksQ0FBQyxRQUFRLENBQUM7WUFDYixJQUFJO1lBQ0osZUFBZTtZQUNmLFlBQVk7U0FDWixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0QsQ0FBQTtBQXZDb0IsYUFBYTtJQURqQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7R0FDWixhQUFhLENBdUNqQztlQXZDb0IsYUFBYSJ9