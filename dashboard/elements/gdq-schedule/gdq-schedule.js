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
], GdqSchedule.prototype, "_pendingSetCurrentRunByOrderMessageResponse", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GdqSchedule.prototype, "_pendingNextRunMessageResponse", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GdqSchedule.prototype, "_pendingPreviousRunMessageResponse", void 0);
GdqSchedule = tslib_1.__decorate([
    customElement('gdq-schedule')
], GdqSchedule);
export default GdqSchedule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXNjaGVkdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXNjaGVkdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWEsWUFBWSxDQUFDLENBQUM7QUFDOUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxTQUFTLENBQUMsQ0FBQztBQUNyRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFpQixVQUFVLENBQUMsQ0FBQztBQUU5RDs7O0dBR0c7QUFFSCxJQUFxQixXQUFXLEdBQWhDLE1BQXFCLFdBQVksU0FBUSxPQUFPLENBQUMsT0FBTztJQVV2RCxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsZUFBZSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osT0FBTzthQUNQO1lBRUQsb0RBQW9EO1lBQ25ELElBQUksQ0FBQyxDQUFDLENBQUMsU0FBaUIsQ0FBQyxLQUFLLEdBQUcsTUFBTTtpQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUM7aUJBQ25DLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFFLFFBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFD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