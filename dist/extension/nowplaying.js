'use strict';
exports.__esModule = true;
// Packages
var express = require("express");
var bodyParser = require("body-parser");
var debounce = require("lodash.debounce");
// Ours
var nodecgApiContext = require("./util/nodecg-api-context");
var app = express();
var nodecg = nodecgApiContext.get();
var pulsing = nodecg.Replicant('nowPlayingPulsing', { defaultValue: false, persistent: false });
var nowPlaying = nodecg.Replicant('nowPlaying', { persistent: false });
var pulseTimeout;
nodecg.listenFor('pulseNowPlaying', pulse);
var changeSong = debounce(function (newSong) {
    nowPlaying.value = {
        game: newSong.game,
        title: newSong.title
    };
    // If the graphic is already showing, end it prematurely and show the new song
    if (pulsing.value) {
        clearTimeout(pulseTimeout);
        pulsing.value = false;
    }
    // Show the graphic
    pulse();
}, 2000);
app.use(bodyParser.json());
app.post("/" + nodecg.bundleName + "/song", function (req, res, next) {
    if (typeof req.body !== 'object') {
        res.sendStatus(400);
        return next();
    }
    if (nodecg.bundleConfig.nowPlayingKey && req.body.key !== nodecg.bundleConfig.nowPlayingKey) {
        return res.sendStatus(401);
    }
    changeSong(req.body);
    res.sendStatus(200);
});
nodecg.mount(app);
/**
 * Shows the nowPlaying graphic for 12 seconds.
 */
function pulse() {
    // Don't stack pulses
    if (pulsing.value) {
        return;
    }
    pulsing.value = true;
    // Hard-coded 12 second duration
    pulseTimeout = setTimeout(function () {
        pulsing.value = false;
    }, 12 * 1000);
}
