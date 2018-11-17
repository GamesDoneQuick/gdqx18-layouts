import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentLayout = nodecg.Replicant('gdq:currentLayout');
const fanartTweetsRep = nodecg.Replicant('fanartTweets');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let GDQFanartElement = class GDQFanartElement extends Polymer.MutableData(Polymer.Element) {
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
], GDQFanartElement.prototype, "tweets", void 0);
GDQFanartElement = tslib_1.__decorate([
    customElement('gdq-fanart')
], GDQFanartElement);
export default GDQFanartElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWZhbmFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1mYW5hcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFxQixtQkFBbUIsQ0FBQyxDQUFDO0FBQ2hGLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWUsY0FBYyxDQUFDLENBQUM7QUFFdkU7Ozs7R0FJRztBQUVILElBQXFCLGdCQUFnQixHQUFyQyxNQUFxQixnQkFBaUIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFJakYsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBb0IsQ0FBQztZQUMxQyxRQUFRLE1BQU0sRUFBRTtnQkFDZixLQUFLLE9BQU87b0JBQ1gsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO29CQUM3QixNQUFNO2dCQUNQO29CQUNDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzthQUM5QjtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWixPQUFPO2FBQ1A7WUFFQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQXFCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDbEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVyxDQUFDLENBQVEsRUFBRSxDQUFRO1FBQzdCLGFBQWE7UUFDYixPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQVk7UUFDL0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUF3QyxDQUFDO1FBQ3RFLGFBQWEsQ0FBQyxJQUFJLENBQUUsS0FBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0QsQ0FBQTtBQW5DQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztnREFDSDtBQUZELGdCQUFnQjtJQURwQyxhQUFhLENBQUMsWUFBWSxDQUFDO0dBQ1AsZ0JBQWdCLENBcUNwQztlQXJDb0IsZ0JBQWdCIn0=