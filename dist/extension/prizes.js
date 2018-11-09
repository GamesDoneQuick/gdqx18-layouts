'use strict';
exports.__esModule = true;
// Packages
var equal = require("deep-equal");
var numeral = require("numeral");
var request = require("request-promise");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var urls_1 = require("./urls");
var nodecg = nodecgApiContext.get();
var POLL_INTERVAL = 60 * 1000;
var currentPrizesRep = nodecg.Replicant('currentPrizes', { defaultValue: [] });
var allPrizesRep = nodecg.Replicant('allPrizes', { defaultValue: [] });
// Get initial data
update();
// Get latest prize data every POLL_INTERVAL milliseconds
setInterval(function () {
    update();
}, POLL_INTERVAL);
/**
 * Grabs the latest prizes from the tracker.
 */
function update() {
    nodecg.sendMessage('prizes:updating');
    var currentPromise = request({
        uri: urls_1.GDQUrls.currentPrizes,
        json: true
    }).then(function (prizes) {
        var formattedPrizes = prizes.map(formatPrize);
        if (!equal(formattedPrizes, currentPrizesRep.value)) {
            currentPrizesRep.value = formattedPrizes;
        }
    });
    var allPromise = request({
        uri: urls_1.GDQUrls.allPrizes,
        json: true
    }).then(function (prizes) {
        var formattedPrizes = prizes.map(formatPrize);
        if (!equal(formattedPrizes, allPrizesRep.value)) {
            allPrizesRep.value = formattedPrizes;
        }
    });
    return Promise.all([
        currentPromise,
        allPromise
    ]).then(function () {
        nodecg.sendMessage('prizes:updated');
    })["catch"](function () {
        nodecg.sendMessage('prizes:updated');
    });
}
/**
 * Formats a raw prize object from the GDQ Tracker API into a slimmed-down version for our use.
 * @param rawPrize - A raw prize object from the GDQ Tracker API.
 * @returns The formatted prize object.
 */
function formatPrize(rawPrize) {
    return {
        id: rawPrize.pk,
        name: rawPrize.fields.name,
        provided: rawPrize.fields.provider || rawPrize.fields.provided || 'Anonymous',
        description: rawPrize.fields.shortdescription || rawPrize.fields.name,
        image: rawPrize.fields.altimage,
        minimumbid: numeral(rawPrize.fields.minimumbid).format('$0,0[.]00'),
        grand: rawPrize.fields.category__name === 'Grand',
        sumdonations: rawPrize.fields.sumdonations,
        startrun: {
            id: rawPrize.fields.startrun,
            name: rawPrize.fields.startrun__display_name || 'Unknown',
            longName: rawPrize.fields.startrun__name || 'Unknown',
            order: rawPrize.fields.startrun__order
        },
        endrun: {
            id: rawPrize.fields.endrun,
            name: rawPrize.fields.endrun__display_name || 'Unknown',
            longName: rawPrize.fields.endrun__name || 'Unknown',
            order: rawPrize.fields.endrun__order
        },
        type: 'prize'
    };
}
