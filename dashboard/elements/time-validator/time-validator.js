"use strict";

Polymer({
  is: 'time-validator',
  // @ts-ignore
  behaviors: [Polymer.IronValidatorBehavior],

  validate(value) {
    // This regex validates incomplete times (by design)
    return !value || value.match(/^[0-9]{0,2}:[0-9]{0,2}$/);
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWUtdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxDQUFDO0FBQ1AsRUFBQSxFQUFFLEVBQUUsZ0JBREc7QUFHUDtBQUNBLEVBQUEsU0FBUyxFQUFFLENBQ1YsT0FBTyxDQUFDLHFCQURFLENBSko7O0FBUVAsRUFBQSxRQUFRLENBQUMsS0FBRCxFQUFjO0FBQ3JCO0FBQ0EsV0FBTyxDQUFDLEtBQUQsSUFBVSxLQUFLLENBQUMsS0FBTixDQUFZLHlCQUFaLENBQWpCO0FBQ0E7O0FBWE0sQ0FBRCxDQUFQIiwic291cmNlUm9vdCI6IiJ9