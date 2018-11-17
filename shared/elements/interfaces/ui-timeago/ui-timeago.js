import * as tslib_1 from "tslib";
var UiTimeagoElement_1;
import moment from 'moment';
const { customElement, property } = Polymer.decorators;
moment.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s',
        s: 'just now',
        ss: '%ds',
        m: '1m',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        M: '1mo',
        MM: '%dmo',
        y: '1y',
        yy: '%dy'
    }
});
let UiTimeagoElement = UiTimeagoElement_1 = class UiTimeagoElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.timeago = '';
        this.datetime = '0000-00-00T00:00:00.000Z';
    }
    ready() {
        this.restartInterval();
    }
    restartInterval() {
        this.recalculate();
        clearInterval(this.interval);
        this.interval = window.setInterval(this.recalculate.bind(this), 60000);
    }
    recalculate() {
        // TODO: This is the only thing in this entire codebase that uses Moment. Can we eliminate this dependency?
        this.timeago = moment(new Date(this.datetime)).fromNow();
    }
    _datetimeChanged() {
        this.restartInterval();
    }
};
tslib_1.__decorate([
    property({ type: String, notify: true })
], UiTimeagoElement.prototype, "timeago", void 0);
tslib_1.__decorate([
    property({ type: String, observer: UiTimeagoElement_1.prototype._datetimeChanged })
], UiTimeagoElement.prototype, "datetime", void 0);
UiTimeagoElement = UiTimeagoElement_1 = tslib_1.__decorate([
    customElement('ui-timeago')
], UiTimeagoElement);
export default UiTimeagoElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktdGltZWFnby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVpLXRpbWVhZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJELE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO0lBQ3pCLFlBQVksRUFBRTtRQUNiLE1BQU0sRUFBRSxPQUFPO1FBQ2YsSUFBSSxFQUFFLElBQUk7UUFDVixDQUFDLEVBQUUsVUFBVTtRQUNiLEVBQUUsRUFBRSxLQUFLO1FBQ1QsQ0FBQyxFQUFFLElBQUk7UUFDUCxFQUFFLEVBQUUsS0FBSztRQUNULENBQUMsRUFBRSxJQUFJO1FBQ1AsRUFBRSxFQUFFLEtBQUs7UUFDVCxDQUFDLEVBQUUsSUFBSTtRQUNQLEVBQUUsRUFBRSxLQUFLO1FBQ1QsQ0FBQyxFQUFFLEtBQUs7UUFDUixFQUFFLEVBQUUsTUFBTTtRQUNWLENBQUMsRUFBRSxJQUFJO1FBQ1AsRUFBRSxFQUFFLEtBQUs7S0FDVDtDQUNELENBQUMsQ0FBQztBQUdILElBQXFCLGdCQUFnQix3QkFBckMsTUFBcUIsZ0JBQWlCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFEN0Q7O1FBR0MsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUdyQixhQUFRLEdBQVcsMEJBQTBCLENBQUM7SUFzQi9DLENBQUM7SUFsQkEsS0FBSztRQUNKLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsZUFBZTtRQUNkLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsV0FBVztRQUNWLDJHQUEyRztRQUMzRyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2YsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRCxDQUFBO0FBekJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7aURBQ2xCO0FBR3JCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsa0JBQWdCLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFDLENBQUM7a0RBQ2xDO0FBTDFCLGdCQUFnQjtJQURwQyxhQUFhLENBQUMsWUFBWSxDQUFDO0dBQ1AsZ0JBQWdCLENBMkJwQztlQTNCb0IsZ0JBQWdCIn0=