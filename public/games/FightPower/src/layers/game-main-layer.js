/**
 * Created by guolei on 16/3/25.
 */
const BaseLayer = require('./base-layer');
const Inherited = require('../tools/inherited');
const MainLayout = require('../gui-layouts/game-main-layout');
const Resource = require('../resource').res;
const GameMainLayer = function () {
    const LayerJson = "./assets/themes/demo-theme.json";
    let that = Inherited(BaseLayer());
    let _layerGui = null;
    let _gameBgLayer = null;

    that.inheritOn('init', function () {
        _gameBgLayer = PIXI.Sprite.fromImage(Resource.game_bg);
        _gameBgLayer.position.x = -192;
        _gameBgLayer.position.y = 100;
        that.node.addChild(_gameBgLayer);

        let layer = EZGUI.Theme.load([LayerJson], function () {
            _layerGui = EZGUI.create(MainLayout, "demo");
            that.node.addChild(_layerGui);
            EZGUI.components.petInfoBar0skill.bindChildren('mousedown', function (event, me) {
                console.log('petInfoBar0',me.guiID);

            });
            EZGUI.components.petInfoBar1skill.bindChildren('click', function (event, me) {
                console.log('petInfoBar1',me.guiID);
            });
            EZGUI.components.petInfoBar2skill.bindChildren('click', function (event, me) {
                console.log('petInfoBar2',me.guiID);
            });
        });


    });

    return that;
};
module.exports = GameMainLayer;