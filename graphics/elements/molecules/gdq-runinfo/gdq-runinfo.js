import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
const {
  customElement,
  property
} = Polymer.decorators;
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
    this.estimate = newVal.estimate; // Avoids some issues that can arise on the first time that fitText is run.
    // Currently unsure why these issues happen.

    if (this.initialized) {
      this.fitText();
    } else {
      Polymer.RenderStatus.afterNextRender(this, this.fitText);
      this.initialized = true;
    }
  }

  fitText() {
    Polymer.flush();
    window.textFit(this.$.name, {
      maxFontSize: this.maxNameSize
    });
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

    return name.split('\\n').map(lineText => `<div class="name-line">${lineText}</div>`).join('\n');
  }

};

tslib_1.__decorate([property({
  type: Number
})], GdqRuninfo.prototype, "maxNameSize", void 0);

tslib_1.__decorate([property({
  type: Boolean,
  reflectToAttribute: true
})], GdqRuninfo.prototype, "forceSingleLineName", void 0);

tslib_1.__decorate([property({
  type: String
})], GdqRuninfo.prototype, "estimate", void 0);

tslib_1.__decorate([property({
  type: String
})], GdqRuninfo.prototype, "releaseYear", void 0);

tslib_1.__decorate([property({
  type: String
})], GdqRuninfo.prototype, "console", void 0);

tslib_1.__decorate([property({
  type: String
})], GdqRuninfo.prototype, "category", void 0);

tslib_1.__decorate([property({
  type: String
})], GdqRuninfo.prototype, "name", void 0);

GdqRuninfo = tslib_1.__decorate([customElement('gdq-runinfo')], GdqRuninfo);
export default GdqRuninfo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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