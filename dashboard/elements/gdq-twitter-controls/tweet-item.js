import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
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

TweetItem = tslib_1.__decorate([customElement('tweet-item')], TweetItem);
export default TweetItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR3ZWV0LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU07QUFBQyxFQUFBLGFBQUQ7QUFBZ0IsRUFBQTtBQUFoQixJQUE0QixPQUFPLENBQUMsVUFBMUM7QUFFQTs7Ozs7O0FBTUEsSUFBcUIsU0FBUyxHQUE5QixNQUFxQixTQUFyQixTQUF1QyxPQUFPLENBQUMsV0FBUixDQUFvQixPQUFPLENBQUMsT0FBNUIsQ0FBdkMsQ0FBMkU7QUFJMUUsRUFBQSxNQUFNLEdBQUE7QUFDTCxJQUFBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLGFBQW5CLEVBQWtDLEtBQUssS0FBdkM7QUFDQTs7QUFFRCxFQUFBLE1BQU0sR0FBQTtBQUNMLElBQUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsYUFBbkIsRUFBa0MsS0FBSyxLQUFMLENBQVcsTUFBN0M7QUFDQTs7QUFWeUUsQ0FBM0U7O0FBRUMsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLEVBQUEsSUFBSSxFQUFFO0FBQVAsQ0FBRCxDQUNULENBQUEsRSxtQkFBQSxFLE9BQUEsRSxLQUFhLENBQWI7O0FBRm9CLFNBQVMsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBRDdCLGFBQWEsQ0FBQyxZQUFELENBQ2dCLENBQUEsRUFBVCxTQUFTLENBQVQ7ZUFBQSxTIiwic291cmNlUm9vdCI6IiJ9