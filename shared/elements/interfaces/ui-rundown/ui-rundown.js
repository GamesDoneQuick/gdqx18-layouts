import * as tslib_1 from "tslib";
var UiRundownElement_1;
const { customElement, property } = Polymer.decorators;
const currentIntermission = nodecg.Replicant('currentIntermission');
const currentRun = nodecg.Replicant('currentRun');
const schedule = nodecg.Replicant('schedule');
const stopwatch = nodecg.Replicant('stopwatch');
let UiRundownElement = UiRundownElement_1 = class UiRundownElement extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.maxRunsToShow = 4;
        this.allowScrollback = false;
    }
    ready() {
        super.ready();
        this._debounceUpdateScheduleSlice = this._debounceUpdateScheduleSlice.bind(this);
        this._updateScheduleSlice = this._updateScheduleSlice.bind(this);
        currentIntermission.on('change', (_newVal, _oldVal, operations) => {
            const ignore = operations ?
                operations.every(operation => {
                    return operation.path.endsWith('/state');
                }) :
                false;
            if (ignore) {
                return;
            }
            this._debounceUpdateScheduleSlice();
        });
        currentRun.on('change', this._debounceUpdateScheduleSlice);
        schedule.on('change', this._debounceUpdateScheduleSlice);
        stopwatch.on('change', (newVal, oldVal) => {
            if (!oldVal || newVal.state !== oldVal.state || newVal.time.raw < oldVal.time.raw) {
                return this._debounceUpdateScheduleSlice();
            }
        });
    }
    scrollToFuture() {
        // There don't seem to be typings for IronListElement...
        this.$.remainderItems.scrollToIndex(this._futureStartIndex);
    }
    _debounceUpdateScheduleSlice() {
        this._updateScheduleSliceDebouncer = Polymer.Debouncer.debounce(this._updateScheduleSliceDebouncer, Polymer.Async.timeOut.after(10), this._updateScheduleSlice);
    }
    _updateScheduleSlice() {
        if (currentRun.status !== 'declared' ||
            schedule.status !== 'declared' ||
            stopwatch.status !== 'declared' ||
            currentIntermission.status !== 'declared' ||
            !currentIntermission.value ||
            !currentRun.value ||
            !schedule.value) {
            return;
        }
        let currentItems = [currentRun.value];
        if (currentIntermission.value.preOrPost === 'pre') {
            currentItems = [
                ...currentIntermission.value.content,
                ...currentItems
            ];
        }
        else {
            currentItems = currentItems.concat(currentIntermission.value.content);
        }
        // Start after whatever the last item was in currentItems.
        const lastCurrentItem = currentItems[currentItems.length - 1];
        const startIndex = schedule.value.findIndex(item => {
            return item.id === lastCurrentItem.id && item.type === lastCurrentItem.type;
        }) + 1;
        let numFoundRuns = 0;
        let endIndex;
        let lastRunOrder = currentRun.value.order;
        schedule.value.slice(startIndex).some((item, index) => {
            if (numFoundRuns < this.maxRunsToShow) {
                if (item.type === 'run') {
                    lastRunOrder = item.order;
                    numFoundRuns++;
                    if (numFoundRuns >= this.maxRunsToShow) {
                        endIndex = index;
                        return false;
                    }
                }
                return false;
            }
            if (item.type !== 'run' && item.order === lastRunOrder) {
                endIndex = index;
                return false;
            }
            return true;
        });
        if (this.allowScrollback) {
            this.remainderItems = schedule.value.slice(0);
            this._futureStartIndex = startIndex;
            this.scrollToFuture();
        }
        else {
            this.remainderItems = typeof endIndex === 'number' ?
                schedule.value.slice(startIndex, startIndex + endIndex + 1) :
                schedule.value.slice(startIndex);
        }
        this.currentItems = currentItems;
    }
    _maxRunsToShowChanged() {
        this._debounceUpdateScheduleSlice();
    }
    _showTooltip(e) {
        const notes = e.model.item.notes;
        if (!notes || notes.trim().length <= 0 || !e.target) {
            return;
        }
        this.$['tooltip-content'].innerHTML = notes
            .replace(/\r\n/g, '<br/>')
            .replace(/\n/g, '<br/>');
        const thisRect = this.getBoundingClientRect();
        const itemRect = e.target.getBoundingClientRect();
        const tooltipRect = this.$['tooltip-content'].getBoundingClientRect();
        const offset = -4;
        const tooltip = this.$.tooltip;
        tooltip.style.opacity = '1';
        tooltip.style.top = `${itemRect.top - thisRect.top - tooltipRect.height + offset}px`;
    }
    _hideTooltip() {
        this.$.tooltip.style.opacity = '0';
    }
};
tslib_1.__decorate([
    property({ type: Array })
], UiRundownElement.prototype, "schedule", void 0);
tslib_1.__decorate([
    property({ type: Array })
], UiRundownElement.prototype, "remainderItems", void 0);
tslib_1.__decorate([
    property({ type: Array })
], UiRundownElement.prototype, "currentItems", void 0);
tslib_1.__decorate([
    property({ type: Number, observer: UiRundownElement_1.prototype._maxRunsToShowChanged })
], UiRundownElement.prototype, "maxRunsToShow", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], UiRundownElement.prototype, "allowScrollback", void 0);
UiRundownElement = UiRundownElement_1 = tslib_1.__decorate([
    customElement('ui-rundown')
], UiRundownElement);
export default UiRundownElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcnVuZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVpLXJ1bmRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFzQixxQkFBcUIsQ0FBQyxDQUFDO0FBQ3pGLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFDdkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBaUIsVUFBVSxDQUFDLENBQUM7QUFDOUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUczRCxJQUFxQixnQkFBZ0Isd0JBQXJDLE1BQXFCLGdCQUFpQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQURsRjs7UUFZQyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUcxQixvQkFBZSxHQUFZLEtBQUssQ0FBQztJQXdJbEMsQ0FBQztJQW5JQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakUsbUJBQW1CLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDakUsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUM7Z0JBQzFCLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JB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