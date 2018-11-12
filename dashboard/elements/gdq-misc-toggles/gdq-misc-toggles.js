import * as tslib_1 from "tslib";
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
GdqMiscToggles = tslib_1.__decorate([
    customElement('gdq-misc-toggles')
], GdqMiscToggles);
export default GdqMiscToggles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW1pc2MtdG9nZ2xlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1taXNjLXRvZ2dsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQzNDLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxzQkFBc0IsQ0FBQyxDQUFDO0FBQy9FLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxzQkFBc0IsQ0FBQyxDQUFDO0FBRS9FOzs7R0FHRztBQUVILElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBZSxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBQzFELEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDaEQsb0JBQW9CLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDMUMsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUE0QyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7aUJBQ3RFO1lBQ0YsQ0FBQyxDQUFDLENBQUM7WUFFSCxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQXlDLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUNwRSxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELHlCQUF5QjtRQUN4QixJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUU7WUFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2hEO2FBQU07WUFDTixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3JEO0lBQ0YsQ0FBQztJQUVELGtDQUFrQyxDQUFDLENBQVE7UUFDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDZCxPQUFPO1NBQ1A7UUFDRCxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFFLENBQUMsQ0FBQyxNQUFtQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCx5QkFBeUIsQ0FBQyxDQUFRO1FBQ2pDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ2QsT0FBTztTQUNQO1FBQ0Qsb0JBQW9CLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBRSxDQUFDLENBQUMsTUFBbUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RixDQUFDO0NBQ0QsQ0FBQTtBQXZDb0IsY0FBYztJQURsQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7R0FDYixjQUFjLENBdUNsQztlQXZDb0IsY0FBYyJ9