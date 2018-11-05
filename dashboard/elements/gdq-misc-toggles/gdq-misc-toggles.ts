window.addEventListener('load', () => {
	const {customElement} = Polymer.decorators;
	const autoUploadRecordings = nodecg.Replicant<boolean>('autoUploadRecordings');
	const recordTrackerEnabled = nodecg.Replicant<boolean>('recordTrackerEnabled');

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('gdq-misc-toggles')
	class GdqMiscToggles extends Polymer.Element {
		ready() {
			super.ready();
			Polymer.RenderStatus.beforeNextRender(this, () => {
				recordTrackerEnabled.on('change', newVal => {
					if (newVal) {
						(this.$.milestoneToggle as PaperToggleButtonElement).checked = newVal;
					}
				});

				autoUploadRecordings.on('change', newVal => {
					(this.$.uploadToggle as PaperToggleButtonElement).checked = newVal;
				});

				this._checkUploadToggleDisable();
			});
		}

		_checkUploadToggleDisable() {
			if (nodecg.bundleConfig.youtubeUploadScriptPath) {
				this.$.uploadToggle.removeAttribute('disabled');
			} else {
				this.$.uploadToggle.setAttribute('disabled', 'true');
			}
		}

		_handleMiletoneTrackerToggleChange(e: Event) {
			if (!e.target) {
				return;
			}
			recordTrackerEnabled.value = Boolean((e.target as PaperToggleButtonElement).checked);
		}

		_handleUploadToggleChange(e: Event) {
			if (!e.target) {
				return;
			}
			autoUploadRecordings.value = Boolean((e.target as PaperToggleButtonElement).checked);
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).GdqMiscToggles = GdqMiscToggles;
});
