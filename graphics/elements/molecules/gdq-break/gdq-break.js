import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import PQueue from "../../../../shared/lib/vendor/p-queue.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  /**
   * @customElement
   * @polymer
   */

  let GdqBreak = class GdqBreak extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
      super(...arguments);
      this._queue = new PQueue({
        concurrency: 1
      });
    }

    ready() {
      super.ready();
      const tweetElem = this.$.tweet;
      const fanartElem = this.$.fanart;
      tweetElem.companionElement = this.$.prizes;
      fanartElem.companionElement = [this.$.bids, this.$.prizes];

      this._setupInterrupt({
        messageName: 'showTweet',
        interruptElement: tweetElem
      });

      this._setupInterrupt({
        messageName: 'showFanart',
        interruptElement: fanartElem
      });
    }

    _setupInterrupt({
      messageName,
      interruptElement
    }) {
      let queued = false;
      let queue = [];
      nodecg.listenFor(messageName, payload => {
        if (interruptElement.canExtend) {
          interruptElement.playItem(payload);
          return;
        }

        if (queued) {
          queue.push(payload);
        } else {
          queued = true;

          this._queue.add(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            interruptElement.addEventListener('can-extend', () => {
              queue.forEach(queuedFanart => {
                interruptElement.playItem(queuedFanart);
              });
              queued = false;
              queue = [];
            }, {
              once: true,
              passive: true
            });
            return this._promisifyTimeline(interruptElement.playItem(payload));
          }));
        }
      });
    }

    _promisifyTimeline(tl) {
      return new Promise(resolve => {
        tl.call(resolve, undefined, null, '+=0.03');
      });
    }

  };

  tslib_1.__decorate([property({
    type: Object
  })], GdqBreak.prototype, "_queue", void 0);

  GdqBreak = tslib_1.__decorate([customElement('gdq-break')], GdqBreak); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqBreak = GdqBreak;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1icmVhay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxNQUFQLE1BQW1CLDBDQUFuQjtBQUVBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxNQUFLO0FBQ3BDLFFBQU07QUFBQyxJQUFBLGFBQUQ7QUFBZ0IsSUFBQTtBQUFoQixNQUE0QixPQUFPLENBQUMsVUFBMUM7QUFFQTs7Ozs7QUFLQSxNQUFNLFFBQVEsR0FBZCxNQUFNLFFBQU4sU0FBdUIsT0FBTyxDQUFDLE9BQS9CLENBQXNDO0FBTHRDOzs7O0FBSUEsSUFBQSxXQUFBLEdBQUE7O0FBR0MsV0FBQSxNQUFBLEdBQWlCLElBQUksTUFBSixDQUFXO0FBQUMsUUFBQSxXQUFXLEVBQUU7QUFBZCxPQUFYLENBQWpCO0FBdURBOztBQXJEQSxJQUFBLEtBQUssR0FBQTtBQUNKLFlBQU0sS0FBTjtBQUNBLFlBQU0sU0FBUyxHQUFHLEtBQUssQ0FBTCxDQUFPLEtBQXpCO0FBQ0EsWUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFMLENBQU8sTUFBMUI7QUFDQSxNQUFBLFNBQVMsQ0FBQyxnQkFBVixHQUE2QixLQUFLLENBQUwsQ0FBTyxNQUFwQztBQUNBLE1BQUEsVUFBVSxDQUFDLGdCQUFYLEdBQThCLENBQzdCLEtBQUssQ0FBTCxDQUFPLElBRHNCLEVBRTdCLEtBQUssQ0FBTCxDQUFPLE1BRnNCLENBQTlCOztBQUtBLFdBQUssZUFBTCxDQUFxQjtBQUNwQixRQUFBLFdBQVcsRUFBRSxXQURPO0FBRXBCLFFBQUEsZ0JBQWdCLEVBQUU7QUFGRSxPQUFyQjs7QUFLQSxXQUFLLGVBQUwsQ0FBcUI7QUFDcEIsUUFBQSxXQUFXLEVBQUUsWUFETztBQUVwQixRQUFBLGdCQUFnQixFQUFFO0FBRkUsT0FBckI7QUFJQTs7QUFFRCxJQUFBLGVBQWUsQ0FBQztBQUFDLE1BQUEsV0FBRDtBQUFjLE1BQUE7QUFBZCxLQUFELEVBQTBGO0FBQ3hHLFVBQUksTUFBTSxHQUFHLEtBQWI7QUFDQSxVQUFJLEtBQUssR0FBYyxFQUF2QjtBQUNBLE1BQUEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsV0FBakIsRUFBOEIsT0FBTyxJQUFHO0FBQ3ZDLFlBQUksZ0JBQWdCLENBQUMsU0FBckIsRUFBZ0M7QUFDL0IsVUFBQSxnQkFBZ0IsQ0FBQyxRQUFqQixDQUEwQixPQUExQjtBQUNBO0FBQ0E7O0FBRUQsWUFBSSxNQUFKLEVBQVk7QUFDWCxVQUFBLEtBQUssQ0FBQyxJQUFOLENBQVcsT0FBWDtBQUNBLFNBRkQsTUFFTztBQUNOLFVBQUEsTUFBTSxHQUFHLElBQVQ7O0FBQ0EsZUFBSyxNQUFMLENBQVksR0FBWixDQUFnQixNQUFXLE9BQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxFQUFBLEtBQUEsQ0FBQSxFQUFBLEtBQUEsQ0FBQSxFQUFBLGFBQUE7QUFDMUIsWUFBQSxnQkFBZ0IsQ0FBQyxnQkFBakIsQ0FBa0MsWUFBbEMsRUFBZ0QsTUFBSztBQUNwRCxjQUFBLEtBQUssQ0FBQyxPQUFOLENBQWMsWUFBWSxJQUFHO0FBQzVCLGdCQUFBLGdCQUFnQixDQUFDLFFBQWpCLENBQTBCLFlBQTFCO0FBQ0EsZUFGRDtBQUdBLGNBQUEsTUFBTSxHQUFHLEtBQVQ7QUFDQSxjQUFBLEtBQUssR0FBRyxFQUFSO0FBQ0EsYUFORCxFQU1HO0FBQUMsY0FBQSxJQUFJLEVBQUUsSUFBUDtBQUFhLGNBQUEsT0FBTyxFQUFFO0FBQXRCLGFBTkg7QUFPQSxtQkFBTyxLQUFLLGtCQUFMLENBQXdCLGdCQUFnQixDQUFDLFFBQWpCLENBQTBCLE9BQTFCLENBQXhCLENBQVA7QUFDQSxXQVQwQixDQUEzQjtBQVVBO0FBQ0QsT0FyQkQ7QUFzQkE7O0FBRUQsSUFBQSxrQkFBa0IsQ0FBQyxFQUFELEVBQStCO0FBQ2hELGFBQU8sSUFBSSxPQUFKLENBQVksT0FBTyxJQUFHO0FBQzVCLFFBQUEsRUFBRSxDQUFDLElBQUgsQ0FBUSxPQUFSLEVBQWlCLFNBQWpCLEVBQTRCLElBQTVCLEVBQWtDLFFBQWxDO0FBQ0EsT0FGTSxDQUFQO0FBR0E7O0FBeERvQyxHQUF0Qzs7QUFFQyxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRTtBQUFQLEdBQUQsQ0FDVCxDQUFBLEUsa0JBQUEsRSxRQUFBLEUsS0FBOEMsQ0FBOUM7O0FBRkssRUFBQSxRQUFRLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURiLGFBQWEsQ0FBQyxXQUFELENBQ0EsQ0FBQSxFQUFSLFFBQVEsQ0FBUixDQVI4QixDQW1FcEM7O0FBQ0MsRUFBQSxNQUFjLENBQUMsUUFBZixHQUEwQixRQUExQjtBQUNELENBckVEIiwic291cmNlUm9vdCI6IiJ9