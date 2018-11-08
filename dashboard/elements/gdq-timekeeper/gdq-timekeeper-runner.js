import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  let GdqTimekeeperRunner = class GdqTimekeeperRunner extends Polymer.Element {
    calcRunnerStatus(results, index) {
      if (!results) {
        return;
      }

      if (results[index] && results[index].time) {
        return results[index].time.formatted;
      }

      return 'Running';
    }

    calcRunnerStatusClass(results, index) {
      if (!results) {
        return;
      }

      if (results[index] && !results[index].forfeit) {
        return 'finished';
      }

      return '';
    }

    calcFinishHidden(results, index) {
      if (!results) {
        return;
      }

      return results[index] && !results[index].forfeit;
    }

    calcResumeHidden(results, index) {
      if (!results) {
        return;
      }

      return !results[index];
    }

    calcForfeitHidden(results, index) {
      if (!results) {
        return;
      }

      return results[index] && results[index].forfeit;
    }

    calcEditDisabled(results, runnerIndex) {
      if (!results) {
        return;
      }

      return !results[runnerIndex];
    }

    finish() {
      nodecg.sendMessage('completeRunner', {
        index: this.index,
        forfeit: false
      });
    }

    forfeit() {
      nodecg.sendMessage('completeRunner', {
        index: this.index,
        forfeit: true
      });
    }

    resume() {
      nodecg.sendMessage('resumeRunner', this.index);
    }

    editTime() {
      this.dispatchEvent(new CustomEvent('edit-time', {
        bubbles: true,
        composed: true
      }));
    }

  };

  tslib_1.__decorate([property({
    type: String
  })], GdqTimekeeperRunner.prototype, "importPath", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], GdqTimekeeperRunner.prototype, "index", void 0);

  tslib_1.__decorate([property({
    type: Object
  })], GdqTimekeeperRunner.prototype, "runner", void 0);

  tslib_1.__decorate([property({
    type: Array
  })], GdqTimekeeperRunner.prototype, "results", void 0);

  GdqTimekeeperRunner = tslib_1.__decorate([customElement('gdq-timekeeper-runner')], GdqTimekeeperRunner); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqTimekeeperRunner = GdqTimekeeperRunner;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS10aW1la2VlcGVyLXJ1bm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBY0EsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLE1BQUs7QUFDcEMsUUFBTTtBQUFDLElBQUEsYUFBRDtBQUFnQixJQUFBO0FBQWhCLE1BQTRCLE9BQU8sQ0FBQyxVQUExQztBQUdBLE1BQU0sbUJBQW1CLEdBQXpCLE1BQU0sbUJBQU4sU0FBa0MsT0FBTyxDQUFDLE9BQTFDLENBQWlEO0FBYWhELElBQUEsZ0JBQWdCLENBQUMsT0FBRCxFQUE2QixLQUE3QixFQUEwQztBQUN6RCxVQUFJLENBQUMsT0FBTCxFQUFjO0FBQ2I7QUFDQTs7QUFFRCxVQUFJLE9BQU8sQ0FBQyxLQUFELENBQVAsSUFBa0IsT0FBTyxDQUFDLEtBQUQsQ0FBUCxDQUFlLElBQXJDLEVBQTJDO0FBQzFDLGVBQU8sT0FBTyxDQUFDLEtBQUQsQ0FBUCxDQUFlLElBQWYsQ0FBb0IsU0FBM0I7QUFDQTs7QUFFRCxhQUFPLFNBQVA7QUFDQTs7QUFFRCxJQUFBLHFCQUFxQixDQUFDLE9BQUQsRUFBNkIsS0FBN0IsRUFBMEM7QUFDOUQsVUFBSSxDQUFDLE9BQUwsRUFBYztBQUNiO0FBQ0E7O0FBRUQsVUFBSSxPQUFPLENBQUMsS0FBRCxDQUFQLElBQWtCLENBQUMsT0FBTyxDQUFDLEtBQUQsQ0FBUCxDQUFlLE9BQXRDLEVBQStDO0FBQzlDLGVBQU8sVUFBUDtBQUNBOztBQUVELGFBQU8sRUFBUDtBQUNBOztBQUVELElBQUEsZ0JBQWdCLENBQUMsT0FBRCxFQUE2QixLQUE3QixFQUEwQztBQUN6RCxVQUFJLENBQUMsT0FBTCxFQUFjO0FBQ2I7QUFDQTs7QUFFRCxhQUFPLE9BQU8sQ0FBQyxLQUFELENBQVAsSUFBa0IsQ0FBQyxPQUFPLENBQUMsS0FBRCxDQUFQLENBQWUsT0FBekM7QUFDQTs7QUFFRCxJQUFBLGdCQUFnQixDQUFDLE9BQUQsRUFBNkIsS0FBN0IsRUFBMEM7QUFDekQsVUFBSSxDQUFDLE9BQUwsRUFBYztBQUNiO0FBQ0E7O0FBRUQsYUFBTyxDQUFDLE9BQU8sQ0FBQyxLQUFELENBQWY7QUFDQTs7QUFFRCxJQUFBLGlCQUFpQixDQUFDLE9BQUQsRUFBNkIsS0FBN0IsRUFBMEM7QUFDMUQsVUFBSSxDQUFDLE9BQUwsRUFBYztBQUNiO0FBQ0E7O0FBRUQsYUFBTyxPQUFPLENBQUMsS0FBRCxDQUFQLElBQWtCLE9BQU8sQ0FBQyxLQUFELENBQVAsQ0FBZSxPQUF4QztBQUNBOztBQUVELElBQUEsZ0JBQWdCLENBQUMsT0FBRCxFQUE2QixXQUE3QixFQUFnRDtBQUMvRCxVQUFJLENBQUMsT0FBTCxFQUFjO0FBQ2I7QUFDQTs7QUFFRCxhQUFPLENBQUMsT0FBTyxDQUFDLFdBQUQsQ0FBZjtBQUNBOztBQUVELElBQUEsTUFBTSxHQUFBO0FBQ0wsTUFBQSxNQUFNLENBQUMsV0FBUCxDQUFtQixnQkFBbkIsRUFBcUM7QUFBQyxRQUFBLEtBQUssRUFBRSxLQUFLLEtBQWI7QUFBb0IsUUFBQSxPQUFPLEVBQUU7QUFBN0IsT0FBckM7QUFDQTs7QUFFRCxJQUFBLE9BQU8sR0FBQTtBQUNOLE1BQUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsZ0JBQW5CLEVBQXFDO0FBQUMsUUFBQSxLQUFLLEVBQUUsS0FBSyxLQUFiO0FBQW9CLFFBQUEsT0FBTyxFQUFFO0FBQTdCLE9BQXJDO0FBQ0E7O0FBRUQsSUFBQSxNQUFNLEdBQUE7QUFDTCxNQUFBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLGNBQW5CLEVBQW1DLEtBQUssS0FBeEM7QUFDQTs7QUFFRCxJQUFBLFFBQVEsR0FBQTtBQUNQLFdBQUssYUFBTCxDQUFtQixJQUFJLFdBQUosQ0FBZ0IsV0FBaEIsRUFBNkI7QUFBQyxRQUFBLE9BQU8sRUFBRSxJQUFWO0FBQWdCLFFBQUEsUUFBUSxFQUFFO0FBQTFCLE9BQTdCLENBQW5CO0FBQ0E7O0FBbkYrQyxHQUFqRDs7QUFFQyxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRTtBQUFQLEdBQUQsQ0FDVCxDQUFBLEUsNkJBQUEsRSxZQUFBLEUsS0FBbUIsQ0FBbkI7O0FBR0EsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLDZCQUFBLEUsT0FBQSxFLEtBQWMsQ0FBZDs7QUFHQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRTtBQUFQLEdBQUQsQ0FDVCxDQUFBLEUsNkJBQUEsRSxRQUFBLEUsS0FBZSxDQUFmOztBQUdBLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSw2QkFBQSxFLFNBQUEsRSxLQUFvQyxDQUFwQzs7QUFYSyxFQUFBLG1CQUFtQixHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEeEIsYUFBYSxDQUFDLHVCQUFELENBQ1csQ0FBQSxFQUFuQixtQkFBbUIsQ0FBbkIsQ0FKOEIsQ0EwRnBDOztBQUNDLEVBQUEsTUFBYyxDQUFDLG1CQUFmLEdBQXFDLG1CQUFyQztBQUNELENBNUZEIiwic291cmNlUm9vdCI6IiJ9