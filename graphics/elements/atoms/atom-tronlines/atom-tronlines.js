import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
var AtomTronlines_1;
import Random from "../../../../shared/lib/vendor/random.js";
import * as createjs from "/bundles/gdqx18-layouts/node_modules/@createjs/easeljs/dist/easeljs.module.js";
import * as d3 from "/bundles/gdqx18-layouts/node_modules/d3-random/src/index.js";
const {
  customElement,
  property,
  observe
} = Polymer.decorators;
const fooMap = new WeakMap();
/**
 * @customElement
 * @polymer
 */

let AtomTronlines = AtomTronlines_1 = class AtomTronlines extends Polymer.Element {
  /**
   * @customElement
   * @polymer
   */
  constructor() {
    super(...arguments);
    /**
     * The width of the canvas.
     */

    this.width = 450;
    /**
     * The height of the canvas.
     */

    this.height = 300;
    /**
     * The solid background color of the canvas.
     */

    this.backgroundColor = '#050505';
    /**
     * The direction of travel for the nodes.
     * Can be one of "up", "down", "left", or "right".
     */

    this.direction = 'up';
    /**
     * The width and height of each node, in pixels.
     */

    this.nodeSize = 2;
    /**
     * Nodes created per second.
     */

    this.creationRate = 20;
    /**
     * Expected distance traveled per frame, in pixels.
     * This is the "mu" value of the normal distribution.
     */

    this.speed = 1.5;
    /**
     * Variance in speed per node.
     * This is the "sigma" of the normal distribution.
     */

    this.speedRandomness = 0.25;
    /**
     * Expected distance tail length, in pixels.
     * This is the "mu" value of the normal distribution.
     */

    this.tailLength = 200;
    /**
     * Variance in tail length per node.
     * This is the "sigma" of the normal distribution.
     */

    this.tailLengthRandomness = 5;
    /**
     * The opacity of each node at the start of its path.
     */

    this.opacityStart = 0.5;
    /**
     * The opacity of each node at the end of its path.
     */

    this.opacityEnd = 0.2;
    /**
     * The color of the head of each node.
     */

    this.nodeColor = '#6082d6';
    /**
     * The starting color of the tail of each node.
     */

    this.tailStartColor = '#02a6ff';
    /**
     * The ending color of the tail of each node.
     */

    this.tailEndColor = '#0079ff';
    this.debug = false;
    /**
     * An array containing all nodes currently being drawn to the stage.
     */

    this._allocatedNodes = new Set();
    /**
     * An array containing all nodes currently unallocated.
     */

    this._freeNodes = new Set();
  }

  static getRandomUniform(min = 0, max = 1) {
    return Random.real(min, max, true)(Random.engines.browserCrypto);
  }

  ready() {
    super.ready();
    let frameCounter = 0;
    let warnedLeak = false;
    const stage = new createjs.Stage(this.$.canvas);
    const bg = new createjs.Shape();
    this.bgFillCommand = bg.graphics.beginFill(this.backgroundColor).command;
    this.bgRectCommand = bg.graphics.drawRect(0, 0, this.width, this.height).command;
    stage.addChild(bg);
    this.stage = stage;

    const handleFrame = () => {
      if (window.__SCREENSHOT_TESTING__) {
        this.clear();
        stage.update();
        return;
      }

      this.advanceSimulation();

      if (this.debug) {
        const totalNodes = this._allocatedNodes.size + this._freeNodes.size;
        this.$.debugInfo.textContent = `${this._allocatedNodes.size}/${totalNodes}`;
      }

      frameCounter++;

      if (frameCounter > 60) {
        frameCounter = 0;

        if (this._allocatedNodes.size > AtomTronlines_1.WARNING_THRESHOLD) {
          if (!warnedLeak) {
            console.warn('More than %d nodes are active, this is probably a leak!', AtomTronlines_1.WARNING_THRESHOLD, this);
            warnedLeak = true;
          }
        } else {
          warnedLeak = false;
        }
      }

      stage.update();
      requestAnimationFrame(handleFrame);
    };

    handleFrame();
    setInterval(() => {
      this._sweepExcessFreeNodes();
    }, 10000);
  }
  /**
   * Advances the simulation by one tick.
   * In most cases, this means one frame in a 60fps simulation.
   */


  advanceSimulation() {
    const opacityRange = Math.abs(this.opacityStart - this.opacityEnd);
    const tickTime = Date.now();
    const TIME_PER_TICK_IDEAL = 1000 / 60;
    Array.from(this._allocatedNodes).forEach(node => {
      let percent = 1;

      if (node.lastTickTime) {
        percent = (tickTime - node.lastTickTime) / TIME_PER_TICK_IDEAL;
      }

      node.y -= node.speed * percent;
      const journeyPercentage = 1 - node.y / (this._invertDimensions ? this.width : this.height);
      node.alpha = this.opacityStart - opacityRange * journeyPercentage;
      node.lastTickTime = tickTime; // If a node's alpha is less than zero, remove it.
      // Or a node has completely scrolled off the canvas, remove it.

      if (node.alpha <= 0 || node.y + node.tailLength <= 0) {
        this._freeNode(node);
      }
    });
  }
  /**
   * Clears all nodes from the canvas.
   * @param deep - If true, also deletes all created nodes in the freeNodes pool.
   */


  clear(deep) {
    this._freeAllNodes();

    if (deep) {
      this._freeNodes = new Set();
    }
  }

  _creationRateChanged(newVal) {
    if (this._creationInterval) {
      clearInterval(this._creationInterval);
    }

    this._creationInterval = window.setInterval(() => {
      if (this._freeNodes.size <= 0) {
        this._createBlockOfFreeNodes(AtomTronlines_1.BLOCK_SIZE);
      }

      const node = this._freeNodes.values().next().value;

      this._allocateNode(node);
    }, 1000 / newVal);
  }
  /**
   * Creates and adds a block of new nodes to the _freeNodes array.
   * @param blockSize - The number of nodes to add.
   */


  _createBlockOfFreeNodes(blockSize) {
    for (let i = 0; i < blockSize; i++) {
      this._freeNodes.add(this._createNode());
    }
  }
  /**
   * Creates a new node instance.
   * @returns The created node instance.
   */


  _createNode() {
    const shape = new createjs.Shape();
    const maxTailLength = this.tailLength + this.tailLengthRandomness; // The typings for the getRGB method are currently incorrect, so just ignore them.

    const tailMidColor = createjs.Graphics.getRGB(parseInt(this.tailEndColor.slice(1), 16), 0.5);
    const tailEndColor = createjs.Graphics.getRGB(parseInt(this.tailEndColor.slice(1), 16), 0);
    const metadata = {
      tailGradientCommand: shape.graphics.beginLinearGradientFill([this.tailStartColor, tailMidColor, tailEndColor], [0, 0.5, 1], 0, 0, 0, maxTailLength).command,
      tailRectCommand: shape.graphics.drawRect(0, 0, this.nodeSize, 0).command,
      tailLength: 0,
      speed: 0,
      lastTickTime: null
    };
    fooMap.set(shape, metadata);
    shape.graphics.beginFill(this.nodeColor).drawRect(0, 0, this.nodeSize, this.nodeSize);
    shape.cache(0, 0, this.nodeSize, maxTailLength);
    return shape;
  }
  /**
   * Adds a node to the stage.
   * @param node - The node to add to the stage.
   */


  _allocateNode(node) {
    const tailLength = this._getRandomTailLength();

    const metadata = fooMap.get(node);
    metadata.tailGradientCommand.style.props.ratios[0] = Math.min(this.nodeSize / this.tailLength, 1);
    metadata.tailGradientCommand.style.props.y1 = tailLength;
    metadata.tailRectCommand.h = tailLength;
    metadata.tailLength = tailLength;
    metadata.speed = this._getRandomSpeed();
    metadata.lastTickTime = null;
    node.updateCache();
    node.alpha = this.opacityStart;
    node.y = this._invertDimensions ? this.width : this.height;
    node.x = AtomTronlines_1.getRandomUniform(0, this._invertDimensions ? this.height : this.width);
    this.stage.addChild(node);

    this._freeNodes.delete(node);

    this._allocatedNodes.add(node);
  }
  /**
   * Removes all nodes from the stage, returning them to the pool.
   */


  _freeAllNodes() {
    this._allocatedNodes.forEach(node => {
      this._freeNode(node);
    });
  }
  /**
   * Frees a node, removing it from the stage and returning it to the pool.
   * @param node - The node to free.
   */


  _freeNode(node) {
    this.stage.removeChild(node);

    this._allocatedNodes.delete(node);

    this._freeNodes.add(node);
  }
  /**
   * Removes excess free nodes.
   * Excess free nodes are caused by tabbing away from the page,
   * or after lowering the node creation rate.
   */


  _sweepExcessFreeNodes() {
    if (this._freeNodes.size > AtomTronlines_1.BLOCK_SIZE * 2) {
      const freeNodesToKeep = Array.from(this._freeNodes).slice(0, AtomTronlines_1.BLOCK_SIZE);
      this._freeNodes = new Set(freeNodesToKeep);
    }
  }

  _computeRandomSpeedFunc(speed, speedRandomness) {
    return d3.randomNormal.source(AtomTronlines_1.getRandomUniform)(speed, speedRandomness);
  }

  _computeRandomTailLengthFunc(tailLength, tailLengthRandomness) {
    return d3.randomNormal.source(AtomTronlines_1.getRandomUniform)(tailLength, tailLengthRandomness);
  }

  _resizeCanvas(width, height, direction) {
    this.style.width = `${width}px`;
    this.style.height = `${height}px`;
    /* tslint:disable:no-parameter-reassignment */

    if (direction === 'left' || direction === 'right') {
      const temp = width;
      width = height;
      height = temp;
    }
    /* tslint:enable:no-parameter-reassignment */


    this.$.canvas.width = width;
    this.$.canvas.height = height;

    if (this.bgRectCommand) {
      this.bgRectCommand.w = width;
      this.bgRectCommand.h = height;
    }
  }

  _computeInvertDimensions(direction) {
    return direction === 'left' || direction === 'right';
  }

  _backgroundColorChanged(newValue) {
    if (!this.bgFillCommand) {
      return;
    }

    this.bgFillCommand.style = newValue;
  }

};
AtomTronlines.BLOCK_SIZE = 50;
AtomTronlines.WARNING_THRESHOLD = 500;

