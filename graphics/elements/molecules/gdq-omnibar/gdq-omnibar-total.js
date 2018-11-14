import * as tslib_1 from "tslib";
const { customElement } = Polymer.decorators;
const total = nodecg.Replicant('total');
let GdqOmnibarTotal = class GdqOmnibarTotal extends Polymer.Element {
    ready() {
        super.ready();
        const totalTextAmountElem = this.$.totalTextAmount;
        totalTextAmountElem.displayValueTransform = this._totalDisplayValueTransform.bind(this);
        total.on('change', newVal => {
            totalTextAmountElem.value = newVal.raw;
        });
    }
    _totalDisplayValueTransform(displayValue) {
        const formatted = displayValue.toLocaleString('en-US', {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        }).replace(/1/ig, '\u00C0');
        // Part of the workaround for https://bugs.chromium.org/p/chromium/issues/detail?id=67029
        this.$.totalTextAmountPlaceholder.textContent = formatted;
        return formatted;
    }
};
GdqOmnibarTotal = tslib_1.__decorate([
    customElement('gdq-omnibar-total')
], GdqOmnibarTotal);
export default GdqOmnibarTotal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItdG90YWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtb21uaWJhci10b3RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDM0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBUSxPQUFPLENBQUMsQ0FBQztBQUcvQyxJQUFxQixlQUFlLEdBQXBDLE1BQXFCLGVBQWdCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFDM0QsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFxQyxDQUFDO1FBQ3pFLG1CQUFtQixDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEYsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDM0IsbUJBQW1CLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsMkJBQTJCLENBQUMsWUFBb0I7UUFDL0MsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7WUFDdEQscUJBQXFCLEVBQUUsQ0FBQztZQUN4QixxQkFBcUIsRUFBRSxDQUFDO1NBQ3hCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTVCLHlGQUF5RjtRQUN6RixJQUFJLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFFMUQsT0FBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztDQUNELENBQUE7QUFyQm9CLGVBQWU7SUFEbkMsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0dBQ2QsZUFBZSxDQXFCbkM7ZUFyQm9CLGVBQWUifQ==