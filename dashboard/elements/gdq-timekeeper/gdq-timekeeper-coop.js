var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
    const { customElement, property } = Polymer.decorators;
    let GdqTimekeeperCoop = class GdqTimekeeperCoop extends Polymer.Element {
        calcRunnerStatus(results) {
            if (results[0]) {
                return results[0].time.formatted;
            }
            return 'Running';
        }
        calcRunnerStatusClass(results) {
            if (results[0] && !results[0].forfeit) {
                return 'finished';
            }
            return '';
        }
        calcFinishHidden(results) {
            return results[0] && !results[0].forfeit;
        }
        calcResumeHidden(results) {
            return !results[0];
        }
        calcForfeitHidden(results) {
            return results[0] && results[0].forfeit;
        }
        calcEditDisabled(results) {
            return !results[0];
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
        calcConcatenatedRunners(runners) {
            let concatenatedRunners = runners[0].name;
            if (runners.length > 1) {
                concatenatedRunners = runners.slice(1).reduce((prev, curr, index, array) => {
                    if (!curr || !curr.name) {
                        return prev;
                    }
                    if (index === array.length - 1) {
                        return `${prev} & ${curr.name}`;
                    }
                    return `${prev}, ${curr.name}`;
                }, concatenatedRunners);
            }
            return concatenatedRunners;
        }
    };
    __decorate([
        property({ type: String })
    ], GdqTimekeeperCoop.prototype, "importPath", void 0);
    __decorate([
        property({ type: Number })
    ], GdqTimekeeperCoop.prototype, "index", void 0);
    __decorate([
        property({ type: Array })
    ], GdqTimekeeperCoop.prototype, "runners", void 0);
    __decorate([
        property({ type: Array })
    ], GdqTimekeeperCoop.prototype, "results", void 0);
    GdqTimekeeperCoop = __decorate([
        customElement('gdq-timekeeper-coop')
    ], GdqTimekeeperCoop);
    // This assignment to window is unnecessary, but tsc complains that the class is unused without it.
    window.GdqTimekeeperCoop = GdqTimekeeperCoop;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRpbWVrZWVwZXItY29vcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS10aW1la2VlcGVyLWNvb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBYUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDcEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBR3JELElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWtCLFNBQVEsT0FBTyxDQUFDLE9BQU87UUFhOUMsZ0JBQWdCLENBQUMsT0FBMEI7WUFDMUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNqQztZQUVELE9BQU8sU0FBUyxDQUFDO1FBQ2xCLENBQUM7UUFFRCxxQkFBcUIsQ0FBQyxPQUEwQjtZQUMvQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RDLE9BQU8sVUFBVSxDQUFDO2FBQ2xCO1lBRUQsT0FBTyxFQUFFLENBQUM7UUFDWCxDQUFDO1FBRUQsZ0JBQWdCLENBQUMsT0FBMEI7WUFDMUMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzFDLENBQUM7UUFFRCxnQkFBZ0IsQ0FBQyxPQUEwQjtZQUMxQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxPQUEwQjtZQUMzQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3pDLENBQUM7UUFFRCxnQkFBZ0IsQ0FBQyxPQUEwQjtZQUMxQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUM7UUFFRCxNQUFNO1lBQ0wsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFFRCxPQUFPO1lBQ04sTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFFRCxNQUFNO1lBQ0wsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxRQUFRO1lBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkYsQ0FBQztRQUVELHVCQUF1QixDQUFDLE9BQWlCO1lBQ3hDLElBQUksbUJBQW1CLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixtQkFBbUIsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO29CQUMxRSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTt3QkFDeEIsT0FBTyxJQUFJLENBQUM7cUJBQ1o7b0JBRUQsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQy9CLE9BQU8sR0FBRyxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO3FCQUNoQztvQkFFRCxPQUFPLEdBQUcsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEMsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLENBQUM7YUFDeEI7WUFDRCxPQUFPLG1CQUFtQixDQUFDO1FBQzVCLENBQUM7S0FDRCxDQUFBO0lBNUVBO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3lEQUNOO0lBR25CO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO29EQUNYO0lBR2Q7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7c0RBQ047SUFHbEI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7c0RBQ1k7SUFYL0IsaUJBQWlCO1FBRHRCLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztPQUMvQixpQkFBaUIsQ0E4RXRCO0lBRUQsbUdBQW1HO0lBQ2xHLE1BQWMsQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztBQUN2RCxDQUFDLENBQUMsQ0FBQyJ9