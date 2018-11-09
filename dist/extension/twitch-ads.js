'use strict';
exports.__esModule = true;
// Packages
var request = require("request-promise");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var TimeUtils = require("./lib/time");
var GDQTypes = require("../types");
var nodecg = nodecgApiContext.get();
var log = new nodecg.Logger(nodecg.bundleName + ":twitch");
var timeSince = nodecg.Replicant('twitch:timeSinceLastAd', { defaultValue: TimeUtils.createTimeStruct() });
var timeLeft = nodecg.Replicant('twitch:timeLeftInAd', { defaultValue: TimeUtils.createTimeStruct() });
var canPlayTwitchAd = nodecg.Replicant('twitch:canPlayAd');
var stopwatch = nodecg.Replicant('stopwatch');
var CANT_PLAY_REASONS = {
    AD_IN_PROGRESS: 'ad in progress',
    RUN_IN_PROGRESS: 'run in progress',
    ON_COOLDOWN: 'on cooldown',
    NONE: ''
};
var timeSinceTimer;
var timeLeftTimer;
// Load the existing timeSince and timeLeft and resume at the appropriate time.
if (timeSince.value.raw > 0) {
    var missedMilliseconds = Date.now() - timeSince.value.timestamp;
    resetTimeSinceTicker(timeSince.value.raw + missedMilliseconds);
}
if (timeLeft.value.raw > 0) {
    var missedMilliseconds = Date.now() - timeLeft.value.timestamp;
    resetTimeLeftTicker(timeLeft.value.raw - missedMilliseconds);
}
[timeLeft, timeSince, stopwatch].forEach(function (replicant) {
    replicant.on('change', function () {
        updateCanPlay();
    });
});
nodecg.listenFor('twitch:playAd', function (durationSeconds) {
    if (!canPlayTwitchAd.value.canPlay) {
        log.error('Requested Twitch ad when it was not allowed (%s)', canPlayTwitchAd.value.reason);
        return;
    }
    log.info('Requesting %d second Twitch ad...', durationSeconds);
    request({
        method: 'post',
        uri: "https://api.twitch.tv/kraken/channels/" + nodecg.bundleConfig.twitch.channelId + "/commercial",
        headers: {
            Accept: 'application/vnd.twitchtv.v5+json',
            Authorization: "OAuth " + nodecg.bundleConfig.twitch.oauthToken,
            'Client-ID': nodecg.bundleConfig.twitch.clientId,
            'Content-Type': 'application/json'
        },
        body: { length: durationSeconds },
        json: true
    }).then(function (res) {
        resetTimeSinceTicker();
        resetTimeLeftTicker((durationSeconds + 15) * 1000);
        if (res.Length === durationSeconds) {
            log.info('Successfully started %d second Twitch Ad.', res.Length);
        }
        else {
            log.info('Successfully started %d second Twitch Ad, but we requested %d seconds.', res.Length, durationSeconds);
        }
    })["catch"](function (err) {
        log.error('Failed to start %d second Twitch Ad:\n\t', durationSeconds, err);
    });
});
function resetTimeSinceTicker(startingMilliseconds) {
    if (startingMilliseconds === void 0) { startingMilliseconds = 0; }
    if (timeSinceTimer) {
        timeSinceTimer.stop();
        timeSinceTimer.removeAllListeners();
    }
    timeSince.value = TimeUtils.createTimeStruct(startingMilliseconds);
    timeSinceTimer = new TimeUtils.CountupTimer({ offset: startingMilliseconds });
    timeSinceTimer.on('tick', function (elapsedTimeStruct) {
        timeSince.value = elapsedTimeStruct;
    });
}
function resetTimeLeftTicker(durationMilliseconds) {
    if (timeLeftTimer) {
        timeLeftTimer.stop();
        timeLeftTimer.removeAllListeners();
    }
    if (durationMilliseconds < 0) {
        timeLeft.value = TimeUtils.createTimeStruct(0);
        return;
    }
    timeLeft.value = TimeUtils.createTimeStruct(durationMilliseconds);
    timeLeftTimer = new TimeUtils.CountdownTimer(Date.now() + durationMilliseconds);
    timeLeftTimer.on('tick', function (elapsedTimeStruct) {
        timeLeft.value = elapsedTimeStruct;
    });
}
/**
 * Updates the value of the canPlayTwitchAd replicant, based on the state of
 * the timeLeft, timeSince, and stopwatch Replicants.
 */
function updateCanPlay() {
    if (timeLeft.value.raw > 0) {
        canPlayTwitchAd.value.canPlay = false;
        canPlayTwitchAd.value.reason = CANT_PLAY_REASONS.AD_IN_PROGRESS;
        return;
    }
    if (timeSince.value.raw > 0 && timeSince.value.raw < 480 * 1000) {
        canPlayTwitchAd.value.canPlay = false;
        canPlayTwitchAd.value.reason = CANT_PLAY_REASONS.ON_COOLDOWN;
        return;
    }
    if (stopwatch.value.state !== GDQTypes.StopwatchStateEnum.NOT_STARTED &&
        stopwatch.value.state !== GDQTypes.StopwatchStateEnum.FINISHED) {
        canPlayTwitchAd.value.canPlay = false;
        canPlayTwitchAd.value.reason = CANT_PLAY_REASONS.RUN_IN_PROGRESS;
        return;
    }
    canPlayTwitchAd.value.canPlay = true;
    canPlayTwitchAd.value.reason = CANT_PLAY_REASONS.NONE;
}
