import * as tslib_1 from "tslib";
const { customElement } = Polymer.decorators;
const countdownRunning = nodecg.Replicant('countdownRunning');
const countdown = nodecg.Replicant('countdown');
let GDQCountdownElement = class GDQCountdownElement extends Polymer.Element {
    ready() {
        super.ready();
        countdown.on('change', newVal => {
            if (newVal) {
                const timeInput = this.$.timeInput;
                timeInput.setMS(newVal.minutes, newVal.seconds);
            }
        });
        countdownRunning.on('change', newVal => {
            if (newVal) {
                this.$.countdownContainer.setAttribute('disabled', 'true');
                this.$.start.setAttribute('disabled-running', 'true');
                this.$.stop.removeAttribute('disabled');
            }
            else {
                this.$.countdownContainer.removeAttribute('disabled');
                this.$.start.removeAttribute('disabled-running');
                this.$.stop.setAttribute('disabled', 'true');
            }
            this.checkStartButton();
        });
    }
    start() {
        nodecg.sendMessage('startCountdown', this.$.timeInput.value);
    }
    stop() {
        nodecg.sendMessage('stopCountdown');
    }
    _handleTimeInvalidChanged(e) {
        if (e.detail && e.detail.value) {
            this.$.start.setAttribute('disabled-invalid', 'true');
        }
        else {
            this.$.start.removeAttribute('disabled-invalid');
        }
        this.checkStartButton();
    }
    /**
     * Enables or disables the timer start button based on some criteria.
     */
    checkStartButton() {
        if (this.$.start.hasAttribute('disabled-invalid') || this.$.start.hasAttribute('disabled-running')) {
            this.$.start.setAttribute('disabled', 'true');
        }
        else {
            this.$.start.removeAttribute('disabled');
        }
    }
};
GDQCountdownElement = tslib_1.__decorate([
    customElement('gdq-countdown')
], GDQCountdownElement);
export default GDQCountdownElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jb3VudGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQzNDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBbUIsa0JBQWtCLENBQUMsQ0FBQztBQUNoRixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBRzNELElBQXFCLG1CQUFtQixHQUF4QyxNQUFxQixtQkFBb0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQUMvRCxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxNQUFNLEVBQUU7Z0JBQ1gsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUE2QixDQUFDO2dCQUN2RCxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hEO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3RDLElBQUksTUFBTSxFQUFFO2dCQUNYLElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEM7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1lBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSztRQUNKLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxJQUFJO1FBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQseUJBQXlCLENBQUMsQ0FBUTtRQUNqQyxJQUFLLENBQVMsQ0FBQyxNQUFNLElBQUssQ0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDakQsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDTixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQjtRQUNmLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDbkcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ04sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0YsQ0FBQztDQUNELENBQUE7QUF0RG9CLG1CQUFtQjtJQUR2QyxhQUFhLENBQUMsZUFBZSxDQUFDO0dBQ1YsbUJBQW1CLENBc0R2QztlQXREb0IsbUJBQW1CIn0=