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
        Array.from(this._allocatedNodes).forEach((node) => {
            const metadata = fooMap.get(node);
            let percent = 1;
            if (metadata.lastTickTime) {
                percent = (tickTime - metadata.lastTickTime) / TIME_PER_TICK_IDEAL;
            }
            node.y -= metadata.speed * percent;
            const journeyPercentage = 1 - (node.y / (this._invertDimensions ? this.width : this.height));
            node.alpha = this.opacityStart - (opacityRange * journeyPercentage);
            metadata.lastTickTime = tickTime;
            // If a node's alpha is less than zero, remove it.
            // Or a node has completely scrolled off the canvas, remove it.
            if (node.alpha <= 0 || (node.y + metadata.tailLength) <= 0) {
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