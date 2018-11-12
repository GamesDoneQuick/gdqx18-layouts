import * as tslib_1 from "tslib";
const urlParams = new URLSearchParams(window.location.search);
const MIRROR_MODE = getBooleanUrlParam(urlParams, 'mirrored');
const GAME_ID = urlParams.has('game_id') ? urlParams.get('game_id') : 'supportclass';
const { customElement, property } = Polymer.decorators;
if (MIRROR_MODE) {
    document.title = `${document.title} (Mirrored)`;
}
function getBooleanUrlParam(params, paramName) {
    return params.has(paramName) && params.get(paramName) !== 'false' && params.get(paramName) !== '0';
}
const ITEM_ROWS = [[
        { name: 'hookshot' },
        { name: 'silvers' },
        { name: 'bow' },
        { name: 'boss0' }
    ], [
        { name: 'firerod' },
        { name: 'somaria' },
        { name: 'hammer' },
        { name: 'boss1' }
    ], [
        { name: 'icerod' },
        { name: 'byrna' },
        { name: 'flute' },
        { name: 'boss2' }
    ], [
        { name: 'quake' },
        { name: 'ether' },
        { name: 'bombos' },
        { name: 'boss3' }
    ], [
        { name: 'boots' },
        { name: 'moonpearl' },
        { name: 'glove', hasLevels: true },
        { name: 'boss4' }
    ], [
        { name: 'flippers' },
        { name: 'mirror' },
        { name: 'lantern' },
        { name: 'boss5' }
    ], [
        { name: 'powder' },
        { name: 'book' },
        { name: 'bottle', hasLevels: true },
        { name: 'boss6' }
    ], [
        { name: 'mushroom' },
        { name: 'shovel' },
        { name: 'net' },
        { name: 'boss7' }
    ], [
        { name: 'tunic', hasLevels: true },
        { name: 'shield', hasLevels: true },
        { name: 'sword', hasLevels: true },
        { name: 'boss8' }
    ], [
        { name: 'cape' },
        { name: 'boomerang', hasLevels: true },
        { name: 'boss10' },
        { name: 'boss9' }
    ]];
/**
 * @customElement
 * @polymer
 */
let GdqLttpTracker = class GdqLttpTracker extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.gameId = GAME_ID;
        this.mirrored = MIRROR_MODE;
    }
    static get observers() {
        return [
            '_computeItemsAndPrizes(items.*, prizes.*, medallions.*)'
        ];
    }
    ready() {
        super.ready();
        this.$.auth.signInAnonymously().then(() => {
            nodecg.log.info('Signed in anonymously.');
        }).catch((error) => {
            nodecg.log.error('Failed to sign in:', error);
        });
    }
    _computeItemsAndPrizes() {
        const finalArray = [];
        const items = this.items;
        const prizes = this.prizes;
        const medallions = this.medallions;
        if (!items || Object.keys(items).length <= 0 ||
            !prizes || prizes.length <= 0 ||
            !medallions || medallions.length <= 0) {
            this.itemsAndPrizes = finalArray;
            return;
        }
        ITEM_ROWS.forEach((row, rowIndex) => {
            row.forEach((item, itemIndex) => {
                const itemValue = items[item.name];
                if (itemIndex === 3) {
                    // Empty placeholder for the 4th column, which is blank.
                    finalArray.push({});
                }
                finalArray.push({
                    name: item.name,
                    hasLevels: item.hasLevels,
                    level: itemValue,
                    dimmed: typeof item.name === 'string' && item.name.startsWith('boss') ?
                        itemValue === 1 :
                        itemValue === 0 || itemValue === false
                });
            });
            // Dungeon prize.
            const dungeonInfo = {
                name: 'dungeon',
                hasLevels: true,
                level: prizes[rowIndex],
                dimmed: false,
                medallionLevel: undefined
            };
            // Only these two bosses have medallion info.
            if (rowIndex === 8 || rowIndex === 9) {
                dungeonInfo.medallionLevel = medallions[rowIndex];
            }
            finalArray.push(dungeonInfo);
        });
        this.itemsAndPrizes = finalArray;
    }
    _calcCellClass(itemOrPrize, index) {
        const classes = new Set(['cell']);
        const sixesRemainder = (index + 1) % 6;
        if (itemOrPrize.dimmed) {
            classes.add('cell--dimmed');
        }
        if (sixesRemainder === 0) {
            classes.add('cell--prize');
        }
        else if (sixesRemainder === 4) {
            classes.add('cell--zeroWidth');
        }
        return Array.from(classes).join(' ');
    }
    _calcCellSrc(itemOrPrize) {
        let src = itemOrPrize.name;
        if (itemOrPrize.hasLevels) {
            if (typeof itemOrPrize.level === 'number') {
                src = String(src) + itemOrPrize.level;
            }
            else {
                return 'blank-pixel';
            }
        }
        return src ? src : 'blank-pixel';
    }
    _hasMedallion(itemOrPrize) {
        return 'medallionLevel' in itemOrPrize && itemOrPrize.medallionLevel !== undefined;
    }
    _calcCellMedallionSrc(itemOrPrize) {
        if (itemOrPrize.name !== 'dungeon') {
            return 'blank-pixel';
        }
        return `medallion${itemOrPrize.medallionLevel}`;
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GdqLttpTracker.prototype, "items", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GdqLttpTracker.prototype, "prizes", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GdqLttpTracker.prototype, "medallions", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GdqLttpTracker.prototype, "itemsAndPrizes", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqLttpTracker.prototype, "gameId", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GdqLttpTracker.prototype, "mirrored", void 0);
GdqLttpTracker = tslib_1.__decorate([
    customElement('gdq-lttp-tracker')
], GdqLttpTracker);
export default GdqLttpTracker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWx0dHAtdHJhY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1sdHRwLXRyYWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUQsTUFBTSxXQUFXLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzlELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztBQUNyRixNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsSUFBSSxXQUFXLEVBQUU7SUFDaEIsUUFBUSxDQUFDLEtBQUssR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLGFBQWEsQ0FBQztDQUNoRDtBQUVELFNBQVMsa0JBQWtCLENBQUMsTUFBdUIsRUFBRSxTQUFpQjtJQUNyRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxPQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUM7QUFDcEcsQ0FBQztBQVVELE1BQU0sU0FBUyxHQUFHLENBQUM7UUFDbEIsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO1FBQ2xCLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQztRQUNqQixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUM7UUFDYixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUM7S0FDZixFQUFFO1FBQ0YsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDO1FBQ2pCLEVBQUMsSUFBSSxF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