"use strict";
exports.__esModule = true;
var GAME_SCENE_NAME_REGEX = /^(Standard|Widescreen|GBA|Gameboy|3DS|DS|LttP|OoT|Mario|SM\/ALttP)/;
var preloadedImages = new Set();
var preloaderPromises = new Map();
/**
 * Preloads an image.
 * @param src - The URL of the new image to load.
 * @returns - A promise that is resolved if the load succeeds, and rejected it the load fails.
 */
function preloadImage(src) {
    if (preloadedImages.has(src)) {
        return Promise.resolve();
    }
    if (preloaderPromises.has(src)) {
        return preloaderPromises.get(src);
    }
    var preloadPromise = new Promise(function (resolve, reject) {
        if (!src) {
            resolve();
            return;
        }
        var preloader = document.createElement('img');
        preloader.style.position = 'absolute';
        preloader.style.bottom = '0';
        preloader.style.left = '0';
        preloader.style.width = '1px';
        preloader.style.height = '1px';
        preloader.style.opacity = '0.01';
        var listeners = {
            load: null,
            error: null
        };
        listeners.load = function (event) {
            event.target.removeEventListener('error', listeners.error);
            event.target.removeEventListener('load', listeners.load);
            preloadedImages.add(src);
            resolve();
        };
        listeners.error = function (event) {
            event.target.removeEventListener('error', listeners.error);
            event.target.removeEventListener('load', listeners.load);
            reject(new Error("Image failed to load: " + src));
        };
        preloader.addEventListener('load', listeners.load);
        preloader.addEventListener('error', listeners.error);
        preloader.src = src;
    });
    preloaderPromises.set(src, preloadPromise);
    return preloadPromise;
}
exports.preloadImage = preloadImage;
function isGameScene(sceneName) {
    if (!sceneName) {
        return false;
    }
    return Boolean(sceneName.match(GAME_SCENE_NAME_REGEX));
}
exports.isGameScene = isGameScene;
