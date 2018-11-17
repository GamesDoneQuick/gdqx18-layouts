import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const canSeekSchedule = nodecg.Replicant('canSeekSchedule');
const currentRun = nodecg.Replicant('currentRun');
const nextRun = nodecg.Replicant('nextRun');
const schedule = nodecg.Replicant('schedule');
/**
 * @customElement
 * @polymer
 */
let GDQScheduleElement = class GDQScheduleElement extends Polymer.Element {
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
        // This one needs to be slightly delayed to avoid a bootup race condition.
        Polymer.RenderStatus.beforeNextRender(this, () => {
            currentRun.on('change', newVal => {
                if (!newVal) {
                    return;
                }
                const currentRunEl = this.$.currentRun;
                currentRunEl.setRun(newVal);
                this._checkButtons();
            });
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
tslib_1.__decorate([
    property({ type: Boolean })
], GDQScheduleElement.prototype, "_pendingSetCurrentRunByOrderMessageResponse", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQScheduleElement.prototype, "_pendingNextRunMessageResponse", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQScheduleElement.prototype, "_pendingPreviousRunMessageResponse", void 0);
GDQScheduleElement = tslib_1.__decorate([
    customElement('gdq-schedule')
], GDQScheduleElement);
export default GDQScheduleElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXNjaGVkdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXNjaGVkdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWEsWUFBWSxDQUFDLENBQUM7QUFDOUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxTQUFTLENBQUMsQ0FBQztBQUNyRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFpQixVQUFVLENBQUMsQ0FBQztBQUU5RDs7O0dBR0c7QUFFSCxJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQW1CLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFVOUQsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU87YUFDUDtZQUVELG9EQUFvRDtZQUNuRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQWlCLENBQUMsS0FBSyxHQUFHLE1BQU07aUJBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO2lCQUNuQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBRSxRQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLElBQUks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