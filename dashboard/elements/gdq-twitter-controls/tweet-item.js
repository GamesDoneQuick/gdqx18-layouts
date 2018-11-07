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

  var TweetItem =
  /** @class */
  function (_super) {
    tslib_1.__extends(TweetItem, _super);

    function TweetItem() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    TweetItem.prototype.accept = function () {
      nodecg.sendMessage('acceptTweet', this.value);
    };

    TweetItem.prototype.reject = function () {
      nodecg.sendMessage('rejectTweet', this.value.id_str);
    };

    tslib_1.__decorate([property({
      type: Object
    })], TweetItem.prototype, "value");

    TweetItem = tslib_1.__decorate([customElement('tweet-item')], TweetItem);
    return TweetItem;
  }(Polymer.MutableData(Polymer.Element)); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.TweetItem = TweetItem;
});