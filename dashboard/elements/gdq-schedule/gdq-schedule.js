import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
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

  GdqSchedule = tslib_1.__decorate([customElement('gdq-schedule')], GdqSchedule); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqSchedule = GdqSchedule;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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