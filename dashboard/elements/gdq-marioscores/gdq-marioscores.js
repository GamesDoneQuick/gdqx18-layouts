"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../bower_components/paper-input/paper-input.d.ts" />
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
        __metadata("design:type", Object)
    ], GdqMarioScores.prototype, "scores", void 0);
    GdqMarioScores = __decorate([
        customElement('gdq-marioscores')
    ], GdqMarioScores);
    window.GdqMarioScores = GdqMarioScores;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW1hcmlvc2NvcmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW1hcmlvc2NvcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrRUFBK0U7QUFDL0UsQ0FBQyxHQUFHLEVBQUU7SUFDTCxZQUFZLENBQUM7SUFNYixNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDckQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBTyxRQUFRLENBQUMsQ0FBQztJQUduRCxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFlLFNBQVEsT0FBTyxDQUFDLE9BQU87UUFJM0MsS0FBSztZQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixJQUFJLE1BQU0sRUFBRTtvQkFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztpQkFDckI7WUFDRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFRCxrQkFBa0IsQ0FBQyxDQUFRO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDbEMsT0FBTzthQUNQO1lBRUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQTJCLENBQUM7WUFDN0MsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMvRSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMvQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0MsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDakM7UUFDRixDQUFDO0tBQ0QsQ0FBQTtJQXZCQTtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs7a0RBQ1o7SUFGUixjQUFjO1FBRG5CLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztPQUMzQixjQUFjLENBeUJuQjtJQUVBLE1BQWMsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ2pELENBQUMsQ0FBQyxFQUFFLENBQUMifQ==