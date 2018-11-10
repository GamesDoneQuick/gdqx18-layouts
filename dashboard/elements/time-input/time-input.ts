export interface ITimeInput extends Polymer.Element {
	value: string;
	invalid: boolean;
	setMS(m: number, s: number): void;
}

Polymer({
	is: 'time-input',

	properties: {
		invalid: {
			reflectToAttribute: true,
			type: Boolean,
			value: false
		},

		value: {
			notify: true,
			type: String
		},

		_minutes: {
			type: Number
		},

		_seconds: {
			type: Number
		},

		validator: {
			type: String,
			value: 'time-validator'
		}
	},

	// @ts-ignore
	behaviors: [
		Polymer.IronValidatableBehavior
	],

	observers: [
		'_computeValue(_minutes,_seconds)'
	],

	setMS(m: number, s: number) {
		this._minutes = m < 10 ? `0${m}` : m;
		this._seconds = s < 10 ? `0${s}` : s;
	},

	_computeValue(minutes: number, seconds: number) {
		this.value = `${minutes}:${seconds}`;
	}
});
