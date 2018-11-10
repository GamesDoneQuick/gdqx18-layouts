import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Power1 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import Random from "../../../../shared/lib/vendor/random.js";
const {
  customElement
} = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */

let AtomTinyAlerts = class AtomTinyAlerts extends Polymer.Element {
  addAlert({
    text,
    textColor = 'black',
    backgroundColor = 'white',
    holdDuration = 0.067
  }) {
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
AtomTinyAlerts = tslib_1.__decorate([customElement('atom-tiny-alerts')], AtomTinyAlerts);
export default AtomTinyAlerts; // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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