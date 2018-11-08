import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  /**
   * @customElement
   * @polymer
   */

  let GdqFanartPreview = class GdqFanartPreview extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
      super(...arguments);
      this.opened = false;
      this._currentImageIndex = 0;
    }

    ready() {
      super.ready(); // Close when the background is clicked on.

      this.addEventListener('click', event => {
        if (event.composedPath()[0] === this) {
          this.close();
        }
      });
    }

    open(tweet) {
      this.opened = true;
      this._currentImageIndex = 0;
      this._tweet = tweet;
      document.body.style.overflow = 'hidden';
    }

    close() {
      this.opened = false;
      document.body.style.overflow = '';
    }

    previous() {
      if (this._currentImageIndex <= 0) {
        this._currentImageIndex = 0;
      } else {
        this._currentImageIndex--;
      }
    }

    next() {
      if (!this._tweet || !this._tweetHasMedia(this._tweet)) {
        return;
      }

      const media = this._tweet.gdqMedia;

      if (!media) {
        return;
      }

      const maxIndex = media.length - 1;

      if (this._currentImageIndex >= maxIndex) {
        this._currentImageIndex = maxIndex;
      } else {
        this._currentImageIndex++;
      }
    }

    _calcImageSrc(tweet, currentImageIndex) {
      if (!this._tweetHasMedia(tweet)) {
        return;
      }

      const media = tweet.gdqMedia;

      if (!media) {
        return;
      }

      return media[currentImageIndex].media_url_https;
    }

    _tweetHasMedia(tweet) {
      return tweet && tweet.gdqMedia;
    }

    _calcPreviousDisabled(currentImageIndex) {
      return currentImageIndex <= 0;
    }

    _calcNextDisabled(tweet, currentImageIndex) {
      if (!tweet || !this._tweetHasMedia(tweet)) {
        return true;
      }

      const media = this._tweet.gdqMedia;

      if (!media) {
        return;
      }

      const maxIndex = media.length - 1;
      return currentImageIndex >= maxIndex;
    }

  };

  tslib_1.__decorate([property({
    type: Boolean,
    reflectToAttribute: true
  })], GdqFanartPreview.prototype, "opened", void 0);

  tslib_1.__decorate([property({
    type: Object
  })], GdqFanartPreview.prototype, "_tweet", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], GdqFanartPreview.prototype, "_currentImageIndex", void 0);

  GdqFanartPreview = tslib_1.__decorate([customElement('gdq-fanart-preview')], GdqFanartPreview); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqFanartPreview = GdqFanartPreview;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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