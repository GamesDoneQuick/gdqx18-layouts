import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite, Sine } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
window.addEventListener('load', () => {
  const {
    customElement,
    property
  } = Polymer.decorators;
  const currentRun = nodecg.Replicant('currentRun');
  const schedule = nodecg.Replicant('schedule');
  /**
   * @customElement
   * @polymer
   */

  let GdqBreakSchedule = class GdqBreakSchedule extends Polymer.MutableData(Polymer.Element) {
    ready() {
      super.ready();
      currentRun.on('change', () => {
        this.update();
      });
      schedule.on('change', () => {
        this.update();
      });
      this._$runs = this.shadowRoot.querySelectorAll('gdq-break-schedule-run');
    }

    update() {
      this._updateDebouncer = Polymer.Debouncer.debounce(this._updateDebouncer, Polymer.Async.timeOut.after(16), this._update.bind(this));
    }

    _update() {
      const tl = new TimelineLite();

      if (schedule.status !== 'declared' || currentRun.status !== 'declared' || !schedule.value || !currentRun.value) {
        return tl;
      }

      tl.set(this._$runs, {
        willChange: 'opacity'
      });
      tl.to(this._$runs, 0.5, {
        opacity: 0,
        ease: Sine.easeInOut
      }, '+=0.25');
      tl.call(() => {
        this.upNext = currentRun.value;
        const onDeckRuns = [];
        schedule.value.some(item => {
          if (item.type !== 'run') {
            return false;
          }

          if (item.order <= currentRun.value.order) {
            return false;
          }

          onDeckRuns.push(item);
          return onDeckRuns.length >= 3;
        });
        this.onDeck = onDeckRuns;
      });
      tl.to(this._$runs, 0.5, {
        opacity: 1,
        ease: Sine.easeInOut
      }, '+=0.1');
      tl.set(this._$runs, {
        clearProps: 'will-change'
      });
      return tl;
    }

    _getArrayItem(array, index) {
      if (!array) {
        return null;
      }

      return array[index];
    }

  };

  tslib_1.__decorate([property({
    type: Object
  })], GdqBreakSchedule.prototype, "upNext", void 0);

  tslib_1.__decorate([property({
    type: Array
  })], GdqBreakSchedule.prototype, "onDeck", void 0);

  GdqBreakSchedule = tslib_1.__decorate([customElement('gdq-break-schedule')], GdqBreakSchedule); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqBreakSchedule = GdqBreakSchedule;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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