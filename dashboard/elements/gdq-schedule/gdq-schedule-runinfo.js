import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  var GdqScheduleRuninfo_1;
  const {
    customElement,
    property
  } = Polymer.decorators;
  let GdqScheduleRuninfo = GdqScheduleRuninfo_1 = class GdqScheduleRuninfo extends Polymer.Element {
    _notesChanged(newVal) {
      const notes = this.$.notes;
      const valueDiv = notes.querySelector('.value');

      if (newVal) {
        valueDiv.innerHTML = newVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
      } else {
        valueDiv.innerHTML = '';
      }
    }

    setRun(run) {
      this.name = run.name;
      this.console = run.console;
      this.runners = run.runners;
      this.releaseYear = String(run.releaseYear);
      this.estimate = run.estimate;
      this.category = run.category;
      this.order = run.order;
      this.notes = run.notes;
      this.coop = run.coop;
      this.originalValues = run.originalValues;
    }

    calcName(name) {
      if (name) {
        return name.split('\\n').join(' ');
      }

      return name;
    }

    calcModified(original) {
      return original === undefined || original === null ? '' : 'modified';
    }

  };

  tslib_1.__decorate([property({
    type: String,
    observer: GdqScheduleRuninfo_1.prototype._notesChanged
  })], GdqScheduleRuninfo.prototype, "notes", void 0);

  tslib_1.__decorate([property({
    type: String,
    reflectToAttribute: true
  })], GdqScheduleRuninfo.prototype, "label", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], GdqScheduleRuninfo.prototype, "coop", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqScheduleRuninfo.prototype, "releaseYear", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqScheduleRuninfo.prototype, "console", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqScheduleRuninfo.prototype, "estimate", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqScheduleRuninfo.prototype, "category", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GdqScheduleRuninfo.prototype, "name", void 0);

  tslib_1.__decorate([property({
    type: Object
  })], GdqScheduleRuninfo.prototype, "originalValues", void 0);

  tslib_1.__decorate([property({
    type: Array
  })], GdqScheduleRuninfo.prototype, "runners", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], GdqScheduleRuninfo.prototype, "order", void 0);

  GdqScheduleRuninfo = GdqScheduleRuninfo_1 = tslib_1.__decorate([customElement('gdq-schedule-runinfo')], GdqScheduleRuninfo); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqScheduleRuninfo = GdqScheduleRuninfo;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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