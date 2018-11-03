/// <reference path="../../../bower_components/paper-input/paper-input.d.ts" />
(() => {
	'use strict';

	interface Fuck {
		[k: number]: number;
	}

	const {customElement, property} = Polymer.decorators;
	const scoresRep = nodecg.Replicant<Fuck>('scores');

	@customElement('gdq-marioscores')
	class GdqMarioScores extends Polymer.Element {
		@property({type: Object})
		scores: Fuck;

		ready() {
			super.ready();
			scoresRep.on('change', newVal => {
				if (newVal) {
					this.scores = newVal;
				}
			});
		}

		_scoreInputChanged(e: Event) {
			if (!scoresRep.value || !e.target) {
				return;
			}

			const target = e.target as PaperInputElement;
			const teamIndex = parseInt(String(target.getAttribute('data-team-index')), 10);
			const val = parseInt(String(target.value), 10);
			if (typeof val === 'number' && !isNaN(val)) {
				scoresRep.value[teamIndex] = val;
			}
		}
	}

	(window as any).GdqMarioScores = GdqMarioScores;
})();
