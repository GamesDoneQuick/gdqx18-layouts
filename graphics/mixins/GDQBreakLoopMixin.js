import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
const {
  property
} = Polymer.decorators;
/**
 * @mixinFunction
 * @polymer
 */

export default Polymer.dedupingMixin(base => {
  /**
   * @mixinClass
   * @polymer
   *
   * A base class for iterating through an array of items and playing an animation for each one in series.
   * This element is not useful on its own, it needs to be extended by some other element which implements
   * a _showItem method.
   */
  class GDQBreakLoopMixin extends base {
    constructor() {
      super(...arguments);
      this.noAutoLoop = false;
      this.maxNoMoreItemsRetries = Infinity;
      this.itemIdField = 'id';
      this._noMoreItemsRetries = 0;
    }

    ready() {
      super.ready();

      if (!this.noAutoLoop) {
        this._loop();
      }
    }

    _loop() {
      if (window.__SCREENSHOT_TESTING__) {
        return;
      } // If there's no items, do nothing and try again in one second.


      if (!this.availableItems || this.availableItems.length <= 0) {
        clearTimeout(this._loopRetryTimeout);
        this._loopRetryTimeout = window.setTimeout(() => {
          this._loop();
        }, 1000);
        return;
      }

      const availableItems = this.availableItems;
      let nextIdx = 0;

      if (this.currentItem && this.currentItem[this.itemIdField]) {
        // Figure out the array index of the current item.
        let currentIdx = -1;
        availableItems.some((item, index) => {
          if (item[this.itemIdField] === this.currentItem[this.itemIdField]) {
            currentIdx = index;
            return true;
          }

          return false;
        });
        nextIdx = currentIdx + 1;
      } // If this index is greater than the max, loop back to the start.


      if (nextIdx >= availableItems.length) {
        nextIdx = 0;
      }

      const nextItem = availableItems[nextIdx]; // If the next item is the same as the current item, do nothing and try again in one second.

      if (this.currentItem && nextItem[this.itemIdField] === this.currentItem[this.itemIdField] && this._noMoreItemsRetries < this.maxNoMoreItemsRetries) {
        this._noMoreItemsRetries++;
        clearTimeout(this._loopRetryTimeout);
        this._loopRetryTimeout = window.setTimeout(() => {
          this._loop();
        }, 1000);
        return;
      } // Kill any existing loop, if one was somehow running.
      // This also resets our internal state, used to make things like the enter/exit anims more seamless.


      this._killLoop(); // Show the next item.


      this.currentItem = nextItem;

      const tl = this._showItem(nextItem);

      tl.call(() => {
        this._loop();
      });
      this._currentLoopIterationTimeline = tl;
    }

    _killLoop() {
      if (this._currentLoopIterationTimeline) {
        this._currentLoopIterationTimeline.clear();

        this._currentLoopIterationTimeline.kill();

        this._currentLoopIterationTimeline = undefined;
      }

      clearTimeout(this._loopRetryTimeout);
      this._noMoreItemsRetries = 0;

      if (this._resetState) {
        this._resetState();
      }
    }

  }

  tslib_1.__decorate([property({
    type: Array
  })], GDQBreakLoopMixin.prototype, "availableItems", void 0);

  tslib_1.__decorate([property({
    type: Object
  })], GDQBreakLoopMixin.prototype, "currentItem", void 0);

  tslib_1.__decorate([property({
    type: Boolean
  })], GDQBreakLoopMixin.prototype, "noAutoLoop", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], GDQBreakLoopMixin.prototype, "maxNoMoreItemsRetries", void 0);

  tslib_1.__decorate([property({
    type: String
  })], GDQBreakLoopMixin.prototype, "itemIdField", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], GDQBreakLoopMixin.prototype, "_noMoreItemsRetries", void 0);

  return GDQBreakLoopMixin;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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