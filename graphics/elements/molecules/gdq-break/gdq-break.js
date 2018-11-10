import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import PQueue from "../../../../shared/lib/vendor/p-queue.js";
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

GdqBreak = tslib_1.__decorate([customElement('gdq-break')], GdqBreak);
export default GdqBreak;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1icmVhay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxNQUFQLE1BQW1CLDBDQUFuQjtBQUVBLE1BQU07QUFBQyxFQUFBLGFBQUQ7QUFBZ0IsRUFBQTtBQUFoQixJQUE0QixPQUFPLENBQUMsVUFBMUM7QUFFQTs7Ozs7QUFLQSxJQUFxQixRQUFRLEdBQTdCLE1BQXFCLFFBQXJCLFNBQXNDLE9BQU8sQ0FBQyxPQUE5QyxDQUFxRDtBQUxyRDs7OztBQUlBLEVBQUEsV0FBQSxHQUFBOztBQUdDLFNBQUEsTUFBQSxHQUFpQixJQUFJLE1BQUosQ0FBVztBQUFDLE1BQUEsV0FBVyxFQUFFO0FBQWQsS0FBWCxDQUFqQjtBQXVEQTs7QUFyREEsRUFBQSxLQUFLLEdBQUE7QUFDSixVQUFNLEtBQU47QUFDQSxVQUFNLFNBQVMsR0FBRyxLQUFLLENBQUwsQ0FBTyxLQUF6QjtBQUNBLFVBQU0sVUFBVSxHQUFHLEtBQUssQ0FBTCxDQUFPLE1BQTFCO0FBQ0EsSUFBQSxTQUFTLENBQUMsZ0JBQVYsR0FBNkIsS0FBSyxDQUFMLENBQU8sTUFBcEM7QUFDQSxJQUFBLFVBQVUsQ0FBQyxnQkFBWCxHQUE4QixDQUM3QixLQUFLLENBQUwsQ0FBTyxJQURzQixFQUU3QixLQUFLLENBQUwsQ0FBTyxNQUZzQixDQUE5Qjs7QUFLQSxTQUFLLGVBQUwsQ0FBcUI7QUFDcEIsTUFBQSxXQUFXLEVBQUUsV0FETztBQUVwQixNQUFBLGdCQUFnQixFQUFFO0FBRkUsS0FBckI7O0FBS0EsU0FBSyxlQUFMLENBQXFCO0FBQ3BCLE1BQUEsV0FBVyxFQUFFLFlBRE87QUFFcEIsTUFBQSxnQkFBZ0IsRUFBRTtBQUZFLEtBQXJCO0FBSUE7O0FBRUQsRUFBQSxlQUFlLENBQUM7QUFBQyxJQUFBLFdBQUQ7QUFBYyxJQUFBO0FBQWQsR0FBRCxFQUE0RjtBQUMxRyxRQUFJLE1BQU0sR0FBRyxLQUFiO0FBQ0EsUUFBSSxLQUFLLEdBQWMsRUFBdkI7QUFDQSxJQUFBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFdBQWpCLEVBQThCLE9BQU8sSUFBRztBQUN2QyxVQUFJLGdCQUFnQixDQUFDLFNBQXJCLEVBQWdDO0FBQy9CLFFBQUEsZ0JBQWdCLENBQUMsUUFBakIsQ0FBMEIsT0FBMUI7QUFDQTtBQUNBOztBQUVELFVBQUksTUFBSixFQUFZO0FBQ1gsUUFBQSxLQUFLLENBQUMsSUFBTixDQUFXLE9BQVg7QUFDQSxPQUZELE1BRU87QUFDTixRQUFBLE1BQU0sR0FBRyxJQUFUOztBQUNBLGFBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsTUFBVyxPQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxhQUFBO0FBQzFCLFVBQUEsZ0JBQWdCLENBQUMsZ0JBQWpCLENBQWtDLFlBQWxDLEVBQWdELE1BQUs7QUFDcEQsWUFBQSxLQUFLLENBQUMsT0FBTixDQUFjLFlBQVksSUFBRztBQUM1QixjQUFBLGdCQUFnQixDQUFDLFFBQWpCLENBQTBCLFlBQTFCO0FBQ0EsYUFGRDtBQUdBLFlBQUEsTUFBTSxHQUFHLEtBQVQ7QUFDQSxZQUFBLEtBQUssR0FBRyxFQUFSO0FBQ0EsV0FORCxFQU1HO0FBQUMsWUFBQSxJQUFJLEVBQUUsSUFBUDtBQUFhLFlBQUEsT0FBTyxFQUFFO0FBQXRCLFdBTkg7QUFPQSxpQkFBTyxLQUFLLGtCQUFMLENBQXdCLGdCQUFnQixDQUFDLFFBQWpCLENBQTBCLE9BQTFCLENBQXhCLENBQVA7QUFDQSxTQVQwQixDQUEzQjtBQVVBO0FBQ0QsS0FyQkQ7QUFzQkE7O0FBRUQsRUFBQSxrQkFBa0IsQ0FBQyxFQUFELEVBQStCO0FBQ2hELFdBQU8sSUFBSSxPQUFKLENBQVksT0FBTyxJQUFHO0FBQzVCLE1BQUEsRUFBRSxDQUFDLElBQUgsQ0FBUSxPQUFSLEVBQWlCLFNBQWpCLEVBQTRCLElBQTVCLEVBQWtDLFFBQWxDO0FBQ0EsS0FGTSxDQUFQO0FBR0E7O0FBeERtRCxDQUFyRDs7QUFFQyxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsRUFBQSxJQUFJLEVBQUU7QUFBUCxDQUFELENBQ1QsQ0FBQSxFLGtCQUFBLEUsUUFBQSxFLEtBQThDLENBQTlDOztBQUZvQixRQUFRLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUQ1QixhQUFhLENBQUMsV0FBRCxDQUNlLENBQUEsRUFBUixRQUFRLENBQVI7ZUFBQSxRIiwic291cmNlUm9vdCI6IiJ9