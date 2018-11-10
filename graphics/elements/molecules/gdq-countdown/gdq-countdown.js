import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, TweenLite, Sine } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import { typeAnim } from "../../../../shared/lib/TypeAnims.js";
import { createMaybeRandomTween } from "../../../../shared/lib/MaybeRandom.js";
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

GdqCountdown = tslib_1.__decorate([customElement('gdq-countdown')], GdqCountdown);
export default GdqCountdown;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBLFdBQVcsRUFBRTtBQUE5QjtBQUx3QixLQUFELENBQTdCLEVBTUksY0FOSjtBQVFBLElBQUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxLQUFLLENBQUwsQ0FBTyxVQUFkLEVBQTBCO0FBQUMsTUFBQSxPQUFPLEVBQUU7QUFBVixLQUExQjtBQUNBLElBQUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxRQUFRLENBQUMsS0FBSyxDQUFMLENBQU8sVUFBUixDQUFmO0FBQ0E7O0FBRUQsRUFBQSxZQUFZLEdBQUE7QUFDWCxTQUFLLGFBQUwsR0FBcUIsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsUUFBbEIsQ0FDcEIsS0FBSyxhQURlLEVBRXBCLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxDQUFzQixLQUF0QixDQUE0QixHQUE1QixDQUZvQixFQUdwQixLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsSUFBZixDQUhvQixDQUFyQjtBQUtBOztBQUVELEVBQUEsSUFBSSxHQUFBO0FBQ0gsSUFBQSxZQUFZLENBQUMsS0FBSyxXQUFOLENBQVo7O0FBQ0EsUUFBSSxnQkFBZ0IsQ0FBQyxLQUFqQixLQUEyQixLQUEvQixFQUFzQztBQUNyQyxVQUFJLGFBQWEsQ0FBQyxLQUFkLElBQXVCLGFBQWEsQ0FBQyxLQUFkLENBQW9CLEdBQXBCLElBQTJCLENBQXRELEVBQXlEO0FBQ3hELGFBQUssV0FBTCxHQUFtQixNQUFNLENBQUMsVUFBUCxDQUFrQixNQUFLO0FBQ3pDLGVBQUssU0FBTDtBQUNBLFNBRmtCLEVBRWhCLEdBRmdCLENBQW5CO0FBR0EsT0FKRCxNQUlPO0FBQ04sYUFBSyxTQUFMO0FBQ0E7QUFDRDtBQUNEOztBQXJJdUQsQ0FBekQ7O0FBRUMsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLEVBQUEsSUFBSSxFQUFFLE1BQVA7QUFBZSxFQUFBLFFBQVEsRUFBRTtBQUF6QixDQUFELENBQ1QsQ0FBQSxFLHNCQUFBLEUsb0JBQUEsRSxLQUFnRixDQUFoRjs7QUFHQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsRUFBQSxJQUFJLEVBQUUsTUFBUDtBQUFlLEVBQUEsUUFBUSxFQUFFO0FBQXpCLENBQUQsQ0FDVCxDQUFBLEUsc0JBQUEsRSxxQkFBQSxFLEtBQWlGLENBQWpGOztBQUxvQixZQUFZLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURoQyxhQUFhLENBQUMsZUFBRCxDQUNtQixDQUFBLEVBQVosWUFBWSxDQUFaO2VBQUEsWSIsInNvdXJjZVJvb3QiOiIifQ==