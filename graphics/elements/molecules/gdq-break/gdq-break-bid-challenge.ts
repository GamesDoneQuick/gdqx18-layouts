import {TimelineLite, TweenLite, Power2, Power4} from 'gsap';
import {IAtomTweeningNumber} from '../../atoms/atom-tweening-number/atom-tweening-number';
import {createMaybeRandomTween} from '../../../../shared/lib/MaybeRandom';
import {BidElement} from './gdq-break-bids';
import {ParentBid} from '../../../../src/types/index';

window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('gdq-break-bid-challenge')
	class GdqBreakBidChallenge extends Polymer.Element implements BidElement {
		@property({type: Object})
		bid: ParentBid;

		ready() {
			super.ready();
			const amountElem = this.$.amount as IAtomTweeningNumber;
			const percentElem = this.$.percent as IAtomTweeningNumber;

			amountElem.ease = Power2.easeOut;
			amountElem.displayValueTransform = (displayValue: number) => {
				return '$' + displayValue.toLocaleString('en-US', {
					maximumFractionDigits: 0,
					useGrouping: false
				});
			};

			percentElem.ease = Power2.easeOut;
			percentElem.displayValueTransform = (displayValue: number) => {
				return displayValue.toLocaleString('en-US', {
					maximumFractionDigits: 0,
					useGrouping: false
				}) + '%';
			};

			TweenLite.set(this, {opacity: 0});
			TweenLite.set(this.$.meter, {scaleX: 0});
			TweenLite.set(this.$['meter-line'], {scaleY: 0});
		}

		enter() {
			let meterPercent = this.bid.rawTotal / this.bid.rawGoal;
			meterPercent = Math.max(meterPercent, 0); // Clamp to min 0
			meterPercent = Math.min(meterPercent, 1); // Clamp to max 1
			if (Number.isNaN(meterPercent)) {
				meterPercent = 0;
			}

			const tl = new TimelineLite();
			const meterDuration = meterPercent * 0.75;

			tl.set(this.$.left, {
				width: `${meterPercent * 100}%`
			});

			tl.call(() => {
				this.$.goal.textContent = '$' + this.bid.rawGoal.toLocaleString('en-US', {
					maximumFractionDigits: 0,
					useGrouping: false
				});

				if (this.$.meter.clientWidth < this.$.amount.clientWidth) {
					TweenLite.set(this.$.amount, {
						right: '',
						left: '100%'
					});
				}
			}, undefined, null, '+=0.03');

			tl.add(createMaybeRandomTween({
				target: this.style,
				propName: 'opacity',
				duration: 0.465,
				ease: Power4.easeIn,
				start: {probability: 1, normalValue: 0},
				end: {probability: 0, normalValue: 1}
			}));

			tl.to(this.$['meter-line'], 0.324, {
				scaleY: 1,
				ease: Power2.easeInOut
			});

			tl.to(this.$.meter, meterDuration, {
				scaleX: 1,
				ease: Power2.easeOut,
				onStart: () => {
					(this.$.amount as IAtomTweeningNumber).tween(this.bid.rawTotal, meterDuration);
					(this.$.percent as IAtomTweeningNumber).tween(Math.floor(meterPercent * 100), meterDuration);
				}
			});

			return tl;
		}

		exit() {
			const tl = new TimelineLite();

			tl.add(createMaybeRandomTween({
				target: this.style,
				propName: 'opacity',
				duration: 0.2,
				ease: Power4.easeIn,
				start: {probability: 1, normalValue: 1},
				end: {probability: 0, normalValue: 0}
			}));

			return tl;
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).GdqBreakBidChallenge = GdqBreakBidChallenge;
});
