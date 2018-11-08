import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
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

  GdqFanart = tslib_1.__decorate([customElement('gdq-fanart')], GdqFanart); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqFanart = GdqFanart;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdkcS1mYW5hcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxNQUFLO0FBQ3BDLFFBQU07QUFBQyxJQUFBLGFBQUQ7QUFBZ0IsSUFBQTtBQUFoQixNQUE0QixPQUFPLENBQUMsVUFBMUM7QUFDQSxRQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUFxQyxtQkFBckMsQ0FBdEI7QUFDQSxRQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUErQixjQUEvQixDQUF4QjtBQUVBOzs7Ozs7QUFNQSxNQUFNLFNBQVMsR0FBZixNQUFNLFNBQU4sU0FBd0IsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsT0FBTyxDQUFDLE9BQTVCLENBQXhCLENBQTREO0FBSTNELElBQUEsS0FBSyxHQUFBO0FBQ0osWUFBTSxLQUFOO0FBRUEsTUFBQSxhQUFhLENBQUMsRUFBZCxDQUFpQixRQUFqQixFQUEyQixNQUFNLElBQUc7QUFDbkMsY0FBTSxLQUFLLEdBQUcsS0FBSyxDQUFMLENBQU8sS0FBckI7O0FBQ0EsZ0JBQVEsTUFBUjtBQUNDLGVBQUssT0FBTDtBQUNDLFlBQUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxPQUFaLEdBQXNCLE1BQXRCO0FBQ0E7O0FBQ0Q7QUFDQyxZQUFBLEtBQUssQ0FBQyxLQUFOLENBQVksT0FBWixHQUFzQixNQUF0QjtBQUxGO0FBT0EsT0FURDtBQVdBLE1BQUEsZUFBZSxDQUFDLEVBQWhCLENBQW1CLFFBQW5CLEVBQTZCLE1BQU0sSUFBRztBQUNyQyxZQUFJLENBQUMsTUFBTCxFQUFhO0FBQ1o7QUFDQTs7QUFFQSxhQUFLLENBQUwsQ0FBTyxLQUFQLENBQTZCLEtBQTdCLENBQW1DLE9BQW5DLEdBQTZDLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLENBQWhCLEdBQW9CLE1BQXBCLEdBQTZCLE1BQTFFO0FBQ0QsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLE9BUEQ7QUFRQTs7QUFFRCxJQUFBLFdBQVcsQ0FBQyxDQUFELEVBQVcsQ0FBWCxFQUFtQjtBQUM3QjtBQUNBLGFBQU8sSUFBSSxJQUFKLENBQVMsQ0FBQyxDQUFDLFVBQVgsSUFBeUIsSUFBSSxJQUFKLENBQVMsQ0FBQyxDQUFDLFVBQVgsQ0FBaEM7QUFDQTs7QUFFRCxJQUFBLG1CQUFtQixDQUFDLEtBQUQsRUFBYTtBQUMvQixZQUFNLGFBQWEsR0FBRyxLQUFLLENBQUwsQ0FBTyxhQUE3QjtBQUNBLE1BQUEsYUFBYSxDQUFDLElBQWQsQ0FBb0IsS0FBYSxDQUFDLEtBQWQsQ0FBb0IsS0FBeEM7QUFDQTs7QUFwQzBELEdBQTVEOztBQUVDLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSxtQkFBQSxFLFFBQUEsRSxLQUFxQixDQUFyQjs7QUFGSyxFQUFBLFNBQVMsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBRGQsYUFBYSxDQUFDLFlBQUQsQ0FDQyxDQUFBLEVBQVQsU0FBUyxDQUFULENBWDhCLENBa0RwQzs7QUFDQyxFQUFBLE1BQWMsQ0FBQyxTQUFmLEdBQTJCLFNBQTNCO0FBQ0QsQ0FwREQiLCJzb3VyY2VSb290IjoiIn0=