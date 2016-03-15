/**
 * Created by guolei on 16/3/14.
 */
const BaseLayer = require("./base-layer.js");
//const image = require("../../assets/ui/img/bomb1.png");
const Inherited = require("./../inherited");
const spine = require("pixi-spine");
const uiJSON = require("../ui-json/game-scene-json");

const GameScene = function (renderer) {
    let that = Inherited(BaseLayer(renderer));
    let sprite = null;
    let tween = null;
    let tweenBack = null;
    let position = null;

    that.inheritOn("init", function (dt) {

        //EZGUI
        let guiContainer = null;
        EZGUI.Theme.load(['./assets/kenney-theme/kenney-theme.json'], function () {
            guiContainer = EZGUI.create(uiJSON, 'kenney');
            that.node.addChildAt(guiContainer,0);
        });

        //Tween
        position = {x: 100, y: 100, rotation: 0};
        tween = new EZGUI.Tween(position)
            .to({x: 600, y: 350, rotation: 180}, 3000)
            .delay(3000)
            .easing(EZGUI.Easing.Elastic.InOut)
        ;

        tweenBack = new EZGUI.Tween(position)
            .to({x: 100, y: 80, rotation: 0}, 3000)
            .delay(3000)
            .easing(EZGUI.Easing.Elastic.InOut)
        ;
        tween.chain(tweenBack);
        tweenBack.chain(tween);

        //sprite
        PIXI.loader
            .add('test', "./assets/ui/img/test.png")
            .load(function (loader, resources) {
                sprite = new PIXI.Sprite(resources.test.texture);
                that.node.addChild(sprite);
                tween.start();
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



    });

    that.inheritOn("update", function (dt) {
        EZGUI.Tween.update(dt);
        if (sprite) {
            sprite.position.x = position.x;
            sprite.position.y = position.y;
            sprite.rotation = position.rotation;
        }

    });

    return that;
};
module.exports = GameScene;