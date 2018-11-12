import * as tslib_1 from "tslib";
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
tslib_1.__decorate([
    property({ type: String })
], GdqTotalsTotal.prototype, "value", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqTotalsTotal.prototype, "currency", void 0);
GdqTotalsTotal = tslib_1.__decorate([
    customElement('gdq-totals-total')
], GdqTotalsTotal);
export default GdqTotalsTotal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRvdGFscy10b3RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS10b3RhbHMtdG90YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQixjQUFjLEdBQW5DLE1BQXFCLGNBQWUsU0FBUSxPQUFPLENBQUMsT0FBTztJQUQzRDs7UUFHQyxVQUFLLEdBQUcsR0FBRyxDQUFDO0lBWWIsQ0FBQztJQVBBLElBQUk7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsS0FBSyxDQUFDLENBQU0sRUFBRSxDQUFNO1FBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQixDQUFDO0NBQ0QsQ0FBQTtBQVpBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzZDQUNiO0FBR1o7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0RBQ1I7QUFMRyxjQUFjO0lBRGxDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztHQUNiLGNBQWMsQ0FjbEM7ZUFkb0IsY0FBYyJ9