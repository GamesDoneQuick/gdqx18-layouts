import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
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

FanartItem = tslib_1.__decorate([customElement('fanart-item')], FanartItem);
export default FanartItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhbmFydC1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxNQUFNO0FBQUMsRUFBQSxhQUFEO0FBQWdCLEVBQUE7QUFBaEIsSUFBNEIsT0FBTyxDQUFDLFVBQTFDO0FBRUE7Ozs7OztBQU1BLElBQXFCLFVBQVUsR0FBL0IsTUFBcUIsVUFBckIsU0FBd0MsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsT0FBTyxDQUFDLE9BQTVCLENBQXhDLENBQTRFO0FBSTNFLEVBQUEsT0FBTyxHQUFBO0FBQ04sU0FBSyxhQUFMLENBQW1CLElBQUksV0FBSixDQUFnQixTQUFoQixDQUFuQjtBQUNBOztBQUVELEVBQUEsTUFBTSxHQUFBO0FBQ0wsSUFBQSxNQUFNLENBQUMsV0FBUCxDQUFtQixjQUFuQixFQUFtQyxLQUFLLEtBQXhDO0FBQ0E7O0FBRUQsRUFBQSxNQUFNLEdBQUE7QUFDTCxJQUFBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLGFBQW5CLEVBQWtDLEtBQUssS0FBTCxDQUFXLE1BQTdDO0FBQ0E7O0FBRUQsRUFBQSxvQkFBb0IsQ0FBQyxVQUFELEVBQW1DO0FBQ3RELFdBQU8sQ0FBQyxVQUFELElBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTixDQUFjLFVBQWQsQ0FBaEIsSUFBNkMsVUFBVSxDQUFDLE1BQVgsSUFBcUIsQ0FBekU7QUFDQTs7QUFsQjBFLENBQTVFOztBQUVDLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxFQUFBLElBQUksRUFBRTtBQUFQLENBQUQsQ0FDVCxDQUFBLEUsb0JBQUEsRSxPQUFBLEUsS0FBYSxDQUFiOztBQUZvQixVQUFVLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUQ5QixhQUFhLENBQUMsYUFBRCxDQUNpQixDQUFBLEVBQVYsVUFBVSxDQUFWO2VBQUEsVSIsInNvdXJjZVJvb3QiOiIifQ==