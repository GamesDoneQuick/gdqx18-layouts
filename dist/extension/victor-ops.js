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
var equals = require("deep-equal");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var nodecg = nodecgApiContext.get();
var log = new nodecg.Logger(nodecg.bundleName + ":victorOps");
var incidentsReplicant = nodecg.Replicant('victorOps:incidents');
var routingKeysReplicant = nodecg.Replicant('victorOps:routingKeys');
log.info('VictorOps integration enabled.');
nodecg.listenFor('victorOps:createIncident', function (body, cb) {
    log.info('Creating incident:', body);
    createIncident({
        restEndpoint: nodecg.bundleConfig.victorOps.restEndpoint,
        routingKey: body.routingKey,
        body: {
            message_type: 'CRITICAL',
            entity_display_name: body.subject,
            state_message: body.details
        }
    }).then(function () {
        log.info('Incident successfully created.');
        if (cb && !cb.handled) {
            cb();
        }
    })["catch"](function (error) {
        log.error('Failed to create incident:', error);
        if (cb && !cb.handled) {
            cb(error);
        }
    });
});
// Initialize.
updateIncidentsReplicant();
updateRoutingKeysReplicant();
// Update incidents three times a minute.
setInterval(function () {
    updateIncidentsReplicant();
}, 20 * 1000);
// Update routing keys once every 5 minutes.
setInterval(function () {
    updateRoutingKeysReplicant();
}, 5 * 60 * 1000);
function updateIncidentsReplicant() {
    return __awaiter(this, void 0, void 0, function () {
        var incidents, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchIncidents(nodecg.bundleConfig.victorOps)];
                case 1:
                    incidents = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    log.error('Failed to fetch incidents:', e_1);
                    return [3 /*break*/, 3];
                case 3:
                    try {
                        if (!equals(incidentsReplicant.value, incidents)) {
                            incidentsReplicant.value = incidents;
                        }
                    }
                    catch (e) {
                        log.error('Failed to update incidents replicant:', e);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function updateRoutingKeysReplicant() {
    return __awaiter(this, void 0, void 0, function () {
        var teams, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchRoutingKeys(nodecg.bundleConfig.victorOps)];
                case 1:
                    teams = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    log.error('Failed to fetch teams:', e_2);
                    return [3 /*break*/, 3];
                case 3:
                    try {
                        if (!equals(routingKeysReplicant.value, teams)) {
                            routingKeysReplicant.value = teams;
                        }
                    }
                    catch (e) {
                        log.error('Failed to update teams replicant:', e);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function fetchIncidents(_a) {
    var apiId = _a.apiId, apiKey = _a.apiKey;
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request({
                        uri: 'https://api.victorops.com/api-public/v1/incidents',
                        headers: {
                            Accept: 'application/json',
                            'X-VO-Api-Id': apiId,
                            'X-VO-Api-Key': apiKey
                        },
                        json: true
                    })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result ? result.incidents : []];
            }
        });
    });
}
function fetchRoutingKeys(_a) {
    var apiId = _a.apiId, apiKey = _a.apiKey;
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request({
                        uri: 'https://api.victorops.com/api-public/v1/org/routing-keys',
                        headers: {
                            Accept: 'application/json',
                            'X-VO-Api-Id': apiId,
                            'X-VO-Api-Key': apiKey
                        },
                        json: true
                    })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, (result ? result.routingKeys : []).filter(function (routingKey) {
                            if (!routingKey) {
                                return false;
                            }
                            // Filter out the default routing key.
                            return routingKey.routingKey !== '.+';
                        })];
            }
        });
    });
}
function createIncident(_a) {
    var restEndpoint = _a.restEndpoint, routingKey = _a.routingKey, body = _a.body;
    return request({
        method: 'POST',
        uri: restEndpoint.replace(/\$routing_key$/, routingKey),
        headers: {
            Accept: 'application/json'
        },
        body: body,
        json: true
    });
}
