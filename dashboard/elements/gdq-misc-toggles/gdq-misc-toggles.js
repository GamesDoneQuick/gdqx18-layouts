"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

window.addEventListener('load', function () {
  var customElement = Polymer.decorators.customElement;
  var autoUploadRecordings = nodecg.Replicant('autoUploadRecordings');
  var recordTrackerEnabled = nodecg.Replicant('recordTrackerEnabled');
  /**
   * @customElement
   * @polymer
   */

  var GdqMiscToggles =
  /** @class */
  function (_super) {
    __extends(GdqMiscToggles, _super);

    function GdqMiscToggles() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    GdqMiscToggles.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      Polymer.RenderStatus.beforeNextRender(this, function () {
        recordTrackerEnabled.on('change', function (newVal) {
          if (newVal) {
            _this.$.milestoneToggle.checked = newVal;
          }
        });
        autoUploadRecordings.on('change', function (newVal) {
          _this.$.uploadToggle.checked = newVal;
        });

        _this._checkUploadToggleDisable();
      });
    };

    GdqMiscToggles.prototype._checkUploadToggleDisable = function () {
      if (nodecg.bundleConfig.youtubeUploadScriptPath) {
        this.$.uploadToggle.removeAttribute('disabled');
      } else {
        this.$.uploadToggle.setAttribute('disabled', 'true');
      }
    };

    GdqMiscToggles.prototype._handleMiletoneTrackerToggleChange = function (e) {
      if (!e.target) {
        return;
      }

      recordTrackerEnabled.value = Boolean(e.target.checked);
    };

    GdqMiscToggles.prototype._handleUploadToggleChange = function (e) {
      if (!e.target) {
        return;
      }

      autoUploadRecordings.value = Boolean(e.target.checked);
    };

    GdqMiscToggles = __decorate([customElement('gdq-misc-toggles')], GdqMiscToggles);
    return GdqMiscToggles;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqMiscToggles = GdqMiscToggles;
});