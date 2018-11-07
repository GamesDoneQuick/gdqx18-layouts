import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Linear, Sine, Power2 } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import InterruptMixin from "../../../mixins/InterruptMixin.js";
import { typeAnim, untypeAnim } from "../../../../shared/lib/TypeAnims.js";
import { createMaybeRandomTween } from "../../../../shared/lib/MaybeRandom.js";
var SVG = window.svgjs;
window.addEventListener('load', function () {
  var _a = Polymer.decorators,
      customElement = _a.customElement,
      property = _a.property;
  /**
   * @customElement
   * @polymer
   */

  var GdqTweet =
  /** @class */
  function (_super) {
    tslib_1.__extends(GdqTweet, _super);

    function GdqTweet() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.label = '';
      _this.companionElement = document.querySelector('gdq-sponsors');
      _this.bindToMessage = 'showTweet';
      _this.backgroundOpacity = 0.25;
      return _this;
    }

    GdqTweet.prototype.ready = function () {
      var _this = this;

      _super.prototype.ready.call(this);

      this._initBackgroundSVG();

      this._addReset();

      Polymer.RenderStatus.beforeNextRender(this, function () {
        var layoutAppElement = document.querySelector('layout-app');

        if (!_this.companionElement && layoutAppElement) {
          var sponsorsElement = layoutAppElement.shadowRoot.querySelector('gdq-sponsors');

          if (sponsorsElement) {
            _this.companionElement = sponsorsElement;
          }
        }
      });
    };
    /**
     * Adds a reset to the master timeline.
     */


    GdqTweet.prototype._addReset = function () {
      var _this = this;

      var tl = this.timeline;
      tl.call(function () {
        _this.$['body-actual'].innerHTML = '';
        _this.$.name.innerHTML = '';
      }, undefined, null, '+=0.03');
      tl.set(this.$svg.bgRect.node, {
        drawSVG: '0%',
        'fill-opacity': 0
      });
      tl.set([this.$.label, this.$.name], {
        scaleX: 0,
        color: 'transparent',
        clipPath: ''
      });
      tl.set(this.$['body-actual'], {
        opacity: 1
      });
    };
    /**
     * Creates an entrance animation timeline.
     * @param tweet - The tweet to enter.
     * @returns A GSAP animation timeline.
     */


    GdqTweet.prototype._createEntranceAnim = function (tweet) {
      var _this = this;

      var tl = new TimelineLite();
      tl.addLabel('start', '+=0.03');
      tl.call(function () {
        _this.$.name.innerText = "@" + tweet.user.screen_name;
      }, undefined, null, 'start');
      tl.to(this.$svg.bgRect.node, 0.75, {
        drawSVG: '100%',
        ease: Linear.easeNone
      }, 'start');
      tl.to(this.$.name, 0.334, {
        scaleX: 1,
        ease: Sine.easeInOut,
        onComplete: function () {
          _this.$.name.style.color = '';
          typeAnim(_this.$.name);
        }
      }, 'start+=0.05');
      tl.to(this.$.label, 0.334, {
        scaleX: 1,
        ease: Sine.easeInOut,
        onComplete: function () {
          _this.$.label.style.color = '';
          typeAnim(_this.$.label);
        }
      }, 'start+=0.4');
      tl.to(this.$svg.bgRect.node, 0.5, {
        'fill-opacity': this.backgroundOpacity,
        ease: Sine.easeOut
      }, 'start+=1');
      tl.call(function () {
        _this.$['body-actual'].innerHTML = tweet.text;
        typeAnim(_this.$['body-actual'], {
          typeInterval: 0.01
        });
      });
      return tl;
    };
    /**
     * Creates an animation for changing the currently displayed tweet.
     * This is only used when hot-swapping tweets
     * (i.e., changing tweets while the graphic is already showing).
     * @param tweet - The new tweet to show.
     * @returns A GSAP animation timeline.
     */


    GdqTweet.prototype._createChangeAnim = function (tweet) {
      var _this = this;

      var tl = new TimelineLite();
      var exitedPreviousTweet = false;
      tl.call(function () {
        if (exitedPreviousTweet) {
          return;
        }

        tl.pause();
        var exitTextTl = new TimelineLite();
        exitTextTl.add(untypeAnim(_this.$.name, 0.01), 0);
        exitTextTl.add(untypeAnim(_this.$['body-actual'], 0.01), 0.08);
        exitTextTl.call(function () {
          exitedPreviousTweet = true;
          tl.resume();
        });
      }, undefined, null, '+=0.03');
      tl.call(function () {
        _this.$.name.innerText = "@" + tweet.user.screen_name;
        _this.$['body-actual'].innerHTML = tweet.text;
        var enterTextTl = new TimelineLite();
        enterTextTl.add(typeAnim(_this.$.name, {
          typeInterval: 0.01
        }), 0);
        enterTextTl.add(typeAnim(_this.$['body-actual'], {
          typeInterval: 0.01
        }), 0.08);
      }, undefined, null, '+=0.03');
      return tl;
    };
    /**
     * Creates an exit animation timeline.
     * @returns A GSAP animation timeline.
     */


    GdqTweet.prototype._createExitAnim = function () {
      var tl = new TimelineLite();
      tl.add('exit');
      tl.add(createMaybeRandomTween({
        target: this.$['body-actual'].style,
        propName: 'opacity',
        duration: 0.465,
        start: {
          probability: 1,
          normalValue: 1
        },
        end: {
          probability: 0,
          normalValue: 0
        }
      }), 'exit');
      tl.to(this.$svg.bgRect.node, 0.5, {
        'fill-opacity': 0,
        ease: Sine.easeOut
      }, 'exit');
      tl.to(this.$svg.bgRect.node, 1.5, {
        drawSVG: '0%',
        ease: Power2.easeIn
      }, 'exit');
      tl.fromTo(this.$.label, 0.334, {
        clipPath: 'inset(0 0% 0 0)'
      }, {
        clipPath: 'inset(0 100% 0 0)',
        ease: Sine.easeInOut
      }, 'exit+=0.9');
      tl.fromTo(this.$.name, 0.334, {
        clipPath: 'inset(0 0 0 0%)'
      }, {
        clipPath: 'inset(0 0 0 100%)',
        ease: Sine.easeInOut
      }, 'exit+=1.3');
      return tl;
    };

    GdqTweet.prototype._initBackgroundSVG = function () {
      if (this._initialized) {
        throw new Error('this element has already been initialized');
      }

      this._initialized = true;
      var STROKE_SIZE = 1;
      this.$svg = {};
      var svgDoc = SVG(this.$.background);
      var bgRect = svgDoc.rect();
      this.$svg.svgDoc = svgDoc;
      this.$svg.bgRect = bgRect; // Intentionally flip the width and height.
      // This is part of how we get the drawSVG anim to go in the direction we want.

      bgRect.stroke({
        color: 'white',
        // Makes it effectively STROKE_SIZE, because all SVG strokes
        // are center strokes, and the outer half is cut off.
        width: STROKE_SIZE * 2
      });
      bgRect.fill({
        color: 'black',
        opacity: this.backgroundOpacity
      });
      this.resize();
    };

    GdqTweet.prototype.resize = function () {
      if (!this._initialized) {
        return;
      }

      var ELEMENT_WIDTH = this.$.background.clientWidth;
      var ELEMENT_HEIGHT = this.$.background.clientHeight;
      this.$svg.svgDoc.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);
      this.$svg.bgRect.size(ELEMENT_HEIGHT, ELEMENT_WIDTH); // Rotate and translate such that drawSVG anims start from the top right
      // and move clockwise to un-draw, counter-clockwise to un-draw.

      this.$svg.bgRect.style({
        transform: "rotate(90deg) translateY(" + -ELEMENT_WIDTH + "px)"
      });
    };

    GdqTweet.prototype._falsey = function (value) {
      return !value;
    };

    tslib_1.__decorate([property({
      type: String
    })], GdqTweet.prototype, "label");

    tslib_1.__decorate([property({
      type: Object
    })], GdqTweet.prototype, "companionElement");

    tslib_1.__decorate([property({
      type: String
    })], GdqTweet.prototype, "bindToMessage");

    tslib_1.__decorate([property({
      type: Number
    })], GdqTweet.prototype, "backgroundOpacity");

    GdqTweet = tslib_1.__decorate([customElement('gdq-tweet')], GdqTweet);
    return GdqTweet;
  }(InterruptMixin(Polymer.Element)); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.


  window.GdqTweet = GdqTweet;
});