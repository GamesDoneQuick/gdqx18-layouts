import * as tslib_1 from "tslib";
import GDQBreakLoopMixin from '../../../mixins/GDQBreakLoopMixin';
import { TimelineLite, Power2, Sine, TweenLite } from 'gsap';
import { typeAnim } from '../../../../shared/lib/TypeAnims';
import { preloadImage } from '../../../../shared/lib/gdq-utils';
const { customElement } = Polymer.decorators;
const EMPTY_OBJ = {};
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
const currentPrizes = nodecg.Replicant('currentPrizes');
/**
 * @customElement
 * @polymer
 */
let GdqBreakPrizes = class GdqBreakPrizes extends GDQBreakLoopMixin(Polymer.Element) {
    ready() {
        super.ready();
        currentPrizes.on('change', newVal => {
            this.availableItems = newVal;
        });
    }
    /**
     * Plays the entrance animation and kicks off the infinite loop of
     * showing all available prizes, one at a time.
     * @returns - A GSAP TimelineLite instance.
     */
    show() {
        const tl = new TimelineLite();
        const photoElem = this.$['photo-actual'];
        tl.call(() => {
            // Clear all content.
            this.$['info-description-text'].innerText = '';
            this.$['info-minimumBid-text'].innerText = '';
            this.$.provider.innerText = '';
            photoElem.$svg.image.load('');
        }, undefined, null, '+=0.03');
        tl.addLabel('start', '+=0');
        tl.to(photoElem.$svg.bgRect.node, 1.5, {
            drawSVG: '100%',
            ease: Power2.easeOut
        }, 'start');
        tl.to(this.$.info, 1, {
            x: '0%',
            ease: Power2.easeOut
        }, 'start+=0.5');
        tl.to(this.$['photo-label'], 0.5, {
            opacity: 1,
            x: 0,
            ease: Sine.easeOut
        }, 'start+=1');
        tl.to(photoElem.$svg.bgRect.node, 0.5, {
            'fill-opacity': 0.25,
            ease: Sine.easeOut
        }, 'start+=1');
        tl.call(() => {
            // Re-start the loop once we've finished entering.
            this._loop();
        });
        return tl;
    }
    /**
     * Plays the exit animation and kills the current loop of prize displaying.
     * This animation has a variable length due to it needing to wait for the current
     * loop to be at a good stopping point before beginning the exit animation.
     * @returns - A GSAP TimelineLite instance.
     */
    hide() {
        const tl = new TimelineLite();
        const photoElem = this.$['photo-actual'];
        let handledCall = false; // GSAP likes to run .calls again when you .resume
        tl.call(() => {
            if (handledCall) {
                return;
            }
            handledCall = true;
            tl.pause();
            if (photoElem.exiting) {
                photoElem.addEventListener('exited', () => {
                    this._killLoop();
                    tl.resume();
                }, { once: true, passive: true });
            }
            else if (photoElem.entering) {
                photoElem.addEventListener('entered', () => {
                    this._killLoop();
                    photoElem.exit({
                        onComplete: () => {
                            tl.resume();
                        }
                    });
                }, { once: true, passive: true });
            }
            else {
                this._killLoop();
                photoElem.exit({
                    onComplete: () => {
                        tl.resume();
                    }
                });
            }
        }, undefined, null, '+=0.1');
        tl.addLabel('start', '+=0.5');
        tl.call(() => {
            this.currentItem = null;
        }, undefined, null, 'start');
        tl.to(photoElem.$svg.bgRect.node, 0.5, {
            'fill-opacity': 0,
            ease: Sine.easeIn
        }, 'start');
        tl.to(this.$['photo-label'], 0.5, {
            opacity: 0,
            x: -50,
            ease: Sine.easeIn
        }, 'start');
        tl.to(this.$.info, 1, {
            x: '-100%',
            ease: Power2.easeIn
        }, 'start');
        tl.to(photoElem.$svg.bgRect.node, 1.5, {
            drawSVG: '0%',
            ease: Power2.easeIn
        }, 'start');
        return tl;
    }
    _showItem(prize) {
        let useFallbackImage = !prize.image.trim();
        let changingProvider = true;
        let changingMinimumBid = true;
        const tl = new TimelineLite();
        const photoElem = this.$['photo-actual'];
        const providerTextElem = this.$.provider;
        const descriptionTextElem = this.$['info-description-text'];
        const minimumBidTextElem = this.$['info-minimumBid-text'];
        const minimumBidText = prize.sumdonations ?
            `${prize.minimumbid} in Total Donations` :
            `${prize.minimumbid} Single Donation`;
        tl.call(() => {
            tl.pause();
            preloadImage(prize.image).then(() => {
                tl.resume();
            }).catch(() => {
                nodecg.log.error(`Image "${prize.image}" failed to load for prize #${prize.id}.`);
                useFallbackImage = true;
                tl.resume();
            });
        }, undefined, null, '+=0.03');
        tl.addLabel('exit', '+=0');
        tl.add(photoElem.exit({
            onComplete: () => {
                const newSrc = useFallbackImage ? photoElem.fallbackSrc : prize.image;
                tl.pause();
                photoElem.$svg.image.load(newSrc).loaded(() => {
                    tl.resume();
                }).error(error => {
                    nodecg.log.error(error);
                    photoElem.$svg.image.load(photoElem.fallbackSrc);
                    tl.resume();
                });
            }
        }), 'exit');
        tl.call(() => {
            if (!providerTextElem.innerText && !descriptionTextElem.innerText) {
                return;
            }
            changingProvider = false;
            if (providerTextElem.innerText.trim() !== prize.provided) {
                changingProvider = true;
                TweenLite.to(this.$.provider, 0.5, {
                    opacity: 0,
                    ease: Sine.easeInOut
                });
            }
            changingMinimumBid = false;
            if (minimumBidTextElem.innerText.trim() !== minimumBidText) {
                changingMinimumBid = true;
                TweenLite.to(minimumBidTextElem, 0.5, { opacity: 0, ease: Sine.easeInOut });
            }
            TweenLite.to(this.$['info-description-text'], 0.5, {
                opacity: 0,
                ease: Sine.easeInOut
            });
        }, undefined, null, 'exit+=0.1');
        tl.addLabel('enter', '+=0');
        tl.call(() => {
            if (!changingProvider) {
                return;
            }
            providerTextElem.innerText = prize.provided;
            typeAnim(providerTextElem);
            TweenLite.set(providerTextElem, { opacity: 1 });
        }, undefined, null, 'enter+=0.03');
        tl.add(photoElem.enter(), 'enter+=0.1');
        tl.call(() => {
            descriptionTextElem.innerText = prize.description;
            typeAnim(descriptionTextElem);
            TweenLite.set(descriptionTextElem, { opacity: 1 });
        }, undefined, null, 'enter+=0.2');
        tl.call(() => {
            if (!changingMinimumBid) {
                return;
            }
            minimumBidTextElem.innerText = minimumBidText;
            typeAnim(minimumBidTextElem);
            TweenLite.set(minimumBidTextElem, { opacity: 1 });
        }, undefined, null, 'enter+=0.3');
        // Give the prize some time to show.
        tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
        return tl;
    }
    _resetState() {
        this.$['photo-actual'].exiting = false;
    }
};
GdqBreakPrizes = tslib_1.__decorate([
    customElement('gdq-break-prizes')
], GdqBreakPrizes);
export default GdqBreakPrizes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLXByaXplcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1icmVhay1wcml6ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8saUJBQWlCLE1BQU0sbUNBQW1DLENBQUM7QUFFbEUsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFFMUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRTlELE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRTNDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDO0FBRTdELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsZUFBZSxDQUFDLENBQUM7QUFFakU7OztHQUdHO0FBRUgsSUFBcUIsY0FBYyxHQUFuQyxNQUFxQixjQUFlLFNBQVEsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBUTtJQUNwRixLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUk7UUFDSCxNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFzQixDQUFDO1FBRTlELEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1os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