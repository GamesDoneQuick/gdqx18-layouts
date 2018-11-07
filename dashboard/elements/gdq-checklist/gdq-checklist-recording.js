import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property,
      observe = _a.observe;
  var checklistRep = nodecg.Replicant('checklist');
  var stopwatchRep = nodecg.Replicant('stopwatch');
  var cyclingRecordingsRep = nodecg.Replicant('obs:cyclingRecordings');
  /**
   * @customElement
   * @polymer
   */

  var GdqChecklistRecording =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqChecklistRecording, _super);

    function GdqChecklistRecording() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    GdqChecklistRecording.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      checklistRep.on('change', function (newVal) {
        if (!newVal) {
          return;
        }

        var incompleteTasks = [];

        for (var key in newVal) {
          // tslint:disable-line:no-for-in
          if (!{}.hasOwnProperty.call(newVal, key)) {
            continue;
          }

          var category = newVal[key];
          category.forEach(function (task) {
            if (!task.complete) {
              incompleteTasks.push(task);
            }
          });
        }

        _this.warning = incompleteTasks.length > 1 && incompleteTasks[0].name !== 'Cycle Recordings';
      });
      stopwatchRep.on('change', function (newVal) {
        if (!newVal) {
          return;
        }

        _this._stopwatchState = newVal.state === 'running';
      });
      cyclingRecordingsRep.on('change', function (newVal) {
        _this._cyclingRecordings = newVal;
      });
      nodecg.listenFor('obs:recordingsCycled', function (error) {
        // @TODO: how do we reference the UiToast typings here?
        var toast = _this.$.toast;

        if (error) {
          var errorString = error;

          if (error.message) {
            errorString = error.message;
          } else if (error.error) {
            errorString = error.error;
          }

          toast.showErrorToast('Failed to cycle recordings: ' + errorString);
        } else {
          toast.showSuccessToast('Recordings cycled.');
        }
      });
      this.addEventListener('click', function () {
        var checkbox = _this.$.checkbox;
        checkbox.click();
      });
    };

    GdqChecklistRecording.prototype._calcDisabled = function (stopwatchState, cyclingRecordings) {
      this.disabled = Boolean(stopwatchState || cyclingRecordings);
    };

    GdqChecklistRecording.prototype._calcContextPage = function (warning, disabled, cyclingRecordings) {
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
    };

    tslib_1.__decorate([property({
      type: String
    })], GdqChecklistRecording.prototype, "name");

    tslib_1.__decorate([property({
      type: String
    })], GdqChecklistRecording.prototype, "category");

    tslib_1.__decorate([property({
      type: Boolean,
      notify: true,
      reflectToAttribute: true
    })], GdqChecklistRecording.prototype, "checked");

    tslib_1.__decorate([property({
      type: Boolean,
      reflectToAttribute: true
    })], GdqChecklistRecording.prototype, "warning");

    tslib_1.__decorate([property({
      type: Boolean,
      reflectToAttribute: true
    })], GdqChecklistRecording.prototype, "disabled");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqChecklistRecording.prototype, "_stopwatchState");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqChecklistRecording.prototype, "_cyclingRecordings");

    tslib_1.__decorate([observe('_stopwatchState', '_cyclingRecordings')], GdqChecklistRecording.prototype, "_calcDisabled");

    GdqChecklistRecording = tslib_1.__decorate([customElement('gdq-checklist-recording')], GdqChecklistRecording);
    return GdqChecklistRecording;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqChecklistRecording = GdqChecklistRecording;
});