import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  /**
   * @customElement
   * @polymer
   * @appliesMixin Polymer.MutableData
   */

  let TweetItem = class TweetItem extends Polymer.MutableData(Polymer.Element) {
    accept() {
      nodecg.sendMessage('acceptTweet', this.value);
    }

    reject() {
      nodecg.sendMessage('rejectTweet', this.value.id_str);
    }

  };

  tslib_1.__decorate([property({
    type: Object
  })], TweetItem.prototype, "value", void 0);

  TweetItem = tslib_1.__decorate([customElement('tweet-item')], TweetItem); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.TweetItem = TweetItem;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR3ZWV0LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxNQUFLO0FBQ3BDLFFBQU07QUFBQyxJQUFBLGFBQUQ7QUFBZ0IsSUFBQTtBQUFoQixNQUE0QixPQUFPLENBQUMsVUFBMUM7QUFFQTs7Ozs7O0FBTUEsTUFBTSxTQUFTLEdBQWYsTUFBTSxTQUFOLFNBQXdCLE9BQU8sQ0FBQyxXQUFSLENBQW9CLE9BQU8sQ0FBQyxPQUE1QixDQUF4QixDQUE0RDtBQUkzRCxJQUFBLE1BQU0sR0FBQTtBQUNMLE1BQUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsYUFBbkIsRUFBa0MsS0FBSyxLQUF2QztBQUNBOztBQUVELElBQUEsTUFBTSxHQUFBO0FBQ0wsTUFBQSxNQUFNLENBQUMsV0FBUCxDQUFtQixhQUFuQixFQUFrQyxLQUFLLEtBQUwsQ0FBVyxNQUE3QztBQUNBOztBQVYwRCxHQUE1RDs7QUFFQyxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRTtBQUFQLEdBQUQsQ0FDVCxDQUFBLEUsbUJBQUEsRSxPQUFBLEUsS0FBYSxDQUFiOztBQUZLLEVBQUEsU0FBUyxHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEZCxhQUFhLENBQUMsWUFBRCxDQUNDLENBQUEsRUFBVCxTQUFTLENBQVQsQ0FUOEIsQ0FzQnBDOztBQUNDLEVBQUEsTUFBYyxDQUFDLFNBQWYsR0FBMkIsU0FBM0I7QUFDRCxDQXhCRCIsInNvdXJjZVJvb3QiOiIifQ==