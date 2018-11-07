"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  /**
   * @customElement
   * @polymer
   */

  var AtromGradientText =
  /** @class */
  function (_super) {
    __extends(AtromGradientText, _super);

    function AtromGradientText() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    AtromGradientText.prototype.ready = function () {
      _super.prototype.ready.call(this); // Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880


      this.shadowRoot.querySelectorAll('sc-fitted-text').forEach(function (node) {
        node.$.fittedContent.style.webkitBackgroundClip = 'text';
      });
    };

    __decorate([property({
      type: String
    })], AtromGradientText.prototype, "text");

    __decorate([property({
      type: String,
      reflectToAttribute: true
    })], AtromGradientText.prototype, "align");

    __decorate([property({
      type: Number
    })], AtromGradientText.prototype, "maxWidth");

    AtromGradientText = __decorate([customElement('atom-gradient-text')], AtromGradientText);
    return AtromGradientText;
  }(Polymer.Element); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.AtromGradientText = AtromGradientText;
});