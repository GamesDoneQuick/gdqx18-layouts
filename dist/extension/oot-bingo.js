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
var _this = this;
exports.__esModule = true;
// Packages
var RequestPromise = require("request-promise");
var WebSocket = require("ws");
var cheerio = require("cheerio");
var equal = require("deep-equal");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var SOCKET_KEY_REGEX = /temporarySocketKey\s+=\s+"(\S+)"/;
var nodecg = nodecgApiContext.get();
var log = new nodecg.Logger(nodecg.bundleName + ":oot-bingo");
var request = RequestPromise.defaults({ jar: true }); // <= Automatically saves and re-uses cookies.
var boardRep = nodecg.Replicant('ootBingo:board');
var socketRep = nodecg.Replicant('ootBingo:socket');
var fullUpdateInterval;
var websocket = null;
nodecg.listenFor('ootBingo:joinRoom', function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                socketRep.value = __assign({}, socketRep.value, data);
                return [4 /*yield*/, joinRoom({
                        siteUrl: data.siteUrl,
                        socketUrl: data.socketUrl,
                        roomCode: data.roomCode,
                        passphrase: data.passphrase,
                        playerName: data.playerName
                    })];
            case 1:
                _a.sent();
                log.info("Successfully joined room " + data.roomCode + ".");
                if (callback && !callback.handled) {
                    callback();
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                socketRep.value.status = 'error';
                log.error("Failed to join room " + data.roomCode + ":", error_1);
                if (callback && !callback.handled) {
                    callback(error_1);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
nodecg.listenFor('ootBingo:leaveRoom', function (_data, callback) {
    try {
        clearInterval(fullUpdateInterval);
        destroyWebsocket();
        socketRep.value.status = 'disconnected';
        if (callback && !callback.handled) {
            callback();
        }
    }
    catch (error) {
        log.error('Failed to leave room:', error);
        if (callback && !callback.handled) {
            callback(error);
        }
    }
});
nodecg.listenFor('ootBingo:selectLine', function (lineString, callback) {
    try {
        boardRep.value.selectedLine = lineString;
        if (callback && !callback.handled) {
            callback();
        }
    }
    catch (error) {
        if (callback && !callback.handled) {
            callback(error);
        }
    }
});
nodecg.listenFor('ootBingo:toggleLineFocus', function (_data, callback) {
    try {
        boardRep.value.lineFocused = !boardRep.value.lineFocused;
        if (callback && !callback.handled) {
            callback();
        }
    }
    catch (error) {
        if (callback && !callback.handled) {
            callback(error);
        }
    }
});
nodecg.listenFor('ootBingo:toggleCard', function (_data, callback) {
    try {
        boardRep.value.cardHidden = !boardRep.value.cardHidden;
        if (callback && !callback.handled) {
            callback();
        }
    }
    catch (error) {
        if (callback && !callback.handled) {
            callback(error);
        }
    }
});
nodecg.listenFor('ootBingo:toggleEmbiggen', function (_data, callback) {
    try {
        boardRep.value.embiggen = !boardRep.value.embiggen;
        if (callback && !callback.handled) {
            callback();
        }
    }
    catch (error) {
        if (callback && !callback.handled) {
            callback(error);
        }
    }
});
recover()["catch"](function (error) {
    log.error("Failed to recover connection to room " + socketRep.value.roomCode + ":", error);
});
function recover() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(socketRep.value.roomCode && socketRep.value.passphrase)) return [3 /*break*/, 2];
                    log.info("Recovering connection to room " + socketRep.value.roomCode);
                    return [4 /*yield*/, joinRoom(socketRep.value)];
                case 1:
                    _a.sent();
                    log.info("Successfully recovered connection to room " + socketRep.value.roomCode);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function joinRoom(_a) {
    var _b = _a.siteUrl, siteUrl = _b === void 0 ? 'https://bingosync.com' : _b, _c = _a.socketUrl, socketUrl = _c === void 0 ? 'wss://sockets.bingosync.com' : _c, roomCode = _a.roomCode, passphrase = _a.passphrase, _d = _a.playerName, playerName = _d === void 0 ? 'NodeCG' : _d;
    return __awaiter(this, void 0, void 0, function () {
        function fullUpdate() {
            return __awaiter(this, void 0, void 0, function () {
                var newBoardState;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, request({
                                uri: roomUrl + "/board",
                                json: true
                            })];
                        case 1:
                            newBoardState = _a.sent();
                            // Bail if the room changed while this request was in-flight.
                            if (fullUpdateInterval !== thisInterval) {
                                return [2 /*return*/];
                            }
                            // Bail if nothing has changed.
                            if (equal(boardRep.value.cells, newBoardState)) {
                                return [2 /*return*/];
                            }
                            boardRep.value.cells = newBoardState;
                            return [2 /*return*/];
                    }
                });
            });
        }
        var roomUrl, $, csrfTokenInput, matches, socketKey, thisInterval;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    socketRep.value.status = 'connecting';
                    clearInterval(fullUpdateInterval);
                    destroyWebsocket();
                    log.info('Attempting to load room page.');
                    roomUrl = siteUrl + "/room/" + roomCode;
                    return [4 /*yield*/, request({
                            uri: roomUrl,
                            transform: function (body) {
                                return cheerio.load(body);
                            }
                        })];
                case 1:
                    $ = _e.sent();
                    csrfTokenInput = $('input[name="csrfmiddlewaretoken"]');
                    if (!csrfTokenInput) return [3 /*break*/, 4];
                    log.info('Joining room...');
                    // POST to join the room.
                    return [4 /*yield*/, request({
                            method: 'POST',
                            uri: roomUrl,
                            form: {
                                room_name: $('input[name="room_name"]').val(),
                                encoded_room_uuid: $('input[name="encoded_room_uuid"]').val(),
                                creator_name: $('input[name="creator_name"]').val(),
                                game_name: $('input[name="game_name"]').val(),
                                player_name: playerName,
                                passphrase: passphrase,
                                csrfmiddlewaretoken: csrfTokenInput.val()
                            },
                            headers: {
                                Referer: roomUrl
                            },
                            resolveWithFullResponse: true,
                            simple: false
                        })];
                case 2:
                    // POST to join the room.
                    _e.sent();
                    log.info('Joined room.');
                    log.info('Loading room page...');
                    return [4 /*yield*/, request({
                            uri: roomUrl,
                            transform: function (body) {
                                return cheerio.load(body);
                            }
                        })];
                case 3:
                    // Request the room page again, so that we can extract the socket token from it.
                    $ = _e.sent();
                    _e.label = 4;
                case 4:
                    log.info('Loaded room page.');
                    matches = $.html().match(SOCKET_KEY_REGEX);
                    if (!matches) {
                        log.error('Socket key not found on page.');
                        return [2 /*return*/];
                    }
                    socketKey = matches[1];
                    if (!socketKey) {
                        log.error('Socket key not found on page.');
                        return [2 /*return*/];
                    }
                    thisInterval = setInterval(function () {
                        fullUpdate()["catch"](function (error) {
                            log.error('Failed to fullUpdate:', error);
                        });
                    }, 15 * 1000);
                    fullUpdateInterval = thisInterval;
                    return [4 /*yield*/, fullUpdate()];
                case 5:
                    _e.sent();
                    return [4 /*yield*/, createWebsocket(socketUrl, socketKey)];
                case 6:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createWebsocket(socketUrl, socketKey) {
    return new Promise(function (resolve, reject) {
        var settled = false;
        log.info('Opening socket...');
        socketRep.value.status = 'connecting';
        websocket = new WebSocket(socketUrl + "/broadcast");
        websocket.onopen = function () {
            log.info('Socket opened.');
            if (websocket) {
                websocket.send(JSON.stringify({ socket_key: socketKey }));
            }
        };
        websocket.onmessage = function (event) {
            var json;
            try {
                json = JSON.parse(event.data);
            }
            catch (error) { // tslint:disable-line:no-unused
                log.error('Failed to parse message:', event.data);
            }
            if (json.type === 'error') {
                clearInterval(fullUpdateInterval);
                destroyWebsocket();
                socketRep.value.status = 'error';
                log.error('Socket protocol error:', json.error ? json.error : json);
                if (!settled) {
                    reject(new Error(json.error ? json.error : 'unknown error'));
                    settled = true;
                }
                return;
            }
            if (!settled) {
                resolve();
                socketRep.value.status = 'connected';
                settled = true;
            }
            if (json.type === 'goal') {
                var index = parseInt(json.square.slot.slice(4), 10) - 1;
                boardRep.value.cells[index] = json.square;
            }
        };
        websocket.onclose = function (event) {
            socketRep.value.status = 'disconnected';
            log.info("Socket closed (code: " + event.code + ", reason: " + event.reason + ")");
            destroyWebsocket();
            createWebsocket(socketUrl, socketKey)["catch"](function () {
                // Intentionally discard errors raised here.
                // They will have already been logged in the onmessage handler.
            });
        };
    });
}
function destroyWebsocket() {
    if (!websocket) {
        return;
    }
    try {
        /* tslint:disable:no-empty */
        websocket.onopen = function () { };
        websocket.onmessage = function () { };
        websocket.onclose = function () { };
        websocket.close();
        /* tslint:enable:no-empty */
    }
    catch (_error) { // tslint:disable-line:no-unused
        // Intentionally discard error.
    }
    websocket = null;
}
