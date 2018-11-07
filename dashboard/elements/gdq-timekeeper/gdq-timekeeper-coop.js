import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;

  var GdqTimekeeperCoop =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqTimekeeperCoop, _super);

    function GdqTimekeeperCoop() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    GdqTimekeeperCoop.prototype.calcRunnerStatus = function (results) {
      if (results[0]) {
        return results[0].time.formatted;
      }

      return 'Running';
    };

    GdqTimekeeperCoop.prototype.calcRunnerStatusClass = function (results) {
      if (results[0] && !results[0].forfeit) {
        return 'finished';
      }

      return '';
    };

    GdqTimekeeperCoop.prototype.calcFinishHidden = function (results) {
      return results[0] && !results[0].forfeit;
    };

    GdqTimekeeperCoop.prototype.calcResumeHidden = function (results) {
      return !results[0];
    };

    GdqTimekeeperCoop.prototype.calcForfeitHidden = function (results) {
      return results[0] && results[0].forfeit;
    };

    GdqTimekeeperCoop.prototype.calcEditDisabled = function (results) {
      return !results[0];
    };

    GdqTimekeeperCoop.prototype.finish = function () {
      nodecg.sendMessage('completeRunner', {
        index: this.index,
        forfeit: false
      });
    };

    GdqTimekeeperCoop.prototype.forfeit = function () {
      nodecg.sendMessage('completeRunner', {
        index: this.index,
        forfeit: true
      });
    };

    GdqTimekeeperCoop.prototype.resume = function () {
      nodecg.sendMessage('resumeRunner', this.index);
    };

    GdqTimekeeperCoop.prototype.editTime = function () {
      this.dispatchEvent(new CustomEvent('edit-time', {
        bubbles: true,
        composed: true
      }));
    };

    GdqTimekeeperCoop.prototype.calcConcatenatedRunners = function (runners) {
      var concatenatedRunners = runners[0].name;

      if (runners.length > 1) {
        concatenatedRunners = runners.slice(1).reduce(function (prev, curr, index, array) {
          if (!curr || !curr.name) {
            return prev;
          }

          if (index === array.length - 1) {
            return prev + " & " + curr.name;
          }

          return prev + ", " + curr.name;
        }, concatenatedRunners);
      }

      return concatenatedRunners;
    };

    tslib_1.__decorate([property({
      type: String
    })], GdqTimekeeperCoop.prototype, "importPath");

    tslib_1.__decorate([property({
      type: Number
    })], GdqTimekeeperCoop.prototype, "index");

    tslib_1.__decorate([property({
      type: Array
    })], GdqTimekeeperCoop.prototype, "runners");

    tslib_1.__decorate([property({
      type: Array
    })], GdqTimekeeperCoop.prototype, "results");

    GdqTimekeeperCoop = tslib_1.__decorate([customElement('gdq-timekeeper-coop')], GdqTimekeeperCoop);
    return GdqTimekeeperCoop;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqTimekeeperCoop = GdqTimekeeperCoop;
});