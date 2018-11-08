import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  const stopwatch = nodecg.Replicant('stopwatch');
  const currentRun = nodecg.Replicant('currentRun');
  const checklistComplete = nodecg.Replicant('checklistComplete');
  let GdqTimekeeper = class GdqTimekeeper extends Polymer.Element {
    constructor() {
      super(...arguments);
      this.checklistIncomplete = true;
    }

    ready() {
      super.ready();
      stopwatch.on('change', this.stopwatchChanged.bind(this));
      currentRun.on('change', newVal => {
        if (!newVal) {
          return;
        }

        const runners = newVal.runners.slice(0);
        runners.length = 4;

        for (let i = 0; i < 4; i++) {
          runners[i] = runners[i] || false;
        }

        this.runners = runners;
        this.coop = newVal.coop;
      });
      checklistComplete.on('change', newVal => {
        this.checklistIncomplete = !newVal;
      });
    }

    stopwatchChanged(newVal) {
      if (!newVal) {
        return;
      }

      this.state = newVal.state;
      this.time = newVal.time.formatted;
      this.results = newVal.results.slice(0);
      this.notStarted = newVal.state === 'not_started';
      this.paused = newVal.state === 'paused';
    }

    confirmReset() {
      this.$.resetDialog.open();
    }

    startTimer() {
      nodecg.sendMessage('startTimer');
    }

    stopTimer() {
      nodecg.sendMessage('stopTimer');
    }

    resetTimer() {
      nodecg.sendMessage('resetTimer');
    }

    calcStartDisabled(checklistIncomplete, state) {
      return checklistIncomplete || state === 'running' || state === 'finished';
    }

    calcStartText(state) {
      switch (state) {
        case 'paused':
          return 'Resume';

        default:
          return 'Start';
      }
    }

    calcPauseDisabled(state) {
      return state !== 'running';
    }

    editMasterTime() {
      this.$['editDialog-text'].textContent = 'Enter a new master time.';
      this.$.editDialog.setAttribute('data-index', 'master');
      this.$['editDialog-input'].value = this.time;
      this.$.editDialog.open();
    }

    saveEditedTime() {
      const inputEl = this.$['editDialog-input'];
      nodecg.sendMessage('editTime', {
        index: this.$.editDialog.getAttribute('data-index'),
        newTime: inputEl.value
      });
      inputEl.value = '';
    }

    editRunnerTime(e) {
      const model = e.model;
      this.$['editDialog-text'].innerHTML = `Enter a new final time for <b>${model.runner.name}.</b>`;
      this.$.editDialog.setAttribute('data-index', model.index);
      const result = this.results[model.index];

      if (result) {
        this.$['editDialog-input'].value = result.time.formatted;
        this.$.editDialog.open();
      }
    }

    editCoopTime() {
      this.$['editDialog-text'].innerHTML = 'Enter a new final time for <b>all runners.</b>';
      this.$.editDialog.setAttribute('data-index', '0');
      const result = this.results[0];

      if (result) {
        this.$['editDialog-input'].value = result.time.formatted;
        this.$.editDialog.open();
      }
    }

  };

  tslib_1.__decorate([property({
    type: Boolean,
    reflectToAttribute: true
  })], GdqTimekeeper.prototype, "checklistIncomplete", void 0);

  tslib_1.__decorate([property({
    type: String,
    reflectToAttribute: true
  })], GdqTimekeeper.prototype, "state", void 0);

  tslib_1.__decorate([property({
    type: Boolean,
    reflectToAttribute: true
  })], GdqTimekeeper.prototype, "paused", void 0);

  tslib_1.__decorate([property({
    type: Array
  })], GdqTimekeeper.prototype, "results", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], GdqTimekeeper.prototype, "coop", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], GdqTimekeeper.prototype, "notStarted", void 0);

  tslib_1.__decorate([property({
    type: Array
  })], GdqTimekeeper.prototype, "runners", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqTimekeeper.prototype, "time", void 0);

  GdqTimekeeper = tslib_1.__decorate([customElement('gdq-timekeeper')], GdqTimekeeper); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqTimekeeper = GdqTimekeeper;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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