"use strict";

window.addEventListener('load', function () {
  Polymer({
    is: 'time-validator',
    // @ts-ignore
    behaviors: [Polymer.IronValidatorBehavior],
    validate: function (value) {
      // This regex validates incomplete times (by design)
      return !value || value.match(/^[0-9]{0,2}:[0-9]{0,2}$/);
    }
  });
});