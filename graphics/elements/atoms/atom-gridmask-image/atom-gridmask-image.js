import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, TweenLite, Sine } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import Random from "../../../../shared/lib/vendor/random.js";
const {
  customElement,
  property
} = Polymer.decorators;
const SVG = window.svgjs || window.SVG;
/**
 * @customElement
 * @polymer
 */

let AtomGridmaskImage = class AtomGridmaskImage extends Polymer.Element {
  /**
   * @customElement
   * @polymer
   */
  constructor() {
    super(...arguments);
    this.strokeSize = 0;
    this.withBackground = false;
    this.cellSize = 21;
    this.cellStagger = 0.002;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
     */

    this.preserveAspectRatio = 'xMidYMid';
    this.entering = false;
    this.exiting = false;
    this._initialized = false;
  }

  ready() {
    super.ready();

    this._initSVG();
  }

  connectedCallback() {
    super.connectedCallback();
    Polymer.RenderStatus.beforeNextRender(this, () => {
      TweenLite.set(this.$svg.imageMaskCells, {
        opacity: 0
      });
    });
  }

  enter() {
    const tl = new TimelineLite();
    const shuffledMaskCells = Random.shuffle(Random.engines.browserCrypto, this.$svg.imageMaskCells.slice(0));
    let didImageEntranceOnStart;
    tl.staggerTo(shuffledMaskCells, 0.224, {
      opacity: 1,
      ease: Sine.easeInOut,
      onStart: () => {
        // We only want this onStart handler to run once.
        // There is no "onStartAll" equivalent, only an "onCompleteAll".
        if (didImageEntranceOnStart) {
          return;
        }

        didImageEntranceOnStart = true;
        this.entering = true;
      }
    }, this.cellStagger, 0, () => {
      this.entering = false;
      this.dispatchEvent(new CustomEvent('entered'));
    });
    return tl;
  }

  exit(options = {}) {
    const tl = new TimelineLite();
    const shuffledMaskCells = Random.shuffle(Random.engines.browserCrypto, this.$svg.imageMaskCells.slice(0));
    let didOnStart = false;
    tl.staggerTo(shuffledMaskCells, 0.224, {
      opacity: 0,
      ease: Sine.easeInOut,
      onStart: () => {
        // We only want this onStart handler to run once.
        // There is no "onStartAll" equivalent, only an "onCompleteAll".
        if (didOnStart) {
          return;
        }

        didOnStart = true;
        this.exiting = true;
      }
    }, this.cellStagger, 0, () => {
      if (typeof options.onComplete === 'function') {
        options.onComplete();
      }

      this.exiting = false;
      this.dispatchEvent(new CustomEvent('exited'));
    });
    return tl;
  }

  _initSVG() {
    if (this._initialized) {
      throw new Error('this element has already been initialized');
    }

    this._initialized = true;
    this.$svg = {};
    const STROKE_SIZE = this.strokeSize;
    const ELEMENT_WIDTH = this.clientWidth;
    const ELEMENT_HEIGHT = this.clientHeight;
    const IMAGE_MASK_CELL_SIZE = this.cellSize;
    const IMAGE_MASK_ROWS = Math.ceil(ELEMENT_HEIGHT / IMAGE_MASK_CELL_SIZE);
    const IMAGE_MASK_COLUMNS = Math.ceil(ELEMENT_WIDTH / IMAGE_MASK_CELL_SIZE);
    const svgDoc = SVG(this);
    const mask = svgDoc.mask();
    const image = svgDoc.image(this.fallbackSrc);
    this.$svg.svgDoc = svgDoc;
    this.$svg.image = image;
    this.$svg.imageMaskCells = [];
    image.attr({
      preserveAspectRatio: this.preserveAspectRatio
    });

    if (this.withBackground) {
      const bgRect = svgDoc.rect();
      bgRect.fill({
        color: 'black',
        opacity: 0.25
      });
      this.$svg.bgRect = bgRect;

      if (STROKE_SIZE > 0) {
        bgRect.stroke({
          color: 'white',
          // Makes it effectively STROKE_SIZE, because all SVG strokes
          // are center strokes, and the outer half is cut off.
          width: STROKE_SIZE * 2
        });
        image.move(STROKE_SIZE, STROKE_SIZE);
      }
    } // Generate the exitMask rects


    for (let r = 0; r < IMAGE_MASK_ROWS; r++) {
      const y = r * IMAGE_MASK_CELL_SIZE;

      for (let c = 0; c < IMAGE_MASK_COLUMNS; c++) {
        const x = c * IMAGE_MASK_CELL_SIZE;
        const rect = svgDoc.rect(IMAGE_MASK_CELL_SIZE, IMAGE_MASK_CELL_SIZE);
        rect.move(x, y);
        rect.fill({
          color: '#FFFFFF'
        });
        mask.add(rect);
        this.$svg.imageMaskCells.push(rect);
      }
    }

    image.front();
    image.maskWith(mask);
    this.resize();
  }

  resize() {
    if (!this._initialized) {
      return;
    }

    const STROKE_SIZE = this.strokeSize;
    const ELEMENT_WIDTH = this.clientWidth;
    const ELEMENT_HEIGHT = this.clientHeight;
    this.$svg.svgDoc.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);
    this.$svg.image.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);

    if (this.withBackground) {
      this.$svg.bgRect.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);

      if (STROKE_SIZE > 0) {
        // Mirror such that drawSVG anims start from the top right
        // and move clockwise to un-draw, counter-clockwise to draw.
        this.$svg.bgRect.transform({
          scaleX: -1,
          x: ELEMENT_WIDTH
        });
        this.$svg.image.size(ELEMENT_WIDTH - STROKE_SIZE * 2, ELEMENT_HEIGHT - STROKE_SIZE * 2);
      }
    }
  }

};

