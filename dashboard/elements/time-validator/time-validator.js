"use strict";

window.addEventListener('load', () => {
  Polymer({
    is: 'time-validator',
    // @ts-ignore
    behaviors: [Polymer.IronValidatorBehavior],

    validate(value) {
      // This regex validates incomplete times (by design)
      return !value || value.match(/^[0-9]{0,2}:[0-9]{0,2}$/);
    }

  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWUtdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLE1BQUs7QUFDcEMsRUFBQSxPQUFPLENBQUM7QUFDUCxJQUFBLEVBQUUsRUFBRSxnQkFERztBQUdQO0FBQ0EsSUFBQSxTQUFTLEVBQUUsQ0FDVixPQUFPLENBQUMscUJBREUsQ0FKSjs7QUFRUCxJQUFBLFFBQVEsQ0FBQyxLQUFELEVBQWM7QUFDckI7QUFDQSxhQUFPLENBQUMsS0FBRCxJQUFVLEtBQUssQ0FBQyxLQUFOLENBQVkseUJBQVosQ0FBakI7QUFDQTs7QUFYTSxHQUFELENBQVA7QUFhQSxDQWREIiwic291cmNlUm9vdCI6IiJ9