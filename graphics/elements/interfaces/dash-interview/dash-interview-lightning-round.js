import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const questions = nodecg.Replicant('interview:questionTweets');
const questionShowing = nodecg.Replicant('interview:questionShowing');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let DashInterviewLightningRound = class DashInterviewLightningRound extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     */
    constructor() {
        super(...arguments);
        this.questionShowing = false;
    }
    ready() {
        super.ready();
        questions.on('change', newVal => {
            this.set('replies', newVal);
        });
        questionShowing.on('change', newVal => {
            this.questionShowing = newVal;
        });
    }
    openEndInterviewDialog() {
        this.$.endInterviewDialog.open();
    }
    endInterview() {
        nodecg.sendMessage('interview:end');
    }
};
tslib_1.__decorate([
    property({ type: Boolean, notify: true })
], DashInterviewLightningRound.prototype, "questionShowing", void 0);
tslib_1.__decorate([
    property({ type: Object })
], DashInterviewLightningRound.prototype, "replies", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterviewLightningRound.prototype, "_markingTopQuestionAsDone", void 0);
DashInterviewLightningRound = tslib_1.__decorate([
    customElement('dash-interview-lightning-round')
], DashInterviewLightningRound);
export default DashInterviewLightningRound;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbGlnaHRuaW5nLXJvdW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaC1pbnRlcnZpZXctbGlnaHRuaW5nLXJvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3hFLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsMkJBQTJCLENBQUMsQ0FBQztBQUUvRTs7OztHQUlHO0FBRUgsSUFBcUIsMkJBQTJCLEdBQWhELE1BQXFCLDJCQUE0QixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQU43Rjs7OztPQUlHO0lBQ0g7O1FBR0Msb0JBQWUsR0FBWSxLQUFLLENBQUM7SUEyQmxDLENBQUM7SUFuQkEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQXlDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVELFlBQVk7UUFDWCxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDRCxDQUFBO0FBM0JBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7b0VBQ1A7QUFHakM7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7NERBQ1I7QUFHakI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7OEVBQ1M7QUFSZiwyQkFBMkI7SUFEL0MsYUFBYSxDQUFDLGdDQUFnQyxDQUFDO0dBQzNCLDJCQUEyQixDQTZCL0M7ZUE3Qm9CLDJCQUEyQiJ9