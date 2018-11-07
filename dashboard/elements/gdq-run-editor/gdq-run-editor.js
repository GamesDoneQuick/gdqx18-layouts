import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;

  var GdqRunEditor =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqRunEditor, _super);

    function GdqRunEditor() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.showingOriginal = false;
      return _this;
    }

    GdqRunEditor.prototype.loadRun = function (run) {
      this.name = run.name;
      this.category = run.category;
      this.estimate = run.estimate;
      this.console = run.console;
      this.releaseYear = String(run.releaseYear);
      this.runners = run.runners.map(function (runner) {
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
    };

    GdqRunEditor.prototype.applyChanges = function () {
      var _this = this; // We have to build a new runners object.


      var runners = [];
      var runnerNameInputs = this.$.runners.querySelectorAll('paper-input[label^="Runner"]:not([disabled])');
      var runnerStreamInputs = this.$.runners.querySelectorAll('paper-input[label="Twitch Channel"]:not([disabled])');

      for (var i = 0; i < 4; i++) {
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
        runners: runners,
        pk: this.pk
      }, function () {
        var dialog = _this.closest('paper-dialog');

        if (dialog) {
          dialog.close();
        }
      });
    };

    GdqRunEditor.prototype.resetRun = function () {
      var _this = this;

      nodecg.sendMessage('resetRun', this.pk, function () {
        var dialog = _this.closest('paper-dialog');

        if (dialog) {
          dialog.close();
        }
      });
    };

    GdqRunEditor.prototype.calcHide = function (path, showingOriginal) {
      var originalPath = path.split('.').slice(0);
      originalPath.unshift('originalValues');
      var originalValue = this.get(originalPath);
      var hasOriginal = originalValue !== undefined;
      return showingOriginal && hasOriginal;
    };

    GdqRunEditor.prototype.showOriginal = function () {
      this.showingOriginal = true;
    };

    GdqRunEditor.prototype.hideOriginal = function () {
      this.showingOriginal = false;
    };

    GdqRunEditor.prototype._moveRunnerDown = function (e) {
      var target = e.target;

      if (!target) {
        return;
      }

      var rowDiv = target.closest('[data-index]');

      if (!rowDiv) {
        return;
      }

      var index = parseInt(String(rowDiv.getAttribute('data-index')), 10);
      this.runners = this._moveRunner(this.runners, index, 'down');
    };

    GdqRunEditor.prototype._moveRunnerUp = function (e) {
      var target = e.target;

      if (!target) {
        return;
      }

      var rowDiv = target.closest('[data-index]');

      if (!rowDiv) {
        return;
      }

      var index = parseInt(String(rowDiv.getAttribute('data-index')), 10);
      this.runners = this._moveRunner(this.runners, index, 'up');
    };
    /**
     * Moves a runner up or down in the runners array.
     * @param runnersArray - The array of runners to base these changes on.
     * @param index - The index of the runner to move in the array.
     * @param direction - Which direction to move the runner in.
     * @returns An array of runners with the desired runner re-arrangement applied to it.
     */


    GdqRunEditor.prototype._moveRunner = function (runnersArray, index, direction) {
      if (isNaN(index)) {
        throw new Error("Index must be a number, got \"" + index + "\" which is a \"" + typeof index + "\"");
      }

      if (index < 0 || index >= 4) {
        throw new Error("Index must be >= 0 and < 4, got \"" + index + "\"");
      }

      var newRunnersArray = runnersArray.slice(0);

      while (newRunnersArray.length < 4) {
        newRunnersArray.push(undefined);
      }

      var runnerToMove = newRunnersArray.splice(index, 1)[0];
      newRunnersArray.splice(index + (direction === 'up' ? -1 : 1), 0, runnerToMove);
      return newRunnersArray.slice(0, 4);
    };

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqRunEditor.prototype, "showingOriginal");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqRunEditor.prototype, "coop");

    tslib_1.__decorate([property({
      type: String
    })], GdqRunEditor.prototype, "releaseYear");

    tslib_1.__decorate([property({
      type: String
    })], GdqRunEditor.prototype, "console");

    tslib_1.__decorate([property({
      type: String
    })], GdqRunEditor.prototype, "estimate");

    tslib_1.__decorate([property({
      type: String
    })], GdqRunEditor.prototype, "category");

    tslib_1.__decorate([property({
      type: String
    })], GdqRunEditor.prototype, "name");

    tslib_1.__decorate([property({
      type: Object
    })], GdqRunEditor.prototype, "originalValues");

    tslib_1.__decorate([property({
      type: Array
    })], GdqRunEditor.prototype, "runners");

    tslib_1.__decorate([property({
      type: Number
    })], GdqRunEditor.prototype, "pk");

    GdqRunEditor = tslib_1.__decorate([customElement('gdq-run-editor')], GdqRunEditor);
    return GdqRunEditor;
  }(Polymer.MutableData(Polymer.Element)); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqRunEditor = GdqRunEditor;
});