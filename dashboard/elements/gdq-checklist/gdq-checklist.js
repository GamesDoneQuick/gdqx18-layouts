var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
    const { customElement, property } = Polymer.decorators;
    const checklist = nodecg.Replicant('checklist');
    let GdqChecklist = class GdqChecklist extends Polymer.MutableData(Polymer.Element) {
        ready() {
            super.ready();
            checklist.on('change', newVal => {
                if (!newVal) {
                    return;
                }
                this.extraContent = newVal.extraContent;
                this.techStationDuties = newVal.techStationDuties;
                this.stageTechDuties = newVal.stageTechDuties;
                this.audioReady = newVal.audioEngineerDuties.every(task => task.complete);
                const cycleRecordingsTask = newVal.special.find(task => task.name === 'Cycle Recordings');
                if (cycleRecordingsTask) {
                    this.recordingsCycled = cycleRecordingsTask.complete;
                }
            });
            this._checkboxChanged = this._checkboxChanged.bind(this);
            this.addEventListener('change', this._checkboxChanged);
        }
        _checkboxChanged(e) {
            const target = e.composedPath()[0];
            const category = target.getAttribute('category');
            const name = target.hasAttribute('name') ?
                target.getAttribute('name') :
                target.innerText.trim();
            if (!category) {
                return;
            }
            checklist.value[category].find(task => {
                if (task.name === name) {
                    task.complete = Boolean(target.checked);
                    return true;
                }
                return false;
            });
        }
    };
    __decorate([
        property({ type: Array })
    ], GdqChecklist.prototype, "stageTechDuties", void 0);
    __decorate([
        property({ type: Array })
    ], GdqChecklist.prototype, "extraContent", void 0);
    __decorate([
        property({ type: Array })
    ], GdqChecklist.prototype, "techStationDuties", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqChecklist.prototype, "audioReady", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqChecklist.prototype, "recordingsCycled", void 0);
    GdqChecklist = __decorate([
        customElement('gdq-checklist')
    ], GdqChecklist);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqChecklist = GdqChecklist;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNoZWNrbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jaGVja2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDcEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQ3JELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7SUFHM0QsSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBYSxTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQWdCOUQsS0FBSztZQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNaLE9BQU87aUJBQ1A7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO2dCQUNsRCxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFMUUsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssa0JBQWtCLENBQUMsQ0FBQztnQkFDMUYsSUFBSSxtQkFBbUIsRUFBRTtvQkFDeEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDLFFBQVEsQ0FBQztpQkFDckQ7WUFDRixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVELGdCQUFnQixDQUFDLENBQVE7WUFDeEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBeUIsQ0FBQztZQUMzRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXpCLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2QsT0FBTzthQUNQO1lBRUMsU0FBUyxDQUFDLEtBQWEsQ0FBQyxRQUFRLENBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsRSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO29CQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hDLE9BQU8sSUFBSSxDQUFDO2lCQUNaO2dCQUVELE9BQU8sS0FBSyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO0tBQ0QsQ0FBQTtJQXZEQTtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzt5REFDUTtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztzREFDSztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzsyREFDVTtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztvREFDTjtJQUdwQjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQzswREFDQTtJQWRyQixZQUFZO1FBRGpCLGFBQWEsQ0FBQyxlQUFlLENBQUM7T0FDekIsWUFBWSxDQXlEakI7SUFFRCxtR0FBbUc7SUFDbEcsTUFBYyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQUMifQ==