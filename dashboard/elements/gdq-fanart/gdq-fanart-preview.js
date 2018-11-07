import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  /**
   * @customElement
   * @polymer
   */

  var GdqFanartPreview =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqFanartPreview, _super);

    function GdqFanartPreview() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.opened = false;
      _this._currentImageIndex = 0;
      return _this;
    }

    GdqFanartPreview.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this); // Close when the background is clicked on.


      this.addEventListener('click', function (event) {
        if (event.composedPath()[0] === _this) {
          _this.close();
        }
      });
    };

    GdqFanartPreview.prototype.open = function (tweet) {
      this.opened = true;
      this._currentImageIndex = 0;
      this._tweet = tweet;
      document.body.style.overflow = 'hidden';
    };

    GdqFanartPreview.prototype.close = function () {
      this.opened = false;
      document.body.style.overflow = '';
    };

    GdqFanartPreview.prototype.previous = function () {
      if (this._currentImageIndex <= 0) {
        this._currentImageIndex = 0;
      } else {
        this._currentImageIndex--;
      }
    };

    GdqFanartPreview.prototype.next = function () {
      if (!this._tweet || !this._tweetHasMedia(this._tweet)) {
        return;
      }

      var media = this._tweet.gdqMedia;

      if (!media) {
        return;
      }

      var maxIndex = media.length - 1;

      if (this._currentImageIndex >= maxIndex) {
        this._currentImageIndex = maxIndex;
      } else {
        this._currentImageIndex++;
      }
    };

    GdqFanartPreview.prototype._calcImageSrc = function (tweet, currentImageIndex) {
      if (!this._tweetHasMedia(tweet)) {
        return;
      }

      var media = tweet.gdqMedia;

      if (!media) {
        return;
      }

      return media[currentImageIndex].media_url_https;
    };

    GdqFanartPreview.prototype._tweetHasMedia = function (tweet) {
      return tweet && tweet.gdqMedia;
    };

    GdqFanartPreview.prototype._calcPreviousDisabled = function (currentImageIndex) {
      return currentImageIndex <= 0;
    };

    GdqFanartPreview.prototype._calcNextDisabled = function (tweet, currentImageIndex) {
      if (!tweet || !this._tweetHasMedia(tweet)) {
        return true;
      }

      var media = this._tweet.gdqMedia;

      if (!media) {
        return;
      }

      var maxIndex = media.length - 1;
      return currentImageIndex >= maxIndex;
    };

    tslib_1.__decorate([property({
      type: Boolean,
      reflectToAttribute: true
    })], GdqFanartPreview.prototype, "opened");

    tslib_1.__decorate([property({
      type: Object
    })], GdqFanartPreview.prototype, "_tweet");

    tslib_1.__decorate([property({
      type: Number
    })], GdqFanartPreview.prototype, "_currentImageIndex");

    GdqFanartPreview = tslib_1.__decorate([customElement('gdq-fanart-preview')], GdqFanartPreview);
    return GdqFanartPreview;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqFanartPreview = GdqFanartPreview;
});