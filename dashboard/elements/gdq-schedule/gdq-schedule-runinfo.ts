import {Run, Runner} from '../../../src/types/Run';

export interface IGdqScheduleRuninfo extends Polymer.Element {
	notes: string;
	label: string;
	coop: boolean;
	releaseYear: string;
	console: string;
	estimate: string;
	category: string;
	name: string;
	originalValues: Partial<Run> | undefined;
	runners: (Runner | undefined)[];
	order: number;
	setRun(run: Run): void;
}

window.addEventListener('load', () => {
	const {customElement, property} = Polymer.decorators;

	@customElement('gdq-schedule-runinfo')
	class GdqScheduleRuninfo extends Polymer.Element implements IGdqScheduleRuninfo {
		@property({type: String, observer: GdqScheduleRuninfo.prototype._notesChanged})
		notes: string;

		@property({type: String, reflectToAttribute: true})
		label: string;

		@property({type: Boolean})
		coop: boolean;

		@property({type: String})
		releaseYear: string;

		@property({type: String})
		console: string;

		@property({type: String})
		estimate: string;

		@property({type: String})
		category: string;

		@property({type: String})
		name: string;

		@property({type: Object})
		originalValues: Partial<Run> | undefined;

		@property({type: Array})
		runners: (Runner | undefined)[];

		@property({type: Number})
		order: number;

		_notesChanged(newVal: string) {
			const notes = this.$.notes as HTMLElement;
			const valueDiv = notes.querySelector('.value') as HTMLDivElement;
			if (newVal) {
				valueDiv.innerHTML = newVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
			} else {
				valueDiv.innerHTML = '';
			}
		}

		setRun(run: Run) {
			this.name = run.name;
			this.console = run.console;
			this.runners = run.runners;
			this.releaseYear = String(run.releaseYear);
			this.estimate = run.estimate;
			this.category = run.category;
			this.order = run.order;
			this.notes = run.notes;
			this.coop = run.coop;
			this.originalValues = run.originalValues;
		}

		calcName(name: string | undefined) {
			if (name) {
				return name.split('\\n').join(' ');
			}

			return name;
		}

		calcModified(original: any) {
			return (original === undefined || original === null) ? '' : 'modified';
		}
	}

	// This assignment to window is unnecessary, but tsc complains that the class is unused without it.
	(window as any).GdqScheduleRuninfo = GdqScheduleRuninfo;
});
