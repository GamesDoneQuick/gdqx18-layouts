var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(() => {
    'use strict';
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
        property({ type: Object }),
        __metadata("design:type", Array)
    ], GdqMarioScores.prototype, "scores", void 0);
    GdqMarioScores = __decorate([
        customElement('gdq-marioscores')
    ], GdqMarioScores);
    // I don't need this but tsc complains that GdqMarioScores is unused without it.
    window.GdqMarioScores = GdqMarioScores;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW1hcmlvc2NvcmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW1hcmlvc2NvcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLENBQUMsR0FBRyxFQUFFO0lBQ0wsWUFBWSxDQUFDO0lBRWIsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQ3JELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVMsUUFBUSxDQUFDLENBQUM7SUFHckQsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBZSxTQUFRLE9BQU8sQ0FBQyxPQUFPO1FBSTNDLEtBQUs7WUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZCxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxNQUFNLEVBQUU7b0JBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7aUJBQ3JCO1lBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBRUQsa0JBQWtCLENBQUMsQ0FBUTtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xDLE9BQU87YUFDUDtZQUVELE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUEyQixDQUFDO1lBQzdDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0UsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0MsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzNDLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ2pDO1FBQ0YsQ0FBQztLQUNELENBQUE7SUF2QkE7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7O2tEQUNWO0lBRlYsY0FBYztRQURuQixhQUFhLENBQUMsaUJBQWlCLENBQUM7T0FDM0IsY0FBYyxDQXlCbkI7SUFFRCxnRkFBZ0Y7SUFDL0UsTUFBYyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDakQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9