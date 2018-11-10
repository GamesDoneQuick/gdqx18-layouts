import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
const {
  customElement,
  property
} = Polymer.decorators;
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */

let AtomOotbingoBoard = class AtomOotbingoBoard extends Polymer.MutableData(Polymer.Element) {
  /**
   * @customElement
   * @polymer
   * @appliesMixin Polymer.MutableData
   */
  constructor() {
    super(...arguments);
    this.lineFocused = true;
  }

  _computeLineFocused(lineFocused) {
    return lineFocused;
  }

  _calcCells(cells, selectedLine, lineFocused) {
    if (!lineFocused || !selectedLine) {
      return cells;
    }

    switch (selectedLine) {
      case 'row1':
      case 'row2':
      case 'row3':
      case 'row4':
      case 'row5':
        {
          const rowIndex = parseInt(selectedLine.slice(3), 10) - 1;
          const rowStart = rowIndex * 5;
          return cells.slice(rowStart, rowStart + 5);
        }

      case 'col1':
      case 'col2':
      case 'col3':
      case 'col4':
      case 'col5':
        {
          const columnStart = parseInt(selectedLine.slice(3), 10) - 1;
          return [cells[columnStart], cells[columnStart + 5], cells[columnStart + 10], cells[columnStart + 15], cells[columnStart + 20]];
        }

      case 'tl-br':
        {
          return [cells[0], cells[6], cells[12], cells[18], cells[24]];
        }

      case 'bl-tr':
        {
          return [cells[20], cells[16], cells[12], cells[8], cells[4]];
        }

      default:
        return cells;
    }
  }

  _calcComplete(cell) {
    if (!cell || !cell.colors) {
      return false;
    }

    return cell.colors.length > 0 && cell.colors !== 'none' && cell.colors !== 'blank';
  }

};

tslib_1.__decorate([property({
  type: Boolean,
  reflectToAttribute: true,
  computed: '_computeLineFocused(board.lineFocused)'
})], AtomOotbingoBoard.prototype, "lineFocused", void 0);

AtomOotbingoBoard = tslib_1.__decorate([customElement('atom-ootbingo-board')], AtomOotbingoBoard);
export default AtomOotbingoBoard;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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