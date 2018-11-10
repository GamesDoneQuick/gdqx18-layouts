import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, TweenLite, Sine } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import { typeAnim } from "../../../../shared/lib/TypeAnims.js";
import { createMaybeRandomTween } from "../../../../shared/lib/MaybeRandom.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  const countdownRunning = nodecg.Replicant('countdownRunning');
  const countdownTime = nodecg.Replicant('countdown');
  const nowPlaying = nodecg.Replicant('nowPlaying');
  /**
   * @customElement
   * @polymer
   */

  let GdqCountdown = class GdqCountdown extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
      super(...arguments);
      this._countdownTimeline = new TimelineLite({
        autoRemoveChildren: true
      });
      this._nowPlayingTimeline = new TimelineLite({
        autoRemoveChildren: true
      });
      this._fooDebouncer = null;
    }

    ready() {
      super.ready();
      TweenLite.set(this.$.countdown, {
        opacity: 0
      });
      countdownRunning.on('change', newVal => {
        if (newVal) {
          this.showTimer();
        } else {
          this._debounceFoo();
        }
      });
      countdownTime.on('change', newVal => {
        this.$.countdownMinutesTens.innerText = String(Math.floor(newVal.minutes / 10));
        this.$.countdownMinutesOnes.innerText = String(newVal.minutes % 10);
        this.$.countdownSecondsTens.innerText = String(Math.floor(newVal.seconds / 10));
        this.$.countdownSecondsOnes.innerText = String(newVal.seconds % 10);

        if (newVal.raw <= 60000) {
          if (!this._didTweenRed) {
            this._didTweenRed = true;
            this._didTweenTeal = false;
            TweenLite.to(this.$.countdown, 1, {
              color: '#ED5A5A',
              ease: Sine.easeInOut
            });
          }
        } else if (!this._didTweenTeal) {
          // eslint-disable-line no-lonely-if
          this._didTweenRed = false;
          this._didTweenTeal = true;
          TweenLite.to(this.$.countdown, 1, {
            color: '#00FFFF',
            ease: Sine.easeInOut
          });
        }

        if (newVal.raw <= 0) {
          this.$.countdown.classList.add('blink');

          this._debounceFoo();
        } else {
          this.$.countdown.classList.remove('blink');
        }
      });
      nowPlaying.on('change', newVal => {
        this.$.nowPlaying.textContent = `${newVal.game || '?'} - ${newVal.title || '?'}`;
        typeAnim(this.$.nowPlaying);
      });
    }

    showTimer() {
      if (!this._initialized) {
        this._initialized = true;
      }

      clearTimeout(this._fooTimeout);
      const tl = this._countdownTimeline;
      tl.add(createMaybeRandomTween({
        target: this.$.pressStart.style,
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
      }), 'flickerTotal');
      tl.set(this.$.countdown, {
        opacity: 1
      });
      tl.staggerFromTo([this.$.countdownMinutesTens, this.$.countdownMinutesOnes, this.$.countdownColon, this.$.countdownSecondsTens, this.$.countdownSecondsOnes], 0.001, {
        visibility: 'hidden'
      }, {
        visibility: 'visible'
      }, 0.03);
    }

    hideTimer() {
      if (!this._initialized) {
        this._initialized = true;
        return;
      }

      const tl = this._countdownTimeline;
      tl.add(createMaybeRandomTween({
        target: this.$.countdown.style,
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
      }), 'flickerTotal');
      tl.set(this.$.pressStart, {
        opacity: 1
      });
      tl.add(typeAnim(this.$.pressStart));
    }

    _debounceFoo() {
      this._fooDebouncer = Polymer.Debouncer.debounce(this._fooDebouncer, Polymer.Async.timeOut.after(300), this._foo.bind(this));
    }

    _foo() {
      clearTimeout(this._fooTimeout);

      if (countdownRunning.value === false) {
        if (countdownTime.value && countdownTime.value.raw <= 0) {
          this._fooTimeout = window.setTimeout(() => {
            this.hideTimer();
          }, 120);
        } else {
          this.hideTimer();
        }
      }
    }

  };

  tslib_1.__decorate([property({
    type: Object,
    readOnly: true
  })], GdqCountdown.prototype, "_countdownTimeline", void 0);

  tslib_1.__decorate([property({
    type: Object,
    readOnly: true
  })], GdqCountdown.prototype, "_nowPlayingTimeline", void 0);

  GdqCountdown = tslib_1.__decorate([customElement('gdq-countdown')], GdqCountdown); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqCountdown = GdqCountdown;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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