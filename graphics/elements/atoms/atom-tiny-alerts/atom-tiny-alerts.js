import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Power1 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import Random from "../../../../shared/lib/vendor/random.js";
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