'use strict';
exports.__esModule = true;
// Packages
var firebase = require("firebase-admin");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var TimeUtils = require("./lib/time");
var nodecg = nodecgApiContext.get();
firebase.initializeApp({
    credential: firebase.credential.cert(nodecg.bundleConfig.firebase),
    databaseURL: "https://" + nodecg.bundleConfig.firebase.project_id + ".firebaseio.com"
});
var database = firebase.database();
var lowerthirdPulseTimeRemaining = nodecg.Replicant('interview:lowerthirdTimeRemaining', { defaultValue: 0, persistent: false });
var lowerthirdShowing = nodecg.Replicant('interview:lowerthirdShowing', { defaultValue: false, persistent: false });
var throwIncoming = nodecg.Replicant('interview:throwIncoming');
var questionPulseTimeRemaining = nodecg.Replicant('interview:questionTimeRemaining', { defaultValue: 0, persistent: false });
var questionShowing = nodecg.Replicant('interview:questionShowing', { defaultValue: false, persistent: false });
var questionSortMap = nodecg.Replicant('interview:questionSortMap');
var questionTweetsRep = nodecg.Replicant('interview:questionTweets');
var interviewStopwatch = nodecg.Replicant('interview:stopwatch');
var currentLayout = nodecg.Replicant('gdq:currentLayout');
var prizePlaylist = nodecg.Replicant('interview:prizePlaylist');
var showPrizesOnMonitor = nodecg.Replicant('interview:showPrizesOnMonitor');
var allPrizes = nodecg.Replicant('allPrizes');
var pulseIntervalMap = new Map();
var pulseTimeoutMap = new Map();
var interviewTimer;
var _repliesListener;
var _repliesRef;
// Restore lost time, if applicable.
if (interviewStopwatch.value.running) {
    var missedTime = Date.now() - interviewStopwatch.value.time.timestamp;
    var previousTime = interviewStopwatch.value.time.raw;
    var offset = previousTime + missedTime;
    interviewStopwatch.value.running = false;
    startInterviewTimer(offset);
}
nodecg.Replicant('interview:names');
lowerthirdShowing.on('change', function (newVal) {
    if (!newVal) {
        clearTimerFromMap(lowerthirdShowing, pulseIntervalMap);
        clearTimerFromMap(lowerthirdShowing, pulseTimeoutMap);
        lowerthirdPulseTimeRemaining.value = 0;
    }
});
currentLayout.on('change', function (newVal) {
    if (newVal === 'interview') {
        throwIncoming.value = false;
        startInterviewTimer();
    }
    else {
        stopInterviewTimer();
    }
});
nodecg.listenFor('pulseInterviewLowerthird', function (duration) {
    pulse(lowerthirdShowing, lowerthirdPulseTimeRemaining, duration);
});
nodecg.listenFor('pulseInterviewQuestion', function (id, cb) {
    pulse(questionShowing, questionPulseTimeRemaining, 10).then(function () {
        markQuestionAsDone(id, cb);
    })["catch"](function (error) {
        if (cb && !cb.handled) {
            cb(error);
        }
    });
});
questionShowing.on('change', function (newVal) {
    // Hide the interview lowerthird when a question starts showing.
    if (newVal) {
        lowerthirdShowing.value = false;
    }
    else {
        clearTimerFromMap(questionShowing, pulseIntervalMap);
        clearTimerFromMap(questionShowing, pulseTimeoutMap);
        questionPulseTimeRemaining.value = 0;
    }
});
questionSortMap.on('change', function (newVal, oldVal) {
    if (!oldVal || newVal[0] !== oldVal[0]) {
        questionShowing.value = false;
    }
});
database.ref('/active_tweet_id').on('value', function (activeTweetIdSnapshot) {
    if (!activeTweetIdSnapshot) {
        return;
    }
    if (_repliesRef && _repliesListener) {
        _repliesRef.off('value', _repliesListener);
    }
    var activeTweetID = activeTweetIdSnapshot.val();
    _repliesRef = database.ref("/tweets/" + activeTweetID + "/replies");
    _repliesListener = _repliesRef.on('value', function (repliesSnapshot) {
        if (!repliesSnapshot) {
            return;
        }
        var rawReplies = repliesSnapshot.val();
        var convertedAndFilteredReplies = [];
        for (var item in rawReplies) { //tslint:disable-line:no-for-in
            if (!{}.hasOwnProperty.call(rawReplies, item)) {
                continue;
            }
            var reply = rawReplies[item];
            // Exclude tweets that somehow have no approval status yet.
            if (!reply.approval_status) {
                continue;
            }
            // Exclude any tweet that hasn't been approved by tier1.
            if (reply.approval_status.tier1 !== 'approved') {
                continue;
            }
            // Exclude tweets that have already been marked as "done" by tier2 (this app).
            if (reply.approval_status.tier2 === 'done') {
                continue;
            }
            convertedAndFilteredReplies.push(reply);
        }
        questionTweetsRep.value = convertedAndFilteredReplies;
        updateQuestionSortMap();
    });
});
// Ensure that the prize playlist only contains prizes currently in the tracker.
allPrizes.on('change', function (newVal) {
    prizePlaylist.value = prizePlaylist.value.filter(function (playlistEntry) {
        return newVal.find(function (prize) {
            return prize.id === playlistEntry.id;
        });
    });
});
nodecg.listenFor('interview:updateQuestionSortMap', updateQuestionSortMap);
nodecg.listenFor('interview:markQuestionAsDone', markQuestionAsDone);
nodecg.listenFor('interview:promoteQuestionToTop', function (id, cb) {
    if (!_repliesRef) {
        if (cb && !cb.handled) {
            cb(new Error('_repliesRef not ready!'));
        }
        return;
    }
    if (!id) {
        if (cb && !cb.handled) {
            cb();
        }
        return;
    }
    var itemIndex = questionSortMap.value.findIndex(function (sortId) { return sortId === id; });
    if (itemIndex < 0) {
        if (cb && !cb.handled) {
            cb(new Error('Tweet ID not found in sort map!'));
        }
        return;
    }
    var newArray = questionSortMap.value.slice(0);
    newArray.splice(0, 0, newArray.splice(itemIndex, 1)[0]);
    questionSortMap.value = newArray;
    if (cb && !cb.handled) {
        cb();
    }
});
nodecg.listenFor('interview:end', function () {
    database.ref('/active_tweet_id').set(0);
});
nodecg.listenFor('interview:addPrizeToPlaylist', function (prizeId) {
    if (typeof prizeId !== 'number' || prizeId < 0) {
        return;
    }
    var existingIndex = prizePlaylist.value.findIndex(function (_a) {
        var id = _a.id;
        return id === prizeId;
    });
    if (existingIndex >= 0) {
        return;
    }
    prizePlaylist.value.push({
        id: prizeId,
        complete: false
    });
});
nodecg.listenFor('interview:removePrizeFromPlaylist', function (prizeId) {
    if (typeof prizeId !== 'number' || prizeId < 0) {
        return;
    }
    var existingIndex = prizePlaylist.value.findIndex(function (_a) {
        var id = _a.id;
        return id === prizeId;
    });
    if (existingIndex < 0) {
        return;
    }
    prizePlaylist.value.splice(existingIndex, 1);
});
nodecg.listenFor('interview:markPrizeAsDone', function (prizeId) {
    if (typeof prizeId !== 'number' || prizeId < 0) {
        return;
    }
    var entry = prizePlaylist.value.find(function (_a) {
        var id = _a.id;
        return id === prizeId;
    });
    if (entry) {
        entry.complete = true;
    }
});
nodecg.listenFor('interview:markPrizeAsNotDone', function (prizeId) {
    if (typeof prizeId !== 'number' || prizeId < 0) {
        return;
    }
    var entry = prizePlaylist.value.find(function (_a) {
        var id = _a.id;
        return id === prizeId;
    });
    if (entry) {
        entry.complete = false;
    }
});
nodecg.listenFor('interview:clearPrizePlaylist', function () {
    prizePlaylist.value = [];
});
nodecg.listenFor('interview:showPrizePlaylistOnMonitor', function () {
    showPrizesOnMonitor.value = true;
});
nodecg.listenFor('interview:hidePrizePlaylistOnMonitor', function () {
    showPrizesOnMonitor.value = false;
});
function markQuestionAsDone(id, cb) {
    if (!_repliesRef) {
        if (cb && !cb.handled) {
            cb(new Error('_repliesRef not ready!'));
        }
        return;
    }
    if (!id) {
        if (cb && !cb.handled) {
            cb();
        }
        return;
    }
    _repliesRef.child(id).transaction(function (tweet) {
        if (tweet) {
            if (!tweet.approval_status) {
                tweet.approval_status = {}; // eslint-disable-line camelcase
            }
            tweet.approval_status.tier2 = 'done';
        }
        return tweet;
    }).then(function () {
        updateQuestionSortMap();
        if (cb && !cb.handled) {
            cb();
        }
    })["catch"](function (error) {
        nodecg.log.error('[interview]', error);
        if (cb && !cb.handled) {
            cb(error);
        }
    });
}
/**
 * Fixes up the sort map by adding and new IDs and removing deleted IDs.
 */
