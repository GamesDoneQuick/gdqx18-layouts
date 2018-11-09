'use strict';
exports.__esModule = true;
/*
 * NOTE: It is absolutely critical that the `args` param of any udpPort.send command not be null or undefined.
 * Doing so causes the osc lib to actually encode it as a null argument (,N). Instead, use an empty array ([]).
 */
// Packages
var osc = require("osc");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var nodecg = nodecgApiContext.get();
var X32_UDP_PORT = 10023;
var FADE_THRESHOLD = 0.1;
var gameAudioChannels = nodecg.Replicant('gameAudioChannels', { persistent: false });
var channelToReplicantMap = {};
nodecg.bundleConfig.osc.gameAudioChannels.forEach(function (item, index) {
    if (!gameAudioChannels.value[index]) {
        return;
    }
    if (typeof item.sd === 'number') {
        channelToReplicantMap[item.sd] = gameAudioChannels.value[index].sd;
    }
    if (typeof item.hd === 'number') {
        channelToReplicantMap[item.hd] = gameAudioChannels.value[index].hd;
    }
});
var udpPort = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: 52361,
    remoteAddress: nodecg.bundleConfig.osc.address,
    remotePort: X32_UDP_PORT,
    metadata: true
});
udpPort.on('raw', function (buf) {
    var str = buf.toString('ascii');
    var valueArray = [];
    var channelNumber = 0;
    var valueBytes;
    var replicantObject;
    if (str.indexOf('/chMutes') === 0) {
        // For this particular message, we know that the values start at byte 22 and stop 2 bytes from the end.
        valueBytes = buf.slice(22, -2);
        for (var i = 0; i < valueBytes.length; i += 4) {
            var muted = !valueBytes.readFloatBE(i);
            valueArray.push(muted);
            replicantObject = channelToReplicantMap[String(channelNumber + 1)];
            if (replicantObject) {
                replicantObject.muted = muted;
            }
            channelNumber++;
        }
    }
    else if (str.indexOf('/chFaders') === 0) {
        // For this particular message, we know that the values start at byte 24
        valueBytes = buf.slice(24);
        for (var i = 0; i < valueBytes.length; i += 4) {
            var fadedBelowThreshold = valueBytes.readFloatLE(i) < FADE_THRESHOLD;
            valueArray.push(fadedBelowThreshold);
            replicantObject = channelToReplicantMap[String(channelNumber + 1)];
            if (replicantObject) {
                replicantObject.fadedBelowThreshold = fadedBelowThreshold;
            }
            channelNumber++;
        }
    }
});
udpPort.on('error', function (error) {
    nodecg.log.warn('[osc] Error:', error.stack);
});
udpPort.on('open', function () {
    nodecg.log.info('[osc] Port open, can now communicate with a Behringer X32.');
});
udpPort.on('close', function () {
    nodecg.log.warn('[osc] Port closed.');
});
// Open the socket.
udpPort.open();
renewSubscriptions();
setInterval(renewSubscriptions, 10000);
/**
 * Renews subscriptions with the X32 (they expire every 10s).
 */
function renewSubscriptions() {
    udpPort.send({
        address: '/batchsubscribe',
        args: [
            // First defines the local endpoint that the X32 will send this subscription data to.
            { type: 's', value: '/chMutes' },
            { type: 's', value: '/mix/on' },
            { type: 'i', value: 0 },
            { type: 'i', value: 63 },
            { type: 'i', value: 10 }
        ]
    });
    udpPort.send({
        address: '/batchsubscribe',
        args: [
            // First defines the local endpoint that the X32 will send this subscription data to.
            { type: 's', value: '/chFaders' },
            { type: 's', value: '/mix/fader' },
            { type: 'i', value: 0 },
            { type: 'i', value: 63 },
            { type: 'i', value: 10 }
        ]
    });
}
