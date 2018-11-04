var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    __decorate([
        property({ type: String })
    ], UiToast.prototype, "_successToastText", void 0);
    __decorate([
        property({ type: String })
    ], UiToast.prototype, "_errorToastText", void 0);
    UiToast = __decorate([
        customElement('ui-toast')
    ], UiToast);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.UiToast = UiToast;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktdG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS10b2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFPQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNwQyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFFckQ7OztPQUdHO0lBRUgsSUFBTSxPQUFPLEdBQWIsTUFBTSxPQUFRLFNBQVEsT0FBTyxDQUFDLE9BQU87UUFPcEMsZ0JBQWdCLENBQUMsSUFBWTtZQUM1QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzdCLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBa0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuRCxDQUFDO1FBRUQsY0FBYyxDQUFDLElBQVk7WUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFnQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pELENBQUM7S0FDRCxDQUFBO0lBZEE7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7c0RBQ0M7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7b0RBQ0Q7SUFMbkIsT0FBTztRQURaLGFBQWEsQ0FBQyxVQUFVLENBQUM7T0FDcEIsT0FBTyxDQWdCWjtJQUVELG1HQUFtRztJQUNsRyxNQUFjLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUNuQyxDQUFDLENBQUMsQ0FBQyJ9