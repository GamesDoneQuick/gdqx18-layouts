"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

window.addEventListener('load', () => {
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
  GdqMiscToggles = __decorate([customElement('gdq-misc-toggles')], GdqMiscToggles); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqMiscToggles = GdqMiscToggles;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1taXNjLXRvZ2dsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxNQUFLO0FBQ3BDLFFBQU07QUFBQyxJQUFBO0FBQUQsTUFBa0IsT0FBTyxDQUFDLFVBQWhDO0FBQ0EsUUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUEwQixzQkFBMUIsQ0FBN0I7QUFDQSxRQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxTQUFQLENBQTBCLHNCQUExQixDQUE3QjtBQUVBOzs7OztBQUtBLE1BQU0sY0FBYyxHQUFwQixNQUFNLGNBQU4sU0FBNkIsT0FBTyxDQUFDLE9BQXJDLENBQTRDO0FBQzNDLElBQUEsS0FBSyxHQUFBO0FBQ0osWUFBTSxLQUFOO0FBQ0EsTUFBQSxPQUFPLENBQUMsWUFBUixDQUFxQixnQkFBckIsQ0FBc0MsSUFBdEMsRUFBNEMsTUFBSztBQUNoRCxRQUFBLG9CQUFvQixDQUFDLEVBQXJCLENBQXdCLFFBQXhCLEVBQWtDLE1BQU0sSUFBRztBQUMxQyxjQUFJLE1BQUosRUFBWTtBQUNWLGlCQUFLLENBQUwsQ0FBTyxlQUFQLENBQW9ELE9BQXBELEdBQThELE1BQTlEO0FBQ0Q7QUFDRCxTQUpEO0FBTUEsUUFBQSxvQkFBb0IsQ0FBQyxFQUFyQixDQUF3QixRQUF4QixFQUFrQyxNQUFNLElBQUc7QUFDekMsZUFBSyxDQUFMLENBQU8sWUFBUCxDQUFpRCxPQUFqRCxHQUEyRCxNQUEzRDtBQUNELFNBRkQ7O0FBSUEsYUFBSyx5QkFBTDtBQUNBLE9BWkQ7QUFhQTs7QUFFRCxJQUFBLHlCQUF5QixHQUFBO0FBQ3hCLFVBQUksTUFBTSxDQUFDLFlBQVAsQ0FBb0IsdUJBQXhCLEVBQWlEO0FBQ2hELGFBQUssQ0FBTCxDQUFPLFlBQVAsQ0FBb0IsZUFBcEIsQ0FBb0MsVUFBcEM7QUFDQSxPQUZELE1BRU87QUFDTixhQUFLLENBQUwsQ0FBTyxZQUFQLENBQW9CLFlBQXBCLENBQWlDLFVBQWpDLEVBQTZDLE1BQTdDO0FBQ0E7QUFDRDs7QUFFRCxJQUFBLGtDQUFrQyxDQUFDLENBQUQsRUFBUztBQUMxQyxVQUFJLENBQUMsQ0FBQyxDQUFDLE1BQVAsRUFBZTtBQUNkO0FBQ0E7O0FBQ0QsTUFBQSxvQkFBb0IsQ0FBQyxLQUFyQixHQUE2QixPQUFPLENBQUUsQ0FBQyxDQUFDLE1BQUYsQ0FBc0MsT0FBeEMsQ0FBcEM7QUFDQTs7QUFFRCxJQUFBLHlCQUF5QixDQUFDLENBQUQsRUFBUztBQUNqQyxVQUFJLENBQUMsQ0FBQyxDQUFDLE1BQVAsRUFBZTtBQUNkO0FBQ0E7O0FBQ0QsTUFBQSxvQkFBb0IsQ0FBQyxLQUFyQixHQUE2QixPQUFPLENBQUUsQ0FBQyxDQUFDLE1BQUYsQ0FBc0MsT0FBeEMsQ0FBcEM7QUFDQTs7QUF0QzBDLEdBQTVDO0FBQU0sRUFBQSxjQUFjLEdBQUEsVUFBQSxDQUFBLENBRG5CLGFBQWEsQ0FBQyxrQkFBRCxDQUNNLENBQUEsRUFBZCxjQUFjLENBQWQsQ0FWOEIsQ0FtRHBDOztBQUNDLEVBQUEsTUFBYyxDQUFDLGNBQWYsR0FBZ0MsY0FBaEM7QUFDRCxDQXJERCIsInNvdXJjZVJvb3QiOiIifQ==