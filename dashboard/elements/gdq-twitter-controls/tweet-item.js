import * as tslib_1 from "tslib";
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
tslib_1.__decorate([
    property({ type: Object })
], TweetItem.prototype, "value", void 0);
TweetItem = tslib_1.__decorate([
    customElement('tweet-item')
], TweetItem);
export default TweetItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdlZXQtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR3ZWV0LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7OztHQUlHO0FBRUgsSUFBcUIsU0FBUyxHQUE5QixNQUFxQixTQUFVLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBSTFFLE1BQU07UUFDTCxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELE1BQU07UUFDTCxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDRCxDQUFBO0FBVEE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7d0NBQ1o7QUFGTyxTQUFTO0lBRDdCLGFBQWEsQ0FBQyxZQUFZLENBQUM7R0FDUCxTQUFTLENBVzdCO2VBWG9CLFNBQVMifQ==