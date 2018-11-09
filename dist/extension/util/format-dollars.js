'use strict';
exports.__esModule = true;
/**
 * Formats an amount as USD, cents optional.
 * @param amount - The amount to format.
 * @param cents - Whether or not to include cents in the formatted string.
 * @returns The formatted string.
 */
function formatDollars(amount, _a) {
    var _b = (_a === void 0 ? {} : _a).cents, cents = _b === void 0 ? true : _b;
    var fractionDigits = cents ? 2 : 0;
    var parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return parsedAmount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: fractionDigits,
        minimumFractionDigits: fractionDigits
    });
}
exports.formatDollars = formatDollars;
