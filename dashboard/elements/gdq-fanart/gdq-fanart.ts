import {Tweet} from '../../../src/types/Twitter';
import {Gdq3AcurrentLayout} from '../../../src/types/schemas/gdq%3AcurrentLayout';
import {FanartTweets} from '../../../src/types/schemas/fanartTweets';
import {IGdqFanartPreview} from './gdq-fanart-preview';

window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;
	const currentLayout = nodecg.Replicant<Gdq3AcurrentLayout>('gdq:currentLayout');
	const fanartTweetsRep = nodecg.Replicant<FanartTweets>('fanartTweets');

	/**
	 * @customElement
	 * @polymer
	 * @appliesMixin Polymer.MutableData
	 */
	@customElement('gdq-fanart')
	class GdqFanart extends Polymer.MutableData(Polymer.Element) {
		@property({type: Array})
		tweets: FanartTweets;

		ready() {
			super.ready();

			currentLayout.on('change', newVal => {
				const cover = this.$.cover as HTMLElement;
				switch (newVal) {
					case 'break':
						cover.style.display = 'none';
						break;
					default:
						cover.style.display = 'flex';
				}
			});

			fanartTweetsRep.on('change', newVal => {
				if (!newVal) {
					return;
				}

				(this.$.empty as HTMLElement).style.display = newVal.length > 0 ? 'none' : 'flex';
				this.tweets = newVal;
			});
		}

		_sortTweets(a: Tweet, b: Tweet) {
			// @ts-ignore
			return new Date(b.created_at) - new Date(a.created_at);
		}

		_handlePreviewEvent(event: Event) {
			const previewDialog = this.$.previewDialog as IGdqFanartPreview;
			previewDialog.open((event as any).model.tweet);
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).GdqFanart = GdqFanart;
});
