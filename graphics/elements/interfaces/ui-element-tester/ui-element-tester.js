import * as tslib_1 from "tslib";
var UiElementTesterElement_1;
const { customElement } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let UiElementTesterElement = UiElementTesterElement_1 = class UiElementTesterElement extends Polymer.Element {
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
            input.type = UiElementTesterElement_1.calcPropertyInputType(property.type);
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
            const input = UiElementTesterElement_1.createPropertyInput(element, propName, propDecl);
            this.$.controls.appendChild(input);
        });
    }
    _removeInputs() {
        this.$.controls.innerHTML = '';
    }
};
UiElementTesterElement = UiElementTesterElement_1 = tslib_1.__decorate([
    customElement('ui-element-tester')
], UiElementTesterElement);
export default UiElementTesterElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktZWxlbWVudC10ZXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS1lbGVtZW50LXRlc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRTNDOzs7R0FHRztBQUVILElBQXFCLHNCQUFzQiw4QkFBM0MsTUFBcUIsc0JBQXVCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFHbEUsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFlBQWlCO1FBQzdDLFFBQVEsWUFBWSxFQUFFO1lBQ3JCLEtBQUssTUFBTTtnQkFDVixPQUFPLE1BQU0sQ0FBQztZQUNmLEtBQUssTUFBTTtnQkFDVixPQUFPLFFBQVEsQ0FBQztZQUNqQixLQUFLLE9BQU87Z0JBQ1gsT0FBTyxVQUFVLENBQUM7WUFDbkI7Z0JBQ0MsT0FBTyxNQUFNLENBQUM7U0FDZjtJQUNGLENBQUM7SUFFRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBd0IsRUFBRSxZQUFvQixFQUFFLFFBQWE7UUFDdkYsSUFBSSxLQUFtRCxDQUFDO1FBQ3hELElBQUksV0FBMkIsQ0FBQztRQUVoQyxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO1FBQ3ZELElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFO1lBQzNCLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUE2QixDQUFDO1lBRWxGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUF3QixDQUFDO1lBQy9FLE9BQU8sQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFFckIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBaUIsRUFBRSxFQUFFO2dCQUN6RCxNQUFNLElBQUks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