import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
const {
  customElement,
  property
} = Polymer.decorators;
const currentLayout = nodecg.Replicant('gdq:currentLayout');
const fanartTweetsRep = nodecg.Replicant('fanartTweets');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */

let GdqFanart = class GdqFanart extends Polymer.MutableData(Polymer.Element) {
  ready() {
    super.ready();
    currentLayout.on('change', newVal => {
      const cover = this.$.cover;

      switch (newVal) {
        case 'break':
          cover.style.display = 'none';
          break;

        default:
          cover.style.display = 'flex';
      }
    });
    fanartTweetsRep.on('change', newVal => {
      if (!newVal) {
        return;
      }

      this.$.empty.style.display = newVal.length > 0 ? 'none' : 'flex';
      this.tweets = newVal;
    });
  }

  _sortTweets(a, b) {
    // @ts-ignore
    return new Date(b.created_at) - new Date(a.created_at);
  }

  _handlePreviewEvent(event) {
    const previewDialog = this.$.previewDialog;
    previewDialog.open(event.model.tweet);
  }

};

tslib_1.__decorate([property({
  type: Array
})], GdqFanart.prototype, "tweets", void 0);

GdqFanart = tslib_1.__decorate([customElement('gdq-fanart')], GdqFanart);
export default GdqFanart;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1mYW5hcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLE1BQU07QUFBQyxFQUFBLGFBQUQ7QUFBZ0IsRUFBQTtBQUFoQixJQUE0QixPQUFPLENBQUMsVUFBMUM7QUFDQSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUFxQyxtQkFBckMsQ0FBdEI7QUFDQSxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUErQixjQUEvQixDQUF4QjtBQUVBOzs7Ozs7QUFNQSxJQUFxQixTQUFTLEdBQTlCLE1BQXFCLFNBQXJCLFNBQXVDLE9BQU8sQ0FBQyxXQUFSLENBQW9CLE9BQU8sQ0FBQyxPQUE1QixDQUF2QyxDQUEyRTtBQUkxRSxFQUFBLEtBQUssR0FBQTtBQUNKLFVBQU0sS0FBTjtBQUVBLElBQUEsYUFBYSxDQUFDLEVBQWQsQ0FBaUIsUUFBakIsRUFBMkIsTUFBTSxJQUFHO0FBQ25DLFlBQU0sS0FBSyxHQUFHLEtBQUssQ0FBTCxDQUFPLEtBQXJCOztBQUNBLGNBQVEsTUFBUjtBQUNDLGFBQUssT0FBTDtBQUNDLFVBQUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxPQUFaLEdBQXNCLE1BQXRCO0FBQ0E7O0FBQ0Q7QUFDQyxVQUFBLEtBQUssQ0FBQyxLQUFOLENBQVksT0FBWixHQUFzQixNQUF0QjtBQUxGO0FBT0EsS0FURDtBQVdBLElBQUEsZUFBZSxDQUFDLEVBQWhCLENBQW1CLFFBQW5CLEVBQTZCLE1BQU0sSUFBRztBQUNyQyxVQUFJLENBQUMsTUFBTCxFQUFhO0FBQ1o7QUFDQTs7QUFFQSxXQUFLLENBQUwsQ0FBTyxLQUFQLENBQTZCLEtBQTdCLENBQW1DLE9BQW5DLEdBQTZDLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLENBQWhCLEdBQW9CLE1BQXBCLEdBQTZCLE1BQTFFO0FBQ0QsV0FBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLEtBUEQ7QUFRQTs7QUFFRCxFQUFBLFdBQVcsQ0FBQyxDQUFELEVBQVcsQ0FBWCxFQUFtQjtBQUM3QjtBQUNBLFdBQU8sSUFBSSxJQUFKLENBQVMsQ0FBQyxDQUFDLFVBQVgsSUFBeUIsSUFBSSxJQUFKLENBQVMsQ0FBQyxDQUFDLFVBQVgsQ0FBaEM7QUFDQTs7QUFFRCxFQUFBLG1CQUFtQixDQUFDLEtBQUQsRUFBYTtBQUMvQixVQUFNLGFBQWEsR0FBRyxLQUFLLENBQUwsQ0FBTyxhQUE3QjtBQUNBLElBQUEsYUFBYSxDQUFDLElBQWQsQ0FBb0IsS0FBYSxDQUFDLEtBQWQsQ0FBb0IsS0FBeEM7QUFDQTs7QUFwQ3lFLENBQTNFOztBQUVDLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxFQUFBLElBQUksRUFBRTtBQUFQLENBQUQsQ0FDVCxDQUFBLEUsbUJBQUEsRSxRQUFBLEUsS0FBcUIsQ0FBckI7O0FBRm9CLFNBQVMsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBRDdCLGFBQWEsQ0FBQyxZQUFELENBQ2dCLENBQUEsRUFBVCxTQUFTLENBQVQ7ZUFBQSxTIiwic291cmNlUm9vdCI6IiJ9