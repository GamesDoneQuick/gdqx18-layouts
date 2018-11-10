const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('atom-inner-glow-text')
export default class AtomInnerGlowText extends Polymer.Element {
	@property({type: String})
	text: string;
}
