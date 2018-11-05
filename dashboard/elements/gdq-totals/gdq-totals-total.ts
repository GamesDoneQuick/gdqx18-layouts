window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;

	@customElement('gdq-totals-total')
	class GdqTotalsTotal extends Polymer.Element {
		@property({type: String})
		value = '?';

		@property({type: String})
		currency: String;

		edit() {
			this.dispatchEvent(new CustomEvent('edit', {bubbles: true, composed: true}));
		}

		equal(a: any, b: any) {
			return a === b;
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).GdqTotalsTotal = GdqTotalsTotal;
});
