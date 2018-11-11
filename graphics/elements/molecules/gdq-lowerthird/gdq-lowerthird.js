import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Power4, Power3, TweenLite } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import Random from "../../../../shared/lib/vendor/random.js";
const {
  customElement,
  property
} = Polymer.decorators;
const NAME_ELEMENT_ENTRANCE_STAGGER = 0.15;
const interviewNames = nodecg.Replicant('interview:names');
const lowerthirdShowing = nodecg.Replicant('interview:lowerthirdShowing');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */

let GdqLowerthird = class GdqLowerthird extends Polymer.MutableData(Polymer.Element) {
  /**
   * @customElement
   * @polymer
   * @appliesMixin Polymer.MutableData
   */
  constructor() {
    super(...arguments);
    this.preview = false;
    this.tl = new TimelineLite({
      autoRemoveChildren: true
    });
  }

  ready() {
    super.ready();
    this._$nameElements = Array.from(this.shadowRoot.querySelectorAll('#mainNames gdq-lowerthird-nameplate, #hostName'));
    this.reset();

    if (!this.preview && !window.__SCREENSHOT_TESTING__) {
      lowerthirdShowing.on('change', newVal => {
        if (newVal) {
          this.tl.add(this.show());
        } else {
          this.tl.add(this.hide());
        }
      });
    }
  }

  updatePreview(names) {
    this.show(names).progress(1);
  }

  show(prefilledNames) {
    const tl = new TimelineLite();
    const names = prefilledNames ? prefilledNames : interviewNames.value && interviewNames.value.filter(({
      name
    }) => {
      return Boolean(name) && name.trim().length > 0;
    });

    if (!names || names.length <= 0) {
      return tl;
    }

    const nameElementsToShow = this._$nameElements.slice(0, names.length);

    const randomizedNameElements = Random.shuffle(Random.engines.browserCrypto, nameElementsToShow.slice(0).concat([this.$.header]));
    this.reset();
    tl.call(() => {
      this.numNames = names.length;
    }); // Set names

    tl.call(() => {
      this._$nameElements.forEach((nameElement, index) => {
        nameElement.hidden = !names[index] || !names[index].name;

        if (!nameElement.hidden) {
          nameElement.name = names[index].name;
          nameElement.title = names[index].title;
        }
      });
    }, undefined, null, '+=0.3'); // Give time for interviewNames replicant to update.

    tl.to(this.$.background, 0.75, {
      y: '0%',
      ease: Power4.easeOut
    });
    tl.addLabel('nameElementsEnter', '+=0');
    tl.call(() => {// tl.timeScale(0.2);
    }, undefined, null, 'nameElementsEnter');
    randomizedNameElements.forEach((nameElem, index) => {
      tl.add(nameElem.enter(), `nameElementsEnter+=${NAME_ELEMENT_ENTRANCE_STAGGER * index}`);
    });
    return tl;
  }

  hide() {
    const tl = new TimelineLite();
    tl.to(this, 0.5, {
      y: '100%',
      ease: Power3.easeIn
    });
    return tl;
  }

  reset() {
    this.$.header.reset();

    this._$nameElements.forEach(nameElem => nameElem.reset());

    TweenLite.set(this.$.background, {
      y: '100%'
    });
    TweenLite.set(this, {
      y: '0%',
      opacity: 1
    });
  }

};

tslib_1.__decorate([property({
  type: Boolean,
  reflectToAttribute: true
})], GdqLowerthird.prototype, "preview", void 0);

tslib_1.__decorate([property({
  type: Number,
  reflectToAttribute: true
})], GdqLowerthird.prototype, "numNames", void 0);

GdqLowerthird = tslib_1.__decorate([customElement('gdq-lowerthird')], GdqLowerthird);
export default GdqLowerthird;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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