import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const compositingOBSStatus = nodecg.Replicant('compositingOBS:websocket');
const compositingOBSTransitioning = nodecg.Replicant('compositingOBS:transitioning');
const interviewStopwatch = nodecg.Replicant('interview:stopwatch');
const lowerthirdTimeRemaining = nodecg.Replicant('interview:lowerthirdTimeRemaining');
const programScene = nodecg.Replicant('compositingOBS:programScene');
const questionShowing = nodecg.Replicant('interview:questionShowing');
const questionSortMap = nodecg.Replicant('interview:questionSortMap');
const questionTimeRemaining = nodecg.Replicant('interview:questionTimeRemaining');
const showPrizesOnMonitorRep = nodecg.Replicant('interview:showPrizesOnMonitor');
const baseClass = Polymer.SCDataBindingHelpers(Polymer.MutableData(Polymer.Element));
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 * @appliesMixin Polymer.SCDataBindingHelpers
 */
let DashInterview = class DashInterview extends baseClass {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     * @appliesMixin Polymer.SCDataBindingHelpers
     */
    constructor() {
        super(...arguments);
        this._programSceneName = '';
        this._markingTopQuestionAsDone = false;
        this._sendingTransitionCommand = false;
    }
    ready() {
        super.ready();
        lowerthirdTimeRemaining.on('change', newVal => {
            this.lowerthirdTimeRemaining = newVal;
        });
        questionTimeRemaining.on('change', newVal => {
            this.questionTimeRemaining = newVal;
        });
        compositingOBSTransitioning.on('change', newVal => {
            this._transitioning = newVal;
        });
        programScene.on('change', newVal => {
            this._programSceneName = newVal ? newVal.name : '';
        });
        compositingOBSStatus.on('change', newVal => {
            this._disconnectedFromOBS = Boolean(!newVal || newVal.status !== 'connected');
        });
        interviewStopwatch.on('change', newVal => {
            this._timeElapsed = newVal.time.formatted.split('.')[0];
        });
        showPrizesOnMonitorRep.on('change', newVal => {
            this._modeToggleChecked = !newVal;
        });
        this.addEventListener('error-toast', (event) => {
            this.$.toast.showErrorToast(event.detail.text);
        });
    }
    showLowerthird() {
        this.$.lowerthirdControls.autoLowerthird();
    }
    hideLowerthird() {
        this.$.lowerthirdControls.hideLowerthird();
    }
    showQuestion() {
        if (!questionSortMap.value) {
            return;
        }
        this._markingTopQuestionAsDone = true;
        nodecg.sendMessage('pulseInterviewQuestion', questionSortMap.value[0], error => {
            this._markingTopQuestionAsDone = false;
            if (error) {
                this.$.toast.showErrorToast('Failed to load next interview question.');
                nodecg.log.error(error);
            }
        });
    }
    hideQuestion() {
        questionShowing.value = false;
        this._markingTopQuestionAsDone = false;
    }
    openInterviewTransitionConfirmation() {
        this.$.interviewTransitionConfirmation.open();
    }
    transitionToInterview() {
        return this.transitionToScene('Interview');
    }
    transitionToBreak() {
        return this.transitionToScene('Break');
    }
    async transitionToScene(sceneName, transitionName = 'Blank Stinger') {
        const toastElem = this.$.toast;
        this._sendingTransitionCommand = true;
        try {
            await nodecg.sendMessage('compositingOBS:transition', {
                name: transitionName,
                sceneName
            });
            toastElem.showSuccessToast(`Successfully started transition to "${sceneName}".`);
        }
        catch (error) {
            let errorString = error;
            if (error.message) {
                errorString = error.message;
            }
            else if (error.error) {
                errorString = error.error;
            }
            toastElem.showErrorToast('Failed to transition: ' + errorString);
        }
        this._sendingTransitionCommand = false;
    }
    _computeTransitionToBreakDisabled(_sendingTransitionCommand, _transitioning, _disconnectedFromOBS, _programSceneName) {
        return _sendingTransitionCommand ||
            _transitioning ||
            _disconnectedFromOBS ||
            _programSceneName === 'Break';
    }
    _any(...args) {
        return args.find(arg => Boolean(arg));
    }
    _handleModeToggleChange(e) {
        showPrizesOnMonitorRep.value = !e.target.checked;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], DashInterview.prototype, "lowerthirdShowing", void 0);
tslib_1.__decorate([
    property({ type: Number })
], DashInterview.prototype, "lowerthirdTimeRemaining", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], DashInterview.prototype, "questionShowing", void 0);
tslib_1.__decorate([
    property({ type: Number })
], DashInterview.prototype, "questionTimeRemaining", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashInterview.prototype, "_programSceneName", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterview.prototype, "_markingTopQuestionAsDone", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterview.prototype, "_sendingTransitionCommand", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashInterview.prototype, "_errorToastText", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashInterview.prototype, "_successToastText", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterview.prototype, "_transitioning", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterview.prototype, "_disconnectedFromOBS", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        computed: '_computeTransitionToBreakDisabled(_sendingTransitionCommand, _transitioning, _disconnectedFromOBS, _programSceneName)'
    })
], DashInterview.prototype, "_transitionToBreakDisabled", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashInterview.prototype, "_timeElapsed", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterview.prototype, "_modeToggleChecked", void 0);
DashInterview = tslib_1.__decorate([
    customElement('dash-interview')
], DashInterview);
export default DashInterview;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWludGVydmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBa0IsMEJBQTBCLENBQUMsQ0FBQztBQUMzRixNQUFNLDJCQUEyQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsOEJBQThCLENBQUMsQ0FBQztBQUM5RixNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVkscUJBQXFCLENBQUMsQ0FBQztBQUM5RSxNQUFNLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVMsbUNBQW1DLENBQUMsQ0FBQztBQUM5RixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFRLDZCQUE2QixDQUFDLENBQUM7QUFDNUUsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSwyQkFBMkIsQ0FBQyxDQUFDO0FBQy9FLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQTZCLDJCQUEyQixDQUFDLENBQUM7QUFDbEcsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFTLGlDQUFpQyxDQUFDLENBQUM7QUFDMUYsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLCtCQUErQixDQUFDLENBQUM7QUFDMUYsTUFBTSxTQUFTLEdBQUksT0FBZSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUErQixDQUFDO0FBRTVIOzs7OztHQUtHO0FBRUgsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFjLFNBQVEsU0FBUztJQVBwRDs7Ozs7T0FLRztJQUNIOztRQWVDLHNCQUFpQixHQUFXLEVB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