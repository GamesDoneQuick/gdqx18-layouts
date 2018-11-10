import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
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

GdqRunEditor = tslib_1.__decorate([customElement('gdq-run-editor')], GdqRunEditor);
export default GdqRunEditor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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