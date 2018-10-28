(function () {
	'use strict';

	const smalttpData = nodecg.Replicant('smalttpData');

	/**
	 * @customElement
	 * @polymer
	 */
	class GdqSmalttpTracker extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'gdq-smalttp-tracker';
		}

		static get properties() {
			return {
				importPath: String, // https://github.com/Polymer/polymer-linter/issues/71
				items: {
					type: Array
				}
			};
		}

		ready() {
			super.ready();
			smalttpData.on('change', newVal => {
				this.items = newVal;
			});
		}

		_advance(e) {
			const updated = e.model.item;
			if (updated.state === updated.maxState) {
				updated.state = 0;
			} else {
				updated.state++;
			}
		}

		_highlight(e) {
			e.model.item.highlight = !e.model.item.highlight;
		}

		_calcCellClass(itemOrPrize) {
			const classes = new Set(['cell']);

			if (itemOrPrize.state === 0) {
				classes.add('cell--dimmed');
			}

			if (itemOrPrize.highlight === true) {
				classes.add('cell--highlight');
			}

			return Array.from(classes).join(' ');
		}

		_calcToggleClass(itemOrPrize) {
			const classes = new Set(['cell']);

			if (itemOrPrize.highlight === true) {
				classes.add('cell--highlight');
			}

			return Array.from(classes).join(' ');
		}

		_calcCellSrc(itemOrPrize) {
			let src = itemOrPrize.name;
			if (itemOrPrize.state > 1) {
				src += itemOrPrize.state;
			}
			return src ? src : 'blank-pixel';
		}
	}

	customElements.define(GdqSmalttpTracker.is, GdqSmalttpTracker);
})();
