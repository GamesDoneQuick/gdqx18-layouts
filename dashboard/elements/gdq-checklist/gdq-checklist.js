import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
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

GdqChecklist = tslib_1.__decorate([customElement('gdq-checklist')], GdqChecklist);
export default GdqChecklist;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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