import * as tslib_1 from "tslib";
const { customElement, property, observe } = Polymer.decorators;
const checklistRep = nodecg.Replicant('checklist');
const stopwatchRep = nodecg.Replicant('stopwatch');
const cyclingRecordingsRep = nodecg.Replicant('obs:cyclingRecordings');
/**
 * @customElement
 * @polymer
 */
let GdqChecklistRecording = class GdqChecklistRecording extends Polymer.Element {
    ready() {
        super.ready();
        checklistRep.on('change', newVal => {
            if (!newVal) {
                return;
            }
            const incompleteTasks = [];
            for (const key in newVal) { // tslint:disable-line:no-for-in
                if (!{}.hasOwnProperty.call(newVal, key)) {
                    continue;
                }
                const category = newVal[key];
                category.forEach(task => {
                    if (!task.complete) {
                        incompleteTasks.push(task);
                    }
                });
            }
            this.warning = incompleteTasks.length > 1 && incompleteTasks[0].name !== 'Cycle Recordings';
        });
        stopwatchRep.on('change', newVal => {
            if (!newVal) {
                return;
            }
            this._stopwatchState = newVal.state === 'running';
        });
        cyclingRecordingsRep.on('change', newVal => {
            this._cyclingRecordings = newVal;
        });
        nodecg.listenFor('obs:recordingsCycled', error => {
            // @TODO: how do we reference the UiToast typings here?
            const toast = this.$.toast;
            if (error) {
                let errorString = error;
                if (error.message) {
                    errorString = error.message;
                }
                else if (error.error) {
                    errorString = error.error;
                }
                toast.showErrorToast('Failed to cycle recordings: ' + errorString);
            }
            else {
                toast.showSuccessToast('Recordings cycled.');
            }
        });
        this.addEventListener('click', () => {
            const checkbox = this.$.checkbox;
            checkbox.click();
        });
    }
    _calcDisabled(stopwatchState, cyclingRecordings) {
        this.disabled = Boolean(stopwatchState || cyclingRecordings);
    }
    _calcContextPage(warning, disabled, cyclingRecordings) {
        if (cyclingRecordings) {
            return 'cycling';
        }
        if (disabled) {
            return 'disabled';
        }
        if (warning) {
            return 'warning';
        }
        return 'all-clear';
    }
};
tslib_1.__decorate([
    property({ type: String })
], GdqChecklistRecording.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqChecklistRecording.prototype, "category", void 0);
tslib_1.__decorate([
    property({ type: Boolean, notify: true, reflectToAttribute: true })
], GdqChecklistRecording.prototype, "checked", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GdqChecklistRecording.prototype, "warning", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GdqChecklistRecording.prototype, "disabled", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GdqChecklistRecording.prototype, "_stopwatchState", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GdqChecklistRecording.prototype, "_cyclingRecordings", void 0);
tslib_1.__decorate([
    observe('_stopwatchState', '_cyclingRecordings')
], GdqChecklistRecording.prototype, "_calcDisabled", null);
GdqChecklistRecording = tslib_1.__decorate([
    customElement('gdq-checklist-recording')
], GdqChecklistRecording);
export default GdqChecklistRecording;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNoZWNrbGlzdC1yZWNvcmRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtY2hlY2tsaXN0LXJlY29yZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUM5RCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBQzlELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFDOUQsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLHVCQUF1QixDQUFDLENBQUM7QUFFaEY7OztHQUdHO0FBRUgsSUFBcUIscUJBQXFCLEdBQTFDLE1BQXFCLHFCQUFzQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBc0JqRSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWixPQUFPO2FBQ1A7WUFFRCxNQUFNLGVBQWUsR0FBbUIsRUFBRSxDQUFDO1lBQzNDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLEVBQUUsZ0NBQWdDO2dCQUMzRCxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUN6QyxTQUFTO2lCQUNUO2dCQUVELE1BQU0sUUFBUSxHQUFJLE1BQWMsQ0FBQyxHQUFHLENBQW1CLENBQUM7Z0JBQ3hELFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNuQixlQUFlLENBQUMsSUFBSSxDQUFDLElB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