window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('atom-gradient-text')
	class AtromGradientText extends Polymer.Element {
		@property({type: String})
		text: string;

		@property({type: String, reflectToAttribute: true})
		align: string;

		@property({type: Number})
		maxWidth: number;

		ready() {
			super.ready();

			// Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880
			this.shadowRoot!.querySelectorAll('sc-fitted-text').forEach(node => {
				(node as any).$.fittedContent.style.webkitBackgroundClip = 'text';
			});
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).AtromGradientText = AtromGradientText;
});
