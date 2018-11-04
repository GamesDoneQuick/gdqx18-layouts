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
    __decorate([
        property({ type: Object })
    ], FanartItem.prototype, "value", void 0);
    FanartItem = __decorate([
        customElement('fanart-item')
    ], FanartItem);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.FanartItem = FanartItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFuYXJ0LWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYW5hcnQtaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNwQyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFFckQ7Ozs7T0FJRztJQUVILElBQU0sVUFBVSxHQUFoQixNQUFNLFVBQVcsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFJNUQsT0FBTztZQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsTUFBTTtZQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsTUFBTTtZQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVELG9CQUFvQixDQUFDLFVBQWtDO1lBQ3RELE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQzVFLENBQUM7S0FDRCxDQUFBO0lBakJBO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzZDQUNaO0lBRlIsVUFBVTtRQURmLGFBQWEsQ0FBQyxhQUFhLENBQUM7T0FDdkIsVUFBVSxDQW1CZjtJQUVELG1HQUFtRztJQUNsRyxNQUFjLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUN6QyxDQUFDLENBQUMsQ0FBQyJ9