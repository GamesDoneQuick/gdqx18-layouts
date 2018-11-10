const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('atom-greeble')
export default class AtomGreeble extends Polymer.Element {
	@property({type: String, reflectToAttribute: true})
	align: 'left' | 'right' = 'left';
}
