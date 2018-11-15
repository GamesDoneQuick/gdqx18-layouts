import * as tslib_1 from "tslib";
var UiRundown_1;
const { customElement, property } = Polymer.decorators;
const currentIntermission = nodecg.Replicant('currentIntermission');
const currentRun = nodecg.Replicant('currentRun');
const schedule = nodecg.Replicant('schedule');
const stopwatch = nodecg.Replicant('stopwatch');
let UiRundown = UiRundown_1 = class UiRundown extends Polymer.MutableData(Polymer.Element) {
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
], UiRundown.prototype, "schedule", void 0);
tslib_1.__decorate([
    property({ type: Array })
], UiRundown.prototype, "remainderItems", void 0);
tslib_1.__decorate([
    property({ type: Array })
], UiRundown.prototype, "currentItems", void 0);
tslib_1.__decorate([
    property({ type: Number, observer: UiRundown_1.prototype._maxRunsToShowChanged })
], UiRundown.prototype, "maxRunsToShow", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], UiRundown.prototype, "allowScrollback", void 0);
UiRundown = UiRundown_1 = tslib_1.__decorate([
    customElement('ui-rundown')
], UiRundown);
export default UiRundown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcnVuZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVpLXJ1bmRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFzQixxQkFBcUIsQ0FBQyxDQUFDO0FBQ3pGLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFDdkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBaUIsVUFBVSxDQUFDLENBQUM7QUFDOUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUczRCxJQUFxQixTQUFTLGlCQUE5QixNQUFxQixTQUFVLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBRDNFOztRQVlDLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRzFCLG9CQUFlLEdBQVksS0FBSyxDQUFDO0lBd0lsQyxDQUFDO0lBbklBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqRSxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRTtZQUNqRSxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQztnQkFDMUIsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDNUIs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