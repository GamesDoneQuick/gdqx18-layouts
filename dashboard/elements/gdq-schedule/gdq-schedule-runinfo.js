import * as tslib_1 from "tslib";
var GdqScheduleRuninfo_1;
const { customElement, property } = Polymer.decorators;
let GdqScheduleRuninfo = GdqScheduleRuninfo_1 = class GdqScheduleRuninfo extends Polymer.Element {
    _notesChanged(newVal) {
        const notes = this.$.notes;
        const valueDiv = notes.querySelector('.value');
        if (newVal) {
            valueDiv.innerHTML = newVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
        }
        else {
            valueDiv.innerHTML = '';
        }
    }
    setRun(run) {
        this.name = run.name;
        this.console = run.console;
        this.runners = run.runners;
        this.releaseYear = String(run.releaseYear);
        this.estimate = run.estimate;
        this.category = run.category;
        this.order = run.order;
        this.notes = run.notes;
        this.coop = run.coop;
        this.originalValues = run.originalValues;
    }
    calcName(name) {
        if (name) {
            return name.split('\\n').join(' ');
        }
        return name;
    }
    calcModified(original) {
        return (original === undefined || original === null) ? '' : 'modified';
    }
};
tslib_1.__decorate([
    property({ type: String, observer: GdqScheduleRuninfo_1.prototype._notesChanged })
], GdqScheduleRuninfo.prototype, "notes", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], GdqScheduleRuninfo.prototype, "label", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GdqScheduleRuninfo.prototype, "coop", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqScheduleRuninfo.prototype, "releaseYear", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqScheduleRuninfo.prototype, "console", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqScheduleRuninfo.prototype, "estimate", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqScheduleRuninfo.prototype, "category", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqScheduleRuninfo.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GdqScheduleRuninfo.prototype, "originalValues", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GdqScheduleRuninfo.prototype, "runners", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GdqScheduleRuninfo.prototype, "order", void 0);
GdqScheduleRuninfo = GdqScheduleRuninfo_1 = tslib_1.__decorate([
    customElement('gdq-schedule-runinfo')
], GdqScheduleRuninfo);
export default GdqScheduleRuninfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXNjaGVkdWxlLXJ1bmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtc2NoZWR1bGUtcnVuaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQixrQkFBa0IsMEJBQXZDLE1BQXFCLGtCQUFtQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBa0M5RCxhQUFhLENBQUMsTUFBYztRQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQW9CLENBQUM7UUFDMUMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQW1CLENBQUM7UUFDakUsSUFBSSxNQUFNLEVBQUU7WUFDWCxRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDOUU7YUFBTTtZQUNOLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO0lBQ0YsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFRO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBd0I7UUFDaEMsSUFBSSxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBRUQsWUFBWSxDQUFDLFFBQWE7UUFDekIsT0FBTyxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUN4RSxDQUFDO0NBQ0QsQ0FBQTtBQWxFQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUMsQ0FBQztpREFDakU7QUFHZDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7aURBQ3JDO0FBR2Q7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7Z0RBQ1o7QUFHZDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt1REFDTDtBQUdwQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzttREFDVDtBQUdoQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztvREFDUjtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztvREFDUjtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztnREFDWjtBQUdiO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzBEQUNnQjtBQUd6QztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzttREFDUTtBQUdoQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztpREFDWDtBQWhDTSxrQkFBa0I7SUFEdEMsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0dBQ2pCLGtCQUFrQixDQW9FdEM7ZUFwRW9CLGtCQUFrQiJ9