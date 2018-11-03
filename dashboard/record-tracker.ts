(function () {
	const $toggle = document.getElementById('toggle');
	if (!$toggle) {
		return
	}
	const recordTrackerEnabled = nodecg.Replicant<boolean>('recordTrackerEnabled');

	recordTrackerEnabled.on('change', newVal => {
		$toggle.checked = newVal;
	});

	$toggle.addEventListener('change', (e: MouseEvent) => {
		recordTrackerEnabled.value = e.target!.checked;
	});
})();
