import {Run} from '../../../../src/types';
import GdqOmnibarListItem from './gdq-omnibar-list-item';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-run')
export default class GdqOmnibarRun extends Polymer.Element {
	@property({type: Object})
	run: Run;

	@property({type: Boolean, reflectToAttribute: true})
	first: boolean;

	enter() {
		return (this.$.listItem as GdqOmnibarListItem).enter();
	}

	exit() {
		return (this.$.listItem as GdqOmnibarListItem).exit();
	}

	formatName(name: string) {
		return name.replace('\\n', ' ').trim();
	}

	concatenateRunners(run: Run) {
		if (run.pk === 2640) {
			// Pre-Show
			return 'SpikeVegeta, feasel, Blechy, Protomagicalgirl & JHobz';
		}

		if (run.pk === 2779) {
			// Mega Man 1 - 3 Team Relay Race Any%
			return '12 Runners';
		}

		let concatenatedRunners = run.runners[0] ? run.runners[0].name : '';
		if (run.runners.length > 1) {
			concatenatedRunners = run.runners.slice(1).reduce((prev, curr, index, array) => {
				if (index === array.length - 1) {
					return `${prev} & ${curr.name}`;
				}

				return `${prev}, ${curr.name}`;
			}, concatenatedRunners);
		}
		return concatenatedRunners;
	}
}
