import {Prize} from '../../../../src/types';
import GdqOmnibarListItem from './gdq-omnibar-list-item';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-prize')
export default class GdqOmnibarPrize extends Polymer.Element {
	@property({type: Object})
	prize: Prize;

	enter() {
		return (this.$.listItem as GdqOmnibarListItem).enter();
	}

	exit() {
		return (this.$.listItem as GdqOmnibarListItem).exit();
	}

	calcBidAmountText(prize: Prize) {
		return prize.sumdonations ?
			`${prize.minimumbid} in Total Donations` :
			`${prize.minimumbid} Single Donation`;
	}
}