tslib_1.__decorate([property({
  type: Number
})], AtomTronlines.prototype, "width", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomTronlines.prototype, "height", void 0);

tslib_1.__decorate([property({
  type: Boolean,
  computed: '_computeInvertDimensions(direction)'
})], AtomTronlines.prototype, "_invertDimensions", void 0);

tslib_1.__decorate([property({
  type: String,
  observer: AtomTronlines_1.prototype._backgroundColorChanged
})], AtomTronlines.prototype, "backgroundColor", void 0);

tslib_1.__decorate([property({
  type: String,
  reflectToAttribute: true
})], AtomTronlines.prototype, "direction", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomTronlines.prototype, "nodeSize", void 0);

tslib_1.__decorate([property({
  type: Number,
  observer: AtomTronlines_1.prototype._creationRateChanged
})], AtomTronlines.prototype, "creationRate", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomTronlines.prototype, "speed", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomTronlines.prototype, "speedRandomness", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomTronlines.prototype, "tailLength", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomTronlines.prototype, "tailLengthRandomness", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomTronlines.prototype, "opacityStart", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomTronlines.prototype, "opacityEnd", void 0);

tslib_1.__decorate([property({
  type: String
})], AtomTronlines.prototype, "nodeColor", void 0);

tslib_1.__decorate([property({
  type: String
})], AtomTronlines.prototype, "tailStartColor", void 0);

