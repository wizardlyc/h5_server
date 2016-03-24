/**
 * Created by guolei on 16/3/14.
 */
const Conf = require("./conf");

const RendererManager = function () {
    let that = {};
    that.renderer = null;

    that.init = function () {
        that.renderer = PIXI.autoDetectRenderer(Conf.Canvas.width, Conf.Canvas.height);
        document.body.appendChild(that.renderer.view);
    };


    return that;
};
 module.exports = RendererManager();