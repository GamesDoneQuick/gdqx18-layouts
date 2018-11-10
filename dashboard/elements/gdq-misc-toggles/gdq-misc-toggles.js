import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
const {
  customElement
} = Polymer.decorators;
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
    } else {
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
GdqMiscToggles = tslib_1.__decorate([customElement('gdq-misc-toggles')], GdqMiscToggles);
export default GdqMiscToggles;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1taXNjLXRvZ2dsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU07QUFBQyxFQUFBO0FBQUQsSUFBa0IsT0FBTyxDQUFDLFVBQWhDO0FBQ0EsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUEwQixzQkFBMUIsQ0FBN0I7QUFDQSxNQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxTQUFQLENBQTBCLHNCQUExQixDQUE3QjtBQUVBOzs7OztBQUtBLElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBckIsU0FBNEMsT0FBTyxDQUFDLE9BQXBELENBQTJEO0FBQzFELEVBQUEsS0FBSyxHQUFBO0FBQ0osVUFBTSxLQUFOO0FBQ0EsSUFBQSxPQUFPLENBQUMsWUFBUixDQUFxQixnQkFBckIsQ0FBc0MsSUFBdEMsRUFBNEMsTUFBSztBQUNoRCxNQUFBLG9CQUFvQixDQUFDLEVBQXJCLENBQXdCLFFBQXhCLEVBQWtDLE1BQU0sSUFBRztBQUMxQyxZQUFJLE1BQUosRUFBWTtBQUNWLGVBQUssQ0FBTCxDQUFPLGVBQVAsQ0FBb0QsT0FBcEQsR0FBOEQsTUFBOUQ7QUFDRDtBQUNELE9BSkQ7QUFNQSxNQUFBLG9CQUFvQixDQUFDLEVBQXJCLENBQXdCLFFBQXhCLEVBQWtDLE1BQU0sSUFBRztBQUN6QyxhQUFLLENBQUwsQ0FBTyxZQUFQLENBQWlELE9BQWpELEdBQTJELE1BQTNEO0FBQ0QsT0FGRDs7QUFJQSxXQUFLLHlCQUFMO0FBQ0EsS0FaRDtBQWFBOztBQUVELEVBQUEseUJBQXlCLEdBQUE7QUFDeEIsUUFBSSxNQUFNLENBQUMsWUFBUCxDQUFvQix1QkFBeEIsRUFBaUQ7QUFDaEQsV0FBSyxDQUFMLENBQU8sWUFBUCxDQUFvQixlQUFwQixDQUFvQyxVQUFwQztBQUNBLEtBRkQsTUFFTztBQUNOLFdBQUssQ0FBTCxDQUFPLFlBQVAsQ0FBb0IsWUFBcEIsQ0FBaUMsVUFBakMsRUFBNkMsTUFBN0M7QUFDQTtBQUNEOztBQUVELEVBQUEsa0NBQWtDLENBQUMsQ0FBRCxFQUFTO0FBQzFDLFFBQUksQ0FBQyxDQUFDLENBQUMsTUFBUCxFQUFlO0FBQ2Q7QUFDQTs7QUFDRCxJQUFBLG9CQUFvQixDQUFDLEtBQXJCLEdBQTZCLE9BQU8sQ0FBRSxDQUFDLENBQUMsTUFBRixDQUFzQyxPQUF4QyxDQUFwQztBQUNBOztBQUVELEVBQUEseUJBQXlCLENBQUMsQ0FBRCxFQUFTO0FBQ2pDLFFBQUksQ0FBQyxDQUFDLENBQUMsTUFBUCxFQUFlO0FBQ2Q7QUFDQTs7QUFDRCxJQUFBLG9CQUFvQixDQUFDLEtBQXJCLEdBQTZCLE9BQU8sQ0FBRSxDQUFDLENBQUMsTUFBRixDQUFzQyxPQUF4QyxDQUFwQztBQUNBOztBQXRDeUQsQ0FBM0Q7QUFBcUIsY0FBYyxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEbEMsYUFBYSxDQUFDLGtCQUFELENBQ3FCLENBQUEsRUFBZCxjQUFjLENBQWQ7ZUFBQSxjIiwic291cmNlUm9vdCI6IiJ9