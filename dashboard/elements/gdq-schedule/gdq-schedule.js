var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
    const { customElement, property } = Polymer.decorators;
    const canSeekSchedule = nodecg.Replicant('canSeekSchedule');
    const currentRun = nodecg.Replicant('currentRun');
    const nextRun = nodecg.Replicant('nextRun');
    const schedule = nodecg.Replicant('schedule');
    /**
     * @customElement
     * @polymer
     */
    let GdqSchedule = class GdqSchedule extends Polymer.Element {
        ready() {
            super.ready();
            canSeekSchedule.on('change', () => {
                this._checkButtons();
            });
            schedule.on('change', newVal => {
                if (!newVal) {
                    return;
                }
                // We don't have typings for vaadin-combo-box@^2.0.0
                this.$.typeahead.items = newVal
                    .filter(item => item.type === 'run')
                    .map(speedrun => speedrun.name);
                this._checkButtons();
            });
            currentRun.on('change', newVal => {
                if (!newVal) {
                    return;
                }
                const currentRunEl = this.$.currentRun;
                currentRunEl.setRun(newVal);
                this._checkButtons();
            });
            nextRun.on('change', newVal => {
                if (!newVal) {
                    return;
                }
                // Disable "next" button if at end of schedule
                const nextRunEl = this.$.nextRun;
                if (newVal) {
                    nextRunEl.setRun(newVal);
                    this.$.editNext.removeAttribute('disabled');
                }
                else {
                    nextRunEl.setRun({});
                    this.$.editNext.setAttribute('disabled', 'true');
                }
                this._checkButtons();
            });
        }
        /**
         * Takes the current value of the typeahead and loads that as the current speedrun.
         * Shows a helpful error toast if no matching speedrun could be found.
         */
        takeTypeahead() {
            // We don't have typings for vaadin-combo-box@^2.0.0
            const typeahead = this.$.typeahead;
            if (!typeahead.value || !schedule.value) {
                return;
            }
            const nameToFind = typeahead.value;
            // Find the run based on the name.
            const matched = schedule.value.some(run => {
                if (run.type !== 'run') {
                    return false;
                }
                if (run.name.toLowerCase() === nameToFind.toLowerCase()) {
                    this._pendingSetCurrentRunByOrderMessageResponse = true;
                    this._checkButtons();
                    nodecg.sendMessage('setCurrentRunByOrder', run.order, () => {
                        this._pendingSetCurrentRunByOrderMessageResponse = false;
                        typeahead.value = '';
                        typeahead._suggestions = [];
                        this._checkButtons();
                    });
                    return true;
                }
                return false;
            });
            if (!matched) {
                this.$.toast.show(`Could not find speedrun with name "${nameToFind}".`);
            }
        }
        fetchLatestSchedule() {
            const toast = this.$.toast;
            this.$.fetchLatestSchedule.setAttribute('disabled', 'true');
            nodecg.sendMessage('updateSchedule', (err, updated) => {
                this.$.fetchLatestSchedule.removeAttribute('disabled');
                if (err) {
                    nodecg.log.warn(err.message);
                    toast.show('Error updating schedule. Check console.');
                    return;
                }
                if (updated) {
                    nodecg.log.info('Schedule successfully updated');
                    toast.show('Successfully updated schedule.');
                }
                else {
                    nodecg.log.info('Schedule unchanged, not updated');
                    toast.show('Schedule unchanged, not updated.');
                }
            });
        }
        next() {
            this._pendingNextRunMessageResponse = true;
            this._checkButtons();
            nodecg.sendMessage('nextRun', () => {
                this._pendingNextRunMessageResponse = false;
                this._checkButtons();
            });
        }
        previous() {
            this._pendingPreviousRunMessageResponse = true;
            this._checkButtons();
            nodecg.sendMessage('previousRun', () => {
                this._pendingPreviousRunMessageResponse = false;
                this._checkButtons();
            });
        }
        editCurrent() {
            if (!currentRun.value) {
                return;
            }
            const editor = this.$.editor;
            const editDialog = this.$.editDialog;
            editor.title = `Edit Current Run (#${currentRun.value.order})`;
            editor.loadRun(currentRun.value);
            editDialog.open();
        }
        editNext() {
            if (!nextRun.value) {
                return;
            }
            const editor = this.$.editor;
            const editDialog = this.$.editDialog;
            editor.title = `Edit Next Run (#${nextRun.value.order})`;
            editor.loadRun(nextRun.value);
            editDialog.open();
        }
        _checkButtons() {
            if (canSeekSchedule.status !== 'declared' ||
                schedule.status !== 'declared' ||
                currentRun.status !== 'declared' ||
                nextRun.status !== 'declared' ||
                !schedule.value) {
                return;
            }
            let shouldDisableNext = false;
            let shouldDisablePrev = false;
            let shouldDisableTake = false;
            if (!canSeekSchedule.value ||
                this._pendingSetCurrentRunByOrderMessageResponse ||
                this._pendingPreviousRunMessageResponse ||
                this._pendingNextRunMessageResponse) {
                shouldDisableNext = true;
                shouldDisablePrev = true;
                shouldDisableTake = true;
            }
            // Disable nextRun button if there is no next run.
            if (!nextRun.value) {
                shouldDisableNext = true;
            }
            // Disable prevRun button if there is no prev run, or if there is no currentRun.
            if (currentRun.value) {
                // If there is any run in the schedule with an earlier order than currentRun,
                // then there must be a prevRun.
                const prevRunExists = schedule.value.find(run => {
                    if (run.type !== 'run' || !currentRun.value) {
                        return false;
                    }
                    return run.order < currentRun.value.order;
                });
                if (!prevRunExists) {
                    shouldDisablePrev = true;
                }
            }
            else {
                shouldDisablePrev = true;
            }
            // Disable take button if there's no takeTypeahead value.
            if (!this.$.typeahead.value) {
                shouldDisableTake = true;
            }
            if (shouldDisableNext) {
                this.$.next.setAttribute('disabled', 'true');
            }
            else {
                this.$.next.removeAttribute('disabled');
            }
            if (shouldDisablePrev) {
                this.$.previous.setAttribute('disabled', 'true');
            }
            else {
                this.$.previous.removeAttribute('disabled');
            }
            if (shouldDisableTake) {
                this.$.take.setAttribute('disabled', 'true');
            }
            else {
                this.$.take.removeAttribute('disabled');
            }
        }
        _typeaheadKeyup(e) {
            // Enter key
            if (e.which === 13 && this.$.typeahead.inputValue) {
                this.takeTypeahead();
            }
        }
    };
    __decorate([
        property({ type: Boolean })
    ], GdqSchedule.prototype, "_pendingSetCurrentRunByOrderMessageResponse", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqSchedule.prototype, "_pendingNextRunMessageResponse", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqSchedule.prototype, "_pendingPreviousRunMessageResponse", void 0);
    GdqSchedule = __decorate([
        customElement('gdq-schedule')
    ], GdqSchedule);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqSchedule = GdqSchedule;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXNjaGVkdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXNjaGVkdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU9BLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUNyRCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLGlCQUFpQixDQUFDLENBQUM7SUFDckUsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBYSxZQUFZLENBQUMsQ0FBQztJQUM5RCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWlCLFVBQVUsQ0FBQyxDQUFDO0lBRTlEOzs7T0FHRztJQUVILElBQU0sV0FBVyxHQUFqQixNQUFNLFdBQVksU0FBUSxPQUFPLENBQUMsT0FBTztRQVV4QyxLQUFLO1lBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWQsZUFBZSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWixPQUFPO2lCQUNQO2dCQUVELG9EQUFvRDtnQkFDbkQsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFpQixDQUFDLEtBQUssR0FBRyxNQUFNO3FCQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQztxQkFDbkMsR0FBRyxDQUFDLFFBQVEs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