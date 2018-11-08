const $toggle = document.getElementById('toggle');

if ($toggle) {
  const recordTrackerEnabled = nodecg.Replicant('recordTrackerEnabled');
  recordTrackerEnabled.on('change', newVal => {
    $toggle.checked = Boolean(newVal);
  });
  $toggle.addEventListener('change', e => {
    if (e && e.target) {
      recordTrackerEnabled.value = Boolean(e.target.checked);
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZC10cmFja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFULENBQXdCLFFBQXhCLENBQWhCOztBQUNBLElBQUksT0FBSixFQUFhO0FBQ1osUUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUF1QyxzQkFBdkMsQ0FBN0I7QUFFQSxFQUFBLG9CQUFvQixDQUFDLEVBQXJCLENBQXdCLFFBQXhCLEVBQWtDLE1BQU0sSUFBRztBQUMxQyxJQUFBLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLE9BQU8sQ0FBQyxNQUFELENBQXpCO0FBQ0EsR0FGRDtBQUlBLEVBQUEsT0FBTyxDQUFDLGdCQUFSLENBQXlCLFFBQXpCLEVBQW1DLENBQUMsSUFBRztBQUN0QyxRQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBWCxFQUFtQjtBQUNsQixNQUFBLG9CQUFvQixDQUFDLEtBQXJCLEdBQTZCLE9BQU8sQ0FBRSxDQUFDLENBQUMsTUFBRixDQUFzQyxPQUF4QyxDQUFwQztBQUNBO0FBQ0QsR0FKRDtBQUtBIiwic291cmNlUm9vdCI6IiJ9