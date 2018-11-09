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
var request = require("request-promise");
// Ours
var util_1 = require("./util");
var nodecgApiContext = require("./util/nodecg-api-context");
var urls_1 = require("./urls");
var nodecg = nodecgApiContext.get();
var autoUpdateTotal = nodecg.Replicant('autoUpdateTotal');
var bitsTotal = nodecg.Replicant('bits:total');
var recordTrackerEnabled = nodecg.Replicant('recordTrackerEnabled');
var total = nodecg.Replicant('total');
autoUpdateTotal.on('change', function (newVal) {
    if (newVal) {
        nodecg.log.info('Automatic updating of donation total enabled');
        manuallyUpdateTotal(true);
    }
    else {
        nodecg.log.warn('Automatic updating of donation total DISABLED');
    }
});
recordTrackerEnabled.on('change', function (newVal) {
    if (newVal) {
        nodecg.log.info('Milestone tracker enabled');
    }
    else {
        nodecg.log.warn('Milestone tracker DISABLED');
    }
});
if (nodecg.bundleConfig && nodecg.bundleConfig.donationSocketUrl) {
    // tslint:disable-next-line:no-var-requires
    var socket_1 = require('socket.io-client')(nodecg.bundleConfig.donationSocketUrl);
    var loggedXhrPollError_1 = false;
    socket_1.on('connect', function () {
        nodecg.log.info('Connected to donation socket', nodecg.bundleConfig.donationSocketUrl);
        loggedXhrPollError_1 = false;
    });
    socket_1.on('connect_error', function (err) {
        if (err.message === 'xhr poll error') {
            if (loggedXhrPollError_1) {
                return;
            }
            loggedXhrPollError_1 = true;
        }
        nodecg.log.error('Donation socket connect_error:', err);
    });
    // Get initial data, then listen for donations.
    updateTotal().then(function () {
        socket_1.on('donation', function (data) {
            if (!data || !data.rawAmount) {
                return;
            }
            var donation = formatDonation(data);
            nodecg.sendMessage('donation', donation);
            if (autoUpdateTotal.value) {
                total.value = {
                    raw: donation.rawNewTotal,
                    formatted: donation.newTotal
                };
            }
        });
    });
    socket_1.on('disconnect', function () {
        nodecg.log.error('Disconnected from donation socket, can not receive donations!');
    });
    socket_1.on('error', function (err) {
        nodecg.log.error('Donation socket error:', err);
    });
}
else {
    // tslint:disable-next-line:prefer-template
    nodecg.log.warn("cfg/" + nodecg.bundleName + ".json is missing the \"donationSocketUrl\" property." +
        '\n\tThis means that we cannot receive new incoming PayPal donations from the tracker,' +
        '\n\tand that donation notifications will not be displayed as a result. The total also will not update.');
}
nodecg.listenFor('setTotal', function (_a) {
    var type = _a.type, newValue = _a.newValue;
    if (type === 'cash') {
        total.value = {
            raw: parseFloat(newValue),
            formatted: util_1.formatDollars(newValue, { cents: false })
        };
    }
    else if (type === 'bits') {
        bitsTotal.value = parseInt(newValue, 10);
    }
    else {
        nodecg.log.error('Unexpected "type" sent to setTotal: "%s"', type);
    }
});
// Dashboard can invoke manual updates
nodecg.listenFor('updateTotal', manuallyUpdateTotal);
/**
 * Handles manual "updateTotal" requests.
 * @param [silent = false] - Whether to print info to logs or not.
 * @param [cb] - The callback to invoke after the total has been updated.
 */
function manuallyUpdateTotal(silent, cb) {
    if (!silent) {
        nodecg.log.info('Manual donation total update button pressed, invoking update...');
    }
    updateTotal().then(function (updated) {
        if (updated) {
            nodecg.sendMessage('total:manuallyUpdated', total.value);
            nodecg.log.info('Donation total successfully updated');
        }
        else {
            nodecg.log.info('Donation total unchanged, not updated');
        }
        if (cb && !cb.handled) {
            cb(null, updated);
        }
    })["catch"](function (error) {
        if (cb && !cb.handled) {
            cb(error);
        }
    });
}
/**
 * Updates the "total" replicant with the latest value from the GDQ Tracker API.
 */
function updateTotal() {
    return __awaiter(this, void 0, void 0, function () {
        var stats, freshTotal, error_1, msg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request({
                            uri: urls_1.GDQUrls.total,
                            json: true
                        })];
                case 1:
                    stats = _a.sent();
                    freshTotal = parseFloat(stats.agg.amount || 0);
                    if (freshTotal === total.value.raw) {
                        return [2 /*return*/, false];
                    }
                    total.value = {
                        raw: freshTotal,
                        formatted: util_1.formatDollars(freshTotal, { cents: false })
                    };
                    return [2 /*return*/, true];
                case 2:
                    error_1 = _a.sent();
                    msg = 'Could not get donation total, unknown error';
                    if (error_1) {
                        msg = "Could not get donation total:\n" + error_1.message;
                    }
                    nodecg.log.error(msg);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, false];
            }
        });
    });
}
/**
 * Formats each donation coming in from the socket repeater, which in turn is receiving them
 * from a Postback URL on the tracker.
 * @returns A formatted donation.
 */
function formatDonation(_a) {
    var rawAmount = _a.rawAmount, newTotal = _a.newTotal;
    var parsedRawAmount = typeof rawAmount === 'string' ? parseFloat(rawAmount) : rawAmount;
    var parsedRawNewTotal = typeof newTotal === 'string' ? parseFloat(newTotal) : newTotal;
    // Format amount
    var amount = util_1.formatDollars(parsedRawAmount);
    // If a whole dollar, get rid of cents
    if (amount.endsWith('.00')) {
        amount = amount.substr(0, amount.length - 3);
    }
    return {
        amount: amount,
        rawAmount: parsedRawAmount,
        newTotal: util_1.formatDollars(parsedRawNewTotal, { cents: false }),
        rawNewTotal: parsedRawNewTotal
    };
}
