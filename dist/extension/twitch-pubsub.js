"use strict";
exports.__esModule = true;
// Packages
var TwitchPubSub = require("twitchps");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var nodecg = nodecgApiContext.get();
var DEBUG = nodecg.bundleConfig.twitch.debug;
var BITS_TOTAL_UPDATE_INTERVAL = 10 * 1000;
var log = new nodecg.Logger(nodecg.bundleName + ":twitch-pubsub");
var autoUpdateTotal = nodecg.Replicant('autoUpdateTotal');
var bitsTotal = nodecg.Replicant('bits:total');
autoUpdateTotal.on('change', function (newVal) {
    if (newVal) {
        updateBitsTotal();
    }
});
// Optional reconnect, debug options (Defaults: reconnect: true, debug: false)
// var ps = new TwitchPS({init_topics: init_topics});
var pubsub = new TwitchPubSub({
    init_topics: [{
            topic: "channel-bits-events-v1." + nodecg.bundleConfig.twitch.channelId,
            token: nodecg.bundleConfig.twitch.oauthToken
        }, {
            topic: "channel-subscribe-events-v1." + nodecg.bundleConfig.twitch.channelId,
            token: nodecg.bundleConfig.twitch.oauthToken
        }],
    reconnect: true,
    debug: DEBUG
});
pubsub.on('connected', function () {
    log.info('Connected to PubSub.');
});
pubsub.on('disconnected', function () {
    log.warn('Disconnected from PubSub.');
});
pubsub.on('reconnect', function () {
    log.info('Reconnecting to PubSub...');
});
pubsub.on('bits', function (cheer) {
    if (DEBUG) {
        log.info('Received cheer:', cheer);
    }
    nodecg.sendMessage('cheer', cheer);
});
pubsub.on('subscribe', function (subscription) {
    if (DEBUG) {
        log.info('Received subscription:', subscription);
    }
    nodecg.sendMessage('subscription', subscription);
});
updateBitsTotal();
setInterval(updateBitsTotal, BITS_TOTAL_UPDATE_INTERVAL);
function updateBitsTotal() {
    bitsTotal.value = 0;
}
