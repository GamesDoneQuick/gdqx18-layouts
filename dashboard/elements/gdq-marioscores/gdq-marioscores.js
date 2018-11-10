import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
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

GdqMarioScores = tslib_1.__decorate([customElement('gdq-marioscores')], GdqMarioScores);
export default GdqMarioScores;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1tYXJpb3Njb3Jlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTTtBQUFDLEVBQUEsYUFBRDtBQUFnQixFQUFBO0FBQWhCLElBQTRCLE9BQU8sQ0FBQyxVQUExQztBQUNBLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFQLENBQXlCLFFBQXpCLENBQWxCO0FBR0EsSUFBcUIsY0FBYyxHQUFuQyxNQUFxQixjQUFyQixTQUE0QyxPQUFPLENBQUMsT0FBcEQsQ0FBMkQ7QUFJMUQsRUFBQSxLQUFLLEdBQUE7QUFDSixVQUFNLEtBQU47QUFDQSxJQUFBLFNBQVMsQ0FBQyxFQUFWLENBQWEsUUFBYixFQUF1QixNQUFNLElBQUc7QUFDL0IsVUFBSSxNQUFKLEVBQVk7QUFDWCxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0E7QUFDRCxLQUpEO0FBS0E7O0FBRUQsRUFBQSxrQkFBa0IsQ0FBQyxDQUFELEVBQVM7QUFDMUIsUUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFYLElBQW9CLENBQUMsQ0FBQyxDQUFDLE1BQTNCLEVBQW1DO0FBQ2xDO0FBQ0E7O0FBRUQsVUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQWpCO0FBQ0EsVUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBUCxDQUFvQixpQkFBcEIsQ0FBRCxDQUFQLEVBQWlELEVBQWpELENBQTFCO0FBQ0EsVUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBUixDQUFQLEVBQXVCLEVBQXZCLENBQXBCOztBQUNBLFFBQUksT0FBTyxHQUFQLEtBQWUsUUFBZixJQUEyQixDQUFDLEtBQUssQ0FBQyxHQUFELENBQXJDLEVBQTRDO0FBQzNDLE1BQUEsU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsU0FBaEIsSUFBNkIsR0FBN0I7QUFDQTtBQUNEOztBQXhCeUQsQ0FBM0Q7O0FBRUMsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLEVBQUEsSUFBSSxFQUFFO0FBQVAsQ0FBRCxDQUNULENBQUEsRSx3QkFBQSxFLFFBQUEsRSxLQUFlLENBQWY7O0FBRm9CLGNBQWMsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBRGxDLGFBQWEsQ0FBQyxpQkFBRCxDQUNxQixDQUFBLEVBQWQsY0FBYyxDQUFkO2VBQUEsYyIsInNvdXJjZVJvb3QiOiIifQ==