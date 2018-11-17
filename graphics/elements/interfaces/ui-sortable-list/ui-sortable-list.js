import * as tslib_1 from "tslib";
import MapSortMixin from '../../../mixins/MapSortMixin';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 * @appliesMixin MapSortMixin
 */
let UiSortableListElement = class UiSortableListElement extends MapSortMixin(Polymer.MutableData(Polymer.Element)) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     * @appliesMixin MapSortMixin
     */
    constructor() {
        super(...arguments);
        this.replicantBundle = nodecg.bundleName;
        this.itemIdField = '';
        this.useSortMap = false;
        this._templatized = false;
    }
    static get observers() {
        return [
            '_updateSortFunction(useSortMap, itemIdField)'
        ];
    }
    ready() {
        super.ready();
        this._flashAddedNodes(this.shadowRoot, 'ui-sortable-list-item');
        this.$.replicant.addEventListener('value-changed', () => {
            if (this.useSortMap) {
                this._sortMapVal = this.$.replicant.value;
            }
            else {
                this._sortMapVal = null;
            }
        });
    }
    _computeActualItems(items, _itemsReplicantValue) {
        if (Array.isArray(items)) {
            return items;
        }
        return _itemsReplicantValue;
    }
    _ensureTemplatized() {
        if (!this._templatized) {
            this._templatized = true;
            const templateElement = this.querySelector('template[slot="item-body"]');
            if (templateElement) {
                this._itemTemplateClass = Polymer.Templatize.templatize(templateElement, this, {
                    forwardHostProp(prop, value) {
                        if (prop === 'item' || prop === 'index') {
                            return;
                        }
                        const items = Array.from(this.shadowRoot.querySelectorAll('ui-sortable-list-item'));
                        items.forEach(item => {
                            if (item._itemTemplateInstance) {
                                item._itemTemplateInstance.set(prop, value);
                            }
                        });
                    },
                    parentModel: true
                });
            }
        }
    }
    _moveItemUpPressed(event) {
        this._sendItemAction('moveItemUp', event);
    }
    _moveItemDownPressed(event) {
        this._sendItemAction('moveItemDown', event);
    }
    _sendItemAction(actionName, event) {
        nodecg.sendMessage(`sortable-list:${actionName}`, {
            replicantName: this.replicantName,
            replicantBundle: this.replicantBundle,
            itemIndex: event.model.index,
            itemId: this.itemIdField && event.model.item[this.itemIdField],
            itemIdField: this.itemIdField,
            useSortMap: this.useSortMap
        });
    }
    _updateSortFunction(useSortMap, itemIdField) {
        const repeat = this.$.repeat;
        if (useSortMap && itemIdField) {
            repeat.sort = this._createMapSort(itemIdField);
        }
        else {
            repeat.sort = null;
        }
    }
};
tslib_1.__decorate([
    property({ type: String })
], UiSortableListElement.prototype, "replicantName", void 0);
tslib_1.__decorate([
    property({ type: String })
], UiSortableListElement.prototype, "replicantBundle", void 0);
tslib_1.__decorate([
    property({ type: String })
], UiSortableListElement.prototype, "itemIdField", void 0);
tslib_1.__decorate([
    property({ type: Array })
], UiSortableListElement.prototype, "items", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], UiSortableListElement.prototype, "useSortMap", void 0);
tslib_1.__decorate([
    property({ type: Array, computed: '_computeActualItems(items, _itemsReplicantValue)' })
], UiSortableListElement.prototype, "_actualItems", void 0);
UiSortableListElement = tslib_1.__decorate([
    customElement('ui-sortable-list')
], UiSortableListElement);
export default UiSortableListElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc29ydGFibGUtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVpLXNvcnRhYmxlLWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLDhCQUE4QixDQUFDO0FBR3hELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7Ozs7R0FLRztBQUVILElBQXFCLHFCQUFxQixHQUExQyxNQUFxQixxQkFBc0IsU0FBUSxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFQckc7Ozs7O09BS0c7SUFDSDs7UUFNQyxvQkFBZSxHQUFXLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFHNUMsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFNekIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQVFwQixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQStFdkMsQ0FBQztJQTdFQSxNQUFNLEtBQUssU0FBUztRQUNuQixPQUFPO1lBQ04sOENBQThDO1NBQzlDLENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtZQUN2RCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFpQixDQUFDLEtBQUssQ0FBQzthQUNuRDtpQkFBTTtnQkFDTixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUN4QjtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUFt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