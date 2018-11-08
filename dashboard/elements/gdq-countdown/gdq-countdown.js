import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement
  } = Polymer.decorators;
  const countdownRunning = nodecg.Replicant('countdownRunning');
  const countdown = nodecg.Replicant('countdown');
  let GdqCountdown = class GdqCountdown extends Polymer.Element {
    ready() {
      super.ready();
      countdown.on('change', newVal => {
        if (newVal) {
          const timeInput = this.$.timeInput;
          timeInput.setMS(newVal.minutes, newVal.seconds);
        }
      });
      countdownRunning.on('change', newVal => {
        if (newVal) {
          this.$.countdownContainer.setAttribute('disabled', 'true');
          this.$.start.setAttribute('disabled-running', 'true');
          this.$.stop.removeAttribute('disabled');
        } else {
          this.$.countdownContainer.removeAttribute('disabled');
          this.$.start.removeAttribute('disabled-running');
          this.$.stop.setAttribute('disabled', 'true');
        }

        this.checkStartButton();
      });
    }

    start() {
      nodecg.sendMessage('startCountdown', this.$.timeInput.value);
    }

    stop() {
      nodecg.sendMessage('stopCountdown');
    }

    _handleTimeInvalidChanged(e) {
      if (e.detail && e.detail.value) {
        this.$.start.setAttribute('disabled-invalid', 'true');
      } else {
        this.$.start.removeAttribute('disabled-invalid');
      }

      this.checkStartButton();
    }
    /**
     * Enables or disables the timer start button based on some criteria.
     */


    checkStartButton() {
      if (this.$.start.hasAttribute('disabled-invalid') || this.$.start.hasAttribute('disabled-running')) {
        this.$.start.setAttribute('disabled', 'true');
      } else {
        this.$.start.removeAttribute('disabled');
      }
    }

  };
  GdqCountdown = tslib_1.__decorate([customElement('gdq-countdown')], GdqCountdown); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqCountdown = GdqCountdown;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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