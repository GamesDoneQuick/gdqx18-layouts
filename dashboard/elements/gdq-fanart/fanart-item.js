import * as tslib_1 from "tslib";
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
tslib_1.__decorate([
    property({ type: Object })
], FanartItem.prototype, "value", void 0);
FanartItem = tslib_1.__decorate([
    customElement('fanart-item')
], FanartItem);
export default FanartItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFuYXJ0LWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYW5hcnQtaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7O0dBSUc7QUFFSCxJQUFxQixVQUFVLEdBQS9CLE1BQXFCLFVBQVcsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFJM0UsT0FBTztRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsTUFBTTtRQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsTUFBTTtRQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELG9CQUFvQixDQUFDLFVBQWtDO1FBQ3RELE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDRCxDQUFBO0FBakJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3lDQUNaO0FBRk8sVUFBVTtJQUQ5QixhQUFhLENBQUMsYUFBYSxDQUFDO0dBQ1IsVUFBVSxDQW1COUI7ZUFuQm9CLFVBQVUifQ==