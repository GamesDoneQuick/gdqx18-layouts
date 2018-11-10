import {TimelineLite, Power1} from 'gsap';
import Random from '../../../../shared/lib/vendor/random';

export interface IAtomTinyAlerts extends Polymer.Element {
	addAlert(alert: Alert): TimelineLite;
}

export interface Alert {
	text: string;
	textColor?: string;
	backgroundColor?: string;
	holdDuration?: number;
}

console.log('atom-tiny-alerts');
window.addEventListener('load', () => {
	const {customElement} = Polymer.decorators;

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('atom-tiny-alerts')
	class AtomTinyAlerts extends Polymer.Element implements IAtomTinyAlerts {
		addAlert({text, textColor = 'black', backgroundColor = 'white', holdDuration = 0.067}: Alert) {
			const div = document.createElement('div');
			div.classList.add('alert');
			div.innerText = text;
			div.style.color = textColor;
			div.style.backgroundColor = backgroundColor;

			this.shadowRoot!.appendChild(div);
			div.style.left = `${randomInt(0, this.clientWidth - div.clientWidth)}px`;
			div.style.bottom = `${randomInt(2, 8)}px`;

			const tl = new TimelineLite();

			tl.to(div, 0.1834, {
				clipPath: 'inset(0 0%)',
				ease: Power1.easeIn
			});

			tl.addLabel('exit', holdDuration);
			tl.to(div, 0.934, {
				y: -21,
				ease: Power1.easeIn
			}, 'exit');
			tl.to(div, 0.5167, {
				opacity: 0,
				ease: Power1.easeIn
			}, 'exit+=0.4167');

			tl.call(() => {
				div.remove();
			});

			return tl;
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).AtomTinyAlerts = AtomTinyAlerts;

	/**
	 * Generates a random integer.
	 * @param min - The minimum number, inclusive.
	 * @param max - The maximmum number, inclusive.
	 * @returns - A random number between min and max, inclusive.
	 */
	function randomInt(min: number, max: number) {
		return Random.integer(min, max)(Random.engines.browserCrypto);
	}
});
