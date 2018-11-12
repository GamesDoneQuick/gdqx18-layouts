import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Sine } from 'gsap';
import { typeAnim } from '../../../../shared/lib/TypeAnims';
import { createMaybeRandomTween } from '../../../../shared/lib/MaybeRandom';
const { customElement, property } = Polymer.decorators;
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
        this.countdownTimeline = new TimelineLite({ autoRemoveChildren: true });
        this._fooDebouncer = null;
    }
    ready() {
        super.ready();
        TweenLite.set(this.$.countdown, { opacity: 0 });
        countdownRunning.on('change', newVal => {
            if (newVal) {
                this.showTimer();
            }
            else {
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
            }
            else if (!this._didTweenTeal) { // eslint-disable-line no-lonely-if
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
            }
            else {
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
        const tl = this.countdownTimeline;
        tl.add(createMaybeRandomTween({
            target: this.$.pressStart.style,
            propName: 'opacity',
            duration: 0.465,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 0 }
        }), 'flickerTotal');
        tl.set(this.$.countdown, { opacity: 1 });
        tl.staggerFromTo([
            this.$.countdownMinutesTens,
            this.$.countdownMinutesOnes,
            this.$.countdownColon,
            this.$.countdownSecondsTens,
            this.$.countdownSecondsOnes
        ], 0.001, {
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
        const tl = this.countdownTimeline;
        tl.add(createMaybeRandomTween({
            target: this.$.countdown.style,
            propName: 'opacity',
            duration: 0.465,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 0 }
        }), 'flickerTotal');
        tl.set(this.$.pressStart, { opacity: 1 });
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
            }
            else {
                this.hideTimer();
            }
        }
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GdqCountdown.prototype, "countdownTimeline", void 0);
GdqCountdown = tslib_1.__decorate([
    customElement('gdq-countdown')
], GdqCountdown);
export default GdqCountdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jb3VudGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUluRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDMUQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFFMUUsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBbUIsa0JBQWtCLENBQUMsQ0FBQztBQUNoRixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBQy9ELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWEsWUFBWSxDQUFDLENBQUM7QUFFOUQ7OztHQUdHO0FBRUgsSUFBcUIsWUFBWSxHQUFqQyxNQUFxQixZQUFhLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFMekQ7OztPQUdHO0lBQ0g7O1FBR2tCLHNCQUFpQixHQUFpQixJQUFJLFlBQVksQ0FBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFNaEcsa0JBQWEsR0FBNkIsSUFBSSxDQUFDO0lBMkhoRCxDQUFDO0lBekhBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFFOUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUN0QyxJQUFJLE1BQU0sRUFBRTtnQkFDWCxJ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