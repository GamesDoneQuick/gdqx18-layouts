/**
 * @mixinFunction
 * @polymer
 */
export default Polymer.dedupingMixin((base) => {
    class MapSortMixin extends base {
        constructor() {
            super(...arguments);
            this._sortMapVal = null;
        }
        ready() {
            this._createMapSort = this._createMapSort.bind(this);
            super.ready();
        }
        _createMapSort(idKey) {
            return (a, b) => {
                if (!this._sortMapVal) {
                    return 0;
                }
                const aMapIndex = a ? this._sortMapVal.indexOf(a[idKey]) : -1;
                const bMapIndex = b ? this._sortMapVal.indexOf(b[idKey]) : -1;
                if (aMapIndex >= 0 && bMapIndex < 0) {
                    return -1;
                }
                if (aMapIndex < 0 && bMapIndex >= 0) {
                    return 1;
                }
                // If neither of these replies are in the sort map, just leave them where they are.
                if (aMapIndex < 0 && bMapIndex < 0) {
                    return 0;
                }
                return aMapIndex - bMapIndex;
            };
        }
        _shouldFlash(replicantChangeOperations) {
            if (replicantChangeOperations && replicantChangeOperations.length === 1) {
                // Don't flash if the change was just the addition of a new question.
                if (replicantChangeOperations[0].method === 'push') {
                    return false;
                }
                // Don't flash if the change was just caused by hitting "Show Next" on tier2.
                if (replicantChangeOperations[0].method === 'splice' &&
                    replicantChangeOperations[0].args.length === 2 &&
                    replicantChangeOperations[0].args[0] === 0 &&
                    replicantChangeOperations[0].args[1] === 1) {
                    return false;
                }
            }
            return true;
        }
        _flashElementBackground(element, { flashColor = '#9966cc', endColor = window.getComputedStyle(element).backgroundColor, duration = 1600, easing = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)' } = {}) {
            return element.animate([
                { backgroundColor: flashColor },
                { backgroundColor: endColor }
            ], {
                duration,
                easing
            });
        }
        _flashAddedNodes(container, selector, condition) {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (!mutation.addedNodes) {
                        return;
                    }
                    Array.from(mutation.addedNodes).filter(node => {
                        return node && 'matches' in node && node.matches(selector);
                    }).forEach(node => {
                        if (condition && !condition(node)) {
                            return;
                        }
                        this._flashElementBackground(node);
                    });
                });
            });
            observer.observe(container, { childList: true, subtree: true });
            return observer;
        }
    }
    return MapSortMixin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwU29ydE1peGluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWFwU29ydE1peGluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILGVBQWUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQWlDLEVBQUUsRUFBRTtJQUMxRSxNQUFNLFlBQWEsU0FBUSxJQUFJO1FBQS9COztZQUNDLGdCQUFXLEdBQW9CLElBQUksQ0FBQztRQXlGckMsQ0FBQztRQXZGQSxLQUFLO1lBQ0osSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDO1FBRUQsY0FBYyxDQUFDLEtBQWE7WUFDM0IsT0FBTyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3RCLE9BQU8sQ0FBQyxDQUFDO2lCQUNUO2dCQUVELE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFOUQsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7b0JBQ3BDLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQ1Y7Z0JBRUQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7b0JBQ3BDLE9BQU8sQ0FBQyxDQUFD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