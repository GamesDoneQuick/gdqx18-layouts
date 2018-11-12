import * as tslib_1 from "tslib";
import { TimelineLite, Sine, Power2 } from 'gsap';
import GDQBreakLoopMixin from '../../../mixins/GDQBreakLoopMixin';
import { typeAnim } from '../../../../shared/lib/TypeAnims';
const { customElement } = Polymer.decorators;
const EMPTY_OBJ = {};
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
const currentBids = nodecg.Replicant('currentBids');
/**
 * @customElement
 * @polymer
 */
let GdqBreakBids = class GdqBreakBids extends GDQBreakLoopMixin(Polymer.Element) {
    ready() {
        super.ready();
        this.maxNoMoreItemsRetries = 30;
        currentBids.on('change', newVal => {
            this.availableItems = newVal;
        });
    }
    show() {
        const tl = new TimelineLite();
        tl.to(this, 0.333, {
            opacity: 1,
            ease: Sine.easeInOut
        }, 0);
        tl.to(this, 1, {
            x: '0%',
            ease: Power2.easeOut
        }, 0);
        return tl;
    }
    hide() {
        const tl = new TimelineLite();
        tl.to(this, 1, {
            x: '-100%',
            ease: Power2.easeIn
        });
        tl.to(this, 0.333, {
            opacity: 0,
            ease: Sine.easeInOut
        }, '-=0.333');
        return tl;
    }
    _showItem(bid) {
        let elementTagName;
        if (bid.type === 'choice-many') {
            elementTagName = 'gdq-break-bid-many';
        }
        else if (bid.type === 'choice-binary') {
            elementTagName = 'gdq-break-bid-binary';
        }
        else if (bid.type === 'challenge') {
            elementTagName = 'gdq-break-bid-challenge';
        }
        else {
            nodecg.log.error('Got bid of unexpected type (%s):', bid.type, JSON.stringify(bid, null, 2));
        }
        const tl = new TimelineLite();
        if (!elementTagName) {
            return tl;
        }
        const previousElement = this._previousBidElement;
        const element = document.createElement(elementTagName);
        element.bid = bid;
        this._previousBidElement = element;
        this.$.content.appendChild(element);
        if (previousElement) {
            tl.add(previousElement.exit());
            tl.call(() => {
                previousElement.remove();
            });
        }
        tl.call(() => {
            const contentElem = this.$.content;
            contentElem.selectIndex(contentElem.indexOf(element));
            this.$['description-actual'].innerHTML = bid.description.replace(/\\n/g, '</br>');
            typeAnim(this.$['description-actual']);
        }, undefined, null, '+=0.1');
        tl.add(element.enter());
        // Give the bid some time to show.
        tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
        return tl;
    }
};
GdqBreakBids = tslib_1.__decorate([
    customElement('gdq-break-bids')
], GdqBreakBids);
export default GdqBreakBids;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtYnJlYWstYmlkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8saUJBQWlCLE1BQU0sbUNBQW1DLENBQUM7QUFFbEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRTFELE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBUTNDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDO0FBQzdELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWMsYUFBYSxDQUFDLENBQUM7QUFFakU7OztHQUdHO0FBRUgsSUFBcUIsWUFBWSxHQUFqQyxNQUFxQixZQUFhLFNBQVEsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBWTtJQUd0RixLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUNoQyxXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJO1FBQ0gsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDbEIsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVOLEVB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