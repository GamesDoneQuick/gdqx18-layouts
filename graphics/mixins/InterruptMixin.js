import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
var property = Polymer.decorators.property;
var EMPTY_OBJ = {};
/**
 * @mixinFunction
 * @polymer
 */

export default Polymer.dedupingMixin(function (base) {
  /**
   * @mixinClass
   * @polymer
   */
  var InterruptMixin =
  /** @class */
  function (_super) {
    tslib_1.__extends(InterruptMixin, _super);

    function InterruptMixin() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.timeline = new TimelineLite({
        autoRemoveChildren: true
      });
      /**
       * How long, in seconds, to hold items for after they have finished entering.
       */

      _this.itemDisplayDuration = 9;
      /**
       * If true, it means that we're currently showing an item,
       * and are at a point in the animation where we can show another one
       * without performing a full exit/enter cycle again.
       */

      _this.canExtend = false;
      return _this;
    }

    InterruptMixin.prototype.ready = function () {
      _super.prototype.ready.call(this);

      if (this.bindToMessage && this.bindToMessage.length > 0 && this.bindToMessage !== 'false') {
        nodecg.listenFor(this.bindToMessage, this.playItem.bind(this));
      }
    };
    /**
     * Plays the entrance animation for this element.
     * Then, holds it for itemDisplayDuration seconds.
     * Then, plays the exit animation for this element.
     *
     * If this.companionElement is defined, this method will run this.companionElement.hide()
     * before playing the entrance animation for this element.
     *
     * @param item - The item to show.
     * @returns - A GSAP TimelineLite instance.
     */


    InterruptMixin.prototype.playItem = function (item) {
      var _this = this;

      var tl = this.timeline;

      if (!item) {
        return tl;
      }

      var companionElementsArray;

      if (Array.isArray(this.companionElement)) {
        companionElementsArray = this.companionElement;
      } else {
        companionElementsArray = [this.companionElement];
      }

      companionElementsArray.filter(function (companionElement) {
        return companionElement && typeof companionElement.hide === 'function';
      });

      if (this.canExtend) {
        var newAnim = new TimelineLite();
        newAnim.add(this._createChangeAnim(item));
        newAnim.add(this._createHold());
        tl.add(newAnim, 'exit-=0.01');
        tl.shiftChildren(newAnim.duration(), true, tl.getLabelTime('exit'));
      } else {
        this._addReset(); // Wait for prizes to hide, if applicable.


        tl.call(function () {
          _this._setCanExtend(true);

          if (companionElementsArray.length <= 0) {
            return;
          }

          tl.pause(null, false);
          var companionExitTl = new TimelineLite();
          companionElementsArray.forEach(function (companionElement) {
            companionExitTl.add(companionElement.hide(), 0);
          });
          companionExitTl.call(function () {
            tl.resume(null, false);
          });
        }, undefined, null, '+=0.03');

        if (companionElementsArray.length > 0) {
          tl.addPause();
        }

        tl.add(this._createEntranceAnim(item), '+=0.03');

        if (window.__SCREENSHOT_TESTING__) {
          return tl;
        }

        tl.add(this._createHold());
        tl.addLabel('exit', '+=0');
        var exitAnim = new TimelineLite({
          onStart: function () {
            _this._setCanExtend(false);
          }
        });
        exitAnim.add(this._createExitAnim());
        tl.add(exitAnim);

        if (companionElementsArray.length > 0) {
          tl.addLabel('companionEnter', '+=0');
          companionElementsArray.forEach(function (companionElement) {
            tl.add(companionElement.show(), 'companionEnter');
          });
        } // Padding


        tl.to(EMPTY_OBJ, 0.1, EMPTY_OBJ);
      }

      return tl;
    };
    /**
     * Creates a dummy tween which can be used to hold something as-is
     * for itemDisplayDuration seconds.
     * @returns - A GSAP animation timeline.
     */


    InterruptMixin.prototype._createHold = function () {
      var tl = new TimelineLite();
      tl.to(EMPTY_OBJ, this.itemDisplayDuration, EMPTY_OBJ);
      return tl;
    };

    InterruptMixin.prototype._canExtendChanged = function (newVal) {
      if (newVal) {
        this.dispatchEvent(new CustomEvent('can-extend'));
      }
    };

    tslib_1.__decorate([property({
      type: Object
    })], InterruptMixin.prototype, "companionElement");

    tslib_1.__decorate([property({
      type: Object
    })], InterruptMixin.prototype, "timeline");

    tslib_1.__decorate([property({
      type: String
    })], InterruptMixin.prototype, "bindToMessage");

    tslib_1.__decorate([property({
      type: Number
    })], InterruptMixin.prototype, "itemDisplayDuration");

    tslib_1.__decorate([property({
      type: Boolean,
      notify: true,
      observer: InterruptMixin.prototype._canExtendChanged,
      readOnly: true
    })], InterruptMixin.prototype, "canExtend");

    return InterruptMixin;
  }(base);

  return InterruptMixin;
});