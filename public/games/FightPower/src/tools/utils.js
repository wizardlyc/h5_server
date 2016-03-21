/**
 * Created by guolei on 16/3/21.
 */
let Utils = Utils || {};
const Spine = require('pixi-spine').Spine;

Utils.removeRepeat = function (array) {
    return Array.from(new Set(array));
};

Utils.random = function (min, max) {
    return Math.floor((Math.random() * (max - min) + min));
};

Utils.createSprite = function (g_res) {
    return new PIXI.Sprite(PIXI.loader.resources[g_res].texture)
};

Utils.createSpine = function (g_res) {
    return new Spine(PIXI.loader.resources[g_res].spineData)
};
module.exports = Utils;
