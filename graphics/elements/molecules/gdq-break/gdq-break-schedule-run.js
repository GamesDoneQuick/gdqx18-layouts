import * as tslib_1 from "tslib";
var GdqBreakScheduleRun_1;
import { TweenLite, TimelineMax, Sine } from 'gsap';
const { customElement, property } = Polymer.decorators;
const DISPALY_DURATION = nodecg.bundleConfig.displayDuration;
/**
 * @customElement
 * @polymer
 */
let GdqBreakScheduleRun = GdqBreakScheduleRun_1 = class GdqBreakScheduleRun extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.upNext = false;
        this._currentRunnerIndex = 0;
    }
    ready() {
        super.ready();
        this.hidden = true;
    }
    _runChanged(newVal) {
        this.hidden = !newVal;
        if (!newVal) {
            return;
        }
        const WIDTH_ADDED_BY_BORDERS = 2;
        const PADDING_OF_INFO_RUNNER = 48;
        const infoRunnerElem = this.$['info-runner'];
        this._killRunnerLoopTimeline();
        infoRunnerElem.maxWidth = 0;
        infoRunnerElem.text = this._getLongestName(newVal.runners);
        TweenLite.set(infoRunnerElem, { opacity: 1, width: 'auto' });
        TweenLite.set(infoRunnerElem.$.fittedContent, { scaleX: 1 });
        Polymer.RenderStatus.beforeNextRender(this, () => {
            infoRunnerElem.maxWidth =
                this.$.info.clientWidth -
                    WIDTH_ADDED_BY_BORDERS -
                    PADDING_OF_INFO_RUNNER -
                    this.$['info-category'].clientWidth;
            infoRunnerElem.style.width = `${this.$['info-runner'].clientWidth - PADDING_OF_INFO_RUNNER}px`;
            infoRunnerElem.text = newVal.runners[0].name;
            if (newVal.runners.length > 1) {
                this._killRunnerLoopTimeline();
                this._runnerTimeline = this._createRunnerLoopTimeline(newVal.runners);
            }
        });
    }
    _createRunnerLoopTimeline(runners) {
        const tl = new TimelineMax({ repeat: -1 });
        runners.slice(1).concat([runners[0]]).forEach(runner => {
            tl.to(this.$['info-runner'], 0.5, {
                opacity: 0,
                ease: Sine.easeInOut
            }, `+=${DISPALY_DURATION}`);
            tl.call(() => {
                this.$['info-runner'].text = runner.name;
            });
            tl.to(this.$['info-runner'], 0.5, {
                opacity: 1,
                ease: Sine.easeInOut
            }, '+=0.1');
        });
        return tl;
    }
    _killRunnerLoopTimeline() {
        if (this._runnerTimeline) {
            this._runnerTimeline.kill();
            this._runnerTimeline = null;
        }
    }
    _formatRunName(runName) {
        if (!runName || typeof runName !== 'string') {
            return '?';
        }
        return runName.replace(/\\n/g, ' ');
    }
    _getLongestName(runners) {
        return runners.reduce((accumulator, currentValue) => {
            if (!currentValue || !currentValue.name) {
                return accumulator;
            }
            return currentValue.name.length > accumulator.length ? currentValue.name : accumulator;
        }, '');
    }
};
tslib_1.__decorate([
    property({ type: Object, observer: GdqBreakScheduleRun_1.prototype._runChanged })
], GdqBreakScheduleRun.prototype, "run", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GdqBreakScheduleRun.prototype, "upNext", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GdqBreakScheduleRun.prototype, "_currentRunnerIndex", void 0);
GdqBreakScheduleRun = GdqBreakScheduleRun_1 = tslib_1.__decorate([
    customElement('gdq-break-schedule-run')
], GdqBreakScheduleRun);
export default GdqBreakScheduleRun;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLXNjaGVkdWxlLXJ1bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1icmVhay1zY2hlZHVsZS1ydW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFbEQsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7QUFFN0Q7OztHQUdHO0FBRUgsSUFBcUIsbUJBQW1CLDJCQUF4QyxNQUFxQixtQkFBb0IsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFMckY7OztPQUdHO0lBQ0g7O1FBTUMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUd4Qix3QkFBbUIsR0FBVyxDQUFDLENBQUM7SUF3RmpDLENBQUM7SUFwRkEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBVztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWixPQUFPO1NBQ1A7UUFFRCxNQUFNLHNCQUFzQixHQUFHLENBQUMsQ0FBQztRQUNqQyxNQUFNLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUNsQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBb0IsQ0FBQztRQUVoRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUU5QixjQUFzQixDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDcEMsY0FBc0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFD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