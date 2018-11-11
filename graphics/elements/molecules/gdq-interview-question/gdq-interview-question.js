import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
import { TimelineLite } from "/bundles/gdqx18-layouts/node_modules/gsap/index.js";
const {
  customElement,
  property
} = Polymer.decorators;
const questions = nodecg.Replicant('interview:questionTweets');
const questionSortMap = nodecg.Replicant('interview:questionSortMap');
const questionShowing = nodecg.Replicant('interview:questionShowing');
let GdqInterviewQuestion = class GdqInterviewQuestion extends Polymer.Element {
  constructor() {
    super(...arguments);
    this.onScreenTweet = null;
    this._timeline = new TimelineLite({
      autoRemoveChildren: true
    });
    this._initialized = false;
  }

  ready() {
    super.ready();
    questions.on('change', newVal => {
      this._questionsVal = newVal.slice(0);
    });
    questionSortMap.on('change', newVal => {
      this._sortMapVal = newVal.slice(0);
    });
    questionShowing.on('change', newVal => {
      if (newVal) {
        this.show();
      } else {
        this.hide();
      }

      this._initialized = true;
    });
  }

  show() {
    if (!this.onScreenTweet) {
      return;
    }

    const tweetEl = this.$.tweet;

    this._timeline.call(() => {
      tweetEl._addReset();

      tweetEl._createEntranceAnim(this.onScreenTweet);
    }, undefined, null, '+=0.5');
  }

  hide() {
    if (!this._initialized) {
      return;
    }

    this._timeline.call(() => {
      this.$.tweet._createExitAnim();
    }, undefined, null, '+=0.5');
  }

  calcOnScreenTweet(_questionsVal, _sortMapVal) {
    if (!_questionsVal || !_sortMapVal) {
      return;
    }

    return _questionsVal.find(reply => {
      return _sortMapVal.indexOf(reply.id_str) === 0;
    });
  }

};

tslib_1.__decorate([property({
  type: Object,
  computed: 'calcOnScreenTweet(_questionsVal, _sortMapVal)'
})], GdqInterviewQuestion.prototype, "onScreenTweet", void 0);

GdqInterviewQuestion = tslib_1.__decorate([customElement('gdq-interview-question')], GdqInterviewQuestion);
export default GdqInterviewQuestion;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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