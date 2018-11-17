import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashLowerthirdNameInput = class DashLowerthirdNameInput extends Polymer.Element {
    ready() {
        super.ready();
        const nameElem = this.$.name;
        nameElem.$.input.style.fontSize = '24px';
        nameElem.$.input.style.height = '45px';
        nameElem.$.toggleIcon.style.height = '100%';
        nameElem.$.toggleIcon.style.padding = '0';
        nameElem.$.clearIcon.style.height = '100%';
        nameElem.$.clearIcon.style.padding = '0';
    }
    clear() {
        const nameElem = this.$.name;
        nameElem.value = '';
        nameElem.value = '';
    }
};
tslib_1.__decorate([
    property({ type: String, notify: true })
], DashLowerthirdNameInput.prototype, "selectedItem", void 0);
tslib_1.__decorate([
    property({ type: String, notify: true })
], DashLowerthirdNameInput.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: String, notify: true })
], DashLowerthirdNameInput.prototype, "title", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashLowerthirdNameInput.prototype, "disabled", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashLowerthirdNameInput.prototype, "items", void 0);
DashLowerthirdNameInput = tslib_1.__decorate([
    customElement('dash-lowerthird-name-input')
], DashLowerthirdNameInput);
export default DashLowerthirdNameInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1sb3dlcnRoaXJkLW5hbWUtaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWxvd2VydGhpcmQtbmFtZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBR3JELElBQXFCLHVCQUF1QixHQUE1QyxNQUFxQix1QkFBd0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQWdCbkUsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBVyxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzVDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQzFDLENBQUM7SUFFRCxLQUFLO1FBQ0osTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFXLENBQUM7UUFDcEMsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDcEIsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztDQUNELENBQUE7QUE5QkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzs2REFDbEI7QUFHckI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztxREFDMUI7QUFHYjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO3NEQUN6QjtBQUdkO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO3lEQUNSO0FBR2xCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO3NEQUNSO0FBZEksdUJBQXVCO0lBRDNDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQztHQUN2Qix1QkFBdUIsQ0FnQzNDO2VBaENvQix1QkFBdUIifQ==