function updateQuestionSortMap() {
    // To the sort map, add the IDs of any new question tweets.
    questionTweetsRep.value.forEach(function (tweet) {
        if (questionSortMap.value.indexOf(tweet.id_str) < 0) {
            questionSortMap.value.push(tweet.id_str);
        }
    });
    var _loop_1 = function (i) {
        var result = questionTweetsRep.value.findIndex(function (tweet) {
            return tweet.id_str === questionSortMap.value[i];
        });
        if (result < 0) {
            questionSortMap.value.splice(i, 1);
        }
    };
    // From the sort map, remove the IDs of any question tweets that were deleted or have been filtered out.
    for (var i = questionSortMap.value.length - 1; i >= 0; i--) {
        _loop_1(i);
    }
}
/**
 * Pulses a replicant for a specified duration, and tracks the remaining time in another replicant.
 * @param showingRep - The Boolean replicant that controls if the element is showing or not.
 * @param pulseTimeRemainingRep - The Number replicant that tracks the remaining time in this pulse.
 * @param duration - The desired duration of the pulse in seconds.
 * @returns A promise which resolves when the pulse has completed.
 */
function pulse(showingRep, pulseTimeRemainingRep, duration) {
    return new Promise(function (resolve) {
        // Don't stack pulses
        if (showingRep.value) {
            return resolve();
        }
        showingRep.value = true;
        pulseTimeRemainingRep.value = duration;
        clearTimerFromMap(showingRep, pulseIntervalMap);
        clearTimerFromMap(showingRep, pulseTimeoutMap);
        // Count down lowerthirdPulseTimeRemaining
        pulseIntervalMap.set(showingRep, setInterval(function () {
            if (pulseTimeRemainingRep.value > 0) {
                pulseTimeRemainingRep.value--;
            }
            else {
                clearTimerFromMap(showingRep, pulseIntervalMap);
                pulseTimeRemainingRep.value = 0;
            }
        }, 1000));
        // End pulse after "duration" seconds
        pulseTimeoutMap.set(showingRep, setTimeout(function () {
            clearTimerFromMap(showingRep, pulseIntervalMap);
            pulseTimeRemainingRep.value = 0;
            showingRep.value = false;
            resolve();
        }, duration * 1000));
    });
}
function clearTimerFromMap(key, map) {
    clearInterval(map.get(key));
    clearTimeout(map.get(key));
    map["delete"](key);
}
function startInterviewTimer(offset) {
    if (offset === void 0) { offset = 0; }
    if (interviewStopwatch.value.running) {
        return;
    }
    interviewStopwatch.value.running = true;
    interviewStopwatch.value.time = TimeUtils.createTimeStruct();
    if (interviewTimer) {
        interviewTimer.stop();
        interviewTimer.removeAllListeners();
    }
    interviewTimer = new TimeUtils.CountupTimer({ offset: offset });
    interviewTimer.on('tick', function (elapsedTimeStruct) {
        interviewStopwatch.value.time = elapsedTimeStruct;
    });
}
function stopInterviewTimer() {
    if (!interviewStopwatch.value.running) {
        return;
    }
    interviewStopwatch.value.running = false;
    if (interviewTimer) {
        interviewTimer.stop();
    }
}
