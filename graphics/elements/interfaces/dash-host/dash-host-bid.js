import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashHostBid = class DashHostBid extends Polymer.MutableData(Polymer.Element) {
    computeFailed(closed, bid) {
        return closed && bid.rawTotal < bid.rawGoal;
    }
    computeClosed(bid) {
        return bid.state.toLowerCase() === 'closed';
    }
    bidIsChallenge(bid) {
        return bid.type === 'challenge';
    }
    limitOptions(options) {
        if (!options) {
            return [];
        }
        return options.slice(0, 3);
    }
    bidHasMoreThanThreeOptions(bid) {
        if (!bid.options) {
            return false;
        }
        return bid.options.length > 3;
    }
    calcNumAdditionalOptions(bid) {
        if (!bid.options) {
            return 0;
        }
        return bid.options.length - 3;
    }
    calcBidName(description) {
        return description.replace(/\\n/g, ' ');
    }
    _computeType(bid) {
        return bid ? bid.type : '';
    }
};
tslib_1.__decorate([
    property({
        type: String,
        reflectToAttribute: true,
        computed: '_computeType(bid)'
    })
], DashHostBid.prototype, "type", void 0);
tslib_1.__decorate([
    property({ type: Object })
], DashHostBid.prototype, "bid", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        computed: 'computeFailed(closed, bid)',
        reflectToAttribute: true
    })
], DashHostBid.prototype, "failed", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        computed: 'computeClosed(bid)',
        reflectToAttribute: true
    })
], DashHostBid.prototype, "closed", void 0);
DashHostBid = tslib_1.__decorate([
    customElement('dash-host-bid')
], DashHostBid);
export default DashHostBid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LWJpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaG9zdC1iaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQixXQUFXLEdBQWhDLE1BQXFCLFdBQVksU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUF5QjVFLGFBQWEsQ0FBQyxNQUFlLEVBQUUsR0FBYztRQUM1QyxPQUFPLE1BQU0sSUFBSSxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDN0MsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFjO1FBQzNCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLENBQUM7SUFDN0MsQ0FBQztJQUVELGNBQWMsQ0FBQyxHQUFjO1FBQzVCLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUFtQjtRQUMvQixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2IsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUVELE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELDBCQUEwQixDQUFDLEdBQWM7UUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUVELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxHQUFjO1FBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxDQUFDO1NBQ1Q7UUFFRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsV0FBVyxDQUFDLFdBQW1CO1FBQzlCLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFjO1FBQzFCLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDNUIsQ0FBQztDQUNELENBQUE7QUE5REE7SUFMQyxRQUFRLENBQUM7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLGtCQUFrQixFQUFFLElBQUk7UUFDeEIsUUFBUSxFQUFFLG1CQUFtQjtLQUM3QixDQUFDO3lDQUNXO0FBR2I7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7d0NBQ1Y7QUFPZjtJQUxDLFFBQVEsQ0FBQztRQUNULElBQUksRUFBRSxPQUFPO1FBQ2IsUUFBUSxFQUFFLDRCQUE0QjtRQUN0QyxrQkFBa0IsRUFBRSxJQUFJO0tBQ3hCLENBQUM7MkNBQ2M7QUFPaEI7SUFMQyxRQUFRLENBQUM7UUFDVCxJQUFJLEVBQUUsT0FBTztRQUNiLFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsa0JBQWtCLEVBQUUsSUFBSTtLQUN4QixDQUFDOzJDQUNjO0FBdkJJLFdBQVc7SUFEL0IsYUFBYSxDQUFDLGVBQWUsQ0FBQztHQUNWLFdBQVcsQ0FvRS9CO2VBcEVvQixXQUFXIn0=