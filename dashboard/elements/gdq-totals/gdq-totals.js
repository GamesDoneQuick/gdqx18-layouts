import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const cashTotal = nodecg.Replicant('total');
const autoUpdateTotal = nodecg.Replicant('autoUpdateTotal');
let GdqTotals = class GdqTotals extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.cashTotal = '?';
        this.bitsTotal = '?';
    }
    ready() {
        super.ready();
        cashTotal.on('change', newVal => {
            this.cashTotal = newVal.formatted;
        });
        autoUpdateTotal.on('change', newVal => {
            this.autoUpdateTotal = newVal;
        });
    }
    editCashTotal() {
        if (!cashTotal.value) {
            return;
        }
        this.$.editTotalInput.value = String(cashTotal.value.raw);
        this._editTarget = 'cash';
        this.$.editDialog.open();
    }
    _handleAutoUpdateToggleChange(e) {
        if (!e.target) {
            return;
        }
        autoUpdateTotal.value = Boolean(e.target.checked);
    }
    _handleEditDialogConfirmed() {
        nodecg.sendMessage('setTotal', {
            type: this._editTarget,
            newValue: parseFloat(String(this.$.editTotalInput.value))
        });
    }
};
tslib_1.__decorate([
    property({ type: String })
], GdqTotals.prototype, "cashTotal", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqTotals.prototype, "bitsTotal", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GdqTotals.prototype, "autoUpdateTotal", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GdqTotals.prototype, "recordTrackerEnabled", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqTotals.prototype, "_editTarget", void 0);
GdqTotals = tslib_1.__decorate([
    customElement('gdq-totals')
], GdqTotals);
export default GdqTotals;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRvdGFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS10b3RhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFRLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsaUJBQWlCLENBQUMsQ0FBQztBQUdyRSxJQUFxQixTQUFTLEdBQTlCLE1BQXFCLFNBQVUsU0FBUSxPQUFPLENBQUMsT0FBTztJQUR0RDs7UUFHQyxjQUFTLEdBQUcsR0FBRyxDQUFDO1FBR2hCLGNBQVMsR0FBRyxHQUFHLENBQUM7SUEyQ2pCLENBQUM7SUFoQ0EsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGFBQWE7UUFDWixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtZQUNyQixPQUFPO1NBQ1A7UUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQW9DLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBaUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsNkJBQTZCLENBQUMsQ0FBUTtRQUNyQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNkLE9BQU87U0FDUDtRQUNELGVBQWUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFFLENBQUMsQ0FBQyxNQUFtQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCwwQkFBMEI7UUFDekIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUU7WUFDOUIsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQ3RCLFFBQVEsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBb0MsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoRixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0QsQ0FBQTtBQTlDQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs0Q0FDVDtBQUdoQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs0Q0FDVDtBQUdoQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztrREFDRDtBQUd6QjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQzt1REFDSTtBQUc5QjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs4Q0FDTDtBQWRBLFNBQVM7SUFEN0IsYUFBYSxDQUFDLFlBQVksQ0FBQztHQUNQLFNBQVMsQ0FnRDdCO2VBaERvQixTQUFTIn0=