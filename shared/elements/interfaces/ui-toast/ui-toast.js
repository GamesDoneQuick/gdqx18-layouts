import * as tslib_1 from "tslib";
window.addEventListener('load', () => {
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
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.UiToast = UiToast;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktdG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS10b2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBT0EsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDcEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBRXJEOzs7T0FHRztJQUVILElBQU0sT0FBTyxHQUFiLE1BQU0sT0FBUSxTQUFRLE9BQU8sQ0FBQyxPQUFPO1FBT3BDLGdCQUFnQixDQUFDLElBQVk7WUFDNUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUM3QixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQWtDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkQsQ0FBQztRQUVELGNBQWMsQ0FBQyxJQUFZO1lBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBZ0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqRCxDQUFDO0tBQ0QsQ0FBQTtJQWRBO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3NEQUNDO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO29EQUNEO0lBTG5CLE9BQU87UUFEWixhQUFhLENBQUMsVUFBVSxDQUFDO09BQ3BCLE9BQU8sQ0FnQlo7SUFFRCxtR0FBbUc7SUFDbEcsTUFBYyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUMifQ==