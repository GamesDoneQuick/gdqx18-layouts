/// <reference path="../bower_components/paper-toggle-button/paper-toggle-button.d.ts" />
(() => {
	const $toggle = document.getElementById('toggle') as PaperToggleButtonElement;
	if (!$toggle) {
		return;
	}
	const recordTrackerEnabled = nodecg.Replicant<boolean>('recordTrackerEnabled');

	recordTrackerEnabled.on('change', newVal => {
		$toggle.checked = Boolean(newVal);
	});

	$toggle.addEventListener('change', e => {
		if (e && e.target) {
			recordTrackerEnabled.value = Boolean((e.target as PaperToggleButtonElement).checked);
		}
	});
})();
