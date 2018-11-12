import * as tslib_1 from "tslib";
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
tslib_1.__decorate([
    property({ type: Object })
], GdqMarioScores.prototype, "scores", void 0);
GdqMarioScores = tslib_1.__decorate([
    customElement('gdq-marioscores')
], GdqMarioScores);
export default GdqMarioScores;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW1hcmlvc2NvcmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW1hcmlvc2NvcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBUyxRQUFRLENBQUMsQ0FBQztBQUdyRCxJQUFxQixjQUFjLEdBQW5DLE1BQXFCLGNBQWUsU0FBUSxPQUFPLENBQUMsT0FBTztJQUkxRCxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxNQUFNLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7YUFDckI7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxDQUFRO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxPQUFPO1NBQ1A7UUFFRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBMkIsQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNDLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ2pDO0lBQ0YsQ0FBQztDQUNELENBQUE7QUF2QkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7OENBQ1Y7QUFGSyxjQUFjO0lBRGxDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztHQUNaLGNBQWMsQ0F5QmxDO2VBekJvQixjQUFjIn0=