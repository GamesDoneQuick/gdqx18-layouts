"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
    const { customElement, property } = Polymer.decorators;
    let GdqTotalsTotal = class GdqTotalsTotal extends Polymer.Element {
        constructor() {
            super(...arguments);
            this.value = '?';
        }
        edit() {
            this.dispatchEvent(new CustomEvent('edit', { bubbles: true, composed: true }));
        }
        equal(a, b) {
            return a === b;
        }
    };
    __decorate([
        property({ type: String })
    ], GdqTotalsTotal.prototype, "value", void 0);
    __decorate([
        property({ type: String })
    ], GdqTotalsTotal.prototype, "currency", void 0);
    GdqTotalsTotal = __decorate([
        customElement('gdq-totals-total')
    ], GdqTotalsTotal);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqTotalsTotal = GdqTotalsTotal;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRvdGFscy10b3RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS10b3RhbHMtdG90YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUdyRCxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFlLFNBQVEsT0FBTyxDQUFDLE9BQU87UUFENUM7O1lBR0MsVUFBSyxHQUFHLEdBQUcsQ0FBQztRQVliLENBQUM7UUFQQSxJQUFJO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVELEtBQUssQ0FBQyxDQUFNLEVBQUUsQ0FBTTtZQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEIsQ0FBQztLQUNELENBQUE7SUFaQTtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztpREFDYjtJQUdaO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO29EQUNSO0lBTFosY0FBYztRQURuQixhQUFhLENBQUMsa0JBQWtCLENBQUM7T0FDNUIsY0FBYyxDQWNuQjtJQUVELG1HQUFtRztJQUNsRyxNQUFjLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUNqRCxDQUFDLENBQUMsQ0FBQyJ9