import * as tslib_1 from "tslib";
var DashInterviewMonitorTweet_1;
const { customElement, property } = Polymer.decorators;
let DashInterviewMonitorTweet = DashInterviewMonitorTweet_1 = class DashInterviewMonitorTweet extends Polymer.Element {
    populateBody() {
        if (!this.tweet) {
            return;
        }
        this.$.body.innerHTML = this.tweet.text;
    }
};
tslib_1.__decorate([
    property({ type: Object, observer: DashInterviewMonitorTweet_1.prototype.populateBody })
], DashInterviewMonitorTweet.prototype, "tweet", void 0);
DashInterviewMonitorTweet = DashInterviewMonitorTweet_1 = tslib_1.__decorate([
    customElement('dash-interview-monitor-tweet')
], DashInterviewMonitorTweet);
export default DashInterviewMonitorTweet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbW9uaXRvci10d2VldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaW50ZXJ2aWV3LW1vbml0b3ItdHdlZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFHckQsSUFBcUIseUJBQXlCLGlDQUE5QyxNQUFxQix5QkFBMEIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUlyRSxZQUFZO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsT0FBTztTQUNQO1FBRUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3pDLENBQUM7Q0FDRCxDQUFBO0FBVEE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSwyQkFBeUIsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFDLENBQUM7d0RBQ3hFO0FBRk8seUJBQXlCO0lBRDdDLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQztHQUN6Qix5QkFBeUIsQ0FXN0M7ZUFYb0IseUJBQXlCIn0=