import * as tslib_1 from "tslib";
var AtomRefreshIndicator_1;
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtomRefreshIndicator = AtomRefreshIndicator_1 = class AtomRefreshIndicator extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.indeterminate = true;
        this.timeUntilRefresh = ':??';
    }
    startCountdown(seconds) {
        const meterFillElem = this.$['meter-fill'];
        this.indeterminate = false;
        this.stopCountdown();
        meterFillElem.style.transform = '';
        const startTimestamp = Date.now();
        this._countdownInterval = window.setInterval(() => {
            const nowTimestamp = Date.now();
            const millisecondsElapsed = nowTimestamp - startTimestamp;
            const secondsRemaining = seconds - Math.ceil(millisecondsElapsed / 1000);
            const percentElapsed = Math.min(millisecondsElapsed / (seconds * 1000), 1) * 100;
            meterFillElem.style.transform = `translateX(-${percentElapsed}%)`;
            this.timeUntilRefresh = `:${String(secondsRemaining).padStart(2, '0')}`;
            if (secondsRemaining <= 0) {
                clearInterval(this._countdownInterval);
                this.indeterminate = true;
            }
        }, 1 / 60);
    }
    stopCountdown() {
        if (this._countdownInterval) {
            clearInterval(this._countdownInterval);
        }
    }
    _indeterminateChanged(newVal) {
        if (newVal) {
            this.stopCountdown();
            this.timeUntilRefresh = ':00';
        }
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, observer: AtomRefreshIndicator_1.prototype._indeterminateChanged })
], AtomRefreshIndicator.prototype, "indeterminate", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomRefreshIndicator.prototype, "timeUntilRefresh", void 0);
AtomRefreshIndicator = AtomRefreshIndicator_1 = tslib_1.__decorate([
    customElement('atom-refresh-indicator')
], AtomRefreshIndicator);
export default AtomRefreshIndicator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1yZWZyZXNoLWluZGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0b20tcmVmcmVzaC1pbmRpY2F0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsb0JBQW9CLDRCQUF6QyxNQUFxQixvQkFBcUIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUxqRTs7O09BR0c7SUFDSDs7UUFHQyxrQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixxQkFBZ0IsR0FBVyxLQUFLLENBQUM7SUF1Q2xDLENBQUM7SUFuQ0EsY0FBYyxDQUFDLE9BQWU7UUFDN0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQW1CLENBQUM7UUFDN0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVuQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ2pELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNoQyxNQUFNLG1CQUFtQixHQUFHLFlBQVksR0FBRyxjQUFjLENBQUM7WUFDMUQsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN6RSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUVqRixhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxlQUFlLGNBQWMsSUFBSSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUV4RSxJQUFJLGdCQUFnQixJQUFJLENBQUMsRUFBRTtnQkFDMUIsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzthQUMxQjtRQUNGLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsYUFBYTtRQUNaLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUN2QztJQUNGLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxNQUFlO1FBQ3BDLElBQUksTUFBTSxFQUFFO1lBQ1gsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7U0FDOUI7SUFDRixDQUFDO0NBQ0QsQ0FBQTtBQTFDQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxzQkFBb0IsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUMsQ0FBQzsyREFDdEY7QUFHOUI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7OERBQ1E7QUFMYixvQkFBb0I7SUFEeEMsYUFBYSxDQUFDLHdCQUF3QixDQUFDO0dBQ25CLG9CQUFvQixDQTRDeEM7ZUE1Q29CLG9CQUFvQiJ9