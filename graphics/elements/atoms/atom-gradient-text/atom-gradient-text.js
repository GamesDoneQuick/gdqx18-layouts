import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtromGradientText = class AtromGradientText extends Polymer.Element {
    ready() {
        super.ready();
        // Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880
        this.shadowRoot.querySelectorAll('sc-fitted-text').forEach(node => {
            node.$.fittedContent.style.webkitBackgroundClip = 'text';
        });
    }
};
tslib_1.__decorate([
    property({ type: String })
], AtromGradientText.prototype, "text", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], AtromGradientText.prototype, "align", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtromGradientText.prototype, "maxWidth", void 0);
AtromGradientText = tslib_1.__decorate([
    customElement('atom-gradient-text')
], AtromGradientText);
export default AtromGradientText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1ncmFkaWVudC10ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXRvbS1ncmFkaWVudC10ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBVTdELEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFZCwrRUFBK0U7UUFDL0UsSUFBSSxDQUFDLFVBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqRSxJQUFZLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxDQUFDO1FBQ25FLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNELENBQUE7QUFoQkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7K0NBQ1o7QUFHYjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0RBQ3JDO0FBR2Q7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7bURBQ1I7QUFSRyxpQkFBaUI7SUFEckMsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0dBQ2YsaUJBQWlCLENBa0JyQztlQWxCb0IsaUJBQWlCIn0=