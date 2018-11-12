import * as tslib_1 from "tslib";
var GdqLowerthirdNameplate_1;
import { Power2, TimelineLite, TweenLite } from 'gsap';
const ENTRANCE_ANIM_DURATION = 0.5;
const ENTRANCE_ANIM_EASE = Power2.easeInOut;
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GdqLowerthirdNameplate = GdqLowerthirdNameplate_1 = class GdqLowerthirdNameplate extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.header = false;
    }
    enter() {
        const tl = new TimelineLite();
        tl.to(this.$.occluder, ENTRANCE_ANIM_DURATION, {
            x: '250%',
            ease: ENTRANCE_ANIM_EASE
        }, 0);
        tl.to(this.$.clipped, ENTRANCE_ANIM_DURATION, {
            clipPath: 'inset(0 0% 0 0)',
            ease: ENTRANCE_ANIM_EASE
        }, 0);
        tl.to(this.$.title, 0.4, {
            y: '0%',
            ease: Power2.easeOut,
            onStart: () => {
                this.$.title.style.opacity = '1';
                this.$['title-text'].maxWidth = this.$.title.clientWidth - 60;
            }
        }, '-=0.1');
        return tl;
    }
    reset() {
        TweenLite.set(this.$.occluder, { x: '-100%' });
        TweenLite.set(this.$.clipped, { clipPath: 'inset(0 100% 0 0)' });
        TweenLite.set(this.$.title, { y: '-100%', opacity: 0 });
    }
    _nameChanged(newVal) {
        return this.$.nameplate.updateName({ alias: newVal, rotate: false });
    }
    _computeHasTitle(title) {
        return Boolean(title && title.trim().length > 0);
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GdqLowerthirdNameplate.prototype, "header", void 0);
tslib_1.__decorate([
    property({ type: String, observer: GdqLowerthirdNameplate_1.prototype._nameChanged })
], GdqLowerthirdNameplate.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: String })
], GdqLowerthirdNameplate.prototype, "title", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, computed: '_computeHasTitle(title)' })
], GdqLowerthirdNameplate.prototype, "hasTitle", void 0);
GdqLowerthirdNameplate = GdqLowerthirdNameplate_1 = tslib_1.__decorate([
    customElement('gdq-lowerthird-nameplate')
], GdqLowerthirdNameplate);
export default GdqLowerthirdNameplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWxvd2VydGhpcmQtbmFtZXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWxvd2VydGhpcmQtbmFtZXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR3JELE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxDQUFDO0FBQ25DLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUM1QyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsc0JBQXNCLDhCQUEzQyxNQUFxQixzQkFBdUIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUxuRTs7O09BR0c7SUFDSDs7UUFHQyxXQUFNLEdBQVksS0FBSyxDQUFDO0lBaUR6QixDQUFDO0lBdENBLEtBQUs7UUFDSixNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLEVBQUU7WUFDOUMsQ0FBQyxFQUFFLE1BQU07WUFDVCxJQUFJLEVBQUUsa0JBQWtCO1NBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFTixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFO1lBQzdDLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsSUFBSSxFQUFFLGtCQUFrQjtTQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4sRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDeEIsQ0FBQyxFQUFFLElBQUk7WUFDUCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDcEIsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQXdCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDeEUsQ0FBQztTQUNELEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFWixPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxLQUFLO1FBQ0osU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQzdDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBQyxRQUFRLEVBQUUsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDO1FBQy9ELFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxZQUFZLENBQUMsTUFBYztRQUMxQixPQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBMkIsQ0FBQyxVQUFVLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFhO1FBQzdCLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDRCxDQUFBO0FBakRBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQztzREFDNUI7QUFHeEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSx3QkFBc0IsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFDLENBQUM7b0RBQ3JFO0FBR2I7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7cURBQ1g7QUFHZDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSx5QkFBeUIsRUFBQyxDQUFDO3dEQUN2RTtBQVhFLHNCQUFzQjtJQUQxQyxhQUFhLENBQUMsMEJBQTBCLENBQUM7R0FDckIsc0JBQXNCLENBbUQxQztlQW5Eb0Isc0JBQXNCIn0=