import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
const {
  customElement,
  property
} = Polymer.decorators;
let GdqTotalsTotal = class GdqTotalsTotal extends Polymer.Element {
  constructor() {
    super(...arguments);
    this.value = '?';
  }

  edit() {
    this.dispatchEvent(new CustomEvent('edit', {
      bubbles: true,
      composed: true
    }));
  }

  equal(a, b) {
    return a === b;
  }

};

tslib_1.__decorate([property({
  type: String
})], GdqTotalsTotal.prototype, "value", void 0);

tslib_1.__decorate([property({
  type: String
})], GdqTotalsTotal.prototype, "currency", void 0);

GdqTotalsTotal = tslib_1.__decorate([customElement('gdq-totals-total')], GdqTotalsTotal);
export default GdqTotalsTotal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS10b3RhbHMtdG90YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU07QUFBQyxFQUFBLGFBQUQ7QUFBZ0IsRUFBQTtBQUFoQixJQUE0QixPQUFPLENBQUMsVUFBMUM7QUFHQSxJQUFxQixjQUFjLEdBQW5DLE1BQXFCLGNBQXJCLFNBQTRDLE9BQU8sQ0FBQyxPQUFwRCxDQUEyRDtBQUQzRCxFQUFBLFdBQUEsR0FBQTs7QUFHQyxTQUFBLEtBQUEsR0FBUSxHQUFSO0FBWUE7O0FBUEEsRUFBQSxJQUFJLEdBQUE7QUFDSCxTQUFLLGFBQUwsQ0FBbUIsSUFBSSxXQUFKLENBQWdCLE1BQWhCLEVBQXdCO0FBQUMsTUFBQSxPQUFPLEVBQUUsSUFBVjtBQUFnQixNQUFBLFFBQVEsRUFBRTtBQUExQixLQUF4QixDQUFuQjtBQUNBOztBQUVELEVBQUEsS0FBSyxDQUFDLENBQUQsRUFBUyxDQUFULEVBQWU7QUFDbkIsV0FBTyxDQUFDLEtBQUssQ0FBYjtBQUNBOztBQWJ5RCxDQUEzRDs7QUFFQyxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsRUFBQSxJQUFJLEVBQUU7QUFBUCxDQUFELENBQ1QsQ0FBQSxFLHdCQUFBLEUsT0FBQSxFLEtBQVksQ0FBWjs7QUFHQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsRUFBQSxJQUFJLEVBQUU7QUFBUCxDQUFELENBQ1QsQ0FBQSxFLHdCQUFBLEUsVUFBQSxFLEtBQWlCLENBQWpCOztBQUxvQixjQUFjLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURsQyxhQUFhLENBQUMsa0JBQUQsQ0FDcUIsQ0FBQSxFQUFkLGNBQWMsQ0FBZDtlQUFBLGMiLCJzb3VyY2VSb290IjoiIn0=