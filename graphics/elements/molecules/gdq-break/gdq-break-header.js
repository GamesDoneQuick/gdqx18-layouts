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
  /**
   * @customElement
   * @polymer
   */

  let GdqBreakHeader = class GdqBreakHeader extends Polymer.Element {};

  __decorate([property({
    type: String
  })], GdqBreakHeader.prototype, "text", void 0);

  GdqBreakHeader = __decorate([customElement('gdq-break-header')], GdqBreakHeader); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqBreakHeader = GdqBreakHeader;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1icmVhay1oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxNQUFLO0FBQ3BDLFFBQU07QUFBQyxJQUFBLGFBQUQ7QUFBZ0IsSUFBQTtBQUFoQixNQUE0QixPQUFPLENBQUMsVUFBMUM7QUFFQTs7Ozs7QUFLQSxNQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFOLFNBQTZCLE9BQU8sQ0FBQyxPQUFyQyxDQUE0QyxFQUE1Qzs7QUFFQyxFQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSx3QkFBQSxFLE1BQUEsRSxLQUFhLENBQWIsQ0FBQTs7QUFGSyxFQUFBLGNBQWMsR0FBQSxVQUFBLENBQUEsQ0FEbkIsYUFBYSxDQUFDLGtCQUFELENBQ00sQ0FBQSxFQUFkLGNBQWMsQ0FBZCxDQVI4QixDQWFwQzs7QUFDQyxFQUFBLE1BQWMsQ0FBQyxjQUFmLEdBQWdDLGNBQWhDO0FBQ0QsQ0FmRCIsInNvdXJjZVJvb3QiOiIifQ==