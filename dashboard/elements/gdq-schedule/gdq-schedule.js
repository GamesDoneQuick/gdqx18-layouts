import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  var canSeekSchedule = nodecg.Replicant('canSeekSchedule');
  var currentRun = nodecg.Replicant('currentRun');
  var nextRun = nodecg.Replicant('nextRun');
  var schedule = nodecg.Replicant('schedule');
  /**
   * @customElement
   * @polymer
   */

  var GdqSchedule =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqSchedule, _super);

    function GdqSchedule() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    GdqSchedule.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      canSeekSchedule.on('change', function () {
        _this._checkButtons();
      });
      schedule.on('change', function (newVal) {
        if (!newVal) {
          return;
        } // We don't have typings for vaadin-combo-box@^2.0.0


        _this.$.typeahead.items = newVal.filter(function (item) {
          return item.type === 'run';
        }).map(function (speedrun) {
          return speedrun.name;
        });

        _this._checkButtons();
      });
      nextRun.on('change', function (newVal) {
        if (!newVal) {
          return;
        } // Disable "next" button if at end of schedule


        var nextRunEl = _this.$.nextRun;

        if (newVal) {
          nextRunEl.setRun(newVal);

          _this.$.editNext.removeAttribute('disabled');
        } else {
          nextRunEl.setRun({});

          _this.$.editNext.setAttribute('disabled', 'true');
        }

        _this._checkButtons();
      }); // This one needs to be slightly delayed to avoid a bootup race condition.

      Polymer.RenderStatus.beforeNextRender(this, function () {
        currentRun.on('change', function (newVal) {
          if (!newVal) {
            return;
          }

          var currentRunEl = _this.$.currentRun;
          currentRunEl.setRun(newVal);

          _this._checkButtons();
        });
      });
    };
    /**
     * Takes the current value of the typeahead and loads that as the current speedrun.
     * Shows a helpful error toast if no matching speedrun could be found.
     */


    GdqSchedule.prototype.takeTypeahead = function () {
      var _this = this; // We don't have typings for vaadin-combo-box@^2.0.0


      var typeahead = this.$.typeahead;

      if (!typeahead.value || !schedule.value) {
        return;
      }

      var nameToFind = typeahead.value; // Find the run based on the name.

      var matched = schedule.value.some(function (run) {
        if (run.type !== 'run') {
          return false;
        }

        if (run.name.toLowerCase() === nameToFind.toLowerCase()) {
          _this._pendingSetCurrentRunByOrderMessageResponse = true;

          _this._checkButtons();

          nodecg.sendMessage('setCurrentRunByOrder', run.order, function () {
            _this._pendingSetCurrentRunByOrderMessageResponse = false;
            typeahead.value = '';
            typeahead._suggestions = [];

            _this._checkButtons();
          });
          return true;
        }

        return false;
      });

      if (!matched) {
        this.$.toast.show("Could not find speedrun with name \"" + nameToFind + "\".");
      }
    };

    GdqSchedule.prototype.fetchLatestSchedule = function () {
      var _this = this;

      var toast = this.$.toast;
      this.$.fetchLatestSchedule.setAttribute('disabled', 'true');
      nodecg.sendMessage('updateSchedule', function (err, updated) {
        _this.$.fetchLatestSchedule.removeAttribute('disabled');

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
    };

    GdqSchedule.prototype.next = function () {
      var _this = this;

      this._pendingNextRunMessageResponse = true;

      this._checkButtons();

      nodecg.sendMessage('nextRun', function () {
        _this._pendingNextRunMessageResponse = false;

        _this._checkButtons();
      });
    };

    GdqSchedule.prototype.previous = function () {
      var _this = this;

      this._pendingPreviousRunMessageResponse = true;

      this._checkButtons();

      nodecg.sendMessage('previousRun', function () {
        _this._pendingPreviousRunMessageResponse = false;

        _this._checkButtons();
      });
    };

    GdqSchedule.prototype.editCurrent = function () {
      if (!currentRun.value) {
        return;
      }

      var editor = this.$.editor;
      var editDialog = this.$.editDialog;
      editor.title = "Edit Current Run (#" + currentRun.value.order + ")";
      editor.loadRun(currentRun.value);
      editDialog.open();
    };

    GdqSchedule.prototype.editNext = function () {
      if (!nextRun.value) {
        return;
      }

      var editor = this.$.editor;
      var editDialog = this.$.editDialog;
      editor.title = "Edit Next Run (#" + nextRun.value.order + ")";
      editor.loadRun(nextRun.value);
      editDialog.open();
    };

    GdqSchedule.prototype._checkButtons = function () {
      if (canSeekSchedule.status !== 'declared' || schedule.status !== 'declared' || currentRun.status !== 'declared' || nextRun.status !== 'declared' || !schedule.value) {
        return;
      }

      var shouldDisableNext = false;
      var shouldDisablePrev = false;
      var shouldDisableTake = false;

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
        var prevRunExists = schedule.value.find(function (run) {
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
    };

    GdqSchedule.prototype._typeaheadKeyup = function (e) {
      // Enter key
      if (e.which === 13 && this.$.typeahead.inputValue) {
        this.takeTypeahead();
      }
    };

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqSchedule.prototype, "_pendingSetCurrentRunByOrderMessageResponse");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqSchedule.prototype, "_pendingNextRunMessageResponse");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqSchedule.prototype, "_pendingPreviousRunMessageResponse");

    GdqSchedule = tslib_1.__decorate([customElement('gdq-schedule')], GdqSchedule);
    return GdqSchedule;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqSchedule = GdqSchedule;
});