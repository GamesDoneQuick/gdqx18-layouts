import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', function () {
  var customElement = Polymer.decorators.customElement;
  var countdownRunning = nodecg.Replicant('countdownRunning');
  var countdown = nodecg.Replicant('countdown');

  var GdqCountdown =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqCountdown, _super);

    function GdqCountdown() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    GdqCountdown.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      countdown.on('change', function (newVal) {
        if (newVal) {
          var timeInput = _this.$.timeInput;
          timeInput.setMS(newVal.minutes, newVal.seconds);
        }
      });
      countdownRunning.on('change', function (newVal) {
        if (newVal) {
          _this.$.countdownContainer.setAttribute('disabled', 'true');

          _this.$.start.setAttribute('disabled-running', 'true');

          _this.$.stop.removeAttribute('disabled');
        } else {
          _this.$.countdownContainer.removeAttribute('disabled');

          _this.$.start.removeAttribute('disabled-running');

          _this.$.stop.setAttribute('disabled', 'true');
        }

        _this.checkStartButton();
      });
    };

    GdqCountdown.prototype.start = function () {
      nodecg.sendMessage('startCountdown', this.$.timeInput.value);
    };

    GdqCountdown.prototype.stop = function () {
      nodecg.sendMessage('stopCountdown');
    };

    GdqCountdown.prototype._handleTimeInvalidChanged = function (e) {
      if (e.detail && e.detail.value) {
        this.$.start.setAttribute('disabled-invalid', 'true');
      } else {
        this.$.start.removeAttribute('disabled-invalid');
      }

      this.checkStartButton();
    };
    /**
     * Enables or disables the timer start button based on some criteria.
     */


    GdqCountdown.prototype.checkStartButton = function () {
      if (this.$.start.hasAttribute('disabled-invalid') || this.$.start.hasAttribute('disabled-running')) {
        this.$.start.setAttribute('disabled', 'true');
      } else {
        this.$.start.removeAttribute('disabled');
      }
    };

    GdqCountdown = tslib_1.__decorate([customElement('gdq-countdown')], GdqCountdown);
    return GdqCountdown;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqCountdown = GdqCountdown;
});