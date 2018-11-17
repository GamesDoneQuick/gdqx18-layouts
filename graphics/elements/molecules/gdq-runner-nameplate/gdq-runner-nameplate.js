import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentRun = nodecg.Replicant('currentRun');
const stopwatch = nodecg.Replicant('stopwatch');
const gameAudioChannels = nodecg.Replicant('gameAudioChannels');
/**
 * @customElement
 * @polymer
 */
let GDQRunnerNameplateElement = class GDQRunnerNameplateElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.noLeftCap = false;
        this.noRightCap = false;
        this.audio = false;
        this.noAudio = false;
        this.coop = false;
        this.finished = false;
        this.forfeit = false;
        this._numRunners = 1;
    }
    ready() {
        super.ready();
        this.currentRunChanged = this.currentRunChanged.bind(this);
        this.stopwatchChanged = this.stopwatchChanged.bind(this);
        this.gameAudioChannelsChanged = this.gameAudioChannelsChanged.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            // Attach replicant change listeners.
            currentRun.on('change', this.currentRunChanged);
            stopwatch.on('change', this.stopwatchChanged);
            gameAudioChannels.on('change', this.gameAudioChannelsChanged);
        });
    }
    /*
     * 1) For singleplayer, if both match (ignoring capitalization), show only twitch.
     * 2) For races, if everyone matches (ignoring capitalization), show only twitch, otherwise,
     *    if even one person needs to show both, everyone shows both.
     */
    currentRunChanged(newVal, oldVal) {
        if (!newVal || typeof newVal !== 'object') {
            return;
        }
        this.coop = newVal.coop;
        this._numRunners = newVal.runners.length;
        // Only invoke updateNames if the names could have changed.
        if (!oldVal || JSON.stringify(newVal.runners) !== JSON.stringify(oldVal.runners)) {
            this.updateNames(newVal.runners);
        }
    }
    updateNames(runners) {
        let canConflateAllRunners = true;
        runners.forEach(r => {
            if (r && (!r.stream || r.name.toLowerCase() !== r.stream.toLowerCase())) {
                canConflateAllRunners = false;
            }
        });
        const runner = runners[this.index];
        let alias;
        let twitchAlias;
        if (runner) {
            alias = runner.name;
            if (runner.stream) {
                twitchAlias = runner.stream;
            }
            else {
                twitchAlias = '';
            }
        }
        else {
            alias = '?';
            twitchAlias = '?';
        }
        this.$.nameplate.updateName({ alias, twitchAlias, rotate: !canConflateAllRunners });
    }
    stopwatchChanged(newVal) {
        if (newVal.results[this.index]) {
            this.forfeit = newVal.results[this.index].forfeit;
            this.place = newVal.results[this.index].place;
            this.time = newVal.results[this.index].time.formatted;
            this.finished = true;
        }
        else {
            this.forfeit = false;
            this.finished = false;
        }
    }
    gameAudioChannelsChanged(newVal) {
        if (this.noAudio) {
            return;
        }
        if (!newVal || newVal.length <= 0) {
            return;
        }
        const channels = newVal[this.index];
        const canHearSd = !channels.sd.muted && !channels.sd.fadedBelowThreshold;
        const canHearHd = !channels.hd.muted && !channels.hd.fadedBelowThreshold;
        this.audio = canHearSd || canHearHd;
    }
    _computeFirstPlace(place) {
        return place === 1;
    }
    _computeLastPlace(place, numRunners) {
        return place === numRunners;
    }
    _calcResultHidden(resultSide) {
        return !resultSide;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "noLeftCap", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "noRightCap", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQRunnerNameplateElement.prototype, "index", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "audioVertPos", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "audioHorizPos", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "audio", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "noAudio", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "resultSide", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "coop", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "finished", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "forfeit", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "time", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQRunnerNameplateElement.prototype, "place", void 0);
tslib_1.__decorate([
    property({ type: Boolean, computed: '_computeFirstPlace(place)' })
], GDQRunnerNameplateElement.prototype, "firstPlace", void 0);
tslib_1.__decorate([
    property({ type: Boolean, computed: '_computeLastPlace(place, _numRunners)' })
], GDQRunnerNameplateElement.prototype, "lastPlace", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQRunnerNameplateElement.prototype, "_numRunners", void 0);
GDQRunnerNameplateElement = tslib_1.__decorate([
    customElement('gdq-runner-nameplate')
], GDQRunnerNameplateElement);
export default GDQRunnerNameplateElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bm5lci1uYW1lcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtcnVubmVyLW5hbWVwbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFDdkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUMzRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQW9CLG1CQUFtQixDQUFDLENBQUM7QUFFbkY7OztHQUdHO0FBRUgsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTHRFOzs7T0FHRztJQUNIOztRQUdDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFHM0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQVk1QixVQUFLLEdBQVksS0FBSyxDQUFDO1FBR3ZCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFNekIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUd0QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRzFCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFlekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7SUF5R3pCLENBQUM7SUF2R0EsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsd0JBQXdC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