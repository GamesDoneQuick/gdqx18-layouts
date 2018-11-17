import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const allBids = nodecg.Replicant('allBids');
const currentRun = nodecg.Replicant('currentRun');
const runOrderMap = nodecg.Replicant('runOrderMap');
let DashHostBids = class DashHostBids extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.bidTypes = ['choice-many', 'choice-binary'];
    }
    ready() {
        super.ready();
        allBids.on('change', () => {
            this.recalcRelevantBids();
        });
        currentRun.on('change', () => {
            this.recalcRelevantBids();
        });
        runOrderMap.on('change', () => {
            this.recalcRelevantBids();
        });
        nodecg.listenFor('bids:updating', () => {
            this.$.cooldown.indeterminate = true;
        });
        nodecg.listenFor('bids:updated', () => {
            this.$.cooldown.startCountdown(60);
        });
    }
    closeDialog() {
        this.$.dialog.close();
    }
    computeBidsFilter(str) {
        if (str) {
            // Return a filter function for the current search string.
            const regexp = new RegExp(escapeRegExp(str), 'ig');
            return (bid) => {
                return regexp.test(bid.description);
            };
        }
        // Set filter to null to disable filtering.
        return null;
    }
    recalcRelevantBids() {
        if (allBids.status !== 'declared' ||
            currentRun.status !== 'declared' ||
            runOrderMap.status !== 'declared' ||
            !allBids.value ||
            !runOrderMap.value ||
            !currentRun.value) {
            return;
        }
        this.relevantBids = allBids.value.filter(bid => {
            if (!this.bidTypes.includes(bid.type)) {
                return false;
            }
            if (bid.speedrun in runOrderMap.value) {
                return runOrderMap.value[bid.speedrun] >= currentRun.value.order;
            }
            return true;
        }).sort((a, b) => {
            return runOrderMap.value[a.speedrun] - runOrderMap.value[b.speedrun];
        });
    }
    calcBidName(description) {
        return description.replace('||', ' -- ');
    }
    _handleBidTap(e) {
        if (e.target.bid.type !== 'choice-many') {
            return;
        }
        this.dialogBid = e.target.bid;
        this.$.dialog.open();
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashHostBids.prototype, "relevantBids", void 0);
tslib_1.__decorate([
    property({ type: String, notify: true })
], DashHostBids.prototype, "bidFilterString", void 0);
tslib_1.__decorate([
    property({ type: Object })
], DashHostBids.prototype, "dialogBid", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashHostBids.prototype, "bidTypes", void 0);
DashHostBids = tslib_1.__decorate([
    customElement('dash-host-bids')
], DashHostBids);
export default DashHostBids;
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LWJpZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWhvc3QtYmlkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWMsU0FBUyxDQUFDLENBQUM7QUFDekQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBTSxZQUFZLENBQUMsQ0FBQztBQUN2RCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFXLGFBQWEsQ0FBQyxDQUFDO0FBRzlELElBQXFCLFlBQVksR0FBakMsTUFBcUIsWUFBYSxTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUQ5RTs7UUFZQyxhQUFRLEdBQUcsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUErRTdDLENBQUM7SUE3RUEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUN6QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUM1QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtZQUNyQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQWlDLENB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