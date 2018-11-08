"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

window.addEventListener('load', () => {
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

  __decorate([property({
    type: String
  })], GdqTotalsTotal.prototype, "value", void 0);

  __decorate([property({
    type: String
  })], GdqTotalsTotal.prototype, "currency", void 0);

  GdqTotalsTotal = __decorate([customElement('gdq-totals-total')], GdqTotalsTotal); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqTotalsTotal = GdqTotalsTotal;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS10b3RhbHMtdG90YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxNQUFLO0FBQ3BDLFFBQU07QUFBQyxJQUFBLGFBQUQ7QUFBZ0IsSUFBQTtBQUFoQixNQUE0QixPQUFPLENBQUMsVUFBMUM7QUFHQSxNQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFOLFNBQTZCLE9BQU8sQ0FBQyxPQUFyQyxDQUE0QztBQUQ1QyxJQUFBLFdBQUEsR0FBQTs7QUFHQyxXQUFBLEtBQUEsR0FBUSxHQUFSO0FBWUE7O0FBUEEsSUFBQSxJQUFJLEdBQUE7QUFDSCxXQUFLLGFBQUwsQ0FBbUIsSUFBSSxXQUFKLENBQWdCLE1BQWhCLEVBQXdCO0FBQUMsUUFBQSxPQUFPLEVBQUUsSUFBVjtBQUFnQixRQUFBLFFBQVEsRUFBRTtBQUExQixPQUF4QixDQUFuQjtBQUNBOztBQUVELElBQUEsS0FBSyxDQUFDLENBQUQsRUFBUyxDQUFULEVBQWU7QUFDbkIsYUFBTyxDQUFDLEtBQUssQ0FBYjtBQUNBOztBQWIwQyxHQUE1Qzs7QUFFQyxFQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSx3QkFBQSxFLE9BQUEsRSxLQUFZLENBQVosQ0FBQTs7QUFHQSxFQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSx3QkFBQSxFLFVBQUEsRSxLQUFpQixDQUFqQixDQUFBOztBQUxLLEVBQUEsY0FBYyxHQUFBLFVBQUEsQ0FBQSxDQURuQixhQUFhLENBQUMsa0JBQUQsQ0FDTSxDQUFBLEVBQWQsY0FBYyxDQUFkLENBSjhCLENBb0JwQzs7QUFDQyxFQUFBLE1BQWMsQ0FBQyxjQUFmLEdBQWdDLGNBQWhDO0FBQ0QsQ0F0QkQiLCJzb3VyY2VSb290IjoiIn0=