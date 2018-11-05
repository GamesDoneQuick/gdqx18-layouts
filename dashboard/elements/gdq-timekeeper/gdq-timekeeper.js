var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
    const { customElement, property } = Polymer.decorators;
    const stopwatch = nodecg.Replicant('stopwatch');
    const currentRun = nodecg.Replicant('currentRun');
    const checklistComplete = nodecg.Replicant('checklistComplete');
    let GdqTimekeeper = class GdqTimekeeper extends Polymer.Element {
        constructor() {
            super(...arguments);
            this.checklistIncomplete = true;
        }
        ready() {
            super.ready();
            stopwatch.on('change', this.stopwatchChanged.bind(this));
            currentRun.on('change', newVal => {
                if (!newVal) {
                    return;
                }
                const runners = newVal.runners.slice(0);
                runners.length = 4;
                for (let i = 0; i < 4; i++) {
                    runners[i] = runners[i] || false;
                }
                this.runners = runners;
                this.coop = newVal.coop;
            });
            checklistComplete.on('change', newVal => {
                this.checklistIncomplete = !newVal;
            });
        }
        stopwatchChanged(newVal) {
            if (!newVal) {
                return;
            }
            this.state = newVal.state;
            this.time = newVal.time.formatted;
            this.results = newVal.results.slice(0);
            this.notStarted = newVal.state === 'not_started';
            this.paused = newVal.state === 'paused';
        }
        confirmReset() {
            this.$.resetDialog.open();
        }
        startTimer() {
            nodecg.sendMessage('startTimer');
        }
        stopTimer() {
            nodecg.sendMessage('stopTimer');
        }
        resetTimer() {
            nodecg.sendMessage('resetTimer');
        }
        calcStartDisabled(checklistIncomplete, state) {
            return checklistIncomplete || state === 'running' || state === 'finished';
        }
        calcStartText(state) {
            switch (state) {
                case 'paused':
                    return 'Resume';
                default:
                    return 'Start';
            }
        }
        calcPauseDisabled(state) {
            return state !== 'running';
        }
        editMasterTime() {
            this.$['editDialog-text'].textContent = 'Enter a new master time.';
            this.$.editDialog.setAttribute('data-index', 'master');
            this.$['editDialog-input'].value = this.time;
            this.$.editDialog.open();
        }
        saveEditedTime() {
            const inputEl = this.$['editDialog-input'];
            nodecg.sendMessage('editTime', {
                index: this.$.editDialog.getAttribute('data-index'),
                newTime: inputEl.value
            });
            inputEl.value = '';
        }
        editRunnerTime(e) {
            const model = e.model;
            this.$['editDialog-text'].innerHTML = `Enter a new final time for <b>${model.runner.name}.</b>`;
            this.$.editDialog.setAttribute('data-index', model.index);
            const result = this.results[model.index];
            if (result) {
                this.$['editDialog-input'].value = result.time.formatted;
                this.$.editDialog.open();
            }
        }
        editCoopTime() {
            this.$['editDialog-text'].innerHTML = 'Enter a new final time for <b>all runners.</b>';
            this.$.editDialog.setAttribute('data-index', '0');
            const result = this.results[0];
            if (result) {
                this.$['editDialog-input'].value = result.time.formatted;
                this.$.editDialog.open();
            }
        }
    };
    __decorate([
        property({ type: Boolean, reflectToAttribute: true })
    ], GdqTimekeeper.prototype, "checklistIncomplete", void 0);
    __decorate([
        property({ type: String, reflectToAttribute: true })
    ], GdqTimekeeper.prototype, "state", void 0);
    __decorate([
        property({ type: Boolean, reflectToAttribute: true })
    ], GdqTimekeeper.prototype, "paused", void 0);
    __decorate([
        property({ type: Array })
    ], GdqTimekeeper.prototype, "results", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqTimekeeper.prototype, "coop", void 0);
    __decorate([
        property({ type: Boolean })
    ], GdqTimekeeper.prototype, "notStarted", void 0);
    __decorate([
        property({ type: Array })
    ], GdqTimekeeper.prototype, "runners", void 0);
    __decorate([
        property({ type: String })
    ], GdqTimekeeper.prototype, "time", void 0);
    GdqTimekeeper = __decorate([
        customElement('gdq-timekeeper')
    ], GdqTimekeeper);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqTimekeeper = GdqTimekeeper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRpbWVrZWVwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtdGltZWtlZXBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFNQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNwQyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDckQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztJQUMzRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFhLFlBQVksQ0FBQyxDQUFDO0lBQzlELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBb0IsbUJBQW1CLENBQUMsQ0FBQztJQUduRixJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFjLFNBQVEsT0FBTyxDQUFDLE9BQU87UUFEM0M7O1lBR0Msd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBOEg1QixDQUFDO1FBdkdBLEtBQUs7WUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZCxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekQsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1osT0FBTztpQkFDUDtnQkFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzNC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