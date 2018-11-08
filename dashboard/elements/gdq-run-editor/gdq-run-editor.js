import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  let GdqRunEditor = class GdqRunEditor extends Polymer.MutableData(Polymer.Element) {
    constructor() {
      super(...arguments);
      this.showingOriginal = false;
    }

    loadRun(run) {
      this.name = run.name;
      this.category = run.category;
      this.estimate = run.estimate;
      this.console = run.console;
      this.releaseYear = String(run.releaseYear);
      this.runners = run.runners.map(runner => {
        if (runner) {
          return {
            name: runner.name,
            stream: runner.stream
          };
        }

        return;
      });
      this.coop = run.coop;
      this.originalValues = run.originalValues;
      this.pk = run.pk;
    }

    applyChanges() {
      // We have to build a new runners object.
      const runners = [];
      const runnerNameInputs = this.$.runners.querySelectorAll('paper-input[label^="Runner"]:not([disabled])');
      const runnerStreamInputs = this.$.runners.querySelectorAll('paper-input[label="Twitch Channel"]:not([disabled])');

      for (let i = 0; i < 4; i++) {
        if (runnerNameInputs[i].value || runnerStreamInputs[i].value) {
          runners[i] = {
            name: runnerNameInputs[i].value,
            stream: runnerStreamInputs[i].value
          };
        }
      }

      nodecg.sendMessage('modifyRun', {
        name: this.name,
        category: this.category,
        estimate: this.estimate,
        console: this.console,
        releaseYear: this.releaseYear,
        coop: this.coop,
        runners,
        pk: this.pk
      }, () => {
        const dialog = this.closest('paper-dialog');

        if (dialog) {
          dialog.close();
        }
      });
    }

    resetRun() {
      nodecg.sendMessage('resetRun', this.pk, () => {
        const dialog = this.closest('paper-dialog');

        if (dialog) {
          dialog.close();
        }
      });
    }

    calcHide(path, showingOriginal) {
      const originalPath = path.split('.').slice(0);
      originalPath.unshift('originalValues');
      const originalValue = this.get(originalPath);
      const hasOriginal = originalValue !== undefined;
      return showingOriginal && hasOriginal;
    }

    showOriginal() {
      this.showingOriginal = true;
    }

    hideOriginal() {
      this.showingOriginal = false;
    }

    _moveRunnerDown(e) {
      const target = e.target;

      if (!target) {
        return;
      }

      const rowDiv = target.closest('[data-index]');

      if (!rowDiv) {
        return;
      }

      const index = parseInt(String(rowDiv.getAttribute('data-index')), 10);
      this.runners = this._moveRunner(this.runners, index, 'down');
    }

    _moveRunnerUp(e) {
      const target = e.target;

      if (!target) {
        return;
      }

      const rowDiv = target.closest('[data-index]');

      if (!rowDiv) {
        return;
      }

      const index = parseInt(String(rowDiv.getAttribute('data-index')), 10);
      this.runners = this._moveRunner(this.runners, index, 'up');
    }
    /**
     * Moves a runner up or down in the runners array.
     * @param runnersArray - The array of runners to base these changes on.
     * @param index - The index of the runner to move in the array.
     * @param direction - Which direction to move the runner in.
     * @returns An array of runners with the desired runner re-arrangement applied to it.
     */


    _moveRunner(runnersArray, index, direction) {
      if (isNaN(index)) {
        throw new Error(`Index must be a number, got "${index}" which is a "${typeof index}"`);
      }

      if (index < 0 || index >= 4) {
        throw new Error(`Index must be >= 0 and < 4, got "${index}"`);
      }

      const newRunnersArray = runnersArray.slice(0);

      while (newRunnersArray.length < 4) {
        newRunnersArray.push(undefined);
      }

      const runnerToMove = newRunnersArray.splice(index, 1)[0];
      newRunnersArray.splice(index + (direction === 'up' ? -1 : 1), 0, runnerToMove);
      return newRunnersArray.slice(0, 4);
    }

  };

  tslib_1.__decorate([property({
    type: Boolean
  })], GdqRunEditor.prototype, "showingOriginal", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], GdqRunEditor.prototype, "coop", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqRunEditor.prototype, "releaseYear", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqRunEditor.prototype, "console", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqRunEditor.prototype, "estimate", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqRunEditor.prototype, "category", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqRunEditor.prototype, "name", void 0);

  tslib_1.__decorate([property({
    type: Object
  })], GdqRunEditor.prototype, "originalValues", void 0);

  tslib_1.__decorate([property({
    type: Array
  })], GdqRunEditor.prototype, "runners", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], GdqRunEditor.prototype, "pk", void 0);

  GdqRunEditor = tslib_1.__decorate([customElement('gdq-run-editor')], GdqRunEditor); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqRunEditor = GdqRunEditor;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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