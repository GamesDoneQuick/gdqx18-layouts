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
exports.__esModule = true;
// Native
var fs = require("fs");
var path = require("path");
var child_process_1 = require("child_process");
// Packages
var OBSUtility = require("nodecg-utility-obs");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var gdqUtils = require("../../shared/lib/gdq-utils");
var nodecg = nodecgApiContext.get();
// We track what _layout_ is active, not necessarily what _scene_ is active.
// A given layout can be on multiple scenes.
var currentLayout = nodecg.Replicant('gdq:currentLayout');
var autoUploadRecordings = nodecg.Replicant('autoUploadRecordings');
var cyclingRecordingsRep = nodecg.Replicant('obs:cyclingRecordings', { persistent: false });
var compositingOBS = new OBSUtility(nodecg, { namespace: 'compositingOBS' });
var recordingOBS = new OBSUtility(nodecg, { namespace: 'recordingOBS' });
var encodingOBS = new OBSUtility(nodecg, { namespace: 'encodingOBS' });
var uploadScriptPath = nodecg.bundleConfig.youtubeUploadScriptPath;
var uploadScriptRunning = false;
if (uploadScriptPath) {
    var stats = void 0;
    try {
        stats = fs.lstatSync(uploadScriptPath);
    }
    catch (e) {
        if (e.code === 'ENOENT') {
            throw new Error("Configured youtubeUploadScriptPath (" + uploadScriptPath + ") does not exist.");
        }
        throw e;
    }
    if (!stats.isFile()) {
        throw new Error("Configured youtubeUploadScriptPath (" + uploadScriptPath + ") is not a file.");
    }
    nodecg.log.info('Automatic VOD uploading enabled.');
}
autoUploadRecordings.on('change', function (newVal) {
    nodecg.log.info('Automatic uploading of recordings %s.', newVal ? 'ENABLED' : 'DISABLED');
});
compositingOBS.replicants.programScene.on('change', function (newVal) {
    if (!newVal) {
        return;
    }
    newVal.sources.some(function (source) {
        if (!source.name) {
            return false;
        }
        var lowercaseSourceName = source.name.toLowerCase();
        if (lowercaseSourceName.indexOf('layout') === 0) {
            currentLayout.value = lowercaseSourceName.replace(/ /g, '_').replace('layout_', '');
            return true;
        }
        return false;
    });
});
compositingOBS.replicants.previewScene.on('change', function (newVal) {
    if (!newVal || !newVal.name) {
        return;
    }
    // Hide the transition graphic on gameplay scenes when they are in preview.
    if (gdqUtils.isGameScene(newVal.name)) {
        // Abort if the PVW scene is also the PGM scene.
        if (newVal.name === compositingOBS.replicants.programScene.value.name) {
            return;
        }
        compositingOBS.setSceneItemRender({
            'scene-name': newVal.name,
            source: 'Transition Graphic',
            render: false
        })["catch"](function (error) {
            nodecg.log.error("Failed to hide Transition Graphic on scene \"" + newVal.name + "\":", error);
        });
    }
});
compositingOBS.on('TransitionBegin', function (data) {
    if (data.name !== 'Blank Stinger') {
        return;
    }
    if (data.toScene) {
        // Show the Transition Graphic on the scene which is being transitioned to.
        compositingOBS.setSceneItemRender({
            'scene-name': data.toScene,
            source: 'Transition Graphic',
            render: true
        })["catch"](function (error) {
            nodecg.log.error("Failed to show Transition Graphic on scene \"" + data.toScene + "\":", error);
        });
    }
});
compositingOBS.on('SwitchScenes', function (data) {
    var actualPgmSceneName = data['scene-name'];
    var pvwSceneName = compositingOBS.replicants.previewScene.value && compositingOBS.replicants.previewScene.value.name;
    var pgmSceneName = compositingOBS.replicants.programScene.value && compositingOBS.replicants.programScene.value.name;
    var actualPvwSceneName = actualPgmSceneName === pvwSceneName ? pgmSceneName : pvwSceneName;
    if (actualPvwSceneName === 'Break') {
        return;
    }
    // Abort if the PVW scene is also the PGM scene.
    if (actualPvwSceneName === actualPgmSceneName) {
        return;
    }
    // Hide the transition graphic on gameplay scenes when they are in preview.
    if (gdqUtils.isGameScene(actualPvwSceneName)) {
        compositingOBS.setSceneItemRender({
            'scene-name': actualPvwSceneName,
            source: 'Transition Graphic',
            render: false
        })["catch"](function (error) {
            nodecg.log.error("Failed to hide Transition Graphic on scene \"" + actualPvwSceneName + "\":", error);
        });
    }
});
function cycleRecording(obs) {
    return new Promise(function (resolve, reject) {
        var rejected = false;
        var timeout = setTimeout(function () {
            rejected = true;
            reject(new Error("Timed out waiting for " + obs.namespace + " to stop recording."));
        }, 30000);
        var recordingStoppedListener = function () {
            if (rejected) {
                return;
            }
            obs.log.info('Recording stopped.');
            clearTimeout(timeout);
            setTimeout(function () {
                resolve();
            }, 2500);
        };
        obs.once('RecordingStopped', recordingStoppedListener);
        obs.stopRecording()["catch"](function (error) {
            if (error.error === 'recording not active') {
                obs.removeListener('RecordingStopped', recordingStoppedListener);
                resolve();
            }
            else {
                obs.log.error(error);
                reject(error);
            }
        });
    }).then(function () {
        return obs.startRecording();
    });
}
function resetCropping() {
    return compositingOBS.send('ResetCropping')["catch"](function (error) {
        nodecg.log.error('resetCropping error:', error);
    });
}
exports.resetCropping = resetCropping;
function setCurrentScene(sceneName) {
    return compositingOBS.setCurrentScene({
        'scene-name': sceneName
    });
}
exports.setCurrentScene = setCurrentScene;
function cycleRecordings() {
    return __awaiter(this, void 0, void 0, function () {
        var cycleRecordingPromises, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nodecg.log.info('Cycling recordings...');
                    cyclingRecordingsRep.value = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    cycleRecordingPromises = [];
                    if (recordingOBS._connected) {
                        cycleRecordingPromises.push(cycleRecording(recordingOBS));
                    }
                    else {
                        nodecg.log.error('Recording OBS is disconnected! Not cycling its recording.');
                    }
                    if (compositingOBS._connected) {
                        cycleRecordingPromises.push(cycleRecording(compositingOBS));
                    }
                    else {
                        nodecg.log.error('Compositing OBS is disconnected! Not cycling its recording.');
                    }
                    if (encodingOBS._connected) {
                        cycleRecordingPromises.push(cycleRecording(encodingOBS));
                    }
                    else {
                        nodecg.log.error('Encoding OBS is disconnected! Not cycling its recording.');
                    }
                    if (cycleRecordingPromises.length <= 0) {
                        nodecg.log.warn('No instances of OBS are connected, aborting cycleRecordings.');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Promise.all(cycleRecordingPromises)];
                case 2:
                    _a.sent();
                    nodecg.log.info('Recordings successfully cycled.');
                    cyclingRecordingsRep.value = false;
                    nodecg.sendMessage('obs:recordingsCycled');
                    if (uploadScriptPath && autoUploadRecordings.value && !uploadScriptRunning) {
                        uploadScriptRunning = true;
                        nodecg.log.info('Executing upload script...');
                        child_process_1.exec("python \"" + uploadScriptPath + "\"", {
                            cwd: path.parse(uploadScriptPath).dir
                        }, function (error, stdout, stderr) {
                            uploadScriptRunning = false;
                            if (error) {
                                nodecg.log.error('Upload script failed:', error);
                                return;
                            }
                            if (stderr) {
                                nodecg.log.error('Upload script failed:', stderr);
                                return;
                            }
                            if (stdout.trim().length > 0) {
                                nodecg.log.info('Upload script ran successfully:', stdout.trim());
                            }
                            else {
                                nodecg.log.info('Upload script ran successfully.');
                            }
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    cyclingRecordingsRep.value = false;
                    nodecg.sendMessage('obs:recordingsCycled', error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.cycleRecordings = cycleRecordings;
function compositingOBSConnected() {
    return compositingOBS._connected;
}
exports.compositingOBSConnected = compositingOBSConnected;
