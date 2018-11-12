import * as tslib_1 from "tslib";
import { TimelineLite, Power1 } from 'gsap';
import Random from '../../../../shared/lib/vendor/random';
const { customElement } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtomTinyAlerts = class AtomTinyAlerts extends Polymer.Element {
    addAlert({ text, textColor = 'black', backgroundColor = 'white', holdDuration = 0.067 }) {
        const div = document.createElement('div');
        div.classList.add('alert');
        div.innerText = text;
        div.style.color = textColor;
        div.style.backgroundColor = backgroundColor;
        this.shadowRoot.appendChild(div);
        div.style.left = `${randomInt(0, this.clientWidth - div.clientWidth)}px`;
        div.style.bottom = `${randomInt(2, 8)}px`;
        const tl = new TimelineLite();
        tl.to(div, 0.1834, {
            clipPath: 'inset(0 0%)',
            ease: Power1.easeIn
        });
        tl.addLabel('exit', holdDuration);
        tl.to(div, 0.934, {
            y: -21,
            ease: Power1.easeIn
        }, 'exit');
        tl.to(div, 0.5167, {
            opacity: 0,
            ease: Power1.easeIn
        }, 'exit+=0.4167');
        tl.call(() => {
            div.remove();
        });
        return tl;
    }
};
AtomTinyAlerts = tslib_1.__decorate([
    customElement('atom-tiny-alerts')
], AtomTinyAlerts);
export default AtomTinyAlerts;
// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
window.AtomTinyAlerts = AtomTinyAlerts;
/**
 * Generates a random integer.
 * @param min - The minimum number, inclusive.
 * @param max - The maximmum number, inclusive.
 * @returns - A random number between min and max, inclusive.
 */
function randomInt(min, max) {
    return Random.integer(min, max)(Random.engines.browserCrypto);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS10aW55LWFsZXJ0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0b20tdGlueS1hbGVydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBUzFELE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRTNDOzs7R0FHRztBQUVILElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBZSxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBQzFELFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEdBQUcsT0FBTyxFQUFFLGVBQWUsR0FBRyxPQUFPLEVBQUUsWUFBWSxHQUFHLEtBQUssRUFBUTtRQUMzRixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUM1QixHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFFNUMsSUFBSSxDQUFDLFVBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDekUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFMUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7WUFDbEIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ25CLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtZQUNqQixDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ25CLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDWCxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7WUFDbEIsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU07U0FDbkIsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUVuQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNaLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0NBQ0QsQ0FBQTtBQW5Db0IsY0FBYztJQURsQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7R0FDYixjQUFjLENBbUNsQztlQW5Db0IsY0FBYztBQXFDbkMsbUdBQW1HO0FBQ2xHLE1BQWMsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBRWhEOzs7OztHQUtHO0FBQ0gsU0FBUyxTQUFTLENBQUMsR0FBVyxFQUFFLEdBQVc7SUFDMUMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQy9ELENBQUMifQ==