var $toggle = document.getElementById('toggle');

if ($toggle) {
  var recordTrackerEnabled_1 = nodecg.Replicant('recordTrackerEnabled');
  recordTrackerEnabled_1.on('change', function (newVal) {
    $toggle.checked = Boolean(newVal);
  });
  $toggle.addEventListener('change', function (e) {
    if (e && e.target) {
      recordTrackerEnabled_1.value = Boolean(e.target.checked);
    }
  });
}