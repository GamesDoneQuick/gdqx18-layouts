import * as tslib_1 from "tslib";
var AtomTronlines_1;
import Random from '../../../../shared/lib/vendor/random';
import * as createjs from '@createjs/easeljs';
import * as d3 from 'd3-random';
const { customElement, property, observe } = Polymer.decorators;
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
        this.bgFillCommand = bg.graphics
            .beginFill(this.backgroundColor).command;
        this.bgRectCommand = bg.graphics
            .drawRect(0, 0, this.width, this.height).command;
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
                }
                else {
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
            const journeyPercentage = 1 - (node.y / (this._invertDimensions ? this.width : this.height));
            node.alpha = this.opacityStart - (opacityRange * journeyPercentage);
            node.lastTickTime = tickTime;
            // If a node's alpha is less than zero, remove it.
            // Or a node has completely scrolled off the canvas, remove it.
            if (node.alpha <= 0 || (node.y + node.tailLength) <= 0) {
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
        }, (1000 / newVal));
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
        const maxTailLength = this.tailLength + this.tailLengthRandomness;
        // The typings for the getRGB method are currently incorrect, so just ignore them.
        const tailMidColor = createjs.Graphics.getRGB(parseInt(this.tailEndColor.slice(1), 16), 0.5);
        const tailEndColor = createjs.Graphics.getRGB(parseInt(this.tailEndColor.slice(1), 16), 0);
        const metadata = {
            tailGradientCommand: shape.graphics
                .beginLinearGradientFill([this.tailStartColor, tailMidColor, tailEndColor], [0, 0.5, 1], 0, 0, 0, maxTailLength).command,
            tailRectCommand: shape.graphics
                .drawRect(0, 0, this.nodeSize, 0).command,
            tailLength: 0,
            speed: 0,
            lastTickTime: null
        };
        fooMap.set(shape, metadata);
        shape.graphics
            .beginFill(this.nodeColor)
            .drawRect(0, 0, this.nodeSize, this.nodeSize);
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
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlines.prototype, "width", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlines.prototype, "height", void 0);
tslib_1.__decorate([
    property({ type: Boolean, computed: '_computeInvertDimensions(direction)' })
], AtomTronlines.prototype, "_invertDimensions", void 0);
tslib_1.__decorate([
    property({ type: String, observer: AtomTronlines_1.prototype._backgroundColorChanged })
], AtomTronlines.prototype, "backgroundColor", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], AtomTronlines.prototype, "direction", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlines.prototype, "nodeSize", void 0);
tslib_1.__decorate([
    property({ type: Number, observer: AtomTronlines_1.prototype._creationRateChanged })
], AtomTronlines.prototype, "creationRate", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlines.prototype, "speed", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlines.prototype, "speedRandomness", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlines.prototype, "tailLength", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlines.prototype, "tailLengthRandomness", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlines.prototype, "opacityStart", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlines.prototype, "opacityEnd", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomTronlines.prototype, "nodeColor", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomTronlines.prototype, "tailStartColor", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomTronlines.prototype, "tailEndColor", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomTronlines.prototype, "debug", void 0);
tslib_1.__decorate([
    property({ type: Object, computed: '_computeRandomSpeedFunc(speed, speedRandomness)' })
], AtomTronlines.prototype, "_getRandomSpeed", void 0);
tslib_1.__decorate([
    property({ type: Object, computed: '_computeRandomTailLengthFunc(tailLength, tailLengthRandomness)' })
], AtomTronlines.prototype, "_getRandomTailLength", void 0);
tslib_1.__decorate([
    observe('width', 'height', 'direction')
], AtomTronlines.prototype, "_resizeCanvas", null);
AtomTronlines = AtomTronlines_1 = tslib_1.__decorate([
    customElement('atom-tronlines')
], AtomTronlines);
export default AtomTronlines;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS10cm9ubGluZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLXRyb25saW5lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sS0FBSyxRQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDaEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUM5RCxNQUFNLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBSTdCOzs7R0FHRztBQUVILElBQXFCLGFBQWEscUJBQWxDLE1BQXFCLGFBQWMsU0FBUSxPQUFPLENBQUMsT0FBTztJQUwxRDs7O09BR0c7SUFDSDs7UUFRQzs7V0FFRztRQUVILFVBQUssR0FBVyxHQUFHLENBQUM7UUFFcEI7O1dBRUc7UUFFSCxXQUFNLEdBQVcsR0FBRyxDQUFDO1FBS3JCOztXQUVHO1FBRUgsb0JBQWUsR0FBVyxTQUFTLENBQUM7UUFFcEM7OztXQUdHO1FBRUgsY0FBUyxHQUFjLElBQUksQ0FBQztRQUU1Qjs7V0FFRztRQUVILGFBQVEsR0FBVyxDQUFDLENBQUM7UUFFckI7O1dBRUc7UUFFSCxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUUxQjs7O1dBR0c7UUFFSCxVQUFLLEdBQVcsR0FBRyxDQUFDO1FBRXBCOzs7V0FHRztRQUVILG9CQUFlLEdBQVcsSUFBSSxDQUFDO1FBRS9COzs7V0FHRztRQUVILGVBQVUsR0FBVyxHQUFHLENBQUM7UUFFekI7OztXQUdHO1FBRUgseUJBQW9CLEdBQVcsQ0FBQyxDQUFDO1FBRWpDOztXQUVHO1FBRUgsaUJBQVksR0FBVyxHQUFHLENBQUM7UUFFM0I7O1dBRUc7UUFFSCxlQUFVLEdBQVcsR0FBRyxDQUFDO1FBRXpCOztXQUVHO1FBRUgsY0FBUyxHQUFXLFNB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