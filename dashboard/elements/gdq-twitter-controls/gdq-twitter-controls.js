import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
const {
  customElement,
  property
} = Polymer.decorators;
const currentLayout = nodecg.Replicant('gdq:currentLayout');
const tweets = nodecg.Replicant('tweets');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */

let GdqTwitterControls = class GdqTwitterControls extends Polymer.MutableData(Polymer.Element) {
  ready() {
    super.ready();
    const cover = this.$.cover;
    currentLayout.on('change', newVal => {
      switch (newVal) {
        case 'countdown':
        case 'interview':
        case 'standard_4':
        case 'widescreen_4':
        case 'gameboy_4':
        case 'ds':
          cover.style.display = 'flex';
          break;

        default:
          cover.style.display = 'none';
      }
    });
    tweets.on('change', newVal => {
      this.$.empty.style.display = newVal.length > 0 ? 'none' : 'flex';
      this.tweets = newVal;
    });
  }

  _sortTweets(a, b) {
    // @ts-ignore
    return new Date(b.created_at) - new Date(a.created_at);
  }

};

tslib_1.__decorate([property({
  type: Array
})], GdqTwitterControls.prototype, "tweets", void 0);

GdqTwitterControls = tslib_1.__decorate([customElement('gdq-twitter-controls')], GdqTwitterControls);
export default GdqTwitterControls;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS10d2l0dGVyLWNvbnRyb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxNQUFNO0FBQUMsRUFBQSxhQUFEO0FBQWdCLEVBQUE7QUFBaEIsSUFBNEIsT0FBTyxDQUFDLFVBQTFDO0FBQ0EsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVAsQ0FBcUMsbUJBQXJDLENBQXRCO0FBQ0EsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVAsQ0FBeUIsUUFBekIsQ0FBZjtBQUVBOzs7Ozs7QUFNQSxJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQXJCLFNBQWdELE9BQU8sQ0FBQyxXQUFSLENBQW9CLE9BQU8sQ0FBQyxPQUE1QixDQUFoRCxDQUFvRjtBQUluRixFQUFBLEtBQUssR0FBQTtBQUNKLFVBQU0sS0FBTjtBQUNBLFVBQU0sS0FBSyxHQUFHLEtBQUssQ0FBTCxDQUFPLEtBQXJCO0FBRUEsSUFBQSxhQUFhLENBQUMsRUFBZCxDQUFpQixRQUFqQixFQUEyQixNQUFNLElBQUc7QUFDbkMsY0FBUSxNQUFSO0FBQ0MsYUFBSyxXQUFMO0FBQ0EsYUFBSyxXQUFMO0FBQ0EsYUFBSyxZQUFMO0FBQ0EsYUFBSyxjQUFMO0FBQ0EsYUFBSyxXQUFMO0FBQ0EsYUFBSyxJQUFMO0FBQ0MsVUFBQSxLQUFLLENBQUMsS0FBTixDQUFZLE9BQVosR0FBc0IsTUFBdEI7QUFDQTs7QUFDRDtBQUNDLFVBQUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxPQUFaLEdBQXNCLE1BQXRCO0FBVkY7QUFZQSxLQWJEO0FBZUEsSUFBQSxNQUFNLENBQUMsRUFBUCxDQUFVLFFBQVYsRUFBb0IsTUFBTSxJQUFHO0FBQzNCLFdBQUssQ0FBTCxDQUFPLEtBQVAsQ0FBNkIsS0FBN0IsQ0FBbUMsT0FBbkMsR0FBNkMsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBaEIsR0FBb0IsTUFBcEIsR0FBNkIsTUFBMUU7QUFDRCxXQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsS0FIRDtBQUlBOztBQUVELEVBQUEsV0FBVyxDQUFDLENBQUQsRUFBVyxDQUFYLEVBQW1CO0FBQzdCO0FBQ0EsV0FBTyxJQUFJLElBQUosQ0FBUyxDQUFDLENBQUMsVUFBWCxJQUF5QixJQUFJLElBQUosQ0FBUyxDQUFDLENBQUMsVUFBWCxDQUFoQztBQUNBOztBQWhDa0YsQ0FBcEY7O0FBRUMsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLEVBQUEsSUFBSSxFQUFFO0FBQVAsQ0FBRCxDQUNULENBQUEsRSw0QkFBQSxFLFFBQUEsRSxLQUFlLENBQWY7O0FBRm9CLGtCQUFrQixHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEdEMsYUFBYSxDQUFDLHNCQUFELENBQ3lCLENBQUEsRUFBbEIsa0JBQWtCLENBQWxCO2VBQUEsa0IiLCJzb3VyY2VSb290IjoiIn0=