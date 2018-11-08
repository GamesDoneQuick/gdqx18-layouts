import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property,
    observe
  } = Polymer.decorators;
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

        for (const key in newVal) {
          // tslint:disable-line:no-for-in
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
          } else if (error.error) {
            errorString = error.error;
          }

          toast.showErrorToast('Failed to cycle recordings: ' + errorString);
        } else {
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

  tslib_1.__decorate([property({
    type: String
  })], GdqChecklistRecording.prototype, "name", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqChecklistRecording.prototype, "category", void 0);

  tslib_1.__decorate([property({
    type: Boolean,
    notify: true,
    reflectToAttribute: true
  })], GdqChecklistRecording.prototype, "checked", void 0);

  tslib_1.__decorate([property({
    type: Boolean,
    reflectToAttribute: true
  })], GdqChecklistRecording.prototype, "warning", void 0);

  tslib_1.__decorate([property({
    type: Boolean,
    reflectToAttribute: true
  })], GdqChecklistRecording.prototype, "disabled", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], GdqChecklistRecording.prototype, "_stopwatchState", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], GdqChecklistRecording.prototype, "_cyclingRecordings", void 0);

  tslib_1.__decorate([observe('_stopwatchState', '_cyclingRecordings')], GdqChecklistRecording.prototype, "_calcDisabled", null);

  GdqChecklistRecording = tslib_1.__decorate([customElement('gdq-checklist-recording')], GdqChecklistRecording); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqChecklistRecording = GdqChecklistRecording;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1jaGVja2xpc3QtcmVjb3JkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBSztBQUNwQyxRQUFNO0FBQUMsSUFBQSxhQUFEO0FBQWdCLElBQUEsUUFBaEI7QUFBMEIsSUFBQTtBQUExQixNQUFxQyxPQUFPLENBQUMsVUFBbkQ7QUFDQSxRQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUCxDQUE0QixXQUE1QixDQUFyQjtBQUNBLFFBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFQLENBQTRCLFdBQTVCLENBQXJCO0FBQ0EsUUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUEwQix1QkFBMUIsQ0FBN0I7QUFFQTs7Ozs7QUFLQSxNQUFNLHFCQUFxQixHQUEzQixNQUFNLHFCQUFOLFNBQW9DLE9BQU8sQ0FBQyxPQUE1QyxDQUFtRDtBQXNCbEQsSUFBQSxLQUFLLEdBQUE7QUFDSixZQUFNLEtBQU47QUFFQSxNQUFBLFlBQVksQ0FBQyxFQUFiLENBQWdCLFFBQWhCLEVBQTBCLE1BQU0sSUFBRztBQUNsQyxZQUFJLENBQUMsTUFBTCxFQUFhO0FBQ1o7QUFDQTs7QUFFRCxjQUFNLGVBQWUsR0FBbUIsRUFBeEM7O0FBQ0EsYUFBSyxNQUFNLEdBQVgsSUFBa0IsTUFBbEIsRUFBMEI7QUFBRTtBQUMzQixjQUFJLENBQUMsR0FBRyxjQUFILENBQWtCLElBQWxCLENBQXVCLE1BQXZCLEVBQStCLEdBQS9CLENBQUwsRUFBMEM7QUFDekM7QUFDQTs7QUFFRCxnQkFBTSxRQUFRLEdBQUksTUFBYyxDQUFDLEdBQUQsQ0FBaEM7QUFDQSxVQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLElBQUksSUFBRztBQUN2QixnQkFBSSxDQUFDLElBQUksQ0FBQyxRQUFWLEVBQW9CO0FBQ25CLGNBQUEsZUFBZSxDQUFDLElBQWhCLENBQXFCLElBQXJCO0FBQ0E7QUFDRCxXQUpEO0FBS0E7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