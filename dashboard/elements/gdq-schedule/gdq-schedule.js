import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
const {
  customElement,
  property
} = Polymer.decorators;
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
      } // We don't have typings for vaadin-combo-box@^2.0.0


      this.$.typeahead.items = newVal.filter(item => item.type === 'run').map(speedrun => speedrun.name);

      this._checkButtons();
    });
    nextRun.on('change', newVal => {
      if (!newVal) {
        return;
      } // Disable "next" button if at end of schedule


      const nextRunEl = this.$.nextRun;

      if (newVal) {
        nextRunEl.setRun(newVal);
        this.$.editNext.removeAttribute('disabled');
      } else {
        nextRunEl.setRun({});
        this.$.editNext.setAttribute('disabled', 'true');
      }

      this._checkButtons();
    }); // This one needs to be slightly delayed to avoid a bootup race condition.

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

    const nameToFind = typeahead.value; // Find the run based on the name.

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
      } else {
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
    if (canSeekSchedule.status !== 'declared' || schedule.status !== 'declared' || currentRun.status !== 'declared' || nextRun.status !== 'declared' || !schedule.value) {
      return;
    }

    let shouldDisableNext = false;
    let shouldDisablePrev = false;
    let shouldDisableTake = false;

    if (!canSeekSchedule.value || this._pendingSetCurrentRunByOrderMessageResponse || this._pendingPreviousRunMessageResponse || this._pendingNextRunMessageResponse) {
      shouldDisableNext = true;
      shouldDisablePrev = true;
      shouldDisableTake = true;
    } // Disable nextRun button if there is no next run.


    if (!nextRun.value) {
      shouldDisableNext = true;
    } // Disable prevRun button if there is no prev run, or if there is no currentRun.


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
    } else {
      shouldDisablePrev = true;
    } // Disable take button if there's no takeTypeahead value.


    if (!this.$.typeahead.value) {
      shouldDisableTake = true;
    }

    if (shouldDisableNext) {
      this.$.next.setAttribute('disabled', 'true');
    } else {
      this.$.next.removeAttribute('disabled');
    }

    if (shouldDisablePrev) {
      this.$.previous.setAttribute('disabled', 'true');
    } else {
      this.$.previous.removeAttribute('disabled');
    }

    if (shouldDisableTake) {
      this.$.take.setAttribute('disabled', 'true');
    } else {
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

tslib_1.__decorate([property({
  type: Boolean
})], GdqSchedule.prototype, "_pendingSetCurrentRunByOrderMessageResponse", void 0);

tslib_1.__decorate([property({
  type: Boolean
})], GdqSchedule.prototype, "_pendingNextRunMessageResponse", void 0);

tslib_1.__decorate([property({
  type: Boolean
})], GdqSchedule.prototype, "_pendingPreviousRunMessageResponse", void 0);

GdqSchedule = tslib_1.__decorate([customElement('gdq-schedule')], GdqSchedule);
export default GdqSchedule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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