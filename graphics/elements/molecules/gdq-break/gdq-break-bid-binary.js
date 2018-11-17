import * as tslib_1 from "tslib";
import { TweenLite, TimelineLite, Sine, Power3, Power4 } from 'gsap';
import { typeAnim } from '../../../../shared/lib/TypeAnims';
import { createMaybeRandomTween } from '../../../../shared/lib/MaybeRandom';
const { customElement, property } = Polymer.decorators;
const SVG = (window.svgjs || window.SVG);
const ROTATION_FACTOR = 0.65;
/**
 * @customElement
 * @polymer
 */
let GDQBreakBidBinaryElement = class GDQBreakBidBinaryElement extends Polymer.Element {
    ready() {
        super.ready();
        this._initPieChartSVG();
        TweenLite.set(this.$.winningOptionAmount, { opacity: 0, x: -36, color: 'transparent' });
        TweenLite.set(this.$.losingOptionAmount, { opacity: 0, x: 36, color: 'transparent' });
        TweenLite.set(this._svgDoc.node, { opacity: 0 });
    }
    enter() {
        const tl = new TimelineLite();
        const winningPercent = this.bid.options[0].rawTotal / this.bid.rawTotal;
        const proxy = { percent: 0 };
        const winningOptionNameEl = this.$.winningOptionName;
        const losingOptionNameEl = this.$.losingOptionName;
        const winningOptionAmountEl = this.$.winningOptionAmount;
        const losingOptionAmountEl = this.$.losingOptionAmount;
        tl.call(() => {
            winningOptionAmountEl.innerText = '$' + this.bid.options[0].rawTotal.toLocaleString('en-US', {
                maximumFractionDigits: 0,
                useGrouping: false
            });
            losingOptionAmountEl.innerText = '$' + this.bid.options[1].rawTotal.toLocaleString('en-US', {
                maximumFractionDigits: 0,
                useGrouping: false
            });
        }, undefined, null, '+=0.03');
        tl.to([this.$.winningOptionAmount, this.$.losingOptionAmount], 0.384, {
            opacity: 1,
            x: 0,
            ease: Sine.easeOut
        });
        tl.call(() => {
            winningOptionAmountEl.style.color = '';
            losingOptionAmountEl.style.color = '';
            typeAnim(winningOptionAmountEl);
            typeAnim(losingOptionAmountEl);
        });
        tl.add(createMaybeRandomTween({
            target: this._svgDoc.node.style,
            propName: 'opacity',
            duration: 0.465,
            ease: Power4.easeIn,
            start: { probability: 1, normalValue: 0 },
            end: { probability: 0, normalValue: 1 }
        }), '+=0.1');
        tl.to(proxy, 1, {
            percent: winningPercent,
            ease: Power3.easeInOut,
            onStart: () => {
                this._svgDoc.style({ transform: `rotate(${ROTATION_FACTOR}turn)` });
                winningOptionNameEl.innerText = this.bid.options[0].description || this.bid.options[0].name;
                losingOptionNameEl.innerText = this.bid.options[1].description || this.bid.options[1].name;
                typeAnim(winningOptionNameEl);
                typeAnim(losingOptionNameEl);
            },
            onUpdate: () => {
                this.drawWinningSlice(proxy.percent);
            }
        });
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        tl.add(createMaybeRandomTween({
            target: this.style,
            propName: 'opacity',
            duration: 0.2,
            ease: Power4.easeIn,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 0 }
        }));
        return tl;
    }
    _initPieChartSVG() {
        const svgDoc = SVG(this.$.chart);
        svgDoc.viewbox(-1, -1, 2, 2);
        this._svgDoc = svgDoc;
        svgDoc.circle(2).fill({ color: '#ffee54', opacity: 0.25 }).move(-1, -1);
        const anglePI = (ROTATION_FACTOR * 360) * (Math.PI / 180);
        const gradientCoords = {
            x1: Math.round((Math.sin(anglePI) * 50) + 50) + '%',
            y1: Math.round((Math.cos(anglePI) * 50) + 50) + '%',
            x2: Math.round((Math.sin(anglePI + Math.PI) * 50) + 50) + '%',
            y2: Math.round((Math.cos(anglePI + Math.PI) * 50) + 50) + '%'
        };
        const gradient = svgDoc
            .gradient('linear', stop => {
            stop.at(0, '#57c7ef');
            stop.at(1, '#63f1fd');
        })
            .from(gradientCoords.x1, gradientCoords.y1)
            .to(gradientCoords.x2, gradientCoords.y2);
        this._winningSlice = svgDoc.path().fill(gradient);
    }
    drawWinningSlice(percent) {
        // Note the svg viewBox is offset so the center of the SVG is 0,0.
        const arcLength = Math.PI * 2 * percent;
        const startX = Math.cos(arcLength / -2);
        const startY = Math.sin(arcLength / -2);
        const endX = Math.cos(arcLength / 2);
        const endY = Math.sin(arcLength / 2);
        const largeArcFlag = percent > 0.5 ? 1 : 0;
        const d = [
            `M ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            'L 0 0'
        ].join(' ');
        this._winningSlice.plot(d);
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQBreakBidBinaryElement.prototype, "bid", void 0);
GDQBreakBidBinaryElement = tslib_1.__decorate([
    customElement('gdq-break-bid-binary')
], GDQBreakBidBinaryElement);
export default GDQBreakBidBinaryElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZC1iaW5hcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtYnJlYWstYmlkLWJpbmFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzFELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBRzFFLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLEdBQUcsR0FBRyxDQUFFLE1BQWMsQ0FBQyxLQUFLLElBQUssTUFBYyxDQUFDLEdBQUcsQ0FBa0IsQ0FBQztBQUM1RSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFFN0I7OztHQUdHO0FBRUgsSUFBcUIsd0JBQXdCLEdBQTdDLE1BQXFCLHdCQUF5QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBT3BFLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQztRQUN0RixTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBQyxDQUFDLENBQUM7UUFDcEYsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJ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