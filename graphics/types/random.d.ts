import RandomTypedef from 'random-js';

declare global {
	export interface Window {
		random: RandomTypedef;
	}
}
