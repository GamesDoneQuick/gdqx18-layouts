import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  var currentLayout = nodecg.Replicant('gdq:currentLayout');
  var fanartTweetsRep = nodecg.Replicant('fanartTweets');
  /**
   * @customElement
   * @polymer
   * @appliesMixin Polymer.MutableData
   */

  var GdqFanart =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqFanart, _super);

    function GdqFanart() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    GdqFanart.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      currentLayout.on('change', function (newVal) {
        var cover = _this.$.cover;

        switch (newVal) {
          case 'break':
            cover.style.display = 'none';
            break;

          default:
            cover.style.display = 'flex';
        }
      });
      fanartTweetsRep.on('change', function (newVal) {
        if (!newVal) {
          return;
        }

        _this.$.empty.style.display = newVal.length > 0 ? 'none' : 'flex';
        _this.tweets = newVal;
      });
    };

    GdqFanart.prototype._sortTweets = function (a, b) {
      // @ts-ignore
      return new Date(b.created_at) - new Date(a.created_at);
    };

    GdqFanart.prototype._handlePreviewEvent = function (event) {
      var previewDialog = this.$.previewDialog;
      previewDialog.open(event.model.tweet);
    };

    tslib_1.__decorate([property({
      type: Array
    })], GdqFanart.prototype, "tweets");

    GdqFanart = tslib_1.__decorate([customElement('gdq-fanart')], GdqFanart);
    return GdqFanart;
  }(Polymer.MutableData(Polymer.Element)); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqFanart = GdqFanart;
});