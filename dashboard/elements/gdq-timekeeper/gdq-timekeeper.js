import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
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

GdqTimekeeper = tslib_1.__decorate([customElement('gdq-timekeeper')], GdqTimekeeper);
export default GdqTimekeeper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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