tslib_1.__decorate([property({
  type: String
})], AtomTronlines.prototype, "tailEndColor", void 0);

tslib_1.__decorate([property({
  type: Boolean,
  reflectToAttribute: true
})], AtomTronlines.prototype, "debug", void 0);

tslib_1.__decorate([property({
  type: Object,
  computed: '_computeRandomSpeedFunc(speed, speedRandomness)'
})], AtomTronlines.prototype, "_getRandomSpeed", void 0);

tslib_1.__decorate([property({
  type: Object,
  computed: '_computeRandomTailLengthFunc(tailLength, tailLengthRandomness)'
})], AtomTronlines.prototype, "_getRandomTailLength", void 0);

tslib_1.__decorate([observe('width', 'height', 'direction')], AtomTronlines.prototype, "_resizeCanvas", null);

AtomTronlines = AtomTronlines_1 = tslib_1.__decorate([customElement('atom-tronlines')], AtomTronlines);
export default AtomTronlines;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU1BLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxFQUFBLElBQUksRUFBRTtBQUFQLENBQUQsQ0FDVCxDQUFBLEUsdUJBQUEsRSxZQUFBLEUsS0FBeUIsQ0FBekI7O0FBTUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURDLFFBQVEsQ0FBQztBQUFDLEVBQUEsSUFBSSxFQUFFO0FBQVAsQ0FBRCxDQUNULENBQUEsRSx1QkFBQSxFLFdBQUEsRSxLQUE4QixDQUE5Qjs7QUFNQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsRUFBQSxJQUFJLEVBQUU7QUFBUCxDQUFELENBQ1QsQ0FBQSxFLHVCQUFBLEUsZ0JBQUEsRSxLQUFtQyxDQUFuQzs7QUFNQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsRUFBQSxJQUFJLEVBQUU7QUFBUCxDQUFELENBQ1QsQ0FBQSxFLHVCQUFBLEUsY0FBQSxFLEtBQWlDLENBQWpDOztBQUdBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxFQUFBLElBQUksRUFBRSxPQUFQO0FBQWdCLEVBQUEsa0JBQWtCLEVBQUU7QUFBcEMsQ0FBRCxDQUNULENBQUEsRSx1QkFBQSxFLE9BQUEsRSxLQUF1QixDQUF2Qjs7QUFhQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBREMsUUFBUSxDQUFDO0FBQUMsRUFBQSxJQUFJLEVBQUUsTUFBUDtBQUFlLEVBQUEsUUFBUSxFQUFFO0FBQXpCLENBQUQsQ0FDVCxDQUFBLEUsdUJBQUEsRSxpQkFBQSxFLEtBQTBCLENBQTFCOztBQUdBLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxRQUFRLENBQUM7QUFBQyxFQUFBLElBQUksRUFBRSxNQUFQO0FBQWUsRUFBQSxRQUFRLEVBQUU7QUFBekIsQ0FBRCxDQUNULENBQUEsRSx1QkFBQSxFLHNCQUFBLEUsS0FBK0IsQ0FBL0I7O0FBc09BLE9BQUEsQ0FBQSxVQUFBLENBQUEsQ0FEQyxPQUFPLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsV0FBcEIsQ0FDUixDQUFBLEUsdUJBQUEsRSxlQUFBLEVBbUJDLElBbkJEOztBQWhXb0IsYUFBYSxHQUFBLGVBQUEsR0FBQSxPQUFBLENBQUEsVUFBQSxDQUFBLENBRGpDLGFBQWEsQ0FBQyxnQkFBRCxDQUNvQixDQUFBLEVBQWIsYUFBYSxDQUFiO2VBQUEsYSIsInNvdXJjZVJvb3QiOiIifQ==