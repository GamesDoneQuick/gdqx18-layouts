'use strict';
exports.__esModule = true;
var LS_TIMER_PHASE = {
    NotRunning: 0,
    Running: 1,
    Ended: 2,
    Paused: 3
};
// Packages
var clone = require("clone");
var liveSplitCore = require("livesplit-core");
var gamepad = require("gamepad");
var usbDetect = require("usb-detection");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var TimeUtils = require("./lib/time");
var GDQTypes = require("../types");
var lsRun = liveSplitCore.Run["new"]();
var segment = liveSplitCore.Segment["new"]('finish');
lsRun.pushSegment(segment);
var timer = liveSplitCore.Timer["new"](lsRun);
var nodecg = nodecgApiContext.get();
var checklistComplete = nodecg.Replicant('checklistComplete');
var currentRun = nodecg.Replicant('currentRun');
var stopwatch = nodecg.Replicant('stopwatch');
// Load the existing time and start the stopwatch at that.
timer.start();
timer.pause();
initGameTime();
if (stopwatch.value.state === GDQTypes.StopwatchStateEnum.RUNNING) {
    var missedTime = Date.now() - stopwatch.value.time.timestamp;
    var previousTime = stopwatch.value.time.raw;
    var timeOffset = previousTime + missedTime;
    nodecg.log.info('Recovered %s seconds of lost time.', (missedTime / 1000).toFixed(2));
    start(true);
    liveSplitCore.TimeSpan.fromSeconds(timeOffset / 1000)["with"](function (t) { return timer.setGameTime(t); });
}
nodecg.listenFor('startTimer', start);
nodecg.listenFor('stopTimer', pause);
nodecg.listenFor('resetTimer', reset);
nodecg.listenFor('completeRunner', function (data) {
    if (!currentRun.value) {
        return;
    }
    if (currentRun.value.coop) {
        // Finish all runners.
        currentRun.value.runners.forEach(function (runner, index) {
            if (!runner) {
                return;
            }
            completeRunner({ index: index, forfeit: data.forfeit });
        });
    }
    else {
        completeRunner(data);
    }
});
nodecg.listenFor('resumeRunner', function (index) {
    if (!currentRun.value) {
        return;
    }
    if (currentRun.value.coop) {
        // Resume all runners.
        currentRun.value.runners.forEach(function (runner, runnerIndex) {
            if (!runner) {
                return;
            }
            resumeRunner(runnerIndex);
        });
    }
    else {
        resumeRunner(index);
    }
});
nodecg.listenFor('editTime', editTime);
if (nodecg.bundleConfig.footpedal.enabled) {
    gamepad.init();
    usbDetect.startMonitoring();
    // Poll for events
    setInterval(gamepad.processEvents, 16);
    // Update the list of gamepads when usb-detection sees a change.
    usbDetect.on('change', function () {
        nodecg.log.info('USB devices changed, checking for new gamepads.');
        gamepad.detectDevices();
    });
    // Listen for buttonId down event from our target gamepad.
    gamepad.on('down', function (_id, num) {
        if (num !== nodecg.bundleConfig.footpedal.buttonId) {
            return;
        }
        if (!currentRun.value) {
            return;
        }
        if (stopwatch.value.state === GDQTypes.StopwatchStateEnum.RUNNING) {
            // If this is a race, don't let the pedal finish the timer.
            if (currentRun.value.runners.length > 1 && !currentRun.value.coop) {
                nodecg.log.warn('Footpedal was hit to finish the timer, but this is a race so no action will be taken.');
                return;
            }
            nodecg.log.info('Footpedal hit, finishing timer.');
            // Finish all runners.
            currentRun.value.runners.forEach(function (runner, index) {
                if (!runner) {
                    return;
                }
                completeRunner({ index: index, forfeit: false });
            });
        }
        else if (stopwatch.value.state === GDQTypes.StopwatchStateEnum.NOT_STARTED) {
            if (!checklistComplete.value) {
                nodecg.log.warn('Footpedal was hit to start the timer, but the checklist is not complete so no action will be taken.');
                return;
            }
            nodecg.log.info('Footpedal hit, starting timer.');
            start();
            // Resume all runners.
            currentRun.value.runners.forEach(function (runner, index) {
                if (!runner) {
                    return;
                }
                resumeRunner(index);
            });
        }
        else {
            nodecg.log.warn('Footpedal was hit in a forbidden stopwatch state (%s), ignoring.', stopwatch.value.state);
        }
    });
}
setInterval(tick, 100); // 10 times per second.
/**
 * Starts the timer.
 * @param force - Forces the timer to start again, even if already running.
 */
