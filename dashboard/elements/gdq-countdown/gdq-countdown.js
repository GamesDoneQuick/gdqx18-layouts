import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
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
GdqCountdown = tslib_1.__decorate([customElement('gdq-countdown')], GdqCountdown);
export default GdqCountdown;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1jb3VudGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE1BQU07QUFBQyxFQUFBO0FBQUQsSUFBa0IsT0FBTyxDQUFDLFVBQWhDO0FBQ0EsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUFtQyxrQkFBbkMsQ0FBekI7QUFDQSxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUE0QixXQUE1QixDQUFsQjtBQUdBLElBQXFCLFlBQVksR0FBakMsTUFBcUIsWUFBckIsU0FBMEMsT0FBTyxDQUFDLE9BQWxELENBQXlEO0FBQ3hELEVBQUEsS0FBSyxHQUFBO0FBQ0osVUFBTSxLQUFOO0FBRUEsSUFBQSxTQUFTLENBQUMsRUFBVixDQUFhLFFBQWIsRUFBdUIsTUFBTSxJQUFHO0FBQy9CLFVBQUksTUFBSixFQUFZO0FBQ1gsY0FBTSxTQUFTLEdBQUcsS0FBSyxDQUFMLENBQU8sU0FBekI7QUFDQSxRQUFBLFNBQVMsQ0FBQyxLQUFWLENBQWdCLE1BQU0sQ0FBQyxPQUF2QixFQUFnQyxNQUFNLENBQUMsT0FBdkM7QUFDQTtBQUNELEtBTEQ7QUFPQSxJQUFBLGdCQUFnQixDQUFDLEVBQWpCLENBQW9CLFFBQXBCLEVBQThCLE1BQU0sSUFBRztBQUN0QyxVQUFJLE1BQUosRUFBWTtBQUNYLGFBQUssQ0FBTCxDQUFPLGtCQUFQLENBQTBCLFlBQTFCLENBQXVDLFVBQXZDLEVBQW1ELE1BQW5EO0FBQ0EsYUFBSyxDQUFMLENBQU8sS0FBUCxDQUFhLFlBQWIsQ0FBMEIsa0JBQTFCLEVBQThDLE1BQTlDO0FBQ0EsYUFBSyxDQUFMLENBQU8sSUFBUCxDQUFZLGVBQVosQ0FBNEIsVUFBNUI7QUFDQSxPQUpELE1BSU87QUFDTixhQUFLLENBQUwsQ0FBTyxrQkFBUCxDQUEwQixlQUExQixDQUEwQyxVQUExQztBQUNBLGFBQUssQ0FBTCxDQUFPLEtBQVAsQ0FBYSxlQUFiLENBQTZCLGtCQUE3QjtBQUNBLGFBQUssQ0FBTCxDQUFPLElBQVAsQ0FBWSxZQUFaLENBQXlCLFVBQXpCLEVBQXFDLE1BQXJDO0FBQ0E7O0FBRUQsV0FBSyxnQkFBTDtBQUNBLEtBWkQ7QUFhQTs7QUFFRCxFQUFBLEtBQUssR0FBQTtBQUNKLElBQUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsZ0JBQW5CLEVBQXNDLEtBQUssQ0FBTCxDQUFPLFNBQVAsQ0FBZ0MsS0FBdEU7QUFDQTs7QUFFRCxFQUFBLElBQUksR0FBQTtBQUNILElBQUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsZUFBbkI7QUFDQTs7QUFFRCxFQUFBLHlCQUF5QixDQUFDLENBQUQsRUFBUztBQUNqQyxRQUFLLENBQVMsQ0FBQyxNQUFWLElBQXFCLENBQVMsQ0FBQyxNQUFWLENBQWlCLEtBQTNDLEVBQWtEO0FBQ2pELFdBQUssQ0FBTCxDQUFPLEtBQVAsQ0FBYSxZQUFiLENBQTBCLGtCQUExQixFQUE4QyxNQUE5QztBQUNBLEtBRkQsTUFFTztBQUNOLFdBQUssQ0FBTCxDQUFPLEtBQVAsQ0FBYSxlQUFiLENBQTZCLGtCQUE3QjtBQUNBOztBQUVELFNBQUssZ0JBQUw7QUFDQTtBQUVEOzs7OztBQUdBLEVBQUEsZ0JBQWdCLEdBQUE7QUFDZixRQUFJLEtBQUssQ0FBTCxDQUFPLEtBQVAsQ0FBYSxZQUFiLENBQTBCLGtCQUExQixLQUFpRCxLQUFLLENBQUwsQ0FBTyxLQUFQLENBQWEsWUFBYixDQUEwQixrQkFBMUIsQ0FBckQsRUFBb0c7QUFDbkcsV0FBSyxDQUFMLENBQU8sS0FBUCxDQUFhLFlBQWIsQ0FBMEIsVUFBMUIsRUFBc0MsTUFBdEM7QUFDQSxLQUZELE1BRU87QUFDTixXQUFLLENBQUwsQ0FBTyxLQUFQLENBQWEsZUFBYixDQUE2QixVQUE3QjtBQUNBO0FBQ0Q7O0FBckR1RCxDQUF6RDtBQUFxQixZQUFZLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURoQyxhQUFhLENBQUMsZUFBRCxDQUNtQixDQUFBLEVBQVosWUFBWSxDQUFaO2VBQUEsWSIsInNvdXJjZVJvb3QiOiIifQ==