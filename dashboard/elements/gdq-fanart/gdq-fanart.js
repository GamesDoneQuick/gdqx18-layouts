var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
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
    __decorate([
        property({ type: Array })
    ], GdqFanart.prototype, "tweets", void 0);
    GdqFanart = __decorate([
        customElement('gdq-fanart')
    ], GdqFanart);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqFanart = GdqFanart;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWZhbmFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1mYW5hcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0EsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDcEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQ3JELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXFCLG1CQUFtQixDQUFDLENBQUM7SUFDaEYsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBZSxjQUFjLENBQUMsQ0FBQztJQUV2RTs7OztPQUlHO0lBRUgsSUFBTSxTQUFTLEdBQWYsTUFBTSxTQUFVLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBSTNELEtBQUs7WUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFZCxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFvQixDQUFDO2dCQUMxQyxRQUFRLE1BQU0sRUFBRTtvQkFDZixLQUFLLE9BQU87d0JBQ1gsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO3dCQUM3QixNQUFNO29CQUNQO3dCQUNDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztpQkFDOUI7WUFDRixDQUFDLENBQUMsQ0FBQztZQUVILGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNaLE9BQU87aUJBQ1A7Z0JBRUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFxQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNsRixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFRCxXQUFXLENBQUMsQ0FBUSxFQUFFLENBQVE7WUFDN0IsYUFBYTtZQUNiLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRUQsbUJBQW1CLENBQUMsS0FBWTtZQUMvQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWtDLENBQUM7WUFDaEUsYUFBYSxDQUFDLElBQUksQ0FBRSxLQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FDRCxDQUFBO0lBbkNBO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDOzZDQUNIO0lBRmhCLFNBQVM7UUFEZCxhQUFhLENBQUMsWUFBWSxDQUFDO09BQ3RCLFNBQVMsQ0FxQ2Q7SUFFRCxtR0FBbUc7SUFDbEcsTUFBYyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDdkMsQ0FBQyxDQUFDLENBQUMifQ==