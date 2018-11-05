var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
    const { customElement, property } = Polymer.decorators;
    const currentLayout = nodecg.Replicant('gdq:currentLayout');
    const tweets = nodecg.Replicant('tweets');
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     */
    let GdqTwitterControls = class GdqTwitterControls extends Polymer.MutableData(Polymer.Element) {
        ready() {
            super.ready();
            const cover = this.$.cover;
            currentLayout.on('change', newVal => {
                switch (newVal) {
                    case 'countdown':
                    case 'interview':
                    case 'standard_4':
                    case 'widescreen_4':
                    case 'gameboy_4':
                    case 'ds':
                        cover.style.display = 'flex';
                        break;
                    default:
                        cover.style.display = 'none';
                }
            });
            tweets.on('change', newVal => {
                this.$.empty.style.display = newVal.length > 0 ? 'none' : 'flex';
                this.tweets = newVal;
            });
        }
        _sortTweets(a, b) {
            // @ts-ignore
            return new Date(b.created_at) - new Date(a.created_at);
        }
    };
    __decorate([
        property({ type: Array })
    ], GdqTwitterControls.prototype, "tweets", void 0);
    GdqTwitterControls = __decorate([
        customElement('gdq-twitter-controls')
    ], GdqTwitterControls);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqTwitterControls = GdqTwitterControls;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXR3aXR0ZXItY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtdHdpdHRlci1jb250cm9scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNwQyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDckQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBcUIsbUJBQW1CLENBQUMsQ0FBQztJQUNoRixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFTLFFBQVEsQ0FBQyxDQUFDO0lBRWxEOzs7O09BSUc7SUFFSCxJQUFNLGtCQUFrQixHQUF4QixNQUFNLGtCQUFtQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUlwRSxLQUFLO1lBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFvQixDQUFDO1lBRTFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNuQyxRQUFRLE1BQU0sRUFBRTtvQkFDZixLQUFLLFdBQVcsQ0FBQztvQkFDakIsS0FBSyxXQUFXLENBQUM7b0JBQ2pCLEtBQUssWUFBWSxDQUFDO29CQUNsQixLQUFLLGNBQWMsQ0FBQztvQkFDcEIsS0FBSyxXQUFXLENBQUM7b0JBQ2pCLEtBQUssSUFBSTt3QkFDUixLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7d0JBQzdCLE1BQU07b0JBQ1A7d0JBQ0MsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2lCQUM5QjtZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBcUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDbEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBRUQsV0FBVyxDQUFDLENBQVEsRUFBRSxDQUFRO1lBQzdCLGFBQWE7WUFDYixPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEQsQ0FBQztLQUNELENBQUE7SUEvQkE7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7c0RBQ1Q7SUFGVixrQkFBa0I7UUFEdkIsYUFBYSxDQUFDLHNCQUFzQixDQUFDO09BQ2hDLGtCQUFrQixDQWlDdkI7SUFFRCxtR0FBbUc7SUFDbEcsTUFBYyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQ3pELENBQUMsQ0FBQyxDQUFDIn0=