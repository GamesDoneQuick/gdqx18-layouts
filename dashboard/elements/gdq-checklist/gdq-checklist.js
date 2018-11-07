import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  var checklist = nodecg.Replicant('checklist');

  var GdqChecklist =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqChecklist, _super);

    function GdqChecklist() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    GdqChecklist.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      checklist.on('change', function (newVal) {
        if (!newVal) {
          return;
        }

        _this.extraContent = newVal.extraContent;
        _this.techStationDuties = newVal.techStationDuties;
        _this.stageTechDuties = newVal.stageTechDuties;
        _this.audioReady = newVal.audioEngineerDuties.every(function (task) {
          return task.complete;
        });
        var cycleRecordingsTask = newVal.special.find(function (task) {
          return task.name === 'Cycle Recordings';
        });

        if (cycleRecordingsTask) {
          _this.recordingsCycled = cycleRecordingsTask.complete;
        }
      });
      this._checkboxChanged = this._checkboxChanged.bind(this);
      this.addEventListener('change', this._checkboxChanged);
    };

    GdqChecklist.prototype._checkboxChanged = function (e) {
      var target = e.composedPath()[0];
      var category = target.getAttribute('category');
      var name = target.hasAttribute('name') ? target.getAttribute('name') : target.innerText.trim();

      if (!category) {
        return;
      }

      checklist.value[category].find(function (task) {
        if (task.name === name) {
          task.complete = Boolean(target.checked);
          return true;
        }

        return false;
      });
    };

    tslib_1.__decorate([property({
      type: Array
    })], GdqChecklist.prototype, "stageTechDuties");

    tslib_1.__decorate([property({
      type: Array
    })], GdqChecklist.prototype, "extraContent");

    tslib_1.__decorate([property({
      type: Array
    })], GdqChecklist.prototype, "techStationDuties");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqChecklist.prototype, "audioReady");

    tslib_1.__decorate([property({
      type: Boolean
    })], GdqChecklist.prototype, "recordingsCycled");

    GdqChecklist = tslib_1.__decorate([customElement('gdq-checklist')], GdqChecklist);
    return GdqChecklist;
  }(Polymer.MutableData(Polymer.Element)); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqChecklist = GdqChecklist;
});