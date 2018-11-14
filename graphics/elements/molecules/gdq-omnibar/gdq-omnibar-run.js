import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GdqOmnibarRun = class GdqOmnibarRun extends Polymer.Element {
    enter() {
        return this.$.listItem.enter();
    }
    exit() {
        return this.$.listItem.exit();
    }
    formatName(name) {
        return name.replace('\\n', ' ').trim();
    }
    concatenateRunners(run) {
        if (run.pk === 2640) {
            // Pre-Show
            return 'SpikeVegeta, feasel, Blechy, Protomagicalgirl & JHobz';
        }
        if (run.pk === 2779) {
            // Mega Man 1 - 3 Team Relay Race Any%
            return '12 Runners';
        }
        let concatenatedRunners = run.runners[0] ? run.runners[0].name : '';
        if (run.runners.length > 1) {
            concatenatedRunners = run.runners.slice(1).reduce((prev, curr, index, array) => {
                if (index === array.length - 1) {
                    return `${prev} & ${curr.name}`;
                }
                return `${prev}, ${curr.name}`;
            }, concatenatedRunners);
        }
        return concatenatedRunners;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GdqOmnibarRun.prototype, "run", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GdqOmnibarRun.prototype, "first", void 0);
GdqOmnibarRun = tslib_1.__decorate([
    customElement('gdq-omnibar-run')
], GdqOmnibarRun);
export default GdqOmnibarRun;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItcnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW9tbmliYXItcnVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFjLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFPekQsS0FBSztRQUNKLE9BQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUErQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxJQUFJO1FBQ0gsT0FBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQStCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELGtCQUFrQixDQUFDLEdBQVE7UUFDMUIsSUFBSSxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNwQixXQUFXO1lBQ1gsT0FBTyx1REFBdUQsQ0FBQztTQUMvRDtRQUVELElBQUksR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDcEIsc0NBQXNDO1lBQ3RDLE9BQU8sWUFBWSxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BFLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUM5RSxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDL0IsT0FBTyxHQUFHLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ2hDO2dCQUVELE9BQU8sR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hDLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxtQkFBbUIsQ0FBQztJQUM1QixDQUFDO0NBQ0QsQ0FBQTtBQXhDQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzswQ0FDaEI7QUFHVDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7NENBQ3JDO0FBTEssYUFBYTtJQURqQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7R0FDWixhQUFhLENBMENqQztlQTFDb0IsYUFBYSJ9