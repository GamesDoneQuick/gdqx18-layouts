import {Gdq3AcurrentLayout} from '../../../src/types/schemas/gdq%3AcurrentLayout';
import {Tweets} from '../../../src/types/schemas/tweets';
import {Tweet} from '../../../src/types/Twitter';

window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;
	const currentLayout = nodecg.Replicant<Gdq3AcurrentLayout>('gdq:currentLayout');
	const tweets = nodecg.Replicant<Tweets>('tweets');

	/**
	 * @customElement
	 * @polymer
	 * @appliesMixin Polymer.MutableData
	 */
	@customElement('gdq-twitter-controls')
	class GdqTwitterControls extends Polymer.MutableData(Polymer.Element) {
		@property({type: Array})
		tweets: Tweets;

		ready() {
			super.ready();
			const cover = this.$.cover as HTMLElement;

			currentLayout.on('change', newVal => {
				switch (newVal) {
					case 'countdown':
					case 'interview':
					case 'standard_4':
					case 'widescreen_4':
					case 'gameboy_4':
					case 'ds':
						cover.style.display = 'flex';
						break;
					default:
						cover.style.display = 'none';
				}
			});

			tweets.on('change', newVal => {
				(this.$.empty as HTMLElement).style.display = newVal.length > 0 ? 'none' : 'flex';
				this.tweets = newVal;
			});
		}

		_sortTweets(a: Tweet, b: Tweet) {
			// @ts-ignore
			return new Date(b.created_at) - new Date(a.created_at);
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).GdqTwitterControls = GdqTwitterControls;
});
