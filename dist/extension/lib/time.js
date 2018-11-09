'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
// Native
var events_1 = require("events");
// Packages
var parseMsToObj = require("parse-ms");
var convertUnitToMs = require("milliseconds");
/**
 * Constructs a new TimeStruct with the provided number of milliseconds.
 * @param milliseconds - The value to instantiate this TimeObject with, in milliseconds.
 * @returns A populated TimeStruct object.
 */
function createTimeStruct(milliseconds) {
    if (milliseconds === void 0) { milliseconds = 0; }
    var parsedTime = parseMilliseconds(milliseconds);
    // Can't use object spread because of https://github.com/Polymer/polymer-cli/issues/888
    // tslint:disable-next-line:prefer-object-spread
    return Object.assign({}, parsedTime, {
        formatted: formatMilliseconds(milliseconds),
        raw: milliseconds,
        timestamp: Date.now()
    });
}
exports.createTimeStruct = createTimeStruct;
/**
 * Formats a number of milliseconds into a string ([hh:]mm:ss).
 * @param inputMs - The number of milliseconds to format.
 * @returns  The formatted time sting.
 */
function formatMilliseconds(inputMs) {
    var _a = parseMilliseconds(inputMs), days = _a.days, hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds, milliseconds = _a.milliseconds;
    var str = '';
    if (days) {
        str += days + "d ";
    }
    if (hours) {
        str += hours + ":";
    }
    var paddedMinutes = String(minutes).padStart(2, '0');
    var paddedSeconds = String(seconds).padStart(2, '0');
    var tenths = milliseconds < 100 ? 0 : String(milliseconds).charAt(0);
    str += paddedMinutes + ":" + paddedSeconds + "." + tenths;
    return str;
}
exports.formatMilliseconds = formatMilliseconds;
/**
 * Parses a number of milliseconds into a ParsedTime object.
 * @param milliseconds - A number of milliseconds.
 * @returns An object representing each dimension of the time.
 */
function parseMilliseconds(milliseconds) {
    return parseMsToObj(milliseconds);
}
exports.parseMilliseconds = parseMilliseconds;
/**
 * Parses a number of seconds into a ParsedTime object.
 * @param seconds - A number of seconds.
 * @returns An object representing each dimension of the time.
 */
function parseSeconds(seconds) {
    return parseMilliseconds(seconds * 1000);
}
exports.parseSeconds = parseSeconds;
/**
 * Parses a formatted time string into an integer of milliseconds.
 * @param timeString - The formatted time string to parse.
 * Accepts the following: hh:mm:ss.sss, hh:mm:ss, hh:mm, hh
 * @returns The parsed time string represented as milliseconds.
 */
function parseTimeString(timeString) {
    var ms = 0;
    var timeParts = timeString.split(':').filter(function (part) { return part.trim(); });
    if (timeParts.length === 3) {
        ms += convertUnitToMs.hours(parseInt(timeParts[0], 10));
        ms += convertUnitToMs.minutes(parseInt(timeParts[1], 10));
        ms += convertUnitToMs.seconds(parseFloat(timeParts[2]));
        return ms;
    }
    if (timeParts.length === 2) {
        ms += convertUnitToMs.minutes(parseInt(timeParts[0], 10));
        ms += convertUnitToMs.seconds(parseFloat(timeParts[1]));
        return ms;
    }
    if (timeParts.length === 1) {
        ms += convertUnitToMs.seconds(parseFloat(timeParts[0]));
        return ms;
    }
    throw new Error("Unexpected format of timeString argument: " + timeString);
}
exports.parseTimeString = parseTimeString;
/**
 * A timer which counts down to a specified end time.
 */
var CountdownTimer = /** @class */ (function (_super) {
    __extends(CountdownTimer, _super);
    function CountdownTimer(endTime, _a) {
        var _b = (_a === void 0 ? {} : _a).tickRate, tickRate = _b === void 0 ? 100 : _b;
        var _this = _super.call(this) || this;
        _this.interval = setInterval(function () {
            var currentTime = Date.now();
            var timeRemaining = Math.max(endTime - currentTime, 0);
            _this.emit('tick', createTimeStruct(timeRemaining));
            if (timeRemaining <= 0) {
                _this.emit('done');
            }
        }, tickRate);
        return _this;
    }
    CountdownTimer.prototype.stop = function () {
        clearInterval(this.interval);
    };
    return CountdownTimer;
}(events_1.EventEmitter));
exports.CountdownTimer = CountdownTimer;
/**
 * A timer which counts up, with no specified end time.
 */
var CountupTimer = /** @class */ (function (_super) {
    __extends(CountupTimer, _super);
    function CountupTimer(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.tickRate, tickRate = _c === void 0 ? 100 : _c, _d = _b.offset, offset = _d === void 0 ? 0 : _d;
        var _this = _super.call(this) || this;
        var startTime = Date.now() - offset;
        _this.interval = setInterval(function () {
            var currentTime = Date.now();
            var timeElapsed = currentTime - startTime;
            _this.emit('tick', createTimeStruct(timeElapsed));
            if (timeElapsed <= 0) {
                _this.emit('done');
            }
        }, tickRate);
        return _this;
    }
    CountupTimer.prototype.stop = function () {
        clearInterval(this.interval);
    };
    return CountupTimer;
}(events_1.EventEmitter));
exports.CountupTimer = CountupTimer;
