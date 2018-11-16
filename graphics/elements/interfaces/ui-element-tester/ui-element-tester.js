import * as tslib_1 from "tslib";
var UiElementTester_1;
const { customElement } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let UiElementTester = UiElementTester_1 = class UiElementTester extends Polymer.Element {
    static calcPropertyInputType(propertyType) {
        switch (propertyType) {
            case String:
                return 'text';
            case Number:
                return 'number';
            case Boolean:
                return 'checkbox';
            default:
                return 'text';
        }
    }
    static createPropertyInput(element, propertyName, property) {
        let input;
        let valuePrefix;
        const elementTesterOpts = property.elementTester || {};
        if (elementTesterOpts.enum) {
            input = document.createElement('paper-dropdown-menu');
            const listBox = document.createElement('paper-listbox');
            listBox.slot = 'dropdown-content';
            listBox.selected = 0;
            property.elementTester.enum.forEach((allowedValue) => {
                const item = document.createElement('paper-item');
                item.value = allowedValue;
                item.innerText = allowedValue;
                listBox.appendChild(item);
            });
            input.appendChild(listBox);
        }
        else {
            input = document.createElement('paper-input');
            input.type = UiElementTester_1.calcPropertyInputType(property.type);
            if (elementTesterOpts.type) {
                input.type = property.elementTester.type;
            }
            if (input.type === 'color' || input.type === 'checkbox') {
                valuePrefix = document.createElement('div');
                valuePrefix.classList.add('prefix');
                valuePrefix.classList.add(`prefix-${input.type}`);
                valuePrefix.slot = 'prefix';
                valuePrefix.setAttribute('prefix', 'true');
                valuePrefix.innerText = property.value;
                input.appendChild(valuePrefix);
            }
            if (input.type === 'checkbox') {
                input.alwaysFloatLabel = true;
                input.addEventListener('click', () => {
                    input.value = !input.value;
                });
            }
            input.setAttribute('type', input.type);
        }
        input.label = propertyName;
        input.value = property.value;
        input.classList.add('control');
        input.addEventListener('value-changed', (e) => {
            const detail = e.detail;
            const target = e.target;
            let newValue = detail.value;
            if (target.type === 'number') {
                newValue = parseFloat(newValue);
            }
            else if (target.type === 'checkbox') {
                if (newValue === 'false') {
                    newValue = false;
                }
                else if (newValue === 'true') {
                    newValue = true;
                }
                newValue = Boolean(newValue);
            }
            if (valuePrefix) {
                valuePrefix.innerText = newValue;
            }
            element[propertyName] = newValue;
        });
        return input;
    }
    ready() {
        super.ready();
        this._elementSlotObserver = new Polymer.FlattenedNodesObserver(this.$.elementSlot, (_target, info) => {
            this._removeInputs();
            const firstElementNode = info.addedNodes.find(addedNode => addedNode.nodeName !== '#text');
            if (firstElementNode) {
                Polymer.RenderStatus.beforeNextRender(this, () => {
                    this._attachToElement(firstElementNode);
                });
            }
        });
    }
    _attachToElement(element) {
        const props = Object.entries(element.constructor.properties)
            .filter(arr => {
            const propDecl = arr[1];
            return !propDecl.readOnly &&
                !propDecl.computed &&
                typeof propDecl.value !== 'function';
        });
        props.forEach(([propName, propDecl]) => {
            const input = UiElementTester_1.createPropertyInput(element, propName, propDecl);
            this.$.controls.appendChild(input);
        });
    }
    _removeInputs() {
        this.$.controls.innerHTML = '';
    }
};
UiElementTester = UiElementTester_1 = tslib_1.__decorate([
    customElement('ui-element-tester')
], UiElementTester);
export default UiElementTester;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktZWxlbWVudC10ZXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS1lbGVtZW50LXRlc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRTNDOzs7R0FHRztBQUVILElBQXFCLGVBQWUsdUJBQXBDLE1BQXFCLGVBQWdCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFHM0QsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFlBQWlCO1FBQzdDLFFBQVEsWUFBWSxFQUFFO1lBQ3JCLEtBQUssTUFBTTtnQkFDVixPQUFPLE1BQU0sQ0FBQztZQUNmLEtBQUssTUFBTTtnQkFDVixPQUFPLFFBQVEsQ0FBQztZQUNqQixLQUFLLE9BQU87Z0JBQ1gsT0FBTyxVQUFVLENBQUM7WUFDbkI7Z0JBQ0MsT0FBTyxNQUFNLENBQUM7U0FDZjtJQUNGLENBQUM7SUFFRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBd0IsRUFBRSxZQUFvQixFQUFFLFFBQWE7UUFDdkYsSUFBSSxLQUFtRCxDQUFDO1FBQ3hELElBQUksV0FBMkIsQ0FBQztRQUVoQyxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO1FBQ3ZELElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFO1lBQzNCLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUE2QixDQUFDO1lBRWxGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUF3QixDQUFDO1lBQy9FLE9BQU8sQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFFckIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBaUIsRUFBRSxFQUFFO2dCQUN6RCxNQUFNLElBQUksR0FB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