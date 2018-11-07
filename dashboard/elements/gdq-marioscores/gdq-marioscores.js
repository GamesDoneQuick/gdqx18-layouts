import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  var scoresRep = nodecg.Replicant('scores');

  var GdqMarioScores =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqMarioScores, _super);

    function GdqMarioScores() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    GdqMarioScores.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      scoresRep.on('change', function (newVal) {
        if (newVal) {
          _this.scores = newVal;
        }
      });
    };

    GdqMarioScores.prototype._scoreInputChanged = function (e) {
      if (!scoresRep.value || !e.target) {
        return;
      }

      var target = e.target;
      var teamIndex = parseInt(String(target.getAttribute('data-team-index')), 10);
      var val = parseInt(String(target.value), 10);

      if (typeof val === 'number' && !isNaN(val)) {
        scoresRep.value[teamIndex] = val;
      }
    };

    tslib_1.__decorate([property({
      type: Object
    })], GdqMarioScores.prototype, "scores");

    GdqMarioScores = tslib_1.__decorate([customElement('gdq-marioscores')], GdqMarioScores);
    return GdqMarioScores;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqMarioScores = GdqMarioScores;
});