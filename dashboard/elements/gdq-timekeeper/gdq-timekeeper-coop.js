import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  let GdqTimekeeperCoop = class GdqTimekeeperCoop extends Polymer.Element {
    calcRunnerStatus(results) {
      if (results[0]) {
        return results[0].time.formatted;
      }

      return 'Running';
    }

    calcRunnerStatusClass(results) {
      if (results[0] && !results[0].forfeit) {
        return 'finished';
      }

      return '';
    }

    calcFinishHidden(results) {
      return results[0] && !results[0].forfeit;
    }

    calcResumeHidden(results) {
      return !results[0];
    }

    calcForfeitHidden(results) {
      return results[0] && results[0].forfeit;
    }

    calcEditDisabled(results) {
      return !results[0];
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

    calcConcatenatedRunners(runners) {
      let concatenatedRunners = runners[0].name;

      if (runners.length > 1) {
        concatenatedRunners = runners.slice(1).reduce((prev, curr, index, array) => {
          if (!curr || !curr.name) {
            return prev;
          }

          if (index === array.length - 1) {
            return `${prev} & ${curr.name}`;
          }

          return `${prev}, ${curr.name}`;
        }, concatenatedRunners);
      }

      return concatenatedRunners;
    }

  };

  tslib_1.__decorate([property({
    type: String
  })], GdqTimekeeperCoop.prototype, "importPath", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], GdqTimekeeperCoop.prototype, "index", void 0);

  tslib_1.__decorate([property({
    type: Array
  })], GdqTimekeeperCoop.prototype, "runners", void 0);

  tslib_1.__decorate([property({
    type: Array
  })], GdqTimekeeperCoop.prototype, "results", void 0);

  GdqTimekeeperCoop = tslib_1.__decorate([customElement('gdq-timekeeper-coop')], GdqTimekeeperCoop); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqTimekeeperCoop = GdqTimekeeperCoop;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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