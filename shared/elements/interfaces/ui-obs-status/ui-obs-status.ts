const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('ui-obs-status')
export default class UiObsStatus extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	_namespaces: string[];
}
