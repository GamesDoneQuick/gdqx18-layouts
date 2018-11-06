// @TODO: not sure how to make this work
const Random = (window as any).Random as Random;

window.addEventListener('load', () => {
	const NUM_BITS = 4;
	const {customElement, property} = Polymer.decorators;

	/**
	 * @customElement
	 * @polymer
	 */
	@customElement('atom-arrow-block')
	class AtomBinaryClock extends Polymer.Element {
		@property({type: Number, observer: AtomBinaryClock.prototype._updateHours})
		hours: number;

		@property({type: Number, observer: AtomBinaryClock.prototype._updateMinutes})
		minutes: number;

		@property({type: Number, observer: AtomBinaryClock.prototype._updateSeconds})
		seconds: number;

		@property({type: Number, observer: AtomBinaryClock.prototype._updateSeconds})
		milliseconds: number;

		@property({type: Boolean, reflectToAttribute: true})
		pulsating = false;

		@property({type: Boolean, reflectToAttribute: true, observer: AtomBinaryClock.prototype._randomizedChanged})
		randomized = false;

		_randomFlashingInterval: number | undefined;

		ready() {
			super.ready();
			const cells = Array.from(this.shadowRoot!.querySelectorAll('.cell'));

			[
				'hourOnes',
				'minuteTens',
				'minuteOnes',
				'secondTens',
				'secondOnes',
				'millisecondHundredths'
			].forEach((columnName, index) => {
				const offset = index * NUM_BITS;
				this[`_$${columnName}Cells`] = cells.slice(offset, offset + NUM_BITS);
			});
		}

		startRandomFlashing() {
			if ((window as any).__SCREENSHOT_TESTING__) {
				return;
			}

			if (this._randomFlashingInterval) {
				return this._randomFlashingInterval;
			}

			this._randomFlashingInterval = setInterval(() => {
				this.flashRandomCell();
			}, 100);
			return this._randomFlashingInterval;
		}

		stopRandomFlashing() {
			const cells = Array.from(this.shadowRoot!.querySelectorAll('.cell--flash'));
			cells.forEach(cell => cell.classList.remove('cell--flash'));
			clearInterval(this._randomFlashingInterval);
			this._randomFlashingInterval = undefined;
		}

		flashRandomCell() {
			const availableCells = Array.from(this.shadowRoot!.querySelectorAll('.cell:not(.cell--flash)'));
			if (availableCells.length === 0) {
				return;
			}

			const cell = Random.pick(Random.engines.browserCrypto, availableCells);
			cell.classList.add('cell--flash');
			setTimeout(() => {
				cell.classList.remove('cell--flash', 'cell--on');
			}, 450);
		}

		_updateHours() {
			this._setColumn(numberPlace(this.hours, 1), this._$hourOnesCells);
		}

		_updateMinutes() {
			this._setColumn(numberPlace(this.minutes, 10), this._$minuteTensCells);
			this._setColumn(numberPlace(this.minutes, 1), this._$minuteOnesCells);
		}

		_updateSeconds() {
			this._setColumn(numberPlace(this.seconds, 10), this._$secondTensCells);
			this._setColumn(numberPlace(this.seconds, 1), this._$secondOnesCells);
		}

		_updateMilliseconds() {
			this._setColumn(numberPlace(this.milliseconds, 100), this._$millisecondHundredthsCells);
		}

		_randomizedChanged(newVal: boolean) {
			if (newVal) {
				this.startRandomFlashing();
			} else {
				this.stopRandomFlashing();
			}
		}

		_setColumn(num: number, cells) {
			num
				.toString(2)
				.padStart(NUM_BITS, '0')
				.split('')
				.forEach((oneOrZero, index) => {
					const on = oneOrZero === '1';
					cells[index].classList.toggle('cell--on', on);
				});
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).AtomBinaryClock = AtomBinaryClock;

	function numberPlace(num: number, place: number) {
		if (typeof place !== 'number') {
			throw new Error('must provide a place and it must be a number');
		}

		if (place === 1) {
			return num % 10;
		}

		return Math.floor(num / place);
	}
});