function start(force) {
    if (force === void 0) { force = false; }
    if (!force && stopwatch.value.state === GDQTypes.StopwatchStateEnum.RUNNING) {
        return;
    }
    stopwatch.value.state = GDQTypes.StopwatchStateEnum.RUNNING;
    if (timer.currentPhase() === LS_TIMER_PHASE.NotRunning) {
        timer.start();
        initGameTime();
    }
    else {
        timer.resume();
    }
}
exports.start = start;
function initGameTime() {
    liveSplitCore.TimeSpan.fromSeconds(0)["with"](function (t) { return timer.setLoadingTimes(t); });
    timer.initializeGameTime();
    var existingSeconds = stopwatch.value.time.raw / 1000;
    liveSplitCore.TimeSpan.fromSeconds(existingSeconds)["with"](function (t) { return timer.setGameTime(t); });
}
/**
 * Updates the stopwatch replicant.
 */
function tick() {
    if (stopwatch.value.state !== GDQTypes.StopwatchStateEnum.RUNNING) {
        return;
    }
    var time = timer.currentTime();
    var gameTime = time.gameTime();
    if (!gameTime) {
        return;
    }
    stopwatch.value.time = TimeUtils.createTimeStruct((gameTime.totalSeconds() * 1000));
}
/**
 * Pauses the timer.
 */
function pause() {
    timer.pause();
    stopwatch.value.state = GDQTypes.StopwatchStateEnum.PAUSED;
}
exports.pause = pause;
/**
 * Pauses and resets the timer, clearing the time and results.
 */
function reset() {
    pause();
    timer.reset(true);
    stopwatch.value.time = TimeUtils.createTimeStruct();
    stopwatch.value.results = [null, null, null, null];
    stopwatch.value.state = GDQTypes.StopwatchStateEnum.NOT_STARTED;
}
exports.reset = reset;
/**
 * Marks a runner as complete.
 * @param index - The runner to modify (0-3).
 * @param forfeit - Whether or not the runner forfeit.
 */
function completeRunner(_a) {
    var index = _a.index, forfeit = _a.forfeit;
    if (!stopwatch.value.results[index]) {
        stopwatch.value.results[index] = {
            time: clone(stopwatch.value.time),
            place: 0,
            forfeit: false
        };
    }
    stopwatch.value.results[index].forfeit = forfeit;
    recalcPlaces();
}
/**
 * Marks a runner as still running.
 * @param index - The runner to modify (0-3).
 */
function resumeRunner(index) {
    stopwatch.value.results[index] = null;
    recalcPlaces();
    if (stopwatch.value.state === GDQTypes.StopwatchStateEnum.FINISHED) {
        var missedMilliseconds = Date.now() - stopwatch.value.time.timestamp;
        var newMilliseconds = stopwatch.value.time.raw + missedMilliseconds;
        stopwatch.value.time = TimeUtils.createTimeStruct(newMilliseconds);
        liveSplitCore.TimeSpan.fromSeconds(newMilliseconds / 1000)["with"](function (t) { return timer.setGameTime(t); });
        start();
    }
}
/**
 * Edits the final time of a result.
 * @param index - The result index to edit.
 * @param newTime - A hh:mm:ss (or mm:ss) formatted new time.
 */
function editTime(_a) {
    var index = _a.index, newTime = _a.newTime;
    if (!newTime) {
        return;
    }
    if (!currentRun.value) {
        return;
    }
    var newMilliseconds = TimeUtils.parseTimeString(newTime);
    if (isNaN(newMilliseconds)) {
        return;
    }
    if (index === 'master' || currentRun.value.runners.length === 1) {
        if (newMilliseconds === 0) {
            return reset();
        }
        stopwatch.value.time = TimeUtils.createTimeStruct(newMilliseconds);
        liveSplitCore.TimeSpan.fromSeconds(newMilliseconds / 1000)["with"](function (t) { return timer.setGameTime(t); });
    }
    if (typeof index === 'number' && stopwatch.value.results[index]) {
        stopwatch.value.results[index].time = TimeUtils.createTimeStruct(newMilliseconds);
        recalcPlaces();
    }
}
/**
 * Re-calculates the podium place for all runners.
 */
function recalcPlaces() {
    var finishedResults = stopwatch.value.results.filter(function (r) {
        if (r) {
            r.place = 0;
            return !r.forfeit;
        }
        return false;
    });
    finishedResults.sort(function (a, b) {
        return a.time.raw - b.time.raw;
    });
    finishedResults.forEach(function (r, index) {
        r.place = index + 1;
    });
    // If every runner is finished, stop ticking and set timer state to "finished".
    var allRunnersFinished = true;
    if (currentRun.value) {
        currentRun.value.runners.forEach(function (runner, index) {
            if (!runner) {
                return;
            }
            if (!stopwatch.value.results[index]) {
                allRunnersFinished = false;
            }
        });
    }
    if (allRunnersFinished) {
        pause();
        stopwatch.value.state = GDQTypes.StopwatchStateEnum.FINISHED;
    }
}
