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

  let AtomGreeble = class AtomGreeble extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
      super(...arguments);
      this.align = 'left';
    }

  };

  __decorate([property({
    type: String,
    reflectToAttribute: true
  })], AtomGreeble.prototype, "align", void 0);

  AtomGreeble = __decorate([customElement('atom-greeble')], AtomGreeble); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtomGreeble = AtomGreeble;
});