var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
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
    GdqCountdown = __decorate([
        customElement('gdq-countdown')
    ], GdqCountdown);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqCountdown = GdqCountdown;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jb3VudGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDcEMsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDM0MsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFtQixrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hGLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7SUFHM0QsSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBYSxTQUFRLE9BQU8sQ0FBQyxPQUFPO1FBQ3pDLEtBQUs7WUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFZCxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxNQUFNLEVBQUU7b0JBQ1gsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUF1QixDQUFDO29CQUNqRCxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNoRDtZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxNQUFNLEVBQUU7b0JBQ1gsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUMzRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDeEM7cUJBQU07b0JBQ04sSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUM3QztnQkFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFRCxLQUFLO1lBQ0osTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVELElBQUk7WUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRCx5QkFBeUIsQ0FBQyxDQUFRO1lBQ2pDLElBQUssQ0FBUyxDQUFDLE1BQU0sSUFBSyxDQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDakQsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ2pEO1lBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVEOztXQUVHO1FBQ0gsZ0JBQWdCO1lBQ2YsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRTtnQkFDbkcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM5QztpQkFBTTtnQkFDTixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDekM7UUFDRixDQUFDO0tBQ0QsQ0FBQTtJQXRESyxZQUFZO1FBRGpCLGFBQWEsQ0FBQyxlQUFlLENBQUM7T0FDekIsWUFBWSxDQXNEakI7SUFFRCxtR0FBbUc7SUFDbEcsTUFBYyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQUMifQ==