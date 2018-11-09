'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
// Native
var fs = require("fs");
var path = require("path");
// Packages
var clone = require("clone");
var debounce = require("lodash.debounce");
var schemaDefaults = require("json-schema-defaults");
// Ours
var caspar = require("./caspar");
var nodecgApiContext = require("./util/nodecg-api-context");
var obs = require("./obs");
var TimeUtils = require("./lib/time");
var GDQTypes = require("../types");
var AD_LOG_PATH = 'logs/ad_log.csv';
var currentAdBreak = null;
var currentlyPlayingAd = null;
var nextAd = null;
var cancelledAdBreak = false;
var nodecg = nodecgApiContext.get();
var log = new nodecg.Logger(nodecg.bundleName + ":intermission");
var currentIntermission = nodecg.Replicant('currentIntermission');
var canSeekSchedule = nodecg.Replicant('canSeekSchedule');
var currentRun = nodecg.Replicant('currentRun');
var schedule = nodecg.Replicant('schedule');
var stopwatch = nodecg.Replicant('stopwatch');
var schemasPath = path.resolve(__dirname, '../../schemas/');
var adBreakSchema = JSON.parse(fs.readFileSync(path.join(schemasPath, 'types/adBreak.json'), 'utf8'));
var adSchema = JSON.parse(fs.readFileSync(path.join(schemasPath, 'types/ad.json'), 'utf8'));
var debouncedUpdateCurrentIntermissionContent = debounce(_updateCurrentIntermissionContent, 33);
var debouncedUpdateCurrentIntermissionState = debounce(_updateCurrentIntermissionState, 33);
var debounceWarnForMissingFiles = debounce(_warnForMissingFiles, 33);
var clearableTimeouts = new Set();
var clearableIntervals = new Set();
currentRun.on('change', function (newVal, oldVal) {
    if (!oldVal || newVal.order !== oldVal.order) {
        debouncedUpdateCurrentIntermissionContent();
    }
});
schedule.on('change', function () {
    debouncedUpdateCurrentIntermissionContent();
    debounceWarnForMissingFiles();
});
stopwatch.on('change', function (newVal, oldVal) {
    checkCanSeek();
    if (!oldVal || (hasRunStarted() ? 'post' : 'pre') !== currentIntermission.value.preOrPost) {
        return debouncedUpdateCurrentIntermissionContent();
    }
    if (newVal.state !== oldVal.state) {
        debouncedUpdateCurrentIntermissionState();
    }
});
caspar.replicants.files.on('change', function () {
    debouncedUpdateCurrentIntermissionState();
    debounceWarnForMissingFiles();
});
nodecg.listenFor('intermissions:startAdBreak', function (adBreakId) { return __awaiter(_this, void 0, void 0, function () {
    var adBreak, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                adBreak = currentIntermission.value.content.find(function (item) {
                    return item.type === 'adBreak' && item.id === adBreakId;
                });
                if (!adBreak) {
                    log.error("Failed to start ad break: Could not find adBreak ID #" + adBreakId + " in currentIntermission.");
                    return [2 /*return*/];
                }
                if (adBreak.type !== 'adBreak') {
                    log.error('Impossible');
                    return [2 /*return*/];
                }
                cancelledAdBreak = false;
                currentAdBreak = adBreak;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                checkCanSeek();
                return [4 /*yield*/, caspar.clear(false)];
            case 2:
                _a.sent();
                return [4 /*yield*/, obs.setCurrentScene('Advertisements')];
            case 3:
                _a.sent();
                return [4 /*yield*/, sleep(2000)];
            case 4:
                _a.sent();
                return [4 /*yield*/, playAd(adBreak.ads[0])];
            case 5:
                _a.sent();
                adBreak.state.canStart = false;
                adBreak.state.cantStartReason = GDQTypes.CantStartReasonsEnum.ALREADY_STARTED;
                adBreak.state.started = true;
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                log.error('Failed to start ad break:', error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
nodecg.listenFor('intermissions:cancelAdBreak', function (adBreakId) {
    var adBreak = currentIntermission.value.content.find(function (item) {
        return item.type === 'adBreak' && item.id === adBreakId;
    });
    if (!adBreak) {
        log.error("Failed to cancel ad break: Could not find adBreak ID #" + adBreakId + " in currentIntermission.");
        return;
    }
    log.warn("Cancelling adBreak ID #" + adBreakId + "!");
    cancelledAdBreak = true;
    currentAdBreak = null;
    currentlyPlayingAd = null;
    clearableTimeouts.forEach(function (timeout) { return clearTimeout(timeout); });
    clearableTimeouts.clear();
    clearableIntervals.forEach(function (interval) { return clearInterval(interval); });
    clearableIntervals.clear();
    caspar.clear().then(function () {
        _updateCurrentIntermissionContent();
    })["catch"](function (err) {
        log.error('Failed to clear Caspar:', err);
    });
    obs.setCurrentScene('Break')["catch"](function (e) {
        log.error('Failed to set scene back to "Break" after cancelling ad break:', e);
    });
});
nodecg.listenFor('intermissions:completeAdBreak', function (adBreakId) {
    var adBreak = currentIntermission.value.content.find(function (item) {
        return item.type === 'adBreak' && item.id === adBreakId;
    });
    if (!adBreak) {
        log.error("Failed to complete ad break: Could not find adBreak ID #" + adBreakId + " in currentIntermission.");
        return;
    }
    if (adBreak.type !== 'adBreak') {
        log.error('Impossible');
        return;
    }
    if (adBreak === currentAdBreak) {
        finishCurrentAdBreak();
    }
    else {
        finishAdBreak(adBreak);
    }
});
nodecg.listenFor('intermissions:completeImageAd', function (adId) {
    if (!currentlyPlayingAd) {
        log.error("Tried to mark image ad ID #" + adId + " as complete, but no ad is currently playing.");
        return;
    }
    if (adId !== currentlyPlayingAd.id) {
        log.error("Tried to mark image ad ID #" + adId + " as complete, but it wasn't the currentlyPlayingAd.");
        return;
    }
    finishAd(currentlyPlayingAd);
    if (nextAd) {
        playAd(nextAd)["catch"](function (e) {
            log.error('Failed to play ad:', e);
        });
    }
    else {
        log.error("Marked image ad ID #" + adId + " as complete, but there was no nextAd!");
    }
});
caspar.oscEvents.on('foregroundChanged', function (filename) {
    if (cancelledAdBreak) {
        return;
    }
    if (!currentAdBreak) {
        // There will be some cases where this is *not* an error, such as
        // if we play another outro video like the one Bestban made for GDQx2017.
        // However, this is rare enough that I'm comfortable leaving this as an error log,
        // which will ping me in Slack. - Lange 2017/06/20
        log.error("\"" + filename + "\" started playing in CasparCG, but no adBreak is active.", 'Letting it play, no action will be taken.');
        return;
    }
    // Images include the media folder name in the path, but videos don't... dumb.
    if (filename.startsWith('media/')) {
        filename = filename.replace('media/', ''); // tslint:disable-line:no-parameter-reassignment
    }
    var indexOfAdThatJustStarted = -1;
    var adThatJustStarted = currentAdBreak.ads.find(function (ad, index) {
        if (ad.filename.toLowerCase() === filename.toLowerCase() && ad.state.completed === false) {
            indexOfAdThatJustStarted = index;
            return true;
        }
        return false;
    });
    if (!adThatJustStarted) {
        currentlyPlayingAd = null;
        currentAdBreak = null;
        log.error("\"" + filename + "\" started playing in CasparCG, but it did not correspond to any ad in the current adBreak.", 'Caspar will now be cleared to get us back into a predictable state.');
        caspar.clear().then(function () {
            checkCanSeek();
        })["catch"](function (err) {
            log.error('Failed to clear Caspar:', err);
        });
        return;
    }
    if (adThatJustStarted.state.started) {
        return;
    }
    currentlyPlayingAd = adThatJustStarted;
    adThatJustStarted.state.started = true;
    adThatJustStarted.state.canStart = false;
    var adThatJustCompleted = indexOfAdThatJustStarted > 0 ?
        currentAdBreak.ads[indexOfAdThatJustStarted - 1] :
        null;
    if (adThatJustCompleted && !adThatJustCompleted.state.completed) {
        finishAd(adThatJustCompleted);
    }
    nextAd = currentAdBreak.ads[indexOfAdThatJustStarted + 1];
    var nextAdFilenameNoExt;
    if (nextAd) {
        nextAdFilenameNoExt = path.parse(nextAd.filename).name;
        caspar.loadbgAuto(nextAdFilenameNoExt)["catch"](function (e) {
            log.error('Failed to play ad:', e);
        });
    }
    else if (currentlyPlayingAd.adType.toLowerCase() === 'video') {
        var frameTime = 1000 / adThatJustStarted.state.fps;
        var timeout = setTimeout(function () {
            if (!currentlyPlayingAd) {
                log.warn('Had no currentlyPlayingAd after the timeout, that\'s weird.');
                caspar.clear()["catch"](function (err) {
                    log.error('Failed to clear Caspar:', err);
                });
                return;
            }
            if (currentlyPlayingAd.adType.toLowerCase() === 'video') {
                finishCurrentAdBreak();
            }
        }, frameTime * adThatJustStarted.state.durationFrames);
        clearableTimeouts.add(timeout);
    }
    if (adThatJustStarted.adType.toLowerCase() === 'image') {
        var MS_PER_FRAME_1 = 1000 / 60;
        var startTime_1 = Date.now();
        var interval_1 = setInterval(function () {
            adThatJustStarted.state.frameNumber = Math.min((Date.now() - startTime_1) / MS_PER_FRAME_1, adThatJustStarted.state.durationFrames);
            adThatJustStarted.state.framesLeft =
                adThatJustStarted.state.durationFrames - adThatJustStarted.state.frameNumber;
            if (adThatJustStarted.state.framesLeft <= 0) {
                clearInterval(interval_1);
                adThatJustStarted.state.canComplete = true;
                if (!nextAd && currentAdBreak) {
                    currentAdBreak.state.canComplete = true;
                }
            }
        }, MS_PER_FRAME_1);
        clearableIntervals.add(interval_1);
    }
});
function finishAd(ad) {
    try {
        writeAdToLog(ad);
    }
    catch (error) {
        nodecg.log.error('writeAdToLog failed:', error);
    }
    ad.state.started = true;
    ad.state.canStart = false;
    ad.state.completed = true;
    ad.state.canComplete = false;
    ad.state.framesLeft = 0;
    ad.state.frameNumber = ad.state.durationFrames;
}
function finishAdBreak(adBreak) {
    adBreak.state.started = true;
    adBreak.state.canStart = false;
    adBreak.state.cantStartReason = GDQTypes.CantStartReasonsEnum.ALREADY_COMPLETED;
    adBreak.state.completed = true;
    adBreak.state.canComplete = false;
}
function finishCurrentAdBreak() {
    caspar.clear()["catch"](function (err) {
        log.error('Failed to clear Caspar:', err);
    });
    if (currentlyPlayingAd) {
        finishAd(currentlyPlayingAd);
    }
    if (currentAdBreak) {
        finishAdBreak(currentAdBreak);
    }
    currentAdBreak = null;
    currentlyPlayingAd = null;
    obs.setCurrentScene('Break')["catch"](function (e) {
        log.error('Failed to set scene back to "Break" after completing ad break:', e);
    });
    checkCanSeek();
}
caspar.oscEvents.on('frameChanged', function (currentFrame, durationFrames) {
    if (currentlyPlayingAd && currentlyPlayingAd.adType.toLowerCase() === 'video') {
        currentlyPlayingAd.state.frameNumber = currentFrame;
        currentlyPlayingAd.state.framesLeft = durationFrames - currentFrame;
    }
});
function playAd(ad) {
    var adFilenameNoExt = path.parse(ad.filename).name;
    caspar.resetState();
    return caspar.play(adFilenameNoExt);
}
/**
 * Sets the `preOrPost` and `content` properties of the currentIntermission replicant.
 */
function _updateCurrentIntermissionContent() {
    if (!currentRun.value || !stopwatch.value || !schedule.value) {
        return;
    }
    // If we're in an adBreak right now, bail out.
    if (currentAdBreak) {
        return;
    }
    // If the timer hasn't started yet, use the intermission between the previous run and currentRun.
    // Else, use the intermission between currentRun and nextRun.
    currentIntermission.value = {
        preOrPost: hasRunStarted() ? 'post' : 'pre',
        content: calcIntermissionContent()
    };
    _updateCurrentIntermissionState();
    checkCanSeek();
}
/**
 * Updates the `state` property of individual content items within the currentIntermission replicant.
 */
function _updateCurrentIntermissionState() {
    if (!currentIntermission.value || !caspar.replicants.files.value) {
        return;
    }
    var allPriorAdBreaksAreComplete = true;
    currentIntermission.value.content.forEach(function (item) {
        if (item.type !== 'adBreak') {
            return;
        }
        item.state.canStart = true;
        item.state.cantStartReason = '';
        if (item.state.started) {
            item.state.canStart = false;
            item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.ALREADY_STARTED;
        }
        if (item.state.completed) {
            item.state.canStart = false;
            item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.ALREADY_COMPLETED;
        }
        if (!allPriorAdBreaksAreComplete) {
            item.state.canStart = false;
            item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.PRIOR_BREAK_INCOMPLETE;
        }
        if (hasRunFinished()) {
            item.state.canStart = false;
            item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.MUST_ADVANCE_SCHEDULE;
        }
        else if (hasRunStarted()) {
            item.state.canStart = false;
            item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.RUN_ACTIVE;
        }
        if (!item.state.completed) {
            allPriorAdBreaksAreComplete = false;
        }
        var oneOrMoreAdsMissingFile = false;
        item.ads.forEach(function (ad) {
            var casparFile = caspar.replicants.files.value.find(function (file) {
                return file.nameWithExt.toLowerCase() === ad.filename.toLowerCase();
            });
            if (!casparFile) {
                ad.state.hasFile = false;
                oneOrMoreAdsMissingFile = true;
                return;
            }
            ad.state.hasFile = true;
            if (casparFile.type.toLowerCase() === 'video') {
                ad.state.durationFrames = casparFile.frames;
                ad.state.fps = casparFile.frameRate;
            }
            else if (casparFile.type.toLowerCase() === 'image') {
                ad.state.durationFrames = (TimeUtils.parseTimeString(ad.duration) / 1000) * 60;
                ad.state.fps = 60;
            }
            else {
                log.error('Unexpected file type from CasparCG:', casparFile);
            }
        });
        if (oneOrMoreAdsMissingFile) {
            item.state.canStart = false;
            item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.MISSING_FILES;
        }
    });
}
/**
 * Calculates what the contents of `currentIntermission` should be based on the values of
 * `currentRun`, `schedule`, and whether the currentRun has started or not.
 * @returns - The intermission content.
 */
function calcIntermissionContent() {
    var preOrPost = hasRunStarted() ? 'post' : 'pre';
    var intermissionContent = [];
    var scheduleContent = preOrPost === 'pre' ?
        schedule.value.slice(0).reverse() :
        schedule.value;
    var foundCurrentRun = false;
    scheduleContent.some(function (item) {
        if (currentRun.value && item.id === currentRun.value.id) {
            foundCurrentRun = true;
            return false;
        }
        if (foundCurrentRun) {
            if (item.type === 'run') {
                return true;
            }
            var clonedItem = clone(item);
            if (clonedItem.type === 'adBreak') {
                clonedItem.state = schemaDefaults(adBreakSchema.properties.state);
                clonedItem.ads.forEach(function (ad) {
                    ad.state = schemaDefaults(adSchema.properties.state);
                });
            }
            intermissionContent.push(clonedItem);
        }
        return false;
    });
    return preOrPost === 'pre' ? intermissionContent.reverse() : intermissionContent;
}
/**
 * Returns true if the current run has begun, false otherwise.
 * @returns Whether or not the current run has started.
 */
function hasRunStarted() {
    return stopwatch.value.state !== 'not_started';
}
/**
 * Returns true if the current run has completed, false otherwise.
 * @returns Whether or not the current run has finished.
 */
function hasRunFinished() {
    return stopwatch.value.state === 'finished';
}
function checkCanSeek() {
    // If the timer is running, disallow seeking.
    if (stopwatch.value.state === 'running') {
        canSeekSchedule.value = false;
        return;
    }
    // If an ad break is in progress, disallow seeking.
    if (currentAdBreak) {
        canSeekSchedule.value = false;
        return;
    }
    // Else, allow seeking.
    canSeekSchedule.value = true;
}
/**
 * Writes detailed information about an ad to the ad log.
 * @param ad - The ad to log.
 */
function writeAdToLog(ad) {
    var data = [
        ad.id,
        new Date().toISOString(),
        ad.adType,
        ad.sponsorName,
        ad.name,
        ad.filename,
        currentRun.value ? currentRun.value.name : 'Unknown Run'
    ];
    var logStr = data.join(', ');
    log.info('Ad successfully completed:', logStr);
    // If the ad log does not exist yet, create it and add the header row.
    if (!fs.existsSync(AD_LOG_PATH)) {
        var headerRow = 'id, timestamp, type, sponsor_name, ad_name, file_name, current_run\n';
        fs.writeFileSync(AD_LOG_PATH, headerRow);
    }
    // Append this ad play to the ad log.
    fs.appendFile(AD_LOG_PATH, logStr + '\n', function (err) {
        if (err) {
            log.error('Error appending to log:', err.stack);
        }
    });
}
function _warnForMissingFiles() {
    if (!schedule.value || !caspar.replicants.files.value) {
        return;
    }
    var warnedFiles = new Set();
    // Log an error for every ad which is missing its corresponding file in CasparCG.
    schedule.value.forEach(function (item) {
        if (item.type !== 'adBreak') {
            return;
        }
        item.ads.forEach(function (ad) {
            var casparFile = caspar.replicants.files.value.find(function (file) {
                return file.nameWithExt.toLowerCase() === ad.filename.toLowerCase();
            });
            if (!casparFile && !warnedFiles.has(ad.filename)) {
                log.error("Ad points to file that does not exist in CasparCG: " + ad.filename);
                warnedFiles.add(ad.filename);
            }
        });
    });
}
function sleep(milliseconds) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, milliseconds);
    });
}
