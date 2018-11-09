'use strict';
exports.__esModule = true;
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var TimeUtils = require("./lib/time");
var nodecg = nodecgApiContext.get();
var time = nodecg.Replicant('countdown', {
    defaultValue: TimeUtils.createTimeStruct(600 * 1000),
    persistent: false
});
var running = nodecg.Replicant('countdownRunning', {
    defaultValue: false,
    persistent: false
});
var countdownTimer;
nodecg.listenFor('startCountdown', start);
nodecg.listenFor('stopCountdown', stop);
/**
 * Starts the countdown at the specified startTime.
 * @param startTime - A formatted time string, such as 1:00 for one hour.
 */
function start(startTime) {
    if (running.value) {
        return;
    }
    var durationMs = TimeUtils.parseTimeString(startTime);
    if (durationMs <= 0) {
        return;
    }
    running.value = true;
    time.value = TimeUtils.createTimeStruct(durationMs);
    if (countdownTimer) {
        countdownTimer.stop();
        countdownTimer.removeAllListeners();
    }
    countdownTimer = new TimeUtils.CountdownTimer(Date.now() + durationMs);
    countdownTimer.on('tick', function (remainingTimeStruct) {
        time.value = remainingTimeStruct;
    });
}
/**
 * Stops the countdown.
 */
function stop() {
    if (!running.value) {
        return;
    }
    running.value = false;
    if (countdownTimer) {
        countdownTimer.stop();
    }
}
