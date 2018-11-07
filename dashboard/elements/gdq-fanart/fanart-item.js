import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  /**
   * @customElement
   * @polymer
   * @appliesMixin Polymer.MutableData
   */

  var FanartItem =
  /** @class */
  function (_super) {
    tslib_1.__extends(FanartItem, _super);

    function FanartItem() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    FanartItem.prototype.preview = function () {
      this.dispatchEvent(new CustomEvent('preview'));
    };

    FanartItem.prototype.accept = function () {
      nodecg.sendMessage('acceptFanart', this.value);
    };

    FanartItem.prototype.reject = function () {
      nodecg.sendMessage('rejectTweet', this.value.id_str);
    };

    FanartItem.prototype._calcIndicatorHidden = function (tweetMedia) {
      return !tweetMedia || !Array.isArray(tweetMedia) || tweetMedia.length <= 1;
    };

    tslib_1.__decorate([property({
      type: Object
    })], FanartItem.prototype, "value");

    FanartItem = tslib_1.__decorate([customElement('fanart-item')], FanartItem);
    return FanartItem;
  }(Polymer.MutableData(Polymer.Element)); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.FanartItem = FanartItem;
});