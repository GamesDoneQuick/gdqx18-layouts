import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  const scoresRep = nodecg.Replicant('scores');
  let GdqMarioScores = class GdqMarioScores extends Polymer.Element {
    ready() {
      super.ready();
      scoresRep.on('change', newVal => {
        if (newVal) {
          this.scores = newVal;
        }
      });
    }

    _scoreInputChanged(e) {
      if (!scoresRep.value || !e.target) {
        return;
      }

      const target = e.target;
      const teamIndex = parseInt(String(target.getAttribute('data-team-index')), 10);
      const val = parseInt(String(target.value), 10);

      if (typeof val === 'number' && !isNaN(val)) {
        scoresRep.value[teamIndex] = val;
      }
    }

  };

  tslib_1.__decorate([property({
    type: Object
  })], GdqMarioScores.prototype, "scores", void 0);

  GdqMarioScores = tslib_1.__decorate([customElement('gdq-marioscores')], GdqMarioScores); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqMarioScores = GdqMarioScores;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1tYXJpb3Njb3Jlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLE1BQUs7QUFDcEMsUUFBTTtBQUFDLElBQUEsYUFBRDtBQUFnQixJQUFBO0FBQWhCLE1BQTRCLE9BQU8sQ0FBQyxVQUExQztBQUNBLFFBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFQLENBQXlCLFFBQXpCLENBQWxCO0FBR0EsTUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBTixTQUE2QixPQUFPLENBQUMsT0FBckMsQ0FBNEM7QUFJM0MsSUFBQSxLQUFLLEdBQUE7QUFDSixZQUFNLEtBQU47QUFDQSxNQUFBLFNBQVMsQ0FBQyxFQUFWLENBQWEsUUFBYixFQUF1QixNQUFNLElBQUc7QUFDL0IsWUFBSSxNQUFKLEVBQVk7QUFDWCxlQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0E7QUFDRCxPQUpEO0FBS0E7O0FBRUQsSUFBQSxrQkFBa0IsQ0FBQyxDQUFELEVBQVM7QUFDMUIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFYLElBQW9CLENBQUMsQ0FBQyxDQUFDLE1BQTNCLEVBQW1DO0FBQ2xDO0FBQ0E7O0FBRUQsWUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQWpCO0FBQ0EsWUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBUCxDQUFvQixpQkFBcEIsQ0FBRCxDQUFQLEVBQWlELEVBQWpELENBQTFCO0FBQ0EsWUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBUixDQUFQLEVBQXVCLEVBQXZCLENBQXBCOztBQUNBLFVBQUksT0FBTyxHQUFQLEtBQWUsUUFBZixJQUEyQixDQUFDLEtBQUssQ0FBQyxHQUFELENBQXJDLEVBQTRDO0FBQzNDLFFBQUEsU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsU0FBaEIsSUFBNkIsR0FBN0I7QUFDQTtBQUNEOztBQXhCMEMsR0FBNUM7O0FBRUMsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLHdCQUFBLEUsUUFBQSxFLEtBQWUsQ0FBZjs7QUFGSyxFQUFBLGNBQWMsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBRG5CLGFBQWEsQ0FBQyxpQkFBRCxDQUNNLENBQUEsRUFBZCxjQUFjLENBQWQsQ0FMOEIsQ0FnQ3BDOztBQUNDLEVBQUEsTUFBYyxDQUFDLGNBQWYsR0FBZ0MsY0FBaEM7QUFDRCxDQWxDRCIsInNvdXJjZVJvb3QiOiIifQ==