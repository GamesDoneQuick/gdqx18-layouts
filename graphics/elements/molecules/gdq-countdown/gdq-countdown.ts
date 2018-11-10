import {TimelineLite, TweenLite, Sine} from 'gsap';
import {CountdownRunning} from '../../../../src/types/schemas/countdownRunning';
import {Countdown} from '../../../../src/types/schemas/countdown';
import {NowPlaying} from '../../../../src/types/schemas/nowPlaying';
import {typeAnim} from '../../../../shared/lib/TypeAnims';
import {createMaybeRandomTween} from '../../../../shared/lib/MaybeRandom';

window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;

	const countdownRunning = nodecg.Replicant<CountdownRunning>('countdownRunning');
	const countdownTime = nodecg.Replicant<Countdown>('countdown');
	const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying');

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('gdq-countdown')
	class GdqCountdown extends Polymer.Element {
		@property({type: Object, readOnly: true})
		_countdownTimeline: TimelineLite = new TimelineLite({autoRemoveChildren: true});

		@property({type: Object, readOnly: true})
		_nowPlayingTimeline: TimelineLite = new TimelineLite({autoRemoveChildren: true});

		_initialized: boolean;
		_didTweenRed: boolean;
		_didTweenTeal: boolean;
		_fooTimeout?: number;
		_fooDebouncer: Polymer.Debouncer | null = null;

		ready() {
			super.ready();
			TweenLite.set(this.$.countdown, {opacity: 0});

			countdownRunning.on('change', newVal => {
				if (newVal) {
					this.showTimer();
				} else {
					this._debounceFoo();
				}
			});

			countdownTime.on('change', newVal => {
				(this.$.countdownMinutesTens as HTMLDivElement).innerText = String(Math.floor(newVal.minutes / 10));
				(this.$.countdownMinutesOnes as HTMLDivElement).innerText = String(newVal.minutes % 10);
				(this.$.countdownSecondsTens as HTMLDivElement).innerText = String(Math.floor(newVal.seconds / 10));
				(this.$.countdownSecondsOnes as HTMLDivElement).innerText = String(newVal.seconds % 10);

				if (newVal.raw <= 60000) {
					if (!this._didTweenRed) {
						this._didTweenRed = true;
						this._didTweenTeal = false;
						TweenLite.to(this.$.countdown, 1, {
							color: '#ED5A5A',
							ease: Sine.easeInOut
						});
					}
				} else if (!this._didTweenTeal) { // eslint-disable-line no-lonely-if
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
				typeAnim(this.$.nowPlaying as HTMLDivElement);
			});
		}

		showTimer() {
			if (!this._initialized) {
				this._initialized = true;
			}

			clearTimeout(this._fooTimeout);

			const tl = this._countdownTimeline;

			tl.add(createMaybeRandomTween({
				target: (this.$.pressStart as HTMLDivElement).style,
				propName: 'opacity',
				duration: 0.465,
				start: {probability: 1, normalValue: 1},
				end: {probability: 0, normalValue: 0}
			}), 'flickerTotal');

			tl.set(this.$.countdown, {opacity: 1});
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

			const tl = this._countdownTimeline;

			tl.add(createMaybeRandomTween({
				target: (this.$.countdown as HTMLDivElement).style,
				propName: 'opacity',
				duration: 0.465,
				start: {probability: 1, normalValue: 1},
				end: {probability: 0, normalValue: 0}
			}), 'flickerTotal');

			tl.set(this.$.pressStart, {opacity: 1});
			tl.add(typeAnim(this.$.pressStart as HTMLDivElement));
		}

		_debounceFoo() {
			this._fooDebouncer = Polymer.Debouncer.debounce(
				this._fooDebouncer,
				Polymer.Async.timeOut.after(300),
				this._foo.bind(this)
			);
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
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).GdqCountdown = GdqCountdown;
});
