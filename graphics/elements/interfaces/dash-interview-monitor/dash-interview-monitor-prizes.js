import * as tslib_1 from "tslib";
import MapSortMixin from '../../../mixins/MapSortMixin';
const { customElement, property } = Polymer.decorators;
const allPrizesRep = nodecg.Replicant('allPrizes');
const prizePlaylistRep = nodecg.Replicant('interview:prizePlaylist');
const prizePlaylistSortMapRep = nodecg.Replicant('interview:prizePlaylistSortMap');
/**
 * @customElement
 * @polymer
 * @appliesMixin window.MapSortMixin
 */
let DashInterviewMonitorPrizes = class DashInterviewMonitorPrizes extends MapSortMixin(Polymer.MutableData(Polymer.Element)) {
    ready() {
        super.ready();
        allPrizesRep.on('change', newVal => {
            if (!newVal || newVal.length === 0) {
                this.allPrizes = [];
                return;
            }
            this.allPrizes = newVal;
        });
        prizePlaylistRep.on('change', newVal => {
            if (!newVal || newVal.length === 0) {
                this.prizePlaylist = [];
                return;
            }
            this.prizePlaylist = newVal;
        });
        prizePlaylistSortMapRep.on('change', (newVal, _oldVal, operations) => {
            if (!newVal) {
                return;
            }
            this._sortMapVal = newVal;
            this.$.repeat.render();
            if (newVal.length > 0 && this._shouldFlash(operations)) {
                this._flashElementBackground(this);
            }
        });
    }
    _computePlaylistPrizes(allPrizes, prizePlaylist) {
        if (!allPrizes || allPrizes.length === 0 ||
            !prizePlaylist || prizePlaylist.length === 0) {
            return [];
        }
        return prizePlaylist.filter(playlistEntry => {
            return !playlistEntry.complete;
        }).map(playlistEntry => {
            return allPrizes.find(prize => {
                return prize.id === playlistEntry.id;
            });
        });
    }
    _computeNoPlaylistPrizes(playlistPrizes) {
        return !playlistPrizes || playlistPrizes.length <= 0;
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashInterviewMonitorPrizes.prototype, "allPrizes", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashInterviewMonitorPrizes.prototype, "prizePlaylist", void 0);
tslib_1.__decorate([
    property({ type: Array, computed: '_computePlaylistPrizes(allPrizes, prizePlaylist)' })
], DashInterviewMonitorPrizes.prototype, "playlistPrizes", void 0);
tslib_1.__decorate([
    property({ type: Boolean, computed: '_computeNoPlaylistPrizes(playlistPrizes)' })
], DashInterviewMonitorPrizes.prototype, "noPlaylistPrizes", void 0);
DashInterviewMonitorPrizes = tslib_1.__decorate([
    customElement('dash-interview-monitor-prizes')
], DashInterviewMonitorPrizes);
export default DashInterviewMonitorPrizes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbW9uaXRvci1wcml6ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWludGVydmlldy1tb25pdG9yLXByaXplcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxZQUFZLE1BQU0sOEJBQThCLENBQUM7QUFFeEQsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsV0FBVyxDQUFDLENBQUM7QUFDNUQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUEyQix5QkFBeUIsQ0FBQyxDQUFDO0FBQy9GLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRTdGOzs7O0dBSUc7QUFFSCxJQUFxQiwwQkFBMEIsR0FBL0MsTUFBcUIsMEJBQTJCLFNBQVEsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBYXpHLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFZCxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsT0FBTzthQUNQO1lBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixPQUFPO2FBQ1A7WUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUVILHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQ3BFLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osT0FBTzthQUNQO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDekIsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUE0QixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRTlDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDdkQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25DO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsc0JBQXNCLENBQUMsU0FBbUIsRUFBRSxhQUF3QztRQUNuRixJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUN2QyxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM5QyxPQUFPLEVBQUUsQ0FBQztTQUNWO1FBRUQsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN0QixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLE9BQU8sS0FBSyxDQUFDLEVBQUUsS0FBSyxhQUFhLENBQUMsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsd0JBQXdCLENBQUMsY0FBd0I7UUFDaEQsT0FBTyxDQUFDLGNBQWMsSUFBSSxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBQ0QsQ0FBQTtBQS9EQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzs2REFDTDtBQUduQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztpRUFDZ0I7QUFHeEM7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxrREFBa0QsRUFBQyxDQUFDO2tFQUM5RDtBQUd4QjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLDBDQUEwQyxFQUFDLENBQUM7b0VBQ3REO0FBWE4sMEJBQTBCO0lBRDlDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQztHQUMxQiwwQkFBMEIsQ0FpRTlDO2VBakVvQiwwQkFBMEIifQ==