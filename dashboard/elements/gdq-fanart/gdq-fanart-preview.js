import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
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

GdqFanartPreview = tslib_1.__decorate([customElement('gdq-fanart-preview')], GdqFanartPreview);
export default GdqFanartPreview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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