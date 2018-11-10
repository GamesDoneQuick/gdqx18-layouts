import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { Power1, TweenLite } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
const {
  customElement,
  property
} = Polymer.decorators;
const SCORE_FADE_IN_EASE = Power1.easeOut;
const SCORE_FADE_OUT_EASE = Power1.easeIn;
const scoresRep = nodecg.Replicant('scores');
let AtomScoreDisplay = class AtomScoreDisplay extends Polymer.Element {
  constructor() {
    super(...arguments);
    /**
     * How long, in seconds, to fade scores in/out.
     *
     * For example, a value of 0.33 means that the fade out will take 0.33
     * seconds, and then the subsequent fade in will take another 0.33 seconds.
     */

    this.scoreFadeDuration = 0.33;
  }

  ready() {
    super.ready(); // Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880

    this.shadowRoot.querySelectorAll('sc-fitted-text').forEach(node => {
      node.$.fittedContent.style.webkitBackgroundClip = 'text';
    });
    Polymer.RenderStatus.afterNextRender(this, () => {
      scoresRep.on('change', this.updateScore.bind(this));
    });
  }

  updateScore(newScores) {
    if (!newScores || typeof newScores[this.teamIndex] !== 'number') {
      return;
    }

    if (newScores[this.teamIndex] === this.score) {
      return;
    }

    TweenLite.to(this.$.scoreText, this.scoreFadeDuration, {
      opacity: 0,
      ease: SCORE_FADE_OUT_EASE,
      callbackScope: this,

      onComplete() {
        this.score = newScores[this.teamIndex];
        TweenLite.to(this.$.scoreText, this.scoreFadeDuration, {
          opacity: 1,
          ease: SCORE_FADE_IN_EASE
        });
      }

    });
  }

};

tslib_1.__decorate([property({
  type: Number
})], AtomScoreDisplay.prototype, "score", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomScoreDisplay.prototype, "teamIndex", void 0);

tslib_1.__decorate([property({
  type: Number
})], AtomScoreDisplay.prototype, "scoreFadeDuration", void 0);

AtomScoreDisplay = tslib_1.__decorate([customElement('atom-score-display')], AtomScoreDisplay);
export default AtomScoreDisplay;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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