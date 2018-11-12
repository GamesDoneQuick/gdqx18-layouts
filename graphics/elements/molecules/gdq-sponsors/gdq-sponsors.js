import * as tslib_1 from "tslib";
import GDQBreakLoopMixin from '../../../mixins/GDQBreakLoopMixin';
import { TimelineLite, Power1, TweenLite } from 'gsap';
const { customElement } = Polymer.decorators;
const DISPLAY_DURATION = 20;
const EMPTY_OBJ = {};
let GdqSponsors = class GdqSponsors extends GDQBreakLoopMixin(Polymer.Element) {
    ready() {
        this.itemIdField = 'sum';
        this.noAutoLoop = true;
        super.ready();
        let sponsors = nodecg.Replicant('assets:sponsors-standard_1');
        const layoutName = window.location.pathname.split('/').pop();
        switch (layoutName) {
            case ('widescreen_1.html'):
            case ('gba_1.html'):
                sponsors = nodecg.Replicant('assets:sponsors-widescreen_1');
                break;
            default:
            // Do nothing.
        }
        Polymer.RenderStatus.beforeNextRender(this, () => {
            sponsors.on('change', newVal => {
                this.availableItems = newVal;
                // If no sponsor is showing yet, show the first sponsor immediately
                if (!this.currentItem && newVal.length > 0) {
                    this.currentItem = newVal[0];
                    this.$.image.$svg.image.load(newVal[0].url);
                }
            });
            this._loop();
        });
    }
    show() {
        const tl = new TimelineLite();
        tl.call(() => {
            // Clear all content.
            this.$.image.$svg.image.load('');
        }, undefined, null, '+=0.03');
        tl.to(this, 0.334, {
            opacity: 1,
            ease: Power1.easeIn
        });
        tl.call(() => {
            // Re-start the loop once we've finished entering.
            this._loop();
        });
        return tl;
    }
    hide() {
        const tl = new TimelineLite();
        const imageElem = this.$.image;
        tl.call(() => {
            tl.pause();
            if (imageElem.exiting) {
                imageElem.addEventListener('exited', () => {
                    this._killLoop();
                    tl.resume();
                }, { once: true, passive: true });
            }
            else if (imageElem.entering) {
                imageElem.addEventListener('entered', () => {
                    this._killLoop();
                    imageElem.exit({
                        onComplete: () => {
                            tl.resume();
                        }
                    });
                }, { once: true, passive: true });
            }
            else {
                this._killLoop();
                imageElem.exit({
                    onComplete: () => {
                        tl.resume();
                    }
                });
            }
        }, undefined, null, '+=0.1');
        tl.to(this, 0.334, {
            opacity: 0,
            ease: Power1.easeOut
        });
        return tl;
    }
    resize() {
        this.$.image.resize();
    }
    _showItem(sponsorAsset) {
        const tl = new TimelineLite();
        const imageElem = this.$.image;
        tl.addLabel('exit', '+=0');
        tl.add(imageElem.exit({
            onComplete: () => {
                const newSrc = sponsorAsset.url;
                tl.pause();
                imageElem.$svg.image.load(newSrc).loaded(() => {
                    tl.resume();
                }).error(error => {
                    nodecg.log.error('Failed to load sponsor image:', error);
                    TweenLite.set(imageElem, { opacity: 0 });
                    tl.clear();
                    this._loop();
                });
            }
        }), 'exit');
        tl.addLabel('enter', '+=0');
        tl.set(imageElem, { opacity: 1 });
        tl.add(imageElem.enter(), 'enter+=0.1');
        // Give the prize some time to show.
        tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
        return tl;
    }
};
GdqSponsors = tslib_1.__decorate([
    customElement('gdq-sponsors')
], GdqSponsors);
export default GdqSponsors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXNwb25zb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXNwb25zb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLGlCQUFpQixNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdyRCxNQUFNLEVBQUMsYUFBYSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQVczQyxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUM1QixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFHckIsSUFBcUIsV0FBVyxHQUFoQyxNQUFxQixXQUFZLFNBQVEsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBUTtJQUNqRixLQUFLO1FBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3RCxRQUFRLFVBQVUsRUFBRTtZQUNuQixLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMzQixLQUFLLENBQUMsWUFBWSxDQUFDO2dCQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSw4QkFBOEIsQ0FBQyxDQUFDO2dCQUNyRSxNQUFNO1lBQ1AsUUFBUTtZQUNQLGNBQWM7U0FDZjtRQUVELE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNoRCxRQUFRLENBQUMsRUFBRSxD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