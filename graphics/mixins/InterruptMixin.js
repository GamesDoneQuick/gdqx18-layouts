import * as tslib_1 from "tslib";
import { TimelineLite } from 'gsap';
const { property } = Polymer.decorators;
const EMPTY_OBJ = {};
/**
 * @mixinFunction
 * @polymer
 */
export default Polymer.dedupingMixin((base) => {
    /**
     * @mixinClass
     * @polymer
     */
    class InterruptMixin extends base {
        constructor() {
            super(...arguments);
            this.timeline = new TimelineLite({ autoRemoveChildren: true });
            /**
             * How long, in seconds, to hold items for after they have finished entering.
             */
            this.itemDisplayDuration = 9;
            /**
             * If true, it means that we're currently showing an item,
             * and are at a point in the animation where we can show another one
             * without performing a full exit/enter cycle again.
             */
            this.canExtend = false;
        }
        ready() {
            super.ready();
            if (this.bindToMessage && this.bindToMessage.length > 0 && this.bindToMessage !== 'false') {
                nodecg.listenFor(this.bindToMessage, this.playItem.bind(this));
            }
        }
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
        playItem(item) {
            const tl = this.timeline;
            if (!item) {
                return tl;
            }
            let companionElementsArray;
            if (Array.isArray(this.companionElement)) {
                companionElementsArray = this.companionElement;
            }
            else {
                companionElementsArray = [this.companionElement];
            }
            companionElementsArray.filter(companionElement => {
                return companionElement && typeof companionElement.hide === 'function';
            });
            if (this.canExtend) {
                const newAnim = new TimelineLite();
                newAnim.add(this._createChangeAnim(item));
                newAnim.add(this._createHold());
                tl.add(newAnim, 'exit-=0.01');
                tl.shiftChildren(newAnim.duration(), true, tl.getLabelTime('exit'));
            }
            else {
                this._addReset();
                // Wait for prizes to hide, if applicable.
                tl.call(() => {
                    this._setCanExtend(true);
                    if (companionElementsArray.length <= 0) {
                        return;
                    }
                    tl.pause(null, false);
                    const companionExitTl = new TimelineLite();
                    companionElementsArray.forEach(companionElement => {
                        companionExitTl.add(companionElement.hide(), 0);
                    });
                    companionExitTl.call(() => {
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
                const exitAnim = new TimelineLite({
                    onStart: () => {
                        this._setCanExtend(false);
                    }
                });
                exitAnim.add(this._createExitAnim());
                tl.add(exitAnim);
                if (companionElementsArray.length > 0) {
                    tl.addLabel('companionEnter', '+=0');
                    companionElementsArray.forEach(companionElement => {
                        tl.add(companionElement.show(), 'companionEnter');
                    });
                }
                // Padding
                tl.to(EMPTY_OBJ, 0.1, EMPTY_OBJ);
            }
            return tl;
        }
        /**
         * Creates a dummy tween which can be used to hold something as-is
         * for itemDisplayDuration seconds.
         * @returns - A GSAP animation timeline.
         */
        _createHold() {
            const tl = new TimelineLite();
            tl.to(EMPTY_OBJ, this.itemDisplayDuration, EMPTY_OBJ);
            return tl;
        }
        _canExtendChanged(newVal) {
            if (newVal) {
                this.dispatchEvent(new CustomEvent('can-extend'));
            }
        }
    }
    tslib_1.__decorate([
        property({ type: Object })
    ], InterruptMixin.prototype, "companionElement", void 0);
    tslib_1.__decorate([
        property({ type: Object })
    ], InterruptMixin.prototype, "timeline", void 0);
    tslib_1.__decorate([
        property({ type: String })
    ], InterruptMixin.prototype, "bindToMessage", void 0);
    tslib_1.__decorate([
        property({ type: Number })
    ], InterruptMixin.prototype, "itemDisplayDuration", void 0);
    tslib_1.__decorate([
        property({ type: Boolean, notify: true, observer: InterruptMixin.prototype._canExtendChanged, readOnly: true })
    ], InterruptMixin.prototype, "canExtend", void 0);
    return InterruptMixin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJydXB0TWl4aW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJJbnRlcnJ1cHRNaXhpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQW9CbEMsTUFBTSxFQUFDLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDdEMsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBRXJCOzs7R0FHRztBQUNILGVBQWUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQWlDLEVBQUUsRUFBRTtJQUMxRTs7O09BR0c7SUFDSCxNQUFlLGNBQWUsU0FBUSxJQUFJO1FBQTFDOztZQUtDLGFBQVEsR0FBaUIsSUFBSSxZQUFZLENBQUMsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBUXRFOztlQUVHO1lBRUgsd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO1lBRWhDOzs7O2VBSUc7WUFFSCxjQUFTLEdBQVksS0FBSyxDQUFDO1FBMkg1QixDQUFDO1FBcEhBLEtBQUs7WUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFZCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssT0FBTyxFQUFFO2dCQUMxRixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUMvRDtRQUNGLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxDQUFDLElBQVM7WUFDakIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUV6QixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxDQUFDO2FBQ1Y7WUFFRCxJQUFJLHNC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