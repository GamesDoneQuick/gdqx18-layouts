import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;

  var GdqScheduleRuninfo =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqScheduleRuninfo, _super);

    function GdqScheduleRuninfo() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    GdqScheduleRuninfo_1 = GdqScheduleRuninfo;

    GdqScheduleRuninfo.prototype._notesChanged = function (newVal) {
      var notes = this.$.notes;
      var valueDiv = notes.querySelector('.value');

      if (newVal) {
        valueDiv.innerHTML = newVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
      } else {
        valueDiv.innerHTML = '';
      }
    };

    GdqScheduleRuninfo.prototype.setRun = function (run) {
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
    };

    GdqScheduleRuninfo.prototype.calcName = function (name) {
      if (name) {
        return name.split('\\n').join(' ');
      }

      return name;
    };

    GdqScheduleRuninfo.prototype.calcModified = function (original) {
      return original === undefined || original === null ? '' : 'modified';
    };

    var GdqScheduleRuninfo_1;

    tslib_1.__decorate([property({
      type: String,
      observer: GdqScheduleRuninfo_1.prototype._notesChanged
    })], GdqScheduleRuninfo.prototype, "notes");

    tslib_1.__decorate([property({
      type: String,
      reflectToAttribute: true
    })], GdqScheduleRuninfo.prototype, "label");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqScheduleRuninfo.prototype, "coop");

    tslib_1.__decorate([property({
      type: String
    })], GdqScheduleRuninfo.prototype, "releaseYear");

    tslib_1.__decorate([property({
      type: String
    })], GdqScheduleRuninfo.prototype, "console");

    tslib_1.__decorate([property({
      type: String
    })], GdqScheduleRuninfo.prototype, "estimate");

    tslib_1.__decorate([property({
      type: String
    })], GdqScheduleRuninfo.prototype, "category");

    tslib_1.__decorate([property({
      type: String
    })], GdqScheduleRuninfo.prototype, "name");

    tslib_1.__decorate([property({
      type: Object
    })], GdqScheduleRuninfo.prototype, "originalValues");

    tslib_1.__decorate([property({
      type: Array
    })], GdqScheduleRuninfo.prototype, "runners");

    tslib_1.__decorate([property({
      type: Number
    })], GdqScheduleRuninfo.prototype, "order");

    GdqScheduleRuninfo = GdqScheduleRuninfo_1 = tslib_1.__decorate([customElement('gdq-schedule-runinfo')], GdqScheduleRuninfo);
    return GdqScheduleRuninfo;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqScheduleRuninfo = GdqScheduleRuninfo;
});