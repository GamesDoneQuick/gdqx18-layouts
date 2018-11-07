import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;

  var GdqTimekeeperRunner =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqTimekeeperRunner, _super);

    function GdqTimekeeperRunner() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    GdqTimekeeperRunner.prototype.calcRunnerStatus = function (results, index) {
      if (!results) {
        return;
      }

      if (results[index] && results[index].time) {
        return results[index].time.formatted;
      }

      return 'Running';
    };

    GdqTimekeeperRunner.prototype.calcRunnerStatusClass = function (results, index) {
      if (!results) {
        return;
      }

      if (results[index] && !results[index].forfeit) {
        return 'finished';
      }

      return '';
    };

    GdqTimekeeperRunner.prototype.calcFinishHidden = function (results, index) {
      if (!results) {
        return;
      }

      return results[index] && !results[index].forfeit;
    };

    GdqTimekeeperRunner.prototype.calcResumeHidden = function (results, index) {
      if (!results) {
        return;
      }

      return !results[index];
    };

    GdqTimekeeperRunner.prototype.calcForfeitHidden = function (results, index) {
      if (!results) {
        return;
      }

      return results[index] && results[index].forfeit;
    };

    GdqTimekeeperRunner.prototype.calcEditDisabled = function (results, runnerIndex) {
      if (!results) {
        return;
      }

      return !results[runnerIndex];
    };

    GdqTimekeeperRunner.prototype.finish = function () {
      nodecg.sendMessage('completeRunner', {
        index: this.index,
        forfeit: false
      });
    };

    GdqTimekeeperRunner.prototype.forfeit = function () {
      nodecg.sendMessage('completeRunner', {
        index: this.index,
        forfeit: true
      });
    };

    GdqTimekeeperRunner.prototype.resume = function () {
      nodecg.sendMessage('resumeRunner', this.index);
    };

    GdqTimekeeperRunner.prototype.editTime = function () {
      this.dispatchEvent(new CustomEvent('edit-time', {
        bubbles: true,
        composed: true
      }));
    };

    tslib_1.__decorate([property({
      type: String
    })], GdqTimekeeperRunner.prototype, "importPath");

    tslib_1.__decorate([property({
      type: Number
    })], GdqTimekeeperRunner.prototype, "index");

    tslib_1.__decorate([property({
      type: Object
    })], GdqTimekeeperRunner.prototype, "runner");

    tslib_1.__decorate([property({
      type: Array
    })], GdqTimekeeperRunner.prototype, "results");

    GdqTimekeeperRunner = tslib_1.__decorate([customElement('gdq-timekeeper-runner')], GdqTimekeeperRunner);
    return GdqTimekeeperRunner;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqTimekeeperRunner = GdqTimekeeperRunner;
});