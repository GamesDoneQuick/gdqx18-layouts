import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let GdqRunEditor = class GdqRunEditor extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.showingOriginal = false;
    }
    loadRun(run) {
        this.name = run.name;
        this.category = run.category;
        this.estimate = run.estimate;
        this.console = run.console;
        this.releaseYear = String(run.releaseYear);
        this.runners = run.runners.map(runner => {
            if (runner) {
                return { name: runner.name, stream: runner.stream };
            }
            return;
        });
        this.coop = run.coop;
        this.originalValues = run.originalValues;
        this.pk = run.pk;
    }
    applyChanges() {
        // We have to build a new runners object.
        const runners = [];
        const runnerNameInputs = this.$.runners.querySelectorAll('paper-input[label^="Runner"]:not([disabled])');
        const runnerStreamInputs = this.$.runners.querySelectorAll('paper-input[label="Twitch Channel"]:not([disabled])');
        for (let i = 0; i < 4; i++) {
            if (runnerNameInputs[i].value || runnerStreamInputs[i].value) {
                runners[i] = {
                    name: runnerNameInputs[i].value,
                    stream: runnerStreamInputs[i].value
                };
            }
        }
        nodecg.sendMessage('modifyRun', {
            name: this.name,
            category: this.category,
            estimate: this.estimate,
            console: this.console,
            releaseYear: this.releaseYear,
            coop: this.coop,
            runners,
            pk: this.pk
        }, () => {
            const dialog = this.closest('paper-dialog');
            if (dialog) {
                dialog.close();
            }
        });
    }
    resetRun() {
        nodecg.sendMessage('resetRun', this.pk, () => {
            const dialog = this.closest('paper-dialog');
            if (dialog) {
                dialog.close();
            }
        });
    }
    calcHide(path, showingOriginal) {
        const originalPath = path.split('.').slice(0);
        originalPath.unshift('originalValues');
        const originalValue = this.get(originalPath);
        const hasOriginal = originalValue !== undefined;
        return showingOriginal && hasOriginal;
    }
    showOriginal() {
        this.showingOriginal = true;
    }
    hideOriginal() {
        this.showingOriginal = false;
    }
    _moveRunnerDown(e) {
        const target = e.target;
        if (!target) {
            return;
        }
        const rowDiv = target.closest('[data-index]');
        if (!rowDiv) {
            return;
        }
        const index = parseInt(String(rowDiv.getAttribute('data-index')), 10);
        this.runners = this._moveRunner(this.runners, index, 'down');
    }
    _moveRunnerUp(e) {
        const target = e.target;
        if (!target) {
            return;
        }
        const rowDiv = target.closest('[data-index]');
        if (!rowDiv) {
            return;
        }
        const index = parseInt(String(rowDiv.getAttribute('data-index')), 10);
        this.runners = this._moveRunner(this.runners, index, 'up');
    }
    /**
     * Moves a runner up or down in the runners array.
     * @param runnersArray - The array of runners to base these changes on.
     * @param index - The index of the runner to move in the array.
     * @param direction - Which direction to move the runner in.
     * @returns An array of runners with the desired runner re-arrangement applied to it.
     */
    _moveRunner(runnersArray, index, direction) {
        if (isNaN(index)) {
            throw new Error(`Index must be a number, got "${index}" which is a "${typeof index}"`);
        }
        if (index < 0 || index >= 4) {
            throw new Error(`Index must be >= 0 and < 4, got "${index}"`);
        }
        const newRunnersArray = runnersArray.slice(0);
        while (newRunnersArray.length < 4) {
            newRunnersArray.push(undefined);
        }
        const runnerToMove = newRunnersArray.splice(index, 1)[0];
        newRunnersArray.splice(index + (direction === 'up' ? -1 : 1), 0, runnerToMove);
        return newRunnersArray.slice(0, 4);
    }
};
tslib_1.__decorate([
    property({ type: Boolean })
], GdqRunEditor.prototype, "showingOriginal", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GdqRunEditor.prototype, "coop", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqRunEditor.prototype, "releaseYear", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqRunEditor.prototype, "console", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqRunEditor.prototype, "estimate", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqRunEditor.prototype, "category", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqRunEditor.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GdqRunEditor.prototype, "originalValues", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GdqRunEditor.prototype, "runners", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GdqRunEditor.prototype, "pk", void 0);
GdqRunEditor = tslib_1.__decorate([
    customElement('gdq-run-editor')
], GdqRunEditor);
export default GdqRunEditor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bi1lZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtcnVuLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBR3JELElBQXFCLFlBQVksR0FBakMsTUFBcUIsWUFBYSxTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUQ5RTs7UUFHQyxvQkFBZSxHQUFHLEtBQUssQ0FBQztJQThKekIsQ0FBQztJQWpJQSxPQUFPLENBQUMsR0FBUTtRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2QyxJQUFJLE1BQU0sRUFBRTtnQkFDWCxPQUFPLEVBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQzthQUNsRDtZQUVELE9BQU87UUFDUixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUM7UUFDekMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFB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