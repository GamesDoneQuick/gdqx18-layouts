"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
    const { customElement } = Polymer.decorators;
    const autoUploadRecordings = nodecg.Replicant('autoUploadRecordings');
    const recordTrackerEnabled = nodecg.Replicant('recordTrackerEnabled');
    /**
     * @customElement
     * @polymer
     */
    let GdqMiscToggles = class GdqMiscToggles extends Polymer.Element {
        ready() {
            super.ready();
            Polymer.RenderStatus.beforeNextRender(this, () => {
                recordTrackerEnabled.on('change', newVal => {
                    if (newVal) {
                        this.$.milestoneToggle.checked = newVal;
                    }
                });
                autoUploadRecordings.on('change', newVal => {
                    this.$.uploadToggle.checked = newVal;
                });
                this._checkUploadToggleDisable();
            });
        }
        _checkUploadToggleDisable() {
            if (nodecg.bundleConfig.youtubeUploadScriptPath) {
                this.$.uploadToggle.removeAttribute('disabled');
            }
            else {
                this.$.uploadToggle.setAttribute('disabled', 'true');
            }
        }
        _handleMiletoneTrackerToggleChange(e) {
            if (!e.target) {
                return;
            }
            recordTrackerEnabled.value = Boolean(e.target.checked);
        }
        _handleUploadToggleChange(e) {
            if (!e.target) {
                return;
            }
            autoUploadRecordings.value = Boolean(e.target.checked);
        }
    };
    GdqMiscToggles = __decorate([
        customElement('gdq-misc-toggles')
    ], GdqMiscToggles);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqMiscToggles = GdqMiscToggles;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW1pc2MtdG9nZ2xlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1taXNjLXRvZ2dsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQzNDLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxzQkFBc0IsQ0FBQyxDQUFDO0lBQy9FLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxzQkFBc0IsQ0FBQyxDQUFDO0lBRS9FOzs7T0FHRztJQUVILElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWUsU0FBUSxPQUFPLENBQUMsT0FBTztRQUMzQyxLQUFLO1lBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUNoRCxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO29CQUMxQyxJQUFJLE1BQU0sRUFBRTt3QkFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQTRDLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztxQkFDdEU7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsb0JBQW9CLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtvQkFDekMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUF5QyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVELHlCQUF5QjtZQUN4QixJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoRDtpQkFBTTtnQkFDTixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3JEO1FBQ0YsQ0FBQztRQUVELGtDQUFrQyxDQUFDLENBQVE7WUFDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2QsT0FBTzthQUNQO1lBQ0Qsb0JBQW9CLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBRSxDQUFDLENBQUMsTUFBbUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBRUQseUJBQXlCLENBQUMsQ0FBUTtZQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDZCxPQUFPO2FBQ1A7WUFDRCxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFFLENBQUMsQ0FBQyxNQUFtQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RGLENBQUM7S0FDRCxDQUFBO0lBdkNLLGNBQWM7UUFEbkIsYUFBYSxDQUFDLGtCQUFrQixDQUFDO09BQzVCLGNBQWMsQ0F1Q25CO0lBRUQsbUdBQW1HO0lBQ2xHLE1BQWMsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ2pELENBQUMsQ0FBQyxDQUFDIn0=