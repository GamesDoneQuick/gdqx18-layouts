import * as tslib_1 from "tslib";
var GdqOmnibarList_1;
import { TimelineLite, TweenLite, Sine, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
/* Minimum amount of content overflow, in pixels, required before the scrolling behavior kicks in.
 * We have this because if the content just scrolls a few pixels, it looks kinda bad.
 * We've found it's better to just not scroll it at all in those cases, and let it
 * cut off those few pixels. */
const MIN_CONTENT_SCROLL_DISTANCE = 3;
// How much time, in seconds, to spend scrolling on a single pixel.
const CONTENT_SCROLL_TIME_PER_PIXEL = 0.002;
// The opacity to set on list items which are partially occluded by the total.
const OCCLUDED_OPACITY = 0.25;
/**
 * @customElement
 * @polymer
 */
let GdqOmnibarList = GdqOmnibarList_1 = class GdqOmnibarList extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        /**
         * How much space, in pixels, to put between items in the list.
         */
        this.marginSize = 6;
    }
    enter(displayDuration, scrollHoldDuration) {
        const listWidth = this.clientWidth;
        const contentWidth = this.$.content.clientWidth;
        const contentOverflowWidth = contentWidth - listWidth;
        const tl = new TimelineLite();
        const elements = this.getListItems();
        elements.forEach((element, index) => {
            tl.add(element.enter(), index * 0.1134);
        });
        if (contentOverflowWidth < MIN_CONTENT_SCROLL_DISTANCE) {
            tl.to({}, displayDuration, {});
        }
        else {
            // Display the content cards long enough for people to read.
            // Scroll the list of cards if necessary to show them all.
            const occludedElements = new Set();
            const observerMap = new Map();
            const observers = elements.map(element => {
                const observer = new IntersectionObserver(entries => {
                    if (!entries || entries.length < 1) {
                        return;
                    }
                    const entry = entries[0];
                    const occluded = entry.intersectionRatio < 1;
                    if (occluded) {
                        occludedElements.add(element);
                    }
                    else {
                        occludedElements.delete(element);
                    }
                    TweenLite.to(element, 0.224, {
                        opacity: occluded ? OCCLUDED_OPACITY : 1,
                        ease: Sine.easeInOut
                    });
                }, {
                    root: this,
                    rootMargin: '0px',
                    threshold: [0, 1]
                });
                observer.observe(element);
                observerMap.set(element, observer);
                return observer;
            });
            // Figure out how many items we need to exit before all items are visible.
            let recoveredWidth = 0;
            const leadingElementsToExit = [];
            while (recoveredWidth < (contentOverflowWidth - MIN_CONTENT_SCROLL_DISTANCE)) {
                const leadingElement = elements[leadingElementsToExit.length];
                leadingElementsToExit.push(leadingElement);
                recoveredWidth += this.getPreciseElementWidth(leadingElement);
            }
            leadingElementsToExit.forEach(leadingElement => {
                const leadingElementWidth = this.getPreciseElementWidth(leadingElement);
                const trailingElements = elements.slice(elements.indexOf(leadingElement) + 1);
                tl.add(leadingElement.exit(), `+=${scrollHoldDuration}`);
                tl.to(trailingElements, leadingElementWidth * CONTENT_SCROLL_TIME_PER_PIXEL, {
                    x: -leadingElementWidth - this.marginSize,
                    ease: Power2.easeInOut
                });
                tl.call(() => {
                    leadingElement.remove();
                    observerMap.get(leadingElement).disconnect();
                    TweenLite.set(trailingElements, { x: 0 });
                    occludedElements.delete(leadingElement);
                });
            });
            tl.call(() => {
                observers.forEach(observer => observer.disconnect());
            }, undefined, null, `+=${scrollHoldDuration}`);
        }
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        const elements = this.getListItems();
        elements.slice(0).reverse().forEach((element, index) => {
            tl.add(element.exit(), index * 0.3134);
        });
        return tl;
    }
    getListItems() {
        return Array.from(this.$.contentSlot.assignedElements());
    }
    getPreciseElementWidth(element) {
        return element.getBoundingClientRect().width;
    }
    _marginSizeChanged(newVal) {
        this.updateStyles({
            '--gdq-omnibar-list-margin-size': `${newVal}px`
        });
    }
};
tslib_1.__decorate([
    property({ type: Number, observer: GdqOmnibarList_1.prototype._marginSizeChanged })
], GdqOmnibarList.prototype, "marginSize", void 0);
GdqOmnibarList = GdqOmnibarList_1 = tslib_1.__decorate([
    customElement('gdq-omnibar-list')
], GdqOmnibarList);
export default GdqOmnibarList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1vbW5pYmFyLWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRzNELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7OytCQUcrQjtBQUMvQixNQUFNLDJCQUEyQixHQUFHLENBQUMsQ0FBQztBQUV0QyxtRUFBbUU7QUFDbkUsTUFBTSw2QkFBNkIsR0FBRyxLQUFLLENBQUM7QUFFNUMsOEVBQThFO0FBQzlFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBRTlCOzs7R0FHRztBQUVILElBQXFCLGNBQWMsc0JBQW5DLE1BQXFCLGNBQWUsU0FBUSxPQUFPLENBQUMsT0FBTztJQUwzRDs7O09BR0c7SUFDSDs7UUFFQzs7V0FFRztRQUVILGVBQVUsR0FBVyxDQUFDLENBQUM7SUF5R3hCLENBQUM7SUF2R0EsS0FBSyxDQUFDLGVBQXVCLEVBQUUsa0JBQTBCO1FBQ3hELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbkMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQ2hELE1BQU0sb0JBQW9CLEdBQUcsWUFBWSxHQUFHLFNBQVMsQ0FBQztRQUN0RCxNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVyQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ25DLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUss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