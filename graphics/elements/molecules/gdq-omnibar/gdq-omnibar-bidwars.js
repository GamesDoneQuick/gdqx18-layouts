import * as tslib_1 from "tslib";
import { TimelineLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const MAX_OPTIONS = 4;
/**
 * @customElement
 * @polymer
 */
let GdqOmnibarBidwars = class GdqOmnibarBidwars extends Polymer.Element {
    enter(displayDuration, scrollHoldDuration) {
        const tl = new TimelineLite();
        const labelElem = this.$.label;
        this.bidWars.forEach((bidWar, bidIndex) => {
            // Show at most MAX_OPTIONS options.
            const bidElements = bidWar.options.slice(0, MAX_OPTIONS).map((option, index) => {
                const element = document.createElement('gdq-omnibar-bidwar-option');
                element.bid = option;
                element.winning = index === 0;
                return element;
            });
            if (bidElements.length <= 0) {
                const placeholder = document.createElement('gdq-omnibar-bidwar-option');
                placeholder.bid = {};
                placeholder.placeholder = true;
                bidElements.push(placeholder);
            }
            const listElement = document.createElement('gdq-omnibar-list');
            listElement.classList.add('list');
            listElement.marginSize = -8;
            bidElements.forEach(element => {
                listElement.appendChild(element);
            });
            this.$.lists.appendChild(listElement);
            Polymer.flush();
            bidElements.slice(0).reverse().forEach((element, index) => {
                element.render();
                element.style.zIndex = String(index); // First item has highest z-index, last item has lowest.
            });
            tl.call(() => {
                this.$.lists.select(bidIndex);
            });
            if (bidIndex === 0) {
                tl.add(labelElem.enter(bidWar.description));
            }
            else {
                tl.add(labelElem.change(bidWar.description));
            }
            tl.call(() => {
                tl.pause();
                const fooTl = listElement.enter(displayDuration, scrollHoldDuration);
                fooTl.call(tl.resume, undefined, tl);
            });
            tl.add(listElement.exit());
        });
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        tl.add(this.$.label.exit());
        return tl;
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GdqOmnibarBidwars.prototype, "bidWars", void 0);
GdqOmnibarBidwars = tslib_1.__decorate([
    customElement('gdq-omnibar-bidwars')
], GdqOmnibarBidwars);
export default GdqOmnibarBidwars;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItYmlkd2Fycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1vbW5pYmFyLWJpZHdhcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFNbEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztBQUV0Qjs7O0dBR0c7QUFFSCxJQUFxQixpQkFBaUIsR0FBdEMsTUFBcUIsaUJBQWtCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFJN0QsS0FBSyxDQUFDLGVBQXVCLEVBQUUsa0JBQTBCO1FBQ3hELE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUErQixDQUFDO1FBRXpELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ3pDLG9DQUFvQztZQUNwQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUM5RSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUEyQixDQUFDO2dCQUM5RixPQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztnQkFDckIsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixPQUFPLE9BQU8sQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sV0FBVyxHQUFHLFFBQVEs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