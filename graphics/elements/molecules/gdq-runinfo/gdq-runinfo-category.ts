const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-runinfo-category')
export default class GdqRuninfoCategory extends Polymer.Element {
	@property({type: Number})
	maxTextWidth: number;

	@property({type: String})
	category: string;
}
