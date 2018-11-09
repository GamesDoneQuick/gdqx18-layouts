import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TweenLite, TimelineMax, Sine } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
window.addEventListener('load', () => {
  var GdqBreakScheduleRun_1;
  const {
    customElement,
    property
  } = Polymer.decorators;
  const DISPALY_DURATION = nodecg.bundleConfig.displayDuration;
  /**
   * @customElement
   * @polymer
   */

  let GdqBreakScheduleRun = GdqBreakScheduleRun_1 = class GdqBreakScheduleRun extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
      super(...arguments);
      this.upNext = false;
      this._currentRunnerIndex = 0;
    }

    ready() {
      super.ready();
      this.hidden = true;
    }

    _runChanged(newVal) {
      this.hidden = !newVal;

      if (!newVal) {
        return;
      }

      const WIDTH_ADDED_BY_BORDERS = 2;
      const PADDING_OF_INFO_RUNNER = 48;
      const infoRunnerElem = this.$['info-runner'];

      this._killRunnerLoopTimeline();

      infoRunnerElem.maxWidth = 0;
      infoRunnerElem.text = this._getLongestName(newVal.runners);
      TweenLite.set(infoRunnerElem, {
        opacity: 1,
        width: 'auto'
      });
      TweenLite.set(infoRunnerElem.$.fittedContent, {
        scaleX: 1
      });
      Polymer.RenderStatus.beforeNextRender(this, () => {
        infoRunnerElem.maxWidth = this.$.info.clientWidth - WIDTH_ADDED_BY_BORDERS - PADDING_OF_INFO_RUNNER - this.$['info-category'].clientWidth;
        infoRunnerElem.style.width = `${this.$['info-runner'].clientWidth - PADDING_OF_INFO_RUNNER}px`;
        infoRunnerElem.text = newVal.runners[0].name;

        if (newVal.runners.length > 1) {
          this._killRunnerLoopTimeline();

          this._runnerTimeline = this._createRunnerLoopTimeline(newVal.runners);
        }
      });
    }

    _createRunnerLoopTimeline(runners) {
      const tl = new TimelineMax({
        repeat: -1
      });
      runners.slice(1).concat([runners[0]]).forEach(runner => {
        tl.to(this.$['info-runner'], 0.5, {
          opacity: 0,
          ease: Sine.easeInOut
        }, `+=${DISPALY_DURATION}`);
        tl.call(() => {
          this.$['info-runner'].text = runner.name;
        });
        tl.to(this.$['info-runner'], 0.5, {
          opacity: 1,
          ease: Sine.easeInOut
        }, '+=0.1');
      });
      return tl;
    }

    _killRunnerLoopTimeline() {
      if (this._runnerTimeline) {
        this._runnerTimeline.kill();

        this._runnerTimeline = null;
      }
    }

    _formatRunName(runName) {
      if (!runName || typeof runName !== 'string') {
        return '?';
      }

      return runName.replace(/\\n/g, ' ');
    }

    _getLongestName(runners) {
      return runners.reduce((accumulator, currentValue) => {
        if (!currentValue || !currentValue.name) {
          return accumulator;
        }

        return currentValue.name.length > accumulator.length ? currentValue.name : accumulator;
      }, '');
    }

  };

  tslib_1.__decorate([property({
    type: Object,
    observer: GdqBreakScheduleRun_1.prototype._runChanged
  })], GdqBreakScheduleRun.prototype, "run", void 0);

  tslib_1.__decorate([property({
    type: Boolean,
    reflectToAttribute: true
  })], GdqBreakScheduleRun.prototype, "upNext", void 0);

  tslib_1.__decorate([property({
    type: Number
  })], GdqBreakScheduleRun.prototype, "_currentRunnerIndex", void 0);

  GdqBreakScheduleRun = GdqBreakScheduleRun_1 = tslib_1.__decorate([customElement('gdq-break-schedule-run')], GdqBreakScheduleRun); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.GdqBreakScheduleRun = GdqBreakScheduleRun;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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