import * as tslib_1 from "tslib";
import PQueue from '../../../../shared/lib/vendor/p-queue';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQBreakElement = class GDQBreakElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this._queue = new PQueue({ concurrency: 1 });
    }
    ready() {
        super.ready();
        const tweetElem = this.$.tweet;
        const fanartElem = this.$.fanart;
        tweetElem.companionElement = this.$.prizes;
        fanartElem.companionElement = [
            this.$.bids,
            this.$.prizes
        ];
        this._setupInterrupt({
            messageName: 'showTweet',
            interruptElement: tweetElem
        });
        this._setupInterrupt({
            messageName: 'showFanart',
            interruptElement: fanartElem
        });
    }
    _setupInterrupt({ messageName, interruptElement }) {
        let queued = false;
        let queue = [];
        nodecg.listenFor(messageName, payload => {
            if (interruptElement.canExtend) {
                interruptElement.playItem(payload);
                return;
            }
            if (queued) {
                queue.push(payload);
            }
            else {
                queued = true;
                this._queue.add(async () => {
                    interruptElement.addEventListener('can-extend', () => {
                        queue.forEach(queuedFanart => {
                            interruptElement.playItem(queuedFanart);
                        });
                        queued = false;
                        queue = [];
                    }, { once: true, passive: true });
                    return this._promisifyTimeline(interruptElement.playItem(payload));
                });
            }
        });
    }
    _promisifyTimeline(tl) {
        return new Promise(resolve => {
            tl.call(resolve, undefined, null, '+=0.03');
        });
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQBreakElement.prototype, "_queue", void 0);
GDQBreakElement = tslib_1.__decorate([
    customElement('gdq-break')
], GDQBreakElement);
export default GDQBreakElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWJyZWFrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLE1BQU0sTUFBTSx1Q0FBdUMsQ0FBQztBQUUzRCxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsZUFBZSxHQUFwQyxNQUFxQixlQUFnQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTDVEOzs7T0FHRztJQUNIOztRQUdDLFdBQU0sR0FBVyxJQUFJLE1BQU0sQ0FBQyxFQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBdUQvQyxDQUFDO0lBckRBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQXdCLENBQUM7UUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUF5QixDQUFDO1FBQ3BELFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQTJCLENBQUM7UUFDaEUsVUFBVSxDQUFDLGdCQUFnQixHQUFHO1lBQzdCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNYLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTTtTQUNVLENBQUM7UUFFekIsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNwQixXQUFXLEVBQUUsV0FBVztZQUN4QixnQkFBZ0IsRUFBRSxTQUFTO1NBQzNCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxlQUFlLENBQUM7WUFDcEIsV0FBVyxFQUFFLFlBQVk7WUFDekIsZ0JBQWdCLEVBQUUsVUFBVTtTQUM1QixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZSxDQUFDLEVBQUMsV0FBVyxFQUFFLGdCQUFnQixFQUE2RDtRQUMxRyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxLQUFLLEdBQWMsRUFBRSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLElBQUksZ0JBQWdCLENBQUMsU0FBUyxFQUFFO2dCQUMvQixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLE9BQU87YUFDUDtZQUVELElBQUksTUFBTSxFQUFFO2dCQUNYLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEI7aUJBQU07Z0JBQ04sTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRTtvQkFDMUIsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTt3QkFDcEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTs0QkFDNUIsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUN6QyxDQUFDLENBQUMsQ0FBQzt3QkFDSCxNQUFNLEdBQUcsS0FBSyxDQUFDO3dCQUNmLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ1osQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztvQkFDaEMsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxDQUFDO2FBQ0g7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxFQUE4QjtRQUNoRCxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzVCLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0QsQ0FBQTtBQXZEQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzsrQ0FDcUI7QUFGMUIsZUFBZTtJQURuQyxhQUFhLENBQUMsV0FBVyxDQUFDO0dBQ04sZUFBZSxDQXlEbkM7ZUF6RG9CLGVBQWUifQ==