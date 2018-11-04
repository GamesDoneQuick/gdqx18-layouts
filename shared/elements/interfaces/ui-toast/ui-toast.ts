export interface IUiToast extends Element {
	_successToastText: string;
	_errorToastText: string;
	showSuccessToast(text: string): void;
	showErrorToast(text: string): void;
}

window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('ui-toast')
	class UiToast extends Polymer.Element implements IUiToast {
		@property({type: String})
		_successToastText: string;

		@property({type: String})
		_errorToastText: string;

		showSuccessToast(text: string) {
			this._successToastText = text;
			(this.$.successToast as PaperToastElement).show();
		}

		showErrorToast(text: string) {
			this._errorToastText = text;
			(this.$.errorToast as PaperToastElement).show();
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).UiToast = UiToast;
});
