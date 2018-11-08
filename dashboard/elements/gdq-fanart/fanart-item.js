import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  /**
   * @customElement
   * @polymer
   * @appliesMixin Polymer.MutableData
   */

  let FanartItem = class FanartItem extends Polymer.MutableData(Polymer.Element) {
    preview() {
      this.dispatchEvent(new CustomEvent('preview'));
    }

    accept() {
      nodecg.sendMessage('acceptFanart', this.value);
    }

    reject() {
      nodecg.sendMessage('rejectTweet', this.value.id_str);
    }

    _calcIndicatorHidden(tweetMedia) {
      return !tweetMedia || !Array.isArray(tweetMedia) || tweetMedia.length <= 1;
    }

  };

  tslib_1.__decorate([property({
    type: Object
  })], FanartItem.prototype, "value", void 0);

  FanartItem = tslib_1.__decorate([customElement('fanart-item')], FanartItem); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.FanartItem = FanartItem;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhbmFydC1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBSztBQUNwQyxRQUFNO0FBQUMsSUFBQSxhQUFEO0FBQWdCLElBQUE7QUFBaEIsTUFBNEIsT0FBTyxDQUFDLFVBQTFDO0FBRUE7Ozs7OztBQU1BLE1BQU0sVUFBVSxHQUFoQixNQUFNLFVBQU4sU0FBeUIsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsT0FBTyxDQUFDLE9BQTVCLENBQXpCLENBQTZEO0FBSTVELElBQUEsT0FBTyxHQUFBO0FBQ04sV0FBSyxhQUFMLENBQW1CLElBQUksV0FBSixDQUFnQixTQUFoQixDQUFuQjtBQUNBOztBQUVELElBQUEsTUFBTSxHQUFBO0FBQ0wsTUFBQSxNQUFNLENBQUMsV0FBUCxDQUFtQixjQUFuQixFQUFtQyxLQUFLLEtBQXhDO0FBQ0E7O0FBRUQsSUFBQSxNQUFNLEdBQUE7QUFDTCxNQUFBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLGFBQW5CLEVBQWtDLEtBQUssS0FBTCxDQUFXLE1BQTdDO0FBQ0E7O0FBRUQsSUFBQSxvQkFBb0IsQ0FBQyxVQUFELEVBQW1DO0FBQ3RELGFBQU8sQ0FBQyxVQUFELElBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTixDQUFjLFVBQWQsQ0FBaEIsSUFBNkMsVUFBVSxDQUFDLE1BQVgsSUFBcUIsQ0FBekU7QUFDQTs7QUFsQjJELEdBQTdEOztBQUVDLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSxvQkFBQSxFLE9BQUEsRSxLQUFhLENBQWI7O0FBRkssRUFBQSxVQUFVLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURmLGFBQWEsQ0FBQyxhQUFELENBQ0UsQ0FBQSxFQUFWLFVBQVUsQ0FBVixDQVQ4QixDQThCcEM7O0FBQ0MsRUFBQSxNQUFjLENBQUMsVUFBZixHQUE0QixVQUE1QjtBQUNELENBaENEIiwic291cmNlUm9vdCI6IiJ9