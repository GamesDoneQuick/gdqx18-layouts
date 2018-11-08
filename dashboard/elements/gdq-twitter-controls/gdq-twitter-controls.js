import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
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

  GdqTwitterControls = tslib_1.__decorate([customElement('gdq-twitter-controls')], GdqTwitterControls); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqTwitterControls = GdqTwitterControls;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS10d2l0dGVyLWNvbnRyb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBSztBQUNwQyxRQUFNO0FBQUMsSUFBQSxhQUFEO0FBQWdCLElBQUE7QUFBaEIsTUFBNEIsT0FBTyxDQUFDLFVBQTFDO0FBQ0EsUUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVAsQ0FBcUMsbUJBQXJDLENBQXRCO0FBQ0EsUUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVAsQ0FBeUIsUUFBekIsQ0FBZjtBQUVBOzs7Ozs7QUFNQSxNQUFNLGtCQUFrQixHQUF4QixNQUFNLGtCQUFOLFNBQWlDLE9BQU8sQ0FBQyxXQUFSLENBQW9CLE9BQU8sQ0FBQyxPQUE1QixDQUFqQyxDQUFxRTtBQUlwRSxJQUFBLEtBQUssR0FBQTtBQUNKLFlBQU0sS0FBTjtBQUNBLFlBQU0sS0FBSyxHQUFHLEtBQUssQ0FBTCxDQUFPLEtBQXJCO0FBRUEsTUFBQSxhQUFhLENBQUMsRUFBZCxDQUFpQixRQUFqQixFQUEyQixNQUFNLElBQUc7QUFDbkMsZ0JBQVEsTUFBUjtBQUNDLGVBQUssV0FBTDtBQUNBLGVBQUssV0FBTDtBQUNBLGVBQUssWUFBTDtBQUNBLGVBQUssY0FBTDtBQUNBLGVBQUssV0FBTDtBQUNBLGVBQUssSUFBTDtBQUNDLFlBQUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxPQUFaLEdBQXNCLE1BQXRCO0FBQ0E7O0FBQ0Q7QUFDQyxZQUFBLEtBQUssQ0FBQyxLQUFOLENBQVksT0FBWixHQUFzQixNQUF0QjtBQVZGO0FBWUEsT0FiRDtBQWVBLE1BQUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSxRQUFWLEVBQW9CLE1BQU0sSUFBRztBQUMzQixhQUFLLENBQUwsQ0FBTyxLQUFQLENBQTZCLEtBQTdCLENBQW1DLE9BQW5DLEdBQTZDLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLENBQWhCLEdBQW9CLE1BQXBCLEdBQTZCLE1BQTFFO0FBQ0QsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLE9BSEQ7QUFJQTs7QUFFRCxJQUFBLFdBQVcsQ0FBQyxDQUFELEVBQVcsQ0FBWCxFQUFtQjtBQUM3QjtBQUNBLGFBQU8sSUFBSSxJQUFKLENBQVMsQ0FBQyxDQUFDLFVBQVgsSUFBeUIsSUFBSSxJQUFKLENBQVMsQ0FBQyxDQUFDLFVBQVgsQ0FBaEM7QUFDQTs7QUFoQ21FLEdBQXJFOztBQUVDLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSw0QkFBQSxFLFFBQUEsRSxLQUFlLENBQWY7O0FBRkssRUFBQSxrQkFBa0IsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBRHZCLGFBQWEsQ0FBQyxzQkFBRCxDQUNVLENBQUEsRUFBbEIsa0JBQWtCLENBQWxCLENBWDhCLENBOENwQzs7QUFDQyxFQUFBLE1BQWMsQ0FBQyxrQkFBZixHQUFvQyxrQkFBcEM7QUFDRCxDQWhERCIsInNvdXJjZVJvb3QiOiIifQ==