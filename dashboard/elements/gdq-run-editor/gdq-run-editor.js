var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
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
    __decorate([
        property({ type: Boolean })
    ], GdqRunEditor.prototype, "showingOriginal", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqRunEditor.prototype, "coop", void 0);
    __decorate([
        property({ type: String })
    ], GdqRunEditor.prototype, "releaseYear", void 0);
    __decorate([
        property({ type: String })
    ], GdqRunEditor.prototype, "console", void 0);
    __decorate([
        property({ type: String })
    ], GdqRunEditor.prototype, "estimate", void 0);
    __decorate([
        property({ type: String })
    ], GdqRunEditor.prototype, "category", void 0);
    __decorate([
        property({ type: String })
    ], GdqRunEditor.prototype, "name", void 0);
    __decorate([
        property({ type: Object })
    ], GdqRunEditor.prototype, "originalValues", void 0);
    __decorate([
        property({ type: Array })
    ], GdqRunEditor.prototype, "runners", void 0);
    __decorate([
        property({ type: Number })
    ], GdqRunEditor.prototype, "pk", void 0);
    GdqRunEditor = __decorate([
        customElement('gdq-run-editor')
    ], GdqRunEditor);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqRunEditor = GdqRunEditor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bi1lZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtcnVuLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFpQkEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDcEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBR3JELElBQU0sWUFBWSxHQUFsQixNQUFNLFlBQWEsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFEL0Q7O1lBR0Msb0JBQWUsR0FBRyxLQUFLLENBQUM7UUE4SnpCLENBQUM7UUFqSUEsT0FBTyxDQUFDLEdBQVE7WUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3ZDLElBQUksTUFBTSxFQUFFO29CQUNYLE9BQU8sRUFBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDO2lCQUNsRDtnQkFFRCxPQUFPO1lBQ1IsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFH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