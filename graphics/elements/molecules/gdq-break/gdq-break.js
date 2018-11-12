import * as tslib_1 from "tslib";
import PQueue from '../../../../shared/lib/vendor/p-queue';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GdqBreak = class GdqBreak extends Polymer.Element {
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
], GdqBreak.prototype, "_queue", void 0);
GdqBreak = tslib_1.__decorate([
    customElement('gdq-break')
], GdqBreak);
export default GdqBreak;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWJyZWFrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLE1BQU0sTUFBTSx1Q0FBdUMsQ0FBQztBQUUzRCxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsUUFBUSxHQUE3QixNQUFxQixRQUFTLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFMckQ7OztPQUdHO0lBQ0g7O1FBR0MsV0FBTSxHQUFXLElBQUksTUFBTSxDQUFDLEVBQUMsV0FBVyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7SUF1RC9DLENBQUM7SUFyREEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBd0IsQ0FBQztRQUNsRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQXlCLENBQUM7UUFDcEQsU0FBUyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBMkIsQ0FBQztRQUNoRSxVQUFVLENBQUMsZ0JBQWdCLEdBQUc7WUFDN0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ1gsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNO1NBQ1UsQ0FBQztRQUV6QixJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ3BCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLGdCQUFnQixFQUFFLFNBQVM7U0FDM0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNwQixXQUFXLEVBQUUsWUFBWTtZQUN6QixnQkFBZ0IsRUFBRSxVQUFVO1NBQzVCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxlQUFlLENBQUMsRUFBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQTZEO1FBQzFHLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLEtBQUssR0FBYyxFQUFFLENBQUM7UUFDMUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUU7Z0JBQy9CLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkMsT0FBTzthQUNQO1lBRUQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1gsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwQjtpQkFBTTtnQkFDTixNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUMxQixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO3dCQUNwRCxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFOzRCQUM1QixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3pDLENBQUMsQ0FBQyxDQUFDO3dCQUNILE1BQU0sR0FBRyxLQUFLLENBQUM7d0JBQ2YsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDWixDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO29CQUNoQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDcEUsQ0FBQyxDQUFDLENBQUM7YUFDSDtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGtCQUFrQixDQUFDLEVBQThCO1FBQ2hELE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUIsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRCxDQUFBO0FBdkRBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3dDQUNxQjtBQUYxQixRQUFRO0lBRDVCLGFBQWEsQ0FBQyxXQUFXLENBQUM7R0FDTixRQUFRLENBeUQ1QjtlQXpEb0IsUUFBUSJ9