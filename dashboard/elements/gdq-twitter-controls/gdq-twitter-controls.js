import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  var currentLayout = nodecg.Replicant('gdq:currentLayout');
  var tweets = nodecg.Replicant('tweets');
  /**
   * @customElement
   * @polymer
   * @appliesMixin Polymer.MutableData
   */

  var GdqTwitterControls =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqTwitterControls, _super);

    function GdqTwitterControls() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    GdqTwitterControls.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      var cover = this.$.cover;
      currentLayout.on('change', function (newVal) {
        switch (newVal) {
          case 'countdown':
          case 'interview':
          case 'standard_4':
          case 'widescreen_4':
          case 'gameboy_4':
          case 'ds':
            cover.style.display = 'flex';
            break;

          default:
            cover.style.display = 'none';
        }
      });
      tweets.on('change', function (newVal) {
        _this.$.empty.style.display = newVal.length > 0 ? 'none' : 'flex';
        _this.tweets = newVal;
      });
    };

    GdqTwitterControls.prototype._sortTweets = function (a, b) {
      // @ts-ignore
      return new Date(b.created_at) - new Date(a.created_at);
    };

    tslib_1.__decorate([property({
      type: Array
    })], GdqTwitterControls.prototype, "tweets");

    GdqTwitterControls = tslib_1.__decorate([customElement('gdq-twitter-controls')], GdqTwitterControls);
    return GdqTwitterControls;
  }(Polymer.MutableData(Polymer.Element)); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqTwitterControls = GdqTwitterControls;
});