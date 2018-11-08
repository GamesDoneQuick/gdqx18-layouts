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

  let AtromGradientText = class AtromGradientText extends Polymer.Element {
    ready() {
      super.ready(); // Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880

      this.shadowRoot.querySelectorAll('sc-fitted-text').forEach(node => {
        node.$.fittedContent.style.webkitBackgroundClip = 'text';
      });
    }

  };

  __decorate([property({
    type: String
  })], AtromGradientText.prototype, "text", void 0);

  __decorate([property({
    type: String,
    reflectToAttribute: true
  })], AtromGradientText.prototype, "align", void 0);

  __decorate([property({
    type: Number
  })], AtromGradientText.prototype, "maxWidth", void 0);

  AtromGradientText = __decorate([customElement('atom-gradient-text')], AtromGradientText); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtromGradientText = AtromGradientText;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tZ3JhZGllbnQtdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLE1BQUs7QUFDcEMsUUFBTTtBQUFDLElBQUEsYUFBRDtBQUFnQixJQUFBO0FBQWhCLE1BQTRCLE9BQU8sQ0FBQyxVQUExQztBQUVBOzs7OztBQUtBLE1BQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQU4sU0FBZ0MsT0FBTyxDQUFDLE9BQXhDLENBQStDO0FBVTlDLElBQUEsS0FBSyxHQUFBO0FBQ0osWUFBTSxLQUFOLEdBREksQ0FHSjs7QUFDQSxXQUFLLFVBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLGdCQUFsQyxFQUFvRCxPQUFwRCxDQUE0RCxJQUFJLElBQUc7QUFDakUsUUFBQSxJQUFZLENBQUMsQ0FBYixDQUFlLGFBQWYsQ0FBNkIsS0FBN0IsQ0FBbUMsb0JBQW5DLEdBQTBELE1BQTFEO0FBQ0QsT0FGRDtBQUdBOztBQWpCNkMsR0FBL0M7O0FBRUMsRUFBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRTtBQUFQLEdBQUQsQ0FDVCxDQUFBLEUsMkJBQUEsRSxNQUFBLEUsS0FBYSxDQUFiLENBQUE7O0FBR0EsRUFBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRSxNQUFQO0FBQWUsSUFBQSxrQkFBa0IsRUFBRTtBQUFuQyxHQUFELENBQ1QsQ0FBQSxFLDJCQUFBLEUsT0FBQSxFLEtBQWMsQ0FBZCxDQUFBOztBQUdBLEVBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLDJCQUFBLEUsVUFBQSxFLEtBQWlCLENBQWpCLENBQUE7O0FBUkssRUFBQSxpQkFBaUIsR0FBQSxVQUFBLENBQUEsQ0FEdEIsYUFBYSxDQUFDLG9CQUFELENBQ1MsQ0FBQSxFQUFqQixpQkFBaUIsQ0FBakIsQ0FSOEIsQ0E0QnBDOztBQUNDLEVBQUEsTUFBYyxDQUFDLGlCQUFmLEdBQW1DLGlCQUFuQztBQUNELENBOUJEIiwic291cmNlUm9vdCI6IiJ9