/**
 * Created by guolei on 16/3/14.
 */

const BaseLayer = function (renderer) {
    let that = {};
    that.node = new PIXI.Container();
    let _lastTime = 0;

    that.init = function () {
        _lastTime = new Date().getTime();
        requestAnimationFrame(beforeUpdate);
    };

    that.update = function (dt) {
        renderer.render(that.node);
    };

    function beforeUpdate() {
        var current = new Date().getTime();
        var dt = (current - _lastTime) / 1000; // seconds
        that.update(dt);
        _lastTime = current;
        requestAnimationFrame(beforeUpdate);
    }

    return that;
};

module.exports = BaseLayer;