var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
    var GdqScheduleRuninfo_1;
    const { customElement, property } = Polymer.decorators;
    let GdqScheduleRuninfo = GdqScheduleRuninfo_1 = class GdqScheduleRuninfo extends Polymer.Element {
        _notesChanged(newVal) {
            const notes = this.$.notes;
            const valueDiv = notes.querySelector('.value');
            if (newVal) {
                valueDiv.innerHTML = newVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
            }
            else {
                valueDiv.innerHTML = '';
            }
        }
        setRun(run) {
            this.name = run.name;
            this.console = run.console;
            this.runners = run.runners;
            this.releaseYear = String(run.releaseYear);
            this.estimate = run.estimate;
            this.category = run.category;
            this.order = run.order;
            this.notes = run.notes;
            this.coop = run.coop;
            this.originalValues = run.originalValues;
        }
        calcName(name) {
            if (name) {
                return name.split('\\n').join(' ');
            }
            return name;
        }
        calcModified(original) {
            return (original === undefined || original === null) ? '' : 'modified';
        }
    };
    __decorate([
        property({ type: String, observer: GdqScheduleRuninfo_1.prototype._notesChanged })
    ], GdqScheduleRuninfo.prototype, "notes", void 0);
    __decorate([
        property({ type: String, reflectToAttribute: true })
    ], GdqScheduleRuninfo.prototype, "label", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqScheduleRuninfo.prototype, "coop", void 0);
    __decorate([
        property({ type: String })
    ], GdqScheduleRuninfo.prototype, "releaseYear", void 0);
    __decorate([
        property({ type: String })
    ], GdqScheduleRuninfo.prototype, "console", void 0);
    __decorate([
        property({ type: String })
    ], GdqScheduleRuninfo.prototype, "estimate", void 0);
    __decorate([
        property({ type: String })
    ], GdqScheduleRuninfo.prototype, "category", void 0);
    __decorate([
        property({ type: String })
    ], GdqScheduleRuninfo.prototype, "name", void 0);
    __decorate([
        property({ type: Object })
    ], GdqScheduleRuninfo.prototype, "originalValues", void 0);
    __decorate([
        property({ type: Array })
    ], GdqScheduleRuninfo.prototype, "runners", void 0);
    __decorate([
        property({ type: Number })
    ], GdqScheduleRuninfo.prototype, "order", void 0);
    GdqScheduleRuninfo = GdqScheduleRuninfo_1 = __decorate([
        customElement('gdq-schedule-runinfo')
    ], GdqScheduleRuninfo);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqScheduleRuninfo = GdqScheduleRuninfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXNjaGVkdWxlLXJ1bmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtc2NoZWR1bGUtcnVuaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFpQkEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7O0lBQ3BDLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUdyRCxJQUFNLGtCQUFrQiwwQkFBeEIsTUFBTSxrQkFBbUIsU0FBUSxPQUFPLENBQUMsT0FBTztRQWtDL0MsYUFBYSxDQUFDLE1BQWM7WUFDM0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFvQixDQUFDO1lBQzFDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFtQixDQUFDO1lBQ2pFLElBQUksTUFBTSxFQUFFO2dCQUNYLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQzthQUM5RTtpQkFBTTtnQkFDTixRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzthQUN4QjtRQUNGLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBUTtZQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQztRQUMxQyxDQUFDO1FBRUQsUUFBUSxDQUFDLElBQXdCO1lBQ2hDLElBQUksSUFBSSxFQUFFO2dCQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkM7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxZQUFZLENBQUMsUUFBYTtZQUN6QixPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ3hFLENBQUM7S0FDRCxDQUFBO0lBbEVBO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsb0JBQWtCLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBQyxDQUFDO3FEQUNqRTtJQUdkO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQztxREFDckM7SUFHZDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztvREFDWjtJQUdkO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzJEQUNMO0lBR3BCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3VEQUNUO0lBR2hCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3dEQUNSO0lBR2pCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3dEQUNSO0lBR2pCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO29EQUNaO0lBR2I7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7OERBQ2dCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO3VEQUNRO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3FEQUNYO0lBaENULGtCQUFrQjtRQUR2QixhQUFhLENBQUMsc0JBQXNCLENBQUM7T0FDaEMsa0JBQWtCLENBb0V2QjtJQUVELG1HQUFtRztJQUNsRyxNQUFjLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFDekQsQ0FBQyxDQUFDLENBQUMifQ==