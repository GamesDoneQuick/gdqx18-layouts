var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
    const { customElement, property } = Polymer.decorators;
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
            super.ready();
            // Close when the background is clicked on.
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
            }
            else {
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
            }
            else {
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
    __decorate([
        property({ type: Boolean, reflectToAttribute: true })
    ], GdqFanartPreview.prototype, "opened", void 0);
    __decorate([
        property({ type: Object })
    ], GdqFanartPreview.prototype, "_tweet", void 0);
    __decorate([
        property({ type: Number })
    ], GdqFanartPreview.prototype, "_currentImageIndex", void 0);
    GdqFanartPreview = __decorate([
        customElement('gdq-fanart-preview')
    ], GdqFanartPreview);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqFanartPreview = GdqFanartPreview;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWZhbmFydC1wcmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWZhbmFydC1wcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQVNBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUVyRDs7O09BR0c7SUFFSCxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFpQixTQUFRLE9BQU8sQ0FBQyxPQUFPO1FBTDlDOzs7V0FHRztRQUNIOztZQUdDLFdBQU0sR0FBRyxLQUFLLENBQUM7WUFNZix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFxRnhCLENBQUM7UUFuRkEsS0FBSztZQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVkLDJDQUEyQztZQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDYjtZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVELElBQUksQ0FBQyxLQUFZO1lBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QyxDQUFDO1FBRUQsS0FBSztZQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFB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