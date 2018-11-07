import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  var stopwatch = nodecg.Replicant('stopwatch');
  var currentRun = nodecg.Replicant('currentRun');
  var checklistComplete = nodecg.Replicant('checklistComplete');

  var GdqTimekeeper =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqTimekeeper, _super);

    function GdqTimekeeper() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.checklistIncomplete = true;
      return _this;
    }

    GdqTimekeeper.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      stopwatch.on('change', this.stopwatchChanged.bind(this));
      currentRun.on('change', function (newVal) {
        if (!newVal) {
          return;
        }

        var runners = newVal.runners.slice(0);
        runners.length = 4;

        for (var i = 0; i < 4; i++) {
          runners[i] = runners[i] || false;
        }

        _this.runners = runners;
        _this.coop = newVal.coop;
      });
      checklistComplete.on('change', function (newVal) {
        _this.checklistIncomplete = !newVal;
      });
    };

    GdqTimekeeper.prototype.stopwatchChanged = function (newVal) {
      if (!newVal) {
        return;
      }

      this.state = newVal.state;
      this.time = newVal.time.formatted;
      this.results = newVal.results.slice(0);
      this.notStarted = newVal.state === 'not_started';
      this.paused = newVal.state === 'paused';
    };

    GdqTimekeeper.prototype.confirmReset = function () {
      this.$.resetDialog.open();
    };

    GdqTimekeeper.prototype.startTimer = function () {
      nodecg.sendMessage('startTimer');
    };

    GdqTimekeeper.prototype.stopTimer = function () {
      nodecg.sendMessage('stopTimer');
    };

    GdqTimekeeper.prototype.resetTimer = function () {
      nodecg.sendMessage('resetTimer');
    };

    GdqTimekeeper.prototype.calcStartDisabled = function (checklistIncomplete, state) {
      return checklistIncomplete || state === 'running' || state === 'finished';
    };

    GdqTimekeeper.prototype.calcStartText = function (state) {
      switch (state) {
        case 'paused':
          return 'Resume';

        default:
          return 'Start';
      }
    };

    GdqTimekeeper.prototype.calcPauseDisabled = function (state) {
      return state !== 'running';
    };

    GdqTimekeeper.prototype.editMasterTime = function () {
      this.$['editDialog-text'].textContent = 'Enter a new master time.';
      this.$.editDialog.setAttribute('data-index', 'master');
      this.$['editDialog-input'].value = this.time;
      this.$.editDialog.open();
    };

    GdqTimekeeper.prototype.saveEditedTime = function () {
      var inputEl = this.$['editDialog-input'];
      nodecg.sendMessage('editTime', {
        index: this.$.editDialog.getAttribute('data-index'),
        newTime: inputEl.value
      });
      inputEl.value = '';
    };

    GdqTimekeeper.prototype.editRunnerTime = function (e) {
      var model = e.model;
      this.$['editDialog-text'].innerHTML = "Enter a new final time for <b>" + model.runner.name + ".</b>";
      this.$.editDialog.setAttribute('data-index', model.index);
      var result = this.results[model.index];

      if (result) {
        this.$['editDialog-input'].value = result.time.formatted;
        this.$.editDialog.open();
      }
    };

    GdqTimekeeper.prototype.editCoopTime = function () {
      this.$['editDialog-text'].innerHTML = 'Enter a new final time for <b>all runners.</b>';
      this.$.editDialog.setAttribute('data-index', '0');
      var result = this.results[0];

      if (result) {
        this.$['editDialog-input'].value = result.time.formatted;
        this.$.editDialog.open();
      }
    };

    tslib_1.__decorate([property({
      type: Boolean,
      reflectToAttribute: true
    })], GdqTimekeeper.prototype, "checklistIncomplete");

    tslib_1.__decorate([property({
      type: String,
      reflectToAttribute: true
    })], GdqTimekeeper.prototype, "state");

    tslib_1.__decorate([property({
      type: Boolean,
      reflectToAttribute: true
    })], GdqTimekeeper.prototype, "paused");

    tslib_1.__decorate([property({
      type: Array
    })], GdqTimekeeper.prototype, "results");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqTimekeeper.prototype, "coop");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqTimekeeper.prototype, "notStarted");

    tslib_1.__decorate([property({
      type: Array
    })], GdqTimekeeper.prototype, "runners");

    tslib_1.__decorate([property({
      type: String
    })], GdqTimekeeper.prototype, "time");

    GdqTimekeeper = tslib_1.__decorate([customElement('gdq-timekeeper')], GdqTimekeeper);
    return GdqTimekeeper;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqTimekeeper = GdqTimekeeper;
});