import * as tslib_1 from "tslib";
var UiTweet_1;
const { customElement, property } = Polymer.decorators;
let UiTweet = UiTweet_1 = class UiTweet extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.noAvatar = false;
    }
    computeProfileUrl(tweet) {
        if (!tweet || !tweet.user) {
            return;
        }
        return `https://twitter.com/${tweet.user.screen_name}`;
    }
    computeTweetUrl(profileUrl, tweet) {
        if (!profileUrl || !tweet) {
            return;
        }
        return `${profileUrl}/status/${tweet.id_str}`;
    }
    populateBody() {
        if (!this.tweet) {
            return;
        }
        this.$.body.innerHTML = this.tweet.text;
    }
};
tslib_1.__decorate([
    property({ type: Object, observer: UiTweet_1.prototype.populateBody })
], UiTweet.prototype, "tweet", void 0);
tslib_1.__decorate([
    property({ type: String, computed: 'computeProfileUrl(tweet)' })
], UiTweet.prototype, "profileUrl", void 0);
tslib_1.__decorate([
    property({ type: String, computed: 'computeTweetUrl(profileUrl, tweet)' })
], UiTweet.prototype, "tweetUrl", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], UiTweet.prototype, "noAvatar", void 0);
UiTweet = UiTweet_1 = tslib_1.__decorate([
    customElement('ui-tweet')
], UiTweet);
export default UiTweet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktdHdlZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS10d2VldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQixPQUFPLGVBQTVCLE1BQXFCLE9BQVEsU0FBUSxPQUFPLENBQUMsT0FBTztJQURwRDs7UUFZQyxhQUFRLEdBQVksS0FBSyxDQUFDO0lBeUIzQixDQUFDO0lBdkJBLGlCQUFpQixDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDMUIsT0FBTztTQUNQO1FBRUQsT0FBTyx1QkFBdUIsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsZUFBZSxDQUFDLFVBQW1CLEVBQUUsS0FBYTtRQUNqRCxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzFCLE9BQU87U0FDUDtRQUVELE9BQU8sR0FBRyxVQUFVLFdBQVcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxZQUFZO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsT0FBTztTQUNQO1FBRUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3pDLENBQUM7Q0FDRCxDQUFBO0FBbENBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUMsQ0FBQztzQ0FDdEQ7QUFHYjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFDLENBQUM7MkNBQzVDO0FBR25CO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsb0NBQW9DLEVBQUMsQ0FBQzt5Q0FDeEQ7QUFHakI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDO3lDQUMxQjtBQVhOLE9BQU87SUFEM0IsYUFBYSxDQUFDLFVBQVUsQ0FBQztHQUNMLE9BQU8sQ0FvQzNCO2VBcENvQixPQUFPIn0=