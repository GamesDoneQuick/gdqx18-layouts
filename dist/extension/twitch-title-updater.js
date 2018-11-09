"use strict";
exports.__esModule = true;
// Packages
var request = require("request-promise");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var nodecg = nodecgApiContext.get();
var log = new nodecg.Logger(nodecg.bundleName + ":twitch");
var currentRun = nodecg.Replicant('currentRun');
var lastLongName;
currentRun.on('change', function (newVal) {
    if (newVal.longName === lastLongName) {
        return;
    }
    log.info('Updating Twitch title and game to', newVal.longName);
    lastLongName = newVal.longName;
    request({
        method: 'put',
        uri: "https://api.twitch.tv/kraken/channels/" + nodecg.bundleConfig.twitch.channelId,
        headers: {
            Accept: 'application/vnd.twitchtv.v5+json',
            Authorization: "OAuth " + nodecg.bundleConfig.twitch.oauthToken,
            'Client-ID': nodecg.bundleConfig.twitch.clientId,
            'Content-Type': 'application/json'
        },
        body: {
            channel: {
                // tslint:disable-next-line:no-invalid-template-strings
                status: nodecg.bundleConfig.twitch.titleTemplate.replace('${gameName}', newVal.longName),
                game: newVal.longName
            }
        },
        json: true
    }).then(function () {
        log.info('Successfully updated Twitch title and game to', newVal.longName);
    })["catch"](function (err) {
        log.error('Failed updating Twitch title and game:\n\t', err);
    });
});
