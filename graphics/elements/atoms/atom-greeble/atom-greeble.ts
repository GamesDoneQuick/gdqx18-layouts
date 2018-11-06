window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('atom-greeble')
	class AtomGreeble extends Polymer.Element {
		@property({type: String, reflectToAttribute: true})
		align: 'left' | 'right' = 'left';
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).AtomGreeble = AtomGreeble;
});