tslib_1.__decorate([property({
  type: Number
})], AtomGridmaskImage.prototype, "strokeSize", void 0);

tslib_1.__decorate([property({
  type: Boolean
})], AtomGridmaskImage.prototype, "withBackground", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomGridmaskImage.prototype, "cellSize", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomGridmaskImage.prototype, "cellStagger", void 0);

tslib_1.__decorate([property({
  type: String
})], AtomGridmaskImage.prototype, "fallbackSrc", void 0);

tslib_1.__decorate([property({
  type: String
})], AtomGridmaskImage.prototype, "preserveAspectRatio", void 0);

tslib_1.__decorate([property({
  type: Boolean,
  notify: true
})], AtomGridmaskImage.prototype, "entering", void 0);

tslib_1.__decorate([property({
  type: Boolean,
  notify: true
})], AtomGridmaskImage.prototype, "exiting", void 0);

tslib_1.__decorate([property({
  type: Boolean
})], AtomGridmaskImage.prototype, "_initialized", void 0);

AtomGridmaskImage = tslib_1.__decorate([customElement('atom-gridmask-image')], AtomGridmaskImage);
export default AtomGridmaskImage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tZ3JpZG1hc2staW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVEsWUFBUixFQUFzQixTQUF0QixFQUFpQyxJQUFqQyxRQUE0QyxvREFBNUM7QUFDQSxPQUFPLE1BQVAsTUFBbUIseUNBQW5CO0FBRUEsTUFBTTtBQUFDLEVBQUEsYUFBRDtBQUFnQixFQUFBO0FBQWhCLElBQTRCLE9BQU8sQ0FBQyxVQUExQztBQUNBLE1BQU0sR0FBRyxHQUFLLE1BQWMsQ0FBQyxLQUFmLElBQXlCLE1BQWMsQ0FBQyxHQUF0RDtBQUVBOzs7OztBQUtBLElBQXFCLGlCQUFpQixHQUF0QyxNQUFxQixpQkFBckIsU0FBK0MsT0FBTyxDQUFDLE9BQXZELENBQThEO0FBTDlEOzs7O0FBSUEsRUFBQSxXQUFBLEdBQUE7O0FBR0MsU0FBQSxVQUFBLEdBQWEsQ0FBYjtBQUdBLFNBQUEsY0FBQSxHQUFpQixLQUFqQjtBQUdBLFNBQUEsUUFBQSxHQUFXLEVBQVg7QUFHQSxTQUFBLFdBQUEsR0FBYyxLQUFkO0FBS0E7Ozs7QUFJQSxTQUFBLG1CQUFBLEdBQXNCLFVBQXRCO0FBR0EsU0FBQSxRQUFBLEdBQVcsS0FBWDtBQUdBLFNBQUEsT0FBQSxHQUFVLEtBQVY7QUFHQSxTQUFBLFlBQUEsR0FBZSxLQUFmO0FBc0tBOztBQTdKQSxFQUFBLEtBQUssR0FBQTtBQUNKLFVBQU0sS0FBTjs7QUFDQSxTQUFLLFFBQUw7QUFDQTs7QUFFRCxFQUFBLGlCQUFpQixHQUFBO0FBQ2hCLFVBQU0saUJBQU47QUFDQSxJQUFBLE9BQU8sQ0FBQyxZQUFSLENBQXFCLGdCQUFyQixDQUFzQyxJQUF0QyxFQUE0QyxNQUFLO0FBQ2hELE1BQUEsU0FBUyxDQUFDLEdBQVYsQ0FBYyxLQUFLLElBQUwsQ0FBVSxjQUF4QixFQUF3QztBQUFDLFFBQUEsT0FBTyxFQUFFO0FBQVYsT0FBeEM7QUFDQSxLQUZEO0FBR0E7O0FBRUQsRUFBQSxLQUFLLEdBQUE7QUFDSixVQUFNLEVBQUUsR0FB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