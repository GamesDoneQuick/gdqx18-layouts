import {IAtomTinyAlerts} from '../atom-tiny-alerts/atom-tiny-alerts';

export interface TwitchSubscription {
	user_name: string;
	display_name: string;
	channel_name: string;
	user_id: string;
	channel_id: string;
	time: string;
	sub_plan: string;
	sub_plan_name: string;
	months: number;
	context: string;
	sub_message: {
		message: string;
		emotes: any[];
	};
}

console.log('atom-sub-alerts');
window.addEventListener('load', () => {
	const {customElement} = Polymer.decorators;
	const atomTinyAlerts = customElements.get('atom-tiny-alerts') as (new () => IAtomTinyAlerts);

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('atom-sub-alerts')
	class AtomSubAlerts extends atomTinyAlerts {
		ready() {
			super.ready();
			nodecg.listenFor('subscription', this._handleSubscription.bind(this));
		}

		_handleSubscription(subscription: TwitchSubscription) {
			let backgroundColor = 'white';
			let holdDuration = 0.067;
			let text = 'New';

			if (subscription.sub_plan && subscription.sub_plan.toLowerCase() === 'prime') {
				backgroundColor = '#6441a4';
				text = 'Prime';
			} else if (subscription.context && subscription.context.toLowerCase() === 'subgift') {
				backgroundColor = '#00ffff';
				text = 'Gift';
			} else if (subscription.sub_plan === '2000') {
				backgroundColor = '#ffba00';
				holdDuration *= 3;
				text = '$9.99';
			} else if (subscription.sub_plan === '3000') {
				backgroundColor = '#ff0099';
				holdDuration *= 6;
				text = '$24.99';
			}

			if (subscription.months <= 1) {
				text += ' Sub';
			} else {
				text += ` Resub x${subscription.months}`;
			}

			this.addAlert({
				text,
				backgroundColor,
				holdDuration
			});
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).AtomSubAlerts = AtomSubAlerts;
});
