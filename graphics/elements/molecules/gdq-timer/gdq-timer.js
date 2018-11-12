import * as tslib_1 from "tslib";
var GdqTimer_1;
import { TimelineLite, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
const stopwatch = nodecg.Replicant('stopwatch');
let GdqTimer = GdqTimer_1 = class GdqTimer extends Polymer.Element {
    ready() {
        super.ready();
        const timerTL = new TimelineLite({ autoRemoveChildren: true });
        stopwatch.on('change', (newVal, oldVal) => {
            this.hours = newVal.time.hours;
            this.minutes = newVal.time.minutes;
            this.seconds = newVal.time.seconds;
            this.milliseconds = newVal.time.milliseconds;
            if (oldVal) {
                if (newVal.state === 'running' && oldVal.state !== 'running') {
                    timerTL.from(this.$.startFlash, 1, {
                        opacity: 0.5,
                        ease: Power2.easeIn
                    });
                }
                else if (newVal.state !== 'running' && newVal.state !== oldVal.state) {
                    timerTL.clear();
                    this.$.startFlash.style.opacity = '0';
                }
                if (newVal.state === 'finished' && oldVal.state !== 'finished') {
                    timerTL.from(this.$.startFlash, 1, {
                        opacity: 0.5,
                        ease: Power2.easeIn
                    });
                }
            }
            this.notStarted = newVal.state === 'not_started';
            this.paused = newVal.state === 'paused';
            this.finished = newVal.state === 'finished';
        });
    }
    pausedChanged(newVal) {
        if (newVal && this.finished) {
            this.finished = false;
        }
    }
    finishedChanged(newVal) {
        if (newVal && this.paused) {
            this.paused = false;
        }
    }
    _lessThanEqZero(num) {
        return num <= 0;
    }
    _padTime(num) {
        return String(num).padStart(2, '0');
    }
    _formatMilliseconds(milliseconds) {
        return Math.floor(milliseconds / 100);
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GdqTimer.prototype, "notStarted", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, observer: GdqTimer_1.prototype.pausedChanged })
], GdqTimer.prototype, "paused", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, observer: GdqTimer_1.prototype.finishedChanged })
], GdqTimer.prototype, "finished", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GdqTimer.prototype, "hours", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GdqTimer.prototype, "minutes", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GdqTimer.prototype, "seconds", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GdqTimer.prototype, "milliseconds", void 0);
GdqTimer = GdqTimer_1 = tslib_1.__decorate([
    customElement('gdq-timer')
], GdqTimer);
export default GdqTimer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRpbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXRpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHMUMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFHM0QsSUFBcUIsUUFBUSxnQkFBN0IsTUFBcUIsUUFBUyxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBc0JwRCxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsTUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBRTdELFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFFN0MsSUFBSSxNQUFNLEVBQUU7Z0JBQ1gsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtvQkFDN0QsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUU7d0JBQ2xDLE9BQU8s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