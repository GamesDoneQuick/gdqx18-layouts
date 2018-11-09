window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('gdq-break-header')
	class GdqBreakHeader extends Polymer.Element {
		@property({type: String})
		text: string;
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).GdqBreakHeader = GdqBreakHeader;
});
