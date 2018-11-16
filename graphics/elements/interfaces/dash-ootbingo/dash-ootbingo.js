import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const boardRep = nodecg.Replicant('ootBingo:board');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let DashOotbingo = class DashOotbingo extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     */
    constructor() {
        super(...arguments);
        this._submitting = false;
    }
    ready() {
        super.ready();
        this._$lineSelectors = Array.from(this.shadowRoot.querySelectorAll('.lineSelector'));
        this._$lineSelectors.forEach(button => {
            button.addEventListener('click', (event) => {
                nodecg.sendMessage('ootBingo:selectLine', event.target.innerText.toLowerCase());
            });
        });
        boardRep.on('change', newVal => {
            if (!newVal) {
                return;
            }
            this._$lineSelectors.forEach(button => {
                if (button.innerText.toLowerCase() === newVal.selectedLine) {
                    button.setAttribute('selected', 'true');
                }
                else {
                    button.removeAttribute('selected');
                }
            });
        });
    }
    toggleLineFocus() {
        nodecg.sendMessage('ootBingo:toggleLineFocus');
    }
    toggleCard() {
        nodecg.sendMessage('ootBingo:toggleCard');
    }
    toggleEmbiggen() {
        nodecg.sendMessage('ootBingo:toggleEmbiggen');
    }
    async submit() {
        this._submitting = true;
        await nodecg.sendMessage('ootBingo:joinRoom', {
            siteUrl: this.$.siteUrl.value,
            socketUrl: this.$.socketUrl.value,
            playerName: this.$.playerName.value,
            roomCode: this.$.roomCode.value,
            passphrase: this.$.passphrase.value
        });
        this._submitting = false;
    }
    defaults() {
        this.$.siteUrl.value = 'https://bingosync.com';
        this.$.socketUrl.value = 'wss://sockets.bingosync.com';
        this.$.playerName.value = 'NodeCG';
    }
    _computeStatus(socket) {
        if (!socket) {
            return 'disconnected';
        }
        return socket.status;
    }
    _calcToggleClass(cardHidden) {
        return cardHidden ? 'green' : 'red';
    }
    _calcFocusToggleText(lineFocused) {
        return lineFocused ?
            'See whole board' :
            'Focus on selected group';
    }
    _calcToggleCardText(cardHidden) {
        return cardHidden ? 'Show Card' : 'Hide Card';
    }
    _calcToggleEmbiggenText(embiggen) {
        return embiggen ? 'Debiggen Card' : 'Embiggen Card';
    }
};
tslib_1.__decorate([
    property({ type: String })
], DashOotbingo.prototype, "socket", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true, computed: '_computeStatus(socket)' })
], DashOotbingo.prototype, "status", void 0);
DashOotbingo = tslib_1.__decorate([
    customElement('dash-ootbingo')
], DashOotbingo);
export default DashOotbingo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1vb3RiaW5nby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtb290YmluZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFrQixnQkFBZ0IsQ0FBQyxDQUFDO0FBRXJFOzs7O0dBSUc7QUFFSCxJQUFxQixZQUFZLEdBQWpDLE1BQXFCLFlBQWEsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFOOUU7Ozs7T0FJRztJQUNIOztRQVFXLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBa0Z4QyxDQUFDO0lBL0VBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBeUIsQ0FBQztRQUM5RyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ2pELE1BQU0sQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUcsS0FBSyxDQUFDLE1BQTZCLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDekcsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osT0FBTzthQUNQO1lBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7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