import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentIntermission = nodecg.Replicant('currentIntermission');
const casparConnected = nodecg.Replicant('caspar:connected');
const compositingOBSWebsocket = nodecg.Replicant('compositingOBS:websocket');
let DashHostAds = class DashHostAds extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this._connectedToNodeCG = true;
    }
    ready() {
        super.ready();
        this._checkCover = this._checkCover.bind(this);
        currentIntermission.on('change', newVal => {
            this.content = newVal ? newVal.content : [];
        });
        casparConnected.on('change', this._checkCover);
        compositingOBSWebsocket.on('change', this._checkCover);
        window.socket.on('disconnect', () => {
            this._connectedToNodeCG = false;
            this._checkCover();
        });
        window.socket.on('reconnect', () => {
            this._connectedToNodeCG = true;
            this._checkCover();
        });
    }
    startAdBreak(adBreakId) {
        nodecg.sendMessage('intermissions:startAdBreak', adBreakId);
    }
    cancelAdBreak(adBreakId) {
        nodecg.sendMessage('intermissions:cancelAdBreak', adBreakId);
    }
    completeAdBreak(event) {
        nodecg.sendMessage('intermissions:completeAdBreak', event.detail.adBreakId);
    }
    equal(a, b) {
        return a === b;
    }
    _confirmStartAdBreak(e) {
        this._adBreakIdBeingConfirmed = e.detail.adBreakId;
        this.$.confirmStartDialog.open();
    }
    _confirmCancelAdBreak(e) {
        this._adBreakIdBeingConfirmed = e.detail.adBreakId;
        this.$.confirmStartDialog.open();
    }
    _handleConfirmStartDialogClosed(e) {
        if (e.detail.confirmed === true) {
            this.startAdBreak(this._adBreakIdBeingConfirmed);
        }
    }
    _handleConfirmCancelDialogClosed(e) {
        if (e.detail.confirmed === true) {
            this.cancelAdBreak(this._adBreakIdBeingConfirmed);
        }
    }
    _checkCover() {
        if (casparConnected.status !== 'declared' || compositingOBSWebsocket.status !== 'declared') {
            return;
        }
        this.$.cover.hidden = false;
        const casparIsConnected = casparConnected.value;
        const compositingOBSWebsocketIsConnected = compositingOBSWebsocket.value.status === 'connected';
        if (!this._connectedToNodeCG) {
            this.$.cover.innerHTML = 'Disconnected from NodeCG!<br/>' +
                'Ads cannot be played until we reconnect.' +
                '<br/><br/>Tell the producer immediately!';
        }
        else if (!casparIsConnected && !compositingOBSWebsocketIsConnected) {
            this.$.cover.innerHTML = 'CasparCG and the compositing OBS are both disconnected!<br/>' +
                'Ads cannot be played until both of them are connected.' +
                '<br/><br/>Tell the producer immediately!';
        }
        else if (!casparIsConnected) {
            this.$.cover.innerHTML = 'CasparCG is disconnected!<br/>' +
                'Ads cannot be played until it is connected.' +
                '<br/><br/>Tell the producer immediately!';
        }
        else if (!compositingOBSWebsocketIsConnected) { // eslint-disable-line no-negated-condition
            this.$.cover.innerHTML = 'The compositing OBS is disconnected!<br/>' +
                'Ads cannot be played until it is connected.' +
                '<br/><br/>Tell the producer immediately!';
        }
        else {
            this.$.cover.hidden = true;
        }
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashHostAds.prototype, "content", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashHostAds.prototype, "_connectedToNodeCG", void 0);
DashHostAds = tslib_1.__decorate([
    customElement('dash-host-ads')
], DashHostAds);
export default DashHostAds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LWFkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaG9zdC1hZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXNCLHFCQUFxQixDQUFDLENBQUM7QUFDekYsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3RFLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBa0IsMEJBQTBCLENBQUMsQ0FBQztBQUc5RixJQUFxQixXQUFXLEdBQWhDLE1BQXFCLFdBQVksU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFEN0U7O1FBTVMsdUJBQWtCLEdBQVksSUFBSSxDQUFDO0lBMEY1QyxDQUFDO0lBdkZBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNILGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV0RCxNQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUs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