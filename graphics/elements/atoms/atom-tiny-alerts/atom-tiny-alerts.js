import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Power1 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import Random from "../../../../shared/lib/vendor/random.js";
console.log('atom-tiny-alerts');
window.addEventListener('load', () => {
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
  AtomTinyAlerts = tslib_1.__decorate([customElement('atom-tiny-alerts')], AtomTinyAlerts); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

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
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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