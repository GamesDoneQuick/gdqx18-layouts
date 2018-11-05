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
    let TweetItem = class TweetItem extends Polymer.MutableData(Polymer.Element) {
        accept() {
            nodecg.sendMessage('acceptTweet', this.value);
        }
        reject() {
            nodecg.sendMessage('rejectTweet', this.value.id_str);
        }
    };
    __decorate([
        property({ type: Object })
    ], TweetItem.prototype, "value", void 0);
    TweetItem = __decorate([
        customElement('tweet-item')
    ], TweetItem);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.TweetItem = TweetItem;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdlZXQtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR3ZWV0LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDcEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBRXJEOzs7O09BSUc7SUFFSCxJQUFNLFNBQVMsR0FBZixNQUFNLFNBQVUsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFJM0QsTUFBTTtZQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQsTUFBTTtZQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsQ0FBQztLQUNELENBQUE7SUFUQTtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs0Q0FDWjtJQUZSLFNBQVM7UUFEZCxhQUFhLENBQUMsWUFBWSxDQUFDO09BQ3RCLFNBQVMsQ0FXZDtJQUVELG1HQUFtRztJQUNsRyxNQUFjLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUN2QyxDQUFDLENBQUMsQ0FBQyJ9