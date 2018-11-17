import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let UiToast = class UiToast extends Polymer.Element {
    showSuccessToast(text) {
        this._successToastText = text;
        this.$.successToast.show();
    }
    showErrorToast(text) {
        this._errorToastText = text;
        this.$.errorToast.show();
    }
};
tslib_1.__decorate([
    property({ type: String })
], UiToast.prototype, "_successToastText", void 0);
tslib_1.__decorate([
    property({ type: String })
], UiToast.prototype, "_errorToastText", void 0);
UiToast = tslib_1.__decorate([
    customElement('ui-toast')
], UiToast);
export default UiToast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktdG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS10b2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLE9BQU8sR0FBNUIsTUFBcUIsT0FBUSxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBT25ELGdCQUFnQixDQUFDLElBQVk7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQWtDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFZO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBZ0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0NBQ0QsQ0FBQTtBQWRBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2tEQUNDO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2dEQUNEO0FBTEosT0FBTztJQUQzQixhQUFhLENBQUMsVUFBVSxDQUFDO0dBQ0wsT0FBTyxDQWdCM0I7ZUFoQm9CLE9BQU8ifQ==