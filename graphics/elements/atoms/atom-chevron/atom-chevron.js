var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import CSSReflectionMixin from "../../../mixins/CSSReflectionMixin.js";
const SVG = window.svgjs;
window.addEventListener('load', () => {
  var AtomChevron_1;
  const {
    customElement,
    property
  } = Polymer.decorators;
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

  __decorate([property({
    type: String,
    reflectToAttribute: true
  })], AtomChevron.prototype, "direction", void 0);

  __decorate([property({
    type: Boolean
  })], AtomChevron.prototype, "noAutoRender", void 0);

  AtomChevron = AtomChevron_1 = __decorate([customElement('atom-chevron')], AtomChevron); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtomChevron = AtomChevron;
});