import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentLayout = nodecg.Replicant('gdq:currentLayout');
const fanartTweetsRep = nodecg.Replicant('fanartTweets');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let GdqFanart = class GdqFanart extends Polymer.MutableData(Polymer.Element) {
    ready() {
        super.ready();
        currentLayout.on('change', newVal => {
            const cover = this.$.cover;
            switch (newVal) {
                case 'break':
                    cover.style.display = 'none';
                    break;
                default:
                    cover.style.display = 'flex';
            }
        });
        fanartTweetsRep.on('change', newVal => {
            if (!newVal) {
                return;
            }
            this.$.empty.style.display = newVal.length > 0 ? 'none' : 'flex';
            this.tweets = newVal;
        });
    }
    _sortTweets(a, b) {
        // @ts-ignore
        return new Date(b.created_at) - new Date(a.created_at);
    }
    _handlePreviewEvent(event) {
        const previewDialog = this.$.previewDialog;
        previewDialog.open(event.model.tweet);
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GdqFanart.prototype, "tweets", void 0);
GdqFanart = tslib_1.__decorate([
    customElement('gdq-fanart')
], GdqFanart);
export default GdqFanart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWZhbmFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1mYW5hcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFxQixtQkFBbUIsQ0FBQyxDQUFDO0FBQ2hGLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWUsY0FBYyxDQUFDLENBQUM7QUFFdkU7Ozs7R0FJRztBQUVILElBQXFCLFNBQVMsR0FBOUIsTUFBcUIsU0FBVSxTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUkxRSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFvQixDQUFDO1lBQzFDLFFBQVEsTUFBTSxFQUFFO2dCQUNmLEtBQUssT0FBTztvQkFDWCxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7b0JBQzdCLE1BQU07Z0JBQ1A7b0JBQ0MsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2FBQzlCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU87YUFDUDtZQUVBLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBcUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNsRixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBUSxFQUFFLENBQVE7UUFDN0IsYUFBYTtRQUNiLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBWTtRQUMvQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWlDLENBQUM7UUFDL0QsYUFBYSxDQUFDLElBQUksQ0FBRSxLQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRCxDQUFBO0FBbkNBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO3lDQUNIO0FBRkQsU0FBUztJQUQ3QixhQUFhLENBQUMsWUFBWSxDQUFDO0dBQ1AsU0FBUyxDQXFDN0I7ZUFyQ29CLFNBQVMifQ==