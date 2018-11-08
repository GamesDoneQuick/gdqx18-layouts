import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  const checklist = nodecg.Replicant('checklist');
  let GdqChecklist = class GdqChecklist extends Polymer.MutableData(Polymer.Element) {
    ready() {
      super.ready();
      checklist.on('change', newVal => {
        if (!newVal) {
          return;
        }

        this.extraContent = newVal.extraContent;
        this.techStationDuties = newVal.techStationDuties;
        this.stageTechDuties = newVal.stageTechDuties;
        this.audioReady = newVal.audioEngineerDuties.every(task => task.complete);
        const cycleRecordingsTask = newVal.special.find(task => task.name === 'Cycle Recordings');

        if (cycleRecordingsTask) {
          this.recordingsCycled = cycleRecordingsTask.complete;
        }
      });
      this._checkboxChanged = this._checkboxChanged.bind(this);
      this.addEventListener('change', this._checkboxChanged);
    }

    _checkboxChanged(e) {
      const target = e.composedPath()[0];
      const category = target.getAttribute('category');
      const name = target.hasAttribute('name') ? target.getAttribute('name') : target.innerText.trim();

      if (!category) {
        return;
      }

      checklist.value[category].find(task => {
        if (task.name === name) {
          task.complete = Boolean(target.checked);
          return true;
        }

        return false;
      });
    }

  };

  tslib_1.__decorate([property({
    type: Array
  })], GdqChecklist.prototype, "stageTechDuties", void 0);

  tslib_1.__decorate([property({
    type: Array
  })], GdqChecklist.prototype, "extraContent", void 0);

  tslib_1.__decorate([property({
    type: Array
  })], GdqChecklist.prototype, "techStationDuties", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], GdqChecklist.prototype, "audioReady", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], GdqChecklist.prototype, "recordingsCycled", void 0);

  GdqChecklist = tslib_1.__decorate([customElement('gdq-checklist')], GdqChecklist); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqChecklist = GdqChecklist;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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