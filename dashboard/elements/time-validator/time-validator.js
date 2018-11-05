"use strict";
window.addEventListener('load', () => {
    Polymer({
        is: 'time-validator',
        // @ts-ignore
        behaviors: [
            Polymer.IronValidatorBehavior
        ],
        validate(value) {
            // This regex validates incomplete times (by design)
            return !value || value.match(/^[0-9]{0,2}:[0-9]{0,2}$/);
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS12YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aW1lLXZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDcEMsT0FBTyxDQUFDO1FBQ1AsRUFBRSxFQUFFLGdCQUFnQjtRQUVwQixhQUFhO1FBQ2IsU0FBUyxFQUFFO1lBQ1YsT0FBTyxDQUFDLHFCQUFxQjtTQUM3QjtRQUVELFFBQVEsQ0FBQyxLQUFhO1lBQ3JCLG9EQUFvRDtZQUNwRCxPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN6RCxDQUFDO0tBQ0QsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMifQ==