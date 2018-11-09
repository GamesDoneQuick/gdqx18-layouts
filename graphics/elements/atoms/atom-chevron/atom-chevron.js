import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import CSSReflectionMixin from "../../../mixins/CSSReflectionMixin.js";
window.addEventListener('load', () => {
  var AtomChevron_1;
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

  AtomChevron = AtomChevron_1 = tslib_1.__decorate([customElement('atom-chevron')], AtomChevron); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtomChevron = AtomChevron;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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