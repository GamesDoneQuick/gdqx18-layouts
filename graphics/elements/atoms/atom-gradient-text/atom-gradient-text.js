"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  /**
   * @customElement
   * @polymer
   */

  let AtromGradientText = class AtromGradientText extends Polymer.Element {
    ready() {
      super.ready(); // Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880

      this.shadowRoot.querySelectorAll('sc-fitted-text').forEach(node => {
        node.$.fittedContent.style.webkitBackgroundClip = 'text';
      });
    }

  };

  __decorate([property({
    type: String
  })], AtromGradientText.prototype, "text", void 0);

  __decorate([property({
    type: String,
    reflectToAttribute: true
  })], AtromGradientText.prototype, "align", void 0);

  __decorate([property({
    type: Number
  })], AtromGradientText.prototype, "maxWidth", void 0);

  AtromGradientText = __decorate([customElement('atom-gradient-text')], AtromGradientText); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtromGradientText = AtromGradientText;
});