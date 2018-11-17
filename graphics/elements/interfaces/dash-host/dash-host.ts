const {customElement, property} = Polymer.decorators;

@customElement('dash-host')
class DashHost extends Polymer.MutableData(Polymer.Element) {
	@property({type: String})
	currentTime: string;

	@property({type: Number})
	selectedBidsAndPrizesTab: number = 0;

	connectedCallback() {
		super.connectedCallback();
		this.updateCurrentTime = this.updateCurrentTime.bind(this);
		this.updateCurrentTime();
		setInterval(this.updateCurrentTime, 1000);
	}

	updateCurrentTime() {
		const date = new Date();
		this.currentTime = date.toLocaleTimeString('en-US', {hour12: true});
	}
}
