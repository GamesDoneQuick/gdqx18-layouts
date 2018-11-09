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
// Packages
var cheerio = require("cheerio");
var RequestPromise = require("request-promise");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var request = RequestPromise.defaults({ jar: true }); // <= Automatically saves and re-uses cookies.
var LOGIN_URL = 'https://private.gamesdonequick.com/tracker/admin/login/';
var isFirstLogin = true;
module.exports = function (nodecg) {
    // Store a reference to this nodecg API context in a place where other libs can easily access it.
    // This must be done before any other files are `require`d.
    nodecgApiContext.set(nodecg);
    init().then(function () {
        nodecg.log.info('Initialization successful.');
    })["catch"](function (error) {
        nodecg.log.error('Failed to initialize:', error);
    });
};
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var nodecg, TRACKER_CREDENTIALS_CONFIGURED, schedule;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nodecg = nodecgApiContext.get();
                    TRACKER_CREDENTIALS_CONFIGURED = nodecg.bundleConfig.tracker.username &&
                        nodecg.bundleConfig.tracker.password &&
                        !nodecg.bundleConfig.useMockData;
                    if (nodecg.bundleConfig.useMockData) {
                        nodecg.log.warn('WARNING! useMockData is true, you will not receive real data from the tracker!');
                    }
                    // Be careful when re-ordering these.
                    // Some of them depend on Replicants initialized in others.
                    require('./timekeeping');
                    require('./obs');
                    require('./nowplaying');
                    require('./countdown');
                    require('./sortable-list');
                    require('./oot-bingo');
                    require('./caspar');
                    require('./intermissions');
                    if (!TRACKER_CREDENTIALS_CONFIGURED) return [3 /*break*/, 2];
                    return [4 /*yield*/, loginToTracker()];
                case 1:
                    _a.sent();
                    // Tracker logins expire every 2 hours. Re-login every 90 minutes.
                    setInterval(loginToTracker, 90 * 60 * 1000);
                    return [3 /*break*/, 3];
                case 2:
                    nodecg.log.warn('Tracker credentials not defined in cfg/gdqx18-layouts.json; will be unable to access privileged data.');
                    _a.label = 3;
                case 3:
                    schedule = require('./schedule');
                    if (TRACKER_CREDENTIALS_CONFIGURED) {
                        schedule.on('permissionDenied', function () {
                            loginToTracker().then(schedule.update);
                        });
                    }
                    require('./bids');
                    require('./prizes');
                    require('./total');
                    if (nodecg.bundleConfig.twitch) {
                        require('./twitch-ads');
                        require('./twitch-pubsub');
                        // If the appropriate config params are present,
                        // automatically update the Twitch game and title when currentRun changes.
                        if (nodecg.bundleConfig.twitch.titleTemplate) {
                            nodecg.log.info('Automatic Twitch stream title updating enabled.');
                            require('./twitch-title-updater');
                        }
                    }
                    if (nodecg.bundleConfig.twitter) {
                        if (nodecg.bundleConfig.twitter.enabled) {
                            require('./twitter');
                        }
                    }
                    else {
                        nodecg.log.warn('"twitter" is not defined in cfg/gdqx18-layouts.json! ' +
                            'Twitter integration will be disabled.');
                    }
                    if (nodecg.bundleConfig.victorOps && nodecg.bundleConfig.victorOps.apiId && nodecg.bundleConfig.victorOps.apiKey) {
                        if (nodecg.bundleConfig.victorOps.enabled) {
                            require('./victor-ops');
                        }
                    }
                    else {
                        nodecg.log.warn('"victorOps" is not defined in cfg/gdqx18-layouts.json! ' +
                            'VictorOps integration will be disabled.');
                    }
                    if (nodecg.bundleConfig.osc && nodecg.bundleConfig.osc.address) {
                        require('./mixer');
                    }
                    else {
                        nodecg.log.warn('"osc" is not defined in cfg/gdqx18-layouts.json! ' +
                            'Behringer X32 OSC integration will be disabled.');
                    }
                    if (nodecg.bundleConfig.firebase && Object.keys(nodecg.bundleConfig.firebase).length > 0) {
                        require('./interview');
                    }
                    else {
                        nodecg.log.warn('"firebase" is not defined in cfg/gdqx18-layouts.json! ' +
                            'The interview question system (Lightning Round) will be disabled.');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Fetch the login page, and run the response body through cheerio
// so we can extract the CSRF token from the hidden input field.
// Then, POST with our username, password, and the csrfmiddlewaretoken.
function loginToTracker() {
    var nodecg = nodecgApiContext.get();
    var loginLog = new nodecg.Logger(nodecg.bundleName + ":tracker");
    if (isFirstLogin) {
        loginLog.info('Logging in as %s...', nodecg.bundleConfig.tracker.username);
    }
    else {
        loginLog.info('Refreshing tracker login session as %s...', nodecg.bundleConfig.tracker.username);
    }
    return request({
        uri: LOGIN_URL,
        transform: function (body) {
            return cheerio.load(body);
        }
    }).then(function ($) { return request({
        method: 'POST',
        uri: LOGIN_URL,
        form: {
            username: nodecg.bundleConfig.tracker.username,
            password: nodecg.bundleConfig.tracker.password,
            csrfmiddlewaretoken: $('#login-form > input[name="csrfmiddlewaretoken"]').val()
        },
        headers: {
            Referer: LOGIN_URL
        },
        resolveWithFullResponse: true,
        simple: false
    }); }).then(function () {
        if (isFirstLogin) {
            isFirstLogin = false;
            loginLog.info('Logged in as %s.', nodecg.bundleConfig.tracker.username);
        }
        else {
            loginLog.info('Refreshed session as %s.', nodecg.bundleConfig.tracker.username);
        }
    })["catch"](function (err) {
        loginLog.error('Error authenticating!\n', err);
    });
}
