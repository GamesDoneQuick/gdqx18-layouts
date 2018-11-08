import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, TweenLite, Sine } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
import * as Random from "/bundles/gdqx18-layouts/node_modules/random-js/lib/random.js";
const SVG = window.svgjs || window.SVG;
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
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
      Polymer.RenderStatus.beforeNextRender(this, () => {
        this._initSVG();

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

  AtomGridmaskImage = tslib_1.__decorate([customElement('atom-gridmask-image')], AtomGridmaskImage); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtomGridmaskImage = AtomGridmaskImage;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tZ3JpZG1hc2staW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVEsWUFBUixFQUFzQixTQUF0QixFQUFpQyxJQUFqQyxRQUE0QyxvREFBNUM7QUFDQSxPQUFPLEtBQUssTUFBWixNQUF3Qiw4REFBeEI7QUFDQSxNQUFNLEdBQUcsR0FBSyxNQUFjLENBQUMsS0FBZixJQUF5QixNQUFjLENBQUMsR0FBdEQ7QUFxQkEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLE1BQUs7QUFDcEMsUUFBTTtBQUFDLElBQUEsYUFBRDtBQUFnQixJQUFBO0FBQWhCLE1BQTRCLE9BQU8sQ0FBQyxVQUExQztBQUVBOzs7OztBQUtBLE1BQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQU4sU0FBZ0MsT0FBTyxDQUFDLE9BQXhDLENBQStDO0FBTC9DOzs7O0FBSUEsSUFBQSxXQUFBLEdBQUE7O0FBR0MsV0FBQSxVQUFBLEdBQWEsQ0FBYjtBQUdBLFdBQUEsY0FBQSxHQUFpQixLQUFqQjtBQUdBLFdBQUEsUUFBQSxHQUFXLEVBQVg7QUFHQSxXQUFBLFdBQUEsR0FBYyxLQUFkO0FBS0E7Ozs7QUFJQSxXQUFBLG1CQUFBLEdBQXNCLFVBQXRCO0FBR0EsV0FBQSxRQUFBLEdBQVcsS0FBWDtBQUdBLFdBQUEsT0FBQSxHQUFVLEtBQVY7QUFHQSxXQUFBLFlBQUEsR0FBZSxLQUFmO0FBa0tBOztBQXpKQSxJQUFBLEtBQUssR0FBQTtBQUNKLFlBQU0sS0FBTjtBQUNBLE1BQUEsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsZ0JBQXJCLENBQXNDLElBQXRDLEVBQTRDLE1BQUs7QUFDaEQsYUFBSyxRQUFMOztBQUNBLFFBQUEsU0FBUyxDQUFDLEdBQVYsQ0FBYyxLQUFLLElBQUwsQ0FBVSxjQUF4QixFQUF3QztBQUFDLFVBQUEsT0FBTyxFQUFFO0FBQVYsU0FBeEM7QUFDQSxPQUhEO0FBSUE7O0FBRUQsSUFBQSxLQUFLLEdBQUE7QUFDSixZQUFNLEVBQUUsR0FBRyxJQUFJLFlBQUosRUFBWDtBQUNBLFlBQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLE9BQVAsQ0FDekIsTUFBTSxDQUFDLE9BQVAsQ0FBZSxhQURVLEVBRXpCLEtBQUssSUFBTCxDQUFVLGNBQVYsQ0FBeUIsS0FBekIsQ0FBK0IsQ0FBL0IsQ0FGeUIsQ0FBMUI7QUFLQSxVQUFJLHVCQUFKO0FBQ0EsTUFBQSxFQUFFLENBQUMsU0FBSCxDQUFhLGlCQUFiLEVBQWdDLEtBQWhDLEVBQXVDO0FBQ3RDLFFBQUEsT0FBTyxFQUFFLENBRDZCO0FBRXRDLFFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUYyQjtBQUd0QyxRQUFBLE9BQU8sRUFBRSxNQUFLO0FBQ2I7QUFDQTtBQUNBLGNBQUksdUJBQUosRUFBNkI7QUFDNUI7QUFDQTs7QUFDRCxVQUFBLHVCQUF1QixHQUFHLElBQTFCO0FBQ0EsZUFBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0E7QUFYcUMsT0FBdkMsRUFZRyxLQUFLLFdBWlIsRUFZcUIsQ0FackIsRUFZd0IsTUFBSztBQUM1QixhQUFLLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxhQUFLLGFBQUwsQ0FBbUIsSUFBSSxXQUFKLENBQWdCLFNBQWhCLENBQW5CO0FBQ0EsT0FmRDtBQWlCQSxhQUFPLEVBQVA7QUFDQTs7QUFFRCxJQUFBLElBQUksQ0FBQyxPQUFBLEdBQW1DLEVBQXBDLEVBQXNDO0FBQ3pDLFlBQU0sRUFBRSxHQUFHLElBQUksWUFBSixFQUFYO0FBQ0EsWUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsT0FBUCxDQUN6QixNQUFNLENBQUMsT0FBUCxDQUFlLGFBRFUsRUFFekIsS0FBSyxJQUFMLENBQVUsY0FBVixDQUF5QixLQUF6QixDQUErQixDQUEvQixDQUZ5QixDQUExQjtBQUtBLFVBQUksVUFBVSxHQUFHLEtBQWpCO0FBQ0EsTUFBQSxFQUFFLENBQUMsU0FBSCxDQUFhLGlCQUFiLEVBQWdDLEtBQWhDLEVBQXVDO0FBQ3RDLFFBQUEsT0FBTyxFQUFFLENBRDZCO0FBRXRDLFFBQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUYyQjtBQUd0QyxRQUFBLE9BQU8sRUFBRSxNQUFLO0FBQ2I7QUFDQTtBQUNBLGNBQUksVUFBSixFQUFnQjtBQUNmO0FBQ0E7O0FBQ0QsVUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBLGVBQUssT0FBTCxHQUFlLElBQWY7QUFDQTtBQVhxQyxPQUF2QyxFQVlHLEtBQUssV0FaUixFQVlxQixDQVpyQixFQVl3QixNQUFLO0FBQzVCLFlBQUksT0FBTyxPQUFPLENBQUMsVUFBZixLQUE4QixVQUFsQyxFQUE4QztBQUM3QyxVQUFBLE9BQU8sQ0FBQyxVQUFSO0FBQ0E7O0FBQ0QsYUFBSyxPQUFMLEdBQWUsS0FBZjtBQUNBLGFBQUssYUFBTCxDQUFtQixJQUFJLFdBQUosQ0FBZ0IsUUFBaEIsQ0FBbkI7QUFDQSxPQWxCRDtBQW9CQSxhQUFPLEVBQVA7QUFDQTs7QUFFRCxJQUFBLFFBQVEsR0FBQTtBQUNQLFVBQUksS0FBSyxZQUFULEVBQXVCO0FBQ3RCLGNBQU0sSUFBSSxLQUFKLENBQVUsMkNBQVYsQ0FBTjtBQUNBOztBQUVELFdBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNDLFdBQWEsSUFBYixHQUFvQixFQUFwQjtBQUVELFlBQU0sV0FBVyxHQUFHLEtBQUssVUFBekI7QUFDQSxZQUFNLGFBQWEsR0FBRyxLQUFLLFdBQTNCO0FBQ0EsWUFBTSxjQUFjLEdBQUcsS0FBSyxZQUE1QjtBQUNBLFlBQU0sb0JBQW9CLEdBQUcsS0FBSyxRQUFsQztBQUNBLFlBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFMLENBQVUsY0FBYyxHQUFHLG9CQUEzQixDQUF4QjtBQUNBLFlBQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUwsQ0FBVSxhQUFhLEdBQUcsb0JBQTFCLENBQTNCO0FBRUEsWUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUQsQ0FBbEI7QUFDQSxZQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBUCxFQUFiO0FBQ0EsWUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQVAsQ0FBYSxLQUFLLFdBQWxCLENBQWQ7QUFDQSxXQUFLLElBQUwsQ0FBVSxNQUFWLEdBQW1CLE1BQW5CO0FBQ0EsV0FBSyxJQUFMLENBQVUsS0FBVixHQUFrQixLQUFsQjtBQUNBLFdBQUssSUFBTCxDQUFVLGNBQVYsR0FBMkIsRUFBM0I7QUFFQSxNQUFBLEtBQUssQ0FBQyxJQUFOLENBQVc7QUFBQyxRQUFBLG1CQUFtQixFQUFFLEtBQUs7QUFBM0IsT0FBWDs7QUFFQSxVQUFJLEtBQUssY0FBVCxFQUF5QjtBQUN4QixjQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBUCxFQUFmO0FBQ0EsUUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZO0FBQUMsVUFBQSxLQUFLLEVBQUUsT0FBUjtBQUFpQixVQUFBLE9BQU8sRUFBRTtBQUExQixTQUFaO0FBRUEsYUFBSyxJQUFMLENBQVUsTUFBVixHQUFtQixNQUFuQjs7QUFFQSxZQUFJLFdBQVcsR0FBRyxDQUFsQixFQUFxQjtBQUNwQixVQUFBLE1BQU0sQ0FBQyxNQUFQLENBQWM7QUFDYixZQUFBLEtBQUssRUFBRSxPQURNO0FBR2I7QUFDQTtBQUNBLFlBQUEsS0FBSyxFQUFFLFdBQVcsR0FBRztBQUxSLFdBQWQ7QUFRQSxVQUFBLEtBQUssQ0FBQyxJQUFOLENBQVcsV0FBWCxFQUF3QixXQUF4QjtBQUNBO0FBQ0QsT0F6Q00sQ0EyQ1A7OztBQUNBLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBYixFQUFnQixDQUFDLEdBQUcsZUFBcEIsRUFBcUMsQ0FBQyxFQUF0QyxFQUEwQztBQUN6QyxjQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsb0JBQWQ7O0FBQ0EsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFiLEVBQWdCLENBQUMsR0FBRyxrQkFBcEIsRUFBd0MsQ0FBQyxFQUF6QyxFQUE2QztBQUM1QyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLG9CQUFkO0FBQ0EsZ0JBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFQLENBQVksb0JBQVosRUFBa0Msb0JBQWxDLENBQWI7QUFDQSxVQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsQ0FBVixFQUFhLENBQWI7QUFDQSxVQUFBLElBQUksQ0FBQyxJQUFMLENBQVU7QUFBQyxZQUFBLEtBQUssRUFBRTtBQUFSLFdBQVY7QUFDQSxVQUFBLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBVDtBQUNBLGVBQUssSUFBTCxDQUFVLGNBQVYsQ0FBeUIsSUFBekIsQ0FBOEIsSUFBOUI7QUFDQTtBQUNEOztBQUVELE1BQUEsS0FBSyxDQUFDLEtBQU47QUFDQSxNQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBZjtBQUVBLFdBQUssTUFBTDtBQUNBOztBQUVELElBQUEsTUFBTSxHQUFBO0FBQ0wsVUFBSSxDQUFDLEtBQUssWUFBVixFQUF3QjtBQUN2QjtBQUNBOztBQUVELFlBQU0sV0FBVyxHQUFHLEtBQUssVUFBekI7QUFDQSxZQUFNLGFBQWEsR0FBRyxLQUFLLFdBQTNCO0FBQ0EsWUFBTSxjQUFjLEdBQUcsS0FBSyxZQUE1QjtBQUVBLFdBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FBc0IsYUFBdEIsRUFBcUMsY0FBckM7QUFDQSxXQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLElBQWhCLENBQXFCLGFBQXJCLEVBQW9DLGNBQXBDOztBQUVBLFVBQUksS0FBSyxjQUFULEVBQXlCO0FBQ3hCLGFBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FBc0IsYUFBdEIsRUFBcUMsY0FBckM7O0FBRUEsWUFBSSxXQUFXLEdBQUcsQ0FBbEIsRUFBcUI7QUFDcEI7QUFDQTtBQUNBLGVBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsU0FBakIsQ0FBMkI7QUFBQyxZQUFBLE1BQU0sRUFBRSxDQUFDLENBQVY7QUFBYSxZQUFBLENBQUMsRUFBRTtBQUFoQixXQUEzQjtBQUVBLGVBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsSUFBaEIsQ0FBcUIsYUFBYSxHQUFJLFdBQVcsR0FBRyxDQUFwRCxFQUF3RCxjQUFjLEdBQUksV0FBVyxHQUFHLENBQXhGO0FBQ0E7QUFDRDtBQUNEOztBQTlMNkMsR0FBL0M7O0FBRUMsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLDJCQUFBLEUsWUFBQSxFLEtBQWUsQ0FBZjs7QUFHQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRTtBQUFQLEdBQUQsQ0FDVCxDQUFBLEUsMkJBQUEsRSxnQkFBQSxFLEtBQXVCLENBQXZCOztBQUdBLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSwyQkFBQSxFLFVBQUEsRSxLQUFjLENBQWQ7O0FBR0EsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLDJCQUFBLEUsYUFBQSxFLEtBQW9CLENBQXBCOztBQUdBLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFO0FBQVAsR0FBRCxDQUNULENBQUEsRSwyQkFBQSxFLGFBQUEsRSxLQUFvQixDQUFwQjs7QUFNQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRTtBQUFQLEdBQUQsQ0FDVCxDQUFBLEUsMkJBQUEsRSxxQkFBQSxFLEtBQWlDLENBQWpDOztBQUdBLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLElBQUEsSUFBSSxFQUFFLE9BQVA7QUFBZ0IsSUFBQSxNQUFNLEVBQUU7QUFBeEIsR0FBRCxDQUNULENBQUEsRSwyQkFBQSxFLFVBQUEsRSxLQUFpQixDQUFqQjs7QUFHQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxJQUFBLElBQUksRUFBRSxPQUFQO0FBQWdCLElBQUEsTUFBTSxFQUFFO0FBQXhCLEdBQUQsQ0FDVCxDQUFBLEUsMkJBQUEsRSxTQUFBLEUsS0FBZ0IsQ0FBaEI7O0FBR0EsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsSUFBQSxJQUFJLEVBQUU7QUFBUCxHQUFELENBQ1QsQ0FBQSxFLDJCQUFBLEUsY0FBQSxFLEtBQXFCLENBQXJCOztBQTdCSyxFQUFBLGlCQUFpQixHQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEdEIsYUFBYSxDQUFDLHFCQUFELENBQ1MsQ0FBQSxFQUFqQixpQkFBaUIsQ0FBakIsQ0FSOEIsQ0F5TXBDOztBQUNDLEVBQUEsTUFBYyxDQUFDLGlCQUFmLEdBQW1DLGlCQUFuQztBQUNELENBM01EIiwic291cmNlUm9vdCI6IiJ9