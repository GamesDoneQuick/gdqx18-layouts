import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentRun = nodecg.Replicant('currentRun');
let GdqRuninfo = class GdqRuninfo extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.maxNameSize = 45;
        this.forceSingleLineName = false;
        this.name = '?';
        this.initialized = false;
    }
    ready() {
        super.ready();
        Polymer.RenderStatus.afterNextRender(this, () => {
            currentRun.on('change', this.currentRunChanged.bind(this));
        });
    }
    currentRunChanged(newVal) {
        this.name = newVal.name;
        this.category = newVal.category;
        this.console = newVal.console;
        this.releaseYear = String(newVal.releaseYear) || '20XX';
        this.estimate = newVal.estimate;
        // Avoids some issues that can arise on the first time that fitText is run.
        // Currently unsure why these issues happen.
        if (this.initialized) {
            this.fitText();
        }
        else {
            Polymer.RenderStatus.afterNextRender(this, this.fitText);
            this.initialized = true;
        }
    }
    fitText() {
        Polymer.flush();
        window.textFit(this.$.name, { maxFontSize: this.maxNameSize });
        this.$.category.maxTextWidth = this.clientWidth - 76;
        this.$.misc.maxTextWidth = (this.clientWidth - 124) / 3;
    }
    _processName(name) {
        if (!name) {
            return '&nbsp;';
        }
        if (this.forceSingleLineName) {
            return `<div class="name-line">${name.replace('\\n', ' ')}</div>`;
        }
        return name.split('\\n')
            .map(lineText => `<div class="name-line">${lineText}</div>`)
            .join('\n');
    }
};
tslib_1.__decorate([
    property({ type: Number })
], GdqRuninfo.prototype, "maxNameSize", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GdqRuninfo.prototype, "forceSingleLineName", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqRuninfo.prototype, "estimate", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqRuninfo.prototype, "releaseYear", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqRuninfo.prototype, "console", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqRuninfo.prototype, "category", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqRuninfo.prototype, "name", void 0);
GdqRuninfo = tslib_1.__decorate([
    customElement('gdq-runinfo')
], GdqRuninfo);
export default GdqRuninfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtcnVuaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFHdkQsSUFBcUIsVUFBVSxHQUEvQixNQUFxQixVQUFXLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFEdkQ7O1FBR0MsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFHekIsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBZXJDLFNBQUksR0FBVyxHQUFHLENBQUM7UUFFWCxnQkFBVyxHQUFZLEtBQUssQ0FBQztJQThDdEMsQ0FBQztJQTVDQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUMvQyxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsaUJBQWlCLENBQUMsTUFBVztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksTUFBTSxDQUFDO1FBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUVoQywyRUFBMkU7UUFDM0UsNENBQTRDO1FBQzVDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDZjthQUFNO1lBQ04sT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUN4QjtJQUNGLENBQUM7SUFFRCxPQUFPO1FBQ04sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQStCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQzVFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBdUIsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsWUFBWSxDQUFDLElBQWE7UUFDekIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNWLE9BQU8sUUFBUSxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDN0IsT0FBTywwQkFBMEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQztTQUNsRTtRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsMEJBQTBCLFFBQVEsUUFBUSxDQUFDO2FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNkLENBQUM7Q0FDRCxDQUFBO0FBbEVBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOytDQUNBO0FBR3pCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzt1REFDZjtBQUdyQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs0Q0FDUjtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzsrQ0FDTDtBQUdwQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzsyQ0FDVDtBQUdoQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs0Q0FDUjtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt3Q0FDTjtBQXBCQyxVQUFVO0lBRDlCLGFBQWEsQ0FBQyxhQUFhLENBQUM7R0FDUixVQUFVLENBb0U5QjtlQXBFb0IsVUFBVSJ9