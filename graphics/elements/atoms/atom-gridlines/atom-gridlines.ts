window.addEventListener('load', () => {
	const {customElement} = Polymer.decorators;

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('atom-gridlines')
	class AtomGridlines extends Polymer.Element {}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).AtomGridlines = AtomGridlines;
});
