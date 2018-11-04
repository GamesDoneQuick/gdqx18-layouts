var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
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
    __decorate([
        property({ type: String })
    ], GdqChecklistRecording.prototype, "name", void 0);
    __decorate([
        property({ type: String })
    ], GdqChecklistRecording.prototype, "category", void 0);
    __decorate([
        property({ type: Boolean, notify: true, reflectToAttribute: true })
    ], GdqChecklistRecording.prototype, "checked", void 0);
    __decorate([
        property({ type: Boolean, reflectToAttribute: true })
    ], GdqChecklistRecording.prototype, "warning", void 0);
    __decorate([
        property({ type: Boolean, reflectToAttribute: true })
    ], GdqChecklistRecording.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqChecklistRecording.prototype, "_stopwatchState", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqChecklistRecording.prototype, "_cyclingRecordings", void 0);
    __decorate([
        observe('_stopwatchState', '_cyclingRecordings')
    ], GdqChecklistRecording.prototype, "_calcDisabled", null);
    GdqChecklistRecording = __decorate([
        customElement('gdq-checklist-recording')
    ], GdqChecklistRecording);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqChecklistRecording = GdqChecklistRecording;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNoZWNrbGlzdC1yZWNvcmRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtY2hlY2tsaXN0LXJlY29yZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNwQyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQzlELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7SUFDOUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztJQUM5RCxNQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsdUJBQXVCLENBQUMsQ0FBQztJQUVoRjs7O09BR0c7SUFFSCxJQUFNLHFCQUFxQixHQUEzQixNQUFNLHFCQUFzQixTQUFRLE9BQU8sQ0FBQyxPQUFPO1FBc0JsRCxLQUFLO1lBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWQsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1osT0FBTztpQkFDUDtnQkFFRCxNQUFNLGVBQWUsR0FBbUIsRUFBRSxDQUFDO2dCQUMzQyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxFQUFFLGdDQUFnQztvQkFDM0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTt3QkFDekMsU0FBUztxQkFDVDtvQkFFRCxNQUFNLFFBQVEsR0FBSSxNQUFjLENBQUMsR0FBRyxDQUFtQixDQUFDO29CQUN4RCxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN2QixJQUFJ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