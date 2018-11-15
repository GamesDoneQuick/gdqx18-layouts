import * as tslib_1 from "tslib";
var UiTimeago_1;
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
let UiTimeago = UiTimeago_1 = class UiTimeago extends Polymer.Element {
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
], UiTimeago.prototype, "timeago", void 0);
tslib_1.__decorate([
    property({ type: String, observer: UiTimeago_1.prototype._datetimeChanged })
], UiTimeago.prototype, "datetime", void 0);
UiTimeago = UiTimeago_1 = tslib_1.__decorate([
    customElement('ui-timeago')
], UiTimeago);
export default UiTimeago;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktdGltZWFnby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVpLXRpbWVhZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJELE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO0lBQ3pCLFlBQVksRUFBRTtRQUNiLE1BQU0sRUFBRSxPQUFPO1FBQ2YsSUFBSSxFQUFFLElBQUk7UUFDVixDQUFDLEVBQUUsVUFBVTtRQUNiLEVBQUUsRUFBRSxLQUFLO1FBQ1QsQ0FBQyxFQUFFLElBQUk7UUFDUCxFQUFFLEVBQUUsS0FBSztRQUNULENBQUMsRUFBRSxJQUFJO1FBQ1AsRUFBRSxFQUFFLEtBQUs7UUFDVCxDQUFDLEVBQUUsSUFBSTtRQUNQLEVBQUUsRUFBRSxLQUFLO1FBQ1QsQ0FBQyxFQUFFLEtBQUs7UUFDUixFQUFFLEVBQUUsTUFBTTtRQUNWLENBQUMsRUFBRSxJQUFJO1FBQ1AsRUFBRSxFQUFFLEtBQUs7S0FDVDtDQUNELENBQUMsQ0FBQztBQUdILElBQXFCLFNBQVMsaUJBQTlCLE1BQXFCLFNBQVUsU0FBUSxPQUFPLENBQUMsT0FBTztJQUR0RDs7UUFHQyxZQUFPLEdBQVcsRUFBRSxDQUFDO1FBR3JCLGFBQVEsR0FBVywwQkFBMEIsQ0FBQztJQXNCL0MsQ0FBQztJQWxCQSxLQUFLO1FBQ0osSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxlQUFlO1FBQ2QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxXQUFXO1FBQ1YsMkdBQTJHO1FBQzNHLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzFELENBQUM7SUFFRCxnQkFBZ0I7UUFDZixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUNELENBQUE7QUF6QkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzswQ0FDbEI7QUFHckI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFTLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFDLENBQUM7MkNBQzNCO0FBTDFCLFNBQVM7SUFEN0IsYUFBYSxDQUFDLFlBQVksQ0FBQztHQUNQLFNBQVMsQ0EyQjdCO2VBM0JvQixTQUFTIn0=