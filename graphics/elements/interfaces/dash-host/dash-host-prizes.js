import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentPrizes = nodecg.Replicant('currentPrizes');
let DashHostPrizes = class DashHostPrizes extends Polymer.MutableData(Polymer.Element) {
    ready() {
        super.ready();
        currentPrizes.on('change', newVal => {
            this.prizes = newVal;
        });
        nodecg.listenFor('prizes:updating', () => {
            this.$.cooldown.indeterminate = true;
        });
        nodecg.listenFor('prizes:updated', () => {
            this.$.cooldown.startCountdown(60);
        });
    }
    computePrizesFilter(str) {
        if (str) {
            // Return a filter function for the current search string.
            const regexp = new RegExp(str, 'ig');
            return (prize) => {
                return regexp.test(prize.description);
            };
        }
        // Set filter to null to disable filtering.
        return null;
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashHostPrizes.prototype, "prizes", void 0);
tslib_1.__decorate([
    property({ type: String, notify: true })
], DashHostPrizes.prototype, "prizeFilterString", void 0);
DashHostPrizes = tslib_1.__decorate([
    customElement('dash-host-prizes')
], DashHostPrizes);
export default DashHostPrizes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LXByaXplcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaG9zdC1wcml6ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLGVBQWUsQ0FBQyxDQUFDO0FBR2pFLElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBZSxTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQU8vRSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtZQUN2QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQWlDLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBaUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsbUJBQW1CLENBQUMsR0FBVztRQUM5QixJQUFJLEdBQUcsRUFBRTtZQUNSLDBEQUEwRDtZQUMxRCxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckMsT0FBTyxDQUFDLEtBQVksRUFBRSxFQUFFO2dCQUN2QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQztTQUNGO1FBRUQsMkNBQTJDO1FBQzNDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztDQUNELENBQUE7QUFoQ0E7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7OENBQ1I7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzt5REFDYjtBQUxOLGNBQWM7SUFEbEMsYUFBYSxDQUFDLGtCQUFrQixDQUFDO0dBQ2IsY0FBYyxDQWtDbEM7ZUFsQ29CLGNBQWMifQ==