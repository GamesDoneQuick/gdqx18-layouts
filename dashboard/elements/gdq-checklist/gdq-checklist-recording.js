import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
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

GdqChecklistRecording = tslib_1.__decorate([customElement('gdq-checklist-recording')], GdqChecklistRecording);
export default GdqChecklistRecording;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1jaGVja2xpc3QtcmVjb3JkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxNQUFNO0FBQUMsRUFBQSxhQUFEO0FBQWdCLEVBQUEsUUFBaEI7QUFBMEIsRUFBQTtBQUExQixJQUFxQyxPQUFPLENBQUMsVUFBbkQ7QUFDQSxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUCxDQUE0QixXQUE1QixDQUFyQjtBQUNBLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFQLENBQTRCLFdBQTVCLENBQXJCO0FBQ0EsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUEwQix1QkFBMUIsQ0FBN0I7QUFFQTs7Ozs7QUFLQSxJQUFxQixxQkFBcUIsR0FBMUMsTUFBcUIscUJBQXJCLFNBQW1ELE9BQU8sQ0FBQyxPQUEzRCxDQUFrRTtBQXNCakUsRUFBQSxLQUFLLEdBQUE7QUFDSixVQUFNLEtBQU47QUFFQSxJQUFBLFlBQVksQ0FBQyxFQUFiLENBQWdCLFFBQWhCLEVBQTBCLE1BQU0sSUFBRztBQUNsQyxVQUFJLENBQUMsTUFBTCxFQUFhO0FBQ1o7QUFDQTs7QUFFRCxZQUFNLGVBQWUsR0FBbUIsRUFBeEM7O0FBQ0EsV0FBSyxNQUFNLEdBQVgsSUFBa0IsTUFBbEIsRUFBMEI7QUFBRTtBQUMzQixZQUFJLENBQUMsR0FBRyxjQUFILENBQWtCLElBQWxCLENBQXVCLE1BQXZCLEVBQStCLEdBQS9CLENBQUwsRUFBMEM7QUFDekM7QUFDQTs7QUFFRCxjQUFNLFFBQVEsR0FBSSxNQUFjLENBQUMsR0FBRCxDQUFoQztBQUNBLFFBQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsSUFBSSxJQUFHO0FBQ3ZCLGNBQUksQ0FBQyxJQUFJLENBQUMsUUFBVixFQUFvQjtBQUNuQixZQUFBLGVBQWUsQ0FBQyxJQUFoQixDQUFxQixJQUFyQjtBQUNBO0FBQ0QsU0FKRDtBQUtBOztBQUNELFdBQUssT0FBTCxHQUFlLGVBQWUsQ0FBQyxNQUFoQixHQUF5QixD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