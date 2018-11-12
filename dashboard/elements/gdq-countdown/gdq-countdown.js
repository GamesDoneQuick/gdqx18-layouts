import * as tslib_1 from "tslib";
const { customElement } = Polymer.decorators;
const countdownRunning = nodecg.Replicant('countdownRunning');
const countdown = nodecg.Replicant('countdown');
let GdqCountdown = class GdqCountdown extends Polymer.Element {
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
GdqCountdown = tslib_1.__decorate([
    customElement('gdq-countdown')
], GdqCountdown);
export default GdqCountdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jb3VudGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQzNDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBbUIsa0JBQWtCLENBQUMsQ0FBQztBQUNoRixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBRzNELElBQXFCLFlBQVksR0FBakMsTUFBcUIsWUFBYSxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBQ3hELEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFZCxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUMvQixJQUFJLE1BQU0sRUFBRTtnQkFDWCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQXNCLENBQUM7Z0JBQ2hELFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEQ7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN4QztpQkFBTTtnQkFDTixJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDN0M7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxLQUFLO1FBQ0osTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELElBQUk7UUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCx5QkFBeUIsQ0FBQyxDQUFRO1FBQ2pDLElBQUssQ0FBUyxDQUFDLE1BQU0sSUFBSyxDQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNqRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNOLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCO1FBQ2YsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNuRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzlDO2FBQU07WUFDTixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekM7SUFDRixDQUFDO0NBQ0QsQ0FBQTtBQXREb0IsWUFBWTtJQURoQyxhQUFhLENBQUMsZUFBZSxDQUFDO0dBQ1YsWUFBWSxDQXNEaEM7ZUF0RG9CLFlBQVkifQ==