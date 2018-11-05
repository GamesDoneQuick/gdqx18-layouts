import {Tweet} from '../../../src/types/Twitter';

export interface ITweetItem extends Polymer.Element {
	value: Tweet;
	accept(): void;
	reject(): void;
}

window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;

	/**
	 * @customElement
	 * @polymer
	 * @appliesMixin Polymer.MutableData
	 */
	@customElement('tweet-item')
	class TweetItem extends Polymer.MutableData(Polymer.Element) implements ITweetItem {
		@property({type: Object})
		value: Tweet;

		accept() {
			nodecg.sendMessage('acceptTweet', this.value);
		}

		reject() {
			nodecg.sendMessage('rejectTweet', this.value.id_str);
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).TweetItem = TweetItem;
});
