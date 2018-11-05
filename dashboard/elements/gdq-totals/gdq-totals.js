var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
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
    __decorate([
        property({ type: String })
    ], GdqTotals.prototype, "cashTotal", void 0);
    __decorate([
        property({ type: String })
    ], GdqTotals.prototype, "bitsTotal", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqTotals.prototype, "autoUpdateTotal", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqTotals.prototype, "recordTrackerEnabled", void 0);
    __decorate([
        property({ type: String })
    ], GdqTotals.prototype, "_editTarget", void 0);
    GdqTotals = __decorate([
        customElement('gdq-totals')
    ], GdqTotals);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqTotals = GdqTotals;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRvdGFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS10b3RhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDcEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBRXJELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVEsT0FBTyxDQUFDLENBQUM7SUFDbkQsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxpQkFBaUIsQ0FBQyxDQUFDO0lBR3JFLElBQU0sU0FBUyxHQUFmLE1BQU0sU0FBVSxTQUFRLE9BQU8sQ0FBQyxPQUFPO1FBRHZDOztZQUdDLGNBQVMsR0FBRyxHQUFHLENBQUM7WUFHaEIsY0FBUyxHQUFHLEdBQUcsQ0FBQztRQTJDakIsQ0FBQztRQWhDQSxLQUFLO1lBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztZQUNILGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFRCxhQUFhO1lBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JCLE9BQU87YUFDUDtZQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBb0MsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDekIsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFpQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xELENBQUM7UUFFRCw2QkFBNkIsQ0FBQyxDQUFRO1lBQ3JDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUNkLE9BQU87YUFDUDtZQUNELGVBQWUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFFLENBQUMsQ0FBQyxNQUFtQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pGLENBQUM7UUFFRCwwQkFBMEI7WUFDekIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUU7Z0JBQzlCLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDdEIsUUFBUSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFvQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hGLENBQUMsQ0FBQztRQUNKLENBQUM7S0FDRCxDQUFBO0lBOUNBO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2dEQUNUO0lBR2hCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2dEQUNUO0lBR2hCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO3NEQUNEO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDOzJEQUNJO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2tEQUNMO0lBZGYsU0FBUztRQURkLGFBQWEsQ0FBQyxZQUFZLENBQUM7T0FDdEIsU0FBUyxDQWdEZDtJQUVELG1HQUFtRztJQUNsRyxNQUFjLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUN2QyxDQUFDLENBQUMsQ0FBQyJ9