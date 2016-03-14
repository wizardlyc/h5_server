/**
 * Created by guolei on 16/3/14.
 */
const BaseLayer = require("./base-layer.js");
//const image = require("../../assets/ui/img/bomb1.png");
const Inherited = require("./../inherited");
const spine = require("pixi-spine");

const GameScene = function (renderer) {
    let that = Inherited(BaseLayer(renderer));

    that.inheritOn("init", function () {
        //sprite
        PIXI.loader
            .add('bomb1', "./assets/ui/img/bomb1.png")
            .load(function (loader, resources) {
                let sprite = new PIXI.Sprite(resources.bomb1.texture);
                that.node.addChild(sprite);
            });
        //spine
        PIXI.loader
            .add('cat_5', './assets/cat_5.json')
            .load(function (loader, resources) {
                let animation = new spine.Spine(resources.cat_5.spineData);
                animation.position.x = 400;
                animation.position.y = 400;

                animation.scale.set(1.5);

                animation.state.setAnimationByName(0, 'idle', true);
                that.node.addChild(animation);
            });
        //EZGUI  unity3D


    });


    return that;
};
module.exports = GameScene;