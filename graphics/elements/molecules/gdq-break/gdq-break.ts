import {TimelineLite, TimelineMax} from 'gsap';
import {ICompanionElement, IInterruptMixin} from '../../../mixins/InterruptMixin';
import PQueue from '../../../../shared/lib/vendor/p-queue';

window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('gdq-break')
	class GdqBreak extends Polymer.Element {
		@property({type: Object})
		_queue: PQueue = new PQueue({concurrency: 1});

		ready() {
			super.ready();
			const tweetElem = this.$.tweet as IInterruptMixin;
			const fanartElem = this.$.fanart as IInterruptMixin;
			tweetElem.companionElement = this.$.prizes as ICompanionElement;
			fanartElem.companionElement = [
				this.$.bids,
				this.$.prizes
			] as ICompanionElement[];

			this._setupInterrupt({
				messageName: 'showTweet',
				interruptElement: tweetElem
			});

			this._setupInterrupt({
				messageName: 'showFanart',
				interruptElement: fanartElem
			});
		}

		_setupInterrupt({messageName, interruptElement}: {messageName: string; interruptElement: IInterruptMixin}) {
			let queued = false;
			let queue: unknown[] = [];
			nodecg.listenFor(messageName, payload => {
				if (interruptElement.canExtend) {
					interruptElement.playItem(payload);
					return;
				}

				if (queued) {
					queue.push(payload);
				} else {
					queued = true;
					this._queue.add(async () => {
						interruptElement.addEventListener('can-extend', () => {
							queue.forEach(queuedFanart => {
								interruptElement.playItem(queuedFanart);
							});
							queued = false;
							queue = [];
						}, {once: true, passive: true});
						return this._promisifyTimeline(interruptElement.playItem(payload));
					});
				}
			});
		}

		_promisifyTimeline(tl: TimelineLite | TimelineMax) {
			return new Promise(resolve => {
				tl.call(resolve, undefined, null, '+=0.03');
			});
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).GdqBreak = GdqBreak;
});
