var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
    const { customElement, property } = Polymer.decorators;
    let GdqTimekeeperRunner = class GdqTimekeeperRunner extends Polymer.Element {
        calcRunnerStatus(results, index) {
            if (!results) {
                return;
            }
            if (results[index] && results[index].time) {
                return results[index].time.formatted;
            }
            return 'Running';
        }
        calcRunnerStatusClass(results, index) {
            if (!results) {
                return;
            }
            if (results[index] && !results[index].forfeit) {
                return 'finished';
            }
            return '';
        }
        calcFinishHidden(results, index) {
            if (!results) {
                return;
            }
            return results[index] && !results[index].forfeit;
        }
        calcResumeHidden(results, index) {
            if (!results) {
                return;
            }
            return !results[index];
        }
        calcForfeitHidden(results, index) {
            if (!results) {
                return;
            }
            return results[index] && results[index].forfeit;
        }
        calcEditDisabled(results, runnerIndex) {
            if (!results) {
                return;
            }
            return !results[runnerIndex];
        }
        finish() {
            nodecg.sendMessage('completeRunner', { index: this.index, forfeit: false });
        }
        forfeit() {
            nodecg.sendMessage('completeRunner', { index: this.index, forfeit: true });
        }
        resume() {
            nodecg.sendMessage('resumeRunner', this.index);
        }
        editTime() {
            this.dispatchEvent(new CustomEvent('edit-time', { bubbles: true, composed: true }));
        }
    };
    __decorate([
        property({ type: String })
    ], GdqTimekeeperRunner.prototype, "importPath", void 0);
    __decorate([
        property({ type: Number })
    ], GdqTimekeeperRunner.prototype, "index", void 0);
    __decorate([
        property({ type: Object })
    ], GdqTimekeeperRunner.prototype, "runner", void 0);
    __decorate([
        property({ type: Array })
    ], GdqTimekeeperRunner.prototype, "results", void 0);
    GdqTimekeeperRunner = __decorate([
        customElement('gdq-timekeeper-runner')
    ], GdqTimekeeperRunner);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqTimekeeperRunner = GdqTimekeeperRunner;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRpbWVrZWVwZXItcnVubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXRpbWVrZWVwZXItcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQWNBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUdyRCxJQUFNLG1CQUFtQixHQUF6QixNQUFNLG1CQUFvQixTQUFRLE9BQU8sQ0FBQyxPQUFPO1FBYWhELGdCQUFnQixDQUFDLE9BQTBCLEVBQUUsS0FBYTtZQUN6RCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNiLE9BQU87YUFDUDtZQUVELElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUU7Z0JBQzFDLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDckM7WUFFRCxPQUFPLFNBQVMsQ0FBQztRQUNsQixDQUFDO1FBRUQscUJBQXFCLENBQUMsT0FBMEIsRUFBRSxLQUFhO1lBQzlELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2IsT0FBTzthQUNQO1lBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFO2dCQUM5QyxPQUFPLFVBQVUsQ0FBQzthQUNsQjtZQUVELE9BQU8sRUFBRSxDQUFDO1FBQ1gsQ0FBQztRQUVELGdCQUFnQixDQUFDLE9BQTBCLEVBQUUsS0FBYTtZQUN6RCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNiLE9BQU87YUFDUDtZQUVELE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNsRCxDQUFDO1FBRUQsZ0JBQWdCLENBQUMsT0FBMEIsRUFBRSxLQUFhO1lBQ3pELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2IsT0FBTzthQUNQO1lBRUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBRUQsaUJBQWlCLENBQUMsT0FBMEIsRUFBRSxLQUFhO1lBQzFELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2IsT0FBTzthQUNQO1lBRUQsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNqRCxDQUFDO1FBRUQsZ0JBQWdCLENBQUMsT0FBMEIsRUFBRSxXQUFtQjtZQUMvRCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNiLE9BQU87YUFDUDtZQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELE1BQU07WUFDTCxNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUVELE9BQU87WUFDTixNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELE1BQU07WUFDTCxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELFFBQVE7WUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNuRixDQUFDO0tBQ0QsQ0FBQTtJQWxGQTtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzsyREFDTjtJQUduQjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztzREFDWDtJQUdkO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3VEQUNWO0lBR2Y7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7d0RBQ1k7SUFYL0IsbUJBQW1CO1FBRHhCLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztPQUNqQyxtQkFBbUIsQ0FvRnhCO0lBRUQsbUdBQW1HO0lBQ2xHLE1BQWMsQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUMzRCxDQUFDLENBQUMsQ0FBQyJ9