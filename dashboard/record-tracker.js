"use strict";
/// <reference path="../bower_components/paper-toggle-button/paper-toggle-button.d.ts" />
(() => {
    const $toggle = document.getElementById('toggle');
    if (!$toggle) {
        return;
    }
    const recordTrackerEnabled = nodecg.Replicant('recordTrackerEnabled');
    recordTrackerEnabled.on('change', newVal => {
        $toggle.checked = Boolean(newVal);
    });
    $toggle.addEventListener('change', e => {
        if (e && e.target) {
            recordTrackerEnabled.value = Boolean(e.target.checked);
        }
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLXRyYWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWNvcmQtdHJhY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUZBQXlGO0FBQ3pGLENBQUMsR0FBRyxFQUFFO0lBQ0wsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQTZCLENBQUM7SUFDOUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNiLE9BQU87S0FDUDtJQUNELE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxzQkFBc0IsQ0FBQyxDQUFDO0lBRS9FLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDMUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDbEIsb0JBQW9CLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBRSxDQUFDLENBQUMsTUFBbUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyRjtJQUNGLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9