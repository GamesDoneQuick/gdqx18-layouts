import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
var AtomChevron_1;
import CSSReflectionMixin from "../../../mixins/CSSReflectionMixin.js";
const {
  customElement,
  property
} = Polymer.decorators;
const SVG = window.svgjs;
/**
 * @customElement
 * @polymer
 */

let AtomChevron = AtomChevron_1 = class AtomChevron extends CSSReflectionMixin(Polymer.Element) {
  /**
   * @customElement
   * @polymer
   */
  constructor() {
    super(...arguments);
    /**
     * The direction the chevron should point.
     */

    this.direction = 'right';
    this.noAutoRender = false;
  }
  /**
   * Creates a new chevron shape as an SVG.js Polygon.
   * The chevron always points right.
   * If you need it to point another way, apply a transform to it.
   * @param width - How wide, in pixels, to draw the chevron.
   * @param height - How tall, in pixels, to draw the chevron.
   * @param thickness - How thick, in pixels, to draw the chevron.
   * @param fillColor - The color to apply to the interior of the chevron.
   * @param strokeSize - The thickness of the chevron border.
   * @param strokeColor - The color to apply to the border of the chevron.
   * @returns The constructed SVG.js Polygon instance.
   */


  static createChevron({
    width,
    height,
    thickness,
    fillColor,
    strokeSize,
    strokeColor
  }) {
    const chevron = new SVG.Polygon();
    const pointArray = AtomChevron_1.createChevronPointArray({
      width,
      height,
      thickness
    });
    chevron.plot(pointArray);
    chevron.fill(fillColor);

    if (strokeSize > 0) {
      chevron.stroke({
        width: strokeSize,
        color: strokeColor
      });
    }

    return chevron;
  }

  static createChevronPointArray({
    width,
    height,
    thickness
  }) {
    return new SVG.PointArray([[0, 0], [thickness, 0], [width, height / 2], [thickness, height], [0, height], [width - thickness, height / 2]]);
  }

  ready() {
    super.ready();
    this.svgDoc = SVG(this.shadowRoot);
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.noAutoRender) {
      if (document.readyState === 'complete') {
        Polymer.RenderStatus.afterNextRender(this, this.render);
      } else {
        window.addEventListener('load', () => {
          Polymer.RenderStatus.afterNextRender(this, this.render);
        });
      }
    }
  }

  render(width, height) {
    this.svgDoc.clear();
    /* tslint:disable:no-parameter-reassignment */

    width = typeof width === 'number' ? width : this.scrollWidth;
    height = typeof height === 'number' ? height : this.clientHeight;
    /* tslint:enable:no-parameter-reassignment */

    const strokeSize = parseInt(this.readCSSCustomProperty('--atom-chevron-stroke-size', AtomChevron_1.DEFAULT_STROKE_SIZE), 10);
    const thickness = parseInt(this.readCSSCustomProperty('--atom-chevron-thickness', AtomChevron_1.DEFAULT_THICKNESS), 10);
    this.svgDoc.size(width, height);
    const chevron = AtomChevron_1.createChevron({
      width: width - strokeSize,
      height: height - strokeSize,
      thickness,
      fillColor: this.readCSSCustomProperty('--atom-chevron-fill-color'),
      strokeSize,
      strokeColor: this.readCSSCustomProperty('--atom-chevron-stroke-color')
    });
    chevron.move(strokeSize / 2, strokeSize / 2);
    this.chevron = chevron;
    this.svgDoc.add(chevron);

    if (this.direction === 'left' && this._lastDirection !== 'left') {
      this.svgDoc.transform({
        scaleX: -1
      });
      this._lastDirection = 'left';
    }
  }

};

tslib_1.__decorate([property({
  type: String,
  reflectToAttribute: true
})], AtomChevron.prototype, "direction", void 0);

tslib_1.__decorate([property({
  type: Boolean
})], AtomChevron.prototype, "noAutoRender", void 0);

AtomChevron = AtomChevron_1 = tslib_1.__decorate([customElement('atom-chevron')], AtomChevron);
export default AtomChevron;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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