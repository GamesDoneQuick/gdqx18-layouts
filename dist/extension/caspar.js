'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
// Native
var events_1 = require("events");
var fs = require("fs");
var path = require("path");
// Packages
var equals = require("deep-equal");
var osc = require("osc");
var CasparCG = require("casparcg-connection");
var debounce = require("lodash.debounce");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var foregroundFileName = '';
var currentFrame = 0;
var durationFrames = 0;
var fileMayHaveRestarted = false;
var updateFilesInterval;
var ignoreForegroundUntilNextPlay = false;
var nodecg = nodecgApiContext.get();
var log = new nodecg.Logger(nodecg.bundleName + ":caspar");
var currentRun = nodecg.Replicant('currentRun');
var files = nodecg.Replicant('caspar:files', { persistent: false });
var connected = nodecg.Replicant('caspar:connected');
var connection = new CasparCG.CasparCG({
    host: nodecg.bundleConfig.casparcg.host,
    port: nodecg.bundleConfig.casparcg.port,
    onConnected: function () {
        connected.value = true;
        log.info('Connected.');
        clearInterval(updateFilesInterval);
        updateFiles();
        updateFilesInterval = setInterval(updateFiles, 30000);
        if (nodecg.bundleConfig.casparcg.lockSecret) {
            connection.lock(1, CasparCG.Enum.Lock.ACQUIRE, nodecg.bundleConfig.casparcg.lockSecret).then(function () {
                log.info('Lock acquired.');
            })["catch"](function (e) {
                log.error('Failed to acquire lock:', e);
                connected.value = false;
            });
        }
    },
    onDisconnected: function () {
        connected.value = false;
        log.warn('Disconnected.');
    },
    onLog: function (str) {
        if (nodecg.bundleConfig.casparcg.debug) {
            log.debug(str);
        }
    },
    onError: function (error) {
        log.error(error);
    }
});
connection.clear(1);
function play(filename) {
    log.info('Attempting to play %s...', filename);
    return connection.play(1, 0, filename).then(function () {
        ignoreForegroundUntilNextPlay = false;
    });
}
exports.play = play;
function info() {
    return connection.info(1);
}
exports.info = info;
function loadbgAuto(filename) {
    return connection.loadbgAuto(1, undefined, filename, false, CasparCG.Enum.Transition.CUT);
}
exports.loadbgAuto = loadbgAuto;
function clear(doResetState) {
    if (doResetState === void 0) { doResetState = true; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.clear(1)];
                case 1:
                    _a.sent();
                    if (doResetState) {
                        resetState();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.clear = clear;
function stop() {
    return connection.stop(1).then(resetState);
}
exports.stop = stop;
function resetState() {
    foregroundFileName = '';
    currentFrame = 0;
    durationFrames = 0;
    fileMayHaveRestarted = false;
    ignoreForegroundUntilNextPlay = true;
}
exports.resetState = resetState;
exports.replicants = {
    files: files
};
exports.oscEvents = new events_1.EventEmitter();
nodecg.listenFor('caspar:play', module.exports.play);
var udpPort = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: nodecg.bundleConfig.casparcg.localOscPort,
    metadata: true
});
var emitForegroundChanged = debounce(function () {
    log.info('Media began playing: %s, %s, %s', new Date().toISOString(), foregroundFileName, currentRun.value ? currentRun.value.name : 'Unknown Run');
    exports.oscEvents.emit('foregroundChanged', foregroundFileName);
}, 250);
udpPort.on('message', function (message) {
    var args = message.args;
    if (message.address === '/channel/1/stage/layer/0/file/frame') {
        var newCurrentFrame = args[0].value.low;
        var newDurationFrames = args[1].value.low;
        if (currentFrame !== newCurrentFrame || durationFrames !== newDurationFrames) {
            if (newCurrentFrame < currentFrame) {
                process.nextTick(function () {
                    fileMayHaveRestarted = true;
                });
            }
            currentFrame = newCurrentFrame;
            durationFrames = newDurationFrames;
            exports.oscEvents.emit('frameChanged', currentFrame, durationFrames);
        }
    }
    else if (message.address === '/channel/1/stage/layer/0/file/path') {
        var fileChanged = args[0].value !== foregroundFileName;
        if ((fileChanged || fileMayHaveRestarted) && !ignoreForegroundUntilNextPlay) {
            foregroundFileName = args[0].value;
            emitForegroundChanged();
        }
        fileMayHaveRestarted = false;
    }
});
udpPort.on('error', function (error) {
    log.warn('[osc] Error:', error.stack);
});
udpPort.on('open', function () {
    log.info('[osc] Port open, can now receive events from CasparCG.');
});
udpPort.on('close', function () {
    log.warn('[osc] Port closed.');
});
// Open the socket.
udpPort.open();
var isFirstFilesUpdate = true;
/**
 * Updates the caspar:files replicant.
 */
function updateFiles() {
    if (!connected.value) {
        return;
    }
    fs.readdir(nodecg.bundleConfig.casparcg.adsPath, function (err, items) {
        if (err) {
            log.error('Error updating files:', err);
            return;
        }
        var hadError = false;
        var foundFiles = [];
        items.forEach(function (item) {
            var fullPath = path.join(nodecg.bundleConfig.casparcg.adsPath, item);
            var stats = fs.lstatSync(fullPath);
            // If this isn't a file, we don't care.
            if (!stats.isFile()) {
                return;
            }
            // If another file with the same name already exists, something is wrong.
            var foundAnotherFileWithSameName = foundFiles.find(function (foundFile) {
                return path.parse(foundFile).name === path.parse(item).name;
            });
            if (foundAnotherFileWithSameName) {
                log.error('Found two files with the same name (%s) in the adsPath!', path.parse(item).name);
                return;
            }
            foundFiles.push(item);
        });
        if (hadError) {
            return;
        }
        connection.cls().then(function (reply) {
            var remapped = reply.response.data.filter(function (data) {
                if (typeof data !== 'object' || data === null) {
                    return false;
                }
                return data.hasOwnProperty('name');
            }).map(function (data) {
                var nameWithExt = foundFiles.find(function (foundFile) {
                    return path.parse(foundFile).name.toLowerCase() === data.name.toLowerCase();
                });
                if (!nameWithExt) {
                    log.error('A file reported by Caspar was not found in adsPath:', data.name);
                    hadError = true;
                    return null;
                }
                return __assign({}, data, { nameWithExt: nameWithExt });
            });
            if (!hadError) {
                if (equals(remapped, files.value)) {
                    return;
                }
                files.value = remapped;
                if (isFirstFilesUpdate) {
                    exports.oscEvents.emit('initialized');
                    isFirstFilesUpdate = false;
                }
            }
        })["catch"](function (e) {
            log.error('Error updating files:', e);
        });
    });
}
