import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
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

tslib_1.__decorate([property({
  type: String
})], AtromGradientText.prototype, "text", void 0);

tslib_1.__decorate([property({
  type: String,
  reflectToAttribute: true
})], AtromGradientText.prototype, "align", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtromGradientText.prototype, "maxWidth", void 0);

AtromGradientText = tslib_1.__decorate([customElement('atom-gradient-text')], AtromGradientText);
export default AtromGradientText;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tZ3JhZGllbnQtdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTTtBQUFDLEVBQUEsYUFBRDtBQUFnQixFQUFBO0FBQWhCLElBQTRCLE9BQU8sQ0FBQyxVQUExQztBQUVBOzs7OztBQUtBLElBQXFCLGlCQUFpQixHQUF0QyxNQUFxQixpQkFBckIsU0FBK0MsT0FBTyxDQUFDLE9BQXZELENBQThEO0FBVTdELEVBQUEsS0FBSyxHQUFBO0FBQ0osVUFBTSxLQUFOLEdBREksQ0FHSjs7QUFDQSxTQUFLLFVBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLGdCQUFsQyxFQUFvRCxPQUFwRCxDQUE0RCxJQUFJLElBQUc7QUFDakUsTUFBQSxJQUFZLENBQUMsQ0FBYixDQUFlLGFBQWYsQ0FBNkIsS0FBN0IsQ0FBbUMsb0JBQW5DLEdBQTBELE1BQTFEO0FBQ0QsS0FGRDtBQUdBOztBQWpCNEQsQ0FBOUQ7O0FBRUMsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLEVBQUEsSUFBSSxFQUFFO0FBQVAsQ0FBRCxDQUNULENBQUEsRSwyQkFBQSxFLE1BQUEsRSxLQUFhLENBQWI7O0FBR0EsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLEVBQUEsSUFBSSxFQUFFLE1BQVA7QUFBZSxFQUFBLGtCQUFrQixFQUFFO0FBQW5DLENBQUQsQ0FDVCxDQUFBLEUsMkJBQUEsRSxPQUFBLEUsS0FBYyxDQUFkOztBQUdBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxFQUFBLElBQUksRUFBRTtBQUFQLENBQUQsQ0FDVCxDQUFBLEUsMkJBQUEsRSxVQUFBLEUsS0FBaUIsQ0FBakI7O0FBUm9CLGlCQUFpQixHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEckMsYUFBYSxDQUFDLG9CQUFELENBQ3dCLENBQUEsRUFBakIsaUJBQWlCLENBQWpCO2VBQUEsaUIiLCJzb3VyY2VSb290IjoiIn0=