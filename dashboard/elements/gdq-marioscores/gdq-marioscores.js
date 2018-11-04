var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
window.addEventListener('load', () => {
    const { customElement, property } = Polymer.decorators;
    const scoresRep = nodecg.Replicant('scores');
    let GdqMarioScores = class GdqMarioScores extends Polymer.Element {
        ready() {
            super.ready();
            scoresRep.on('change', newVal => {
                if (newVal) {
                    this.scores = newVal;
                }
            });
        }
        _scoreInputChanged(e) {
            if (!scoresRep.value || !e.target) {
                return;
            }
            const target = e.target;
            const teamIndex = parseInt(String(target.getAttribute('data-team-index')), 10);
            const val = parseInt(String(target.value), 10);
            if (typeof val === 'number' && !isNaN(val)) {
                scoresRep.value[teamIndex] = val;
            }
        }
    };
    __decorate([
        property({ type: Object })
    ], GdqMarioScores.prototype, "scores", void 0);
    GdqMarioScores = __decorate([
        customElement('gdq-marioscores')
    ], GdqMarioScores);
    // I don't need this but tsc complains that GdqMarioScores is unused without it.
    window.GdqMarioScores = GdqMarioScores;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW1hcmlvc2NvcmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW1hcmlvc2NvcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUNyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFTLFFBQVEsQ0FBQyxDQUFDO0lBR3JELElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWUsU0FBUSxPQUFPLENBQUMsT0FBTztRQUkzQyxLQUFLO1lBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQy9CLElBQUksTUFBTSxFQUFFO29CQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2lCQUNyQjtZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVELGtCQUFrQixDQUFDLENBQVE7WUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUNsQyxPQUFPO2FBQ1A7WUFFRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBMkIsQ0FBQztZQUM3QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9FLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUNqQztRQUNGLENBQUM7S0FDRCxDQUFBO0lBdkJBO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2tEQUNWO0lBRlYsY0FBYztRQURuQixhQUFhLENBQUMsaUJBQWlCLENBQUM7T0FDM0IsY0FBYyxDQXlCbkI7SUFFRCxnRkFBZ0Y7SUFDL0UsTUFBYyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDakQsQ0FBQyxDQUFDLENBQUMifQ==