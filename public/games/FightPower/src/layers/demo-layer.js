/**
 * Created by guolei on 16/3/16.
 */
const BaseLayer = require('./base-layer');
const Inherited = require("./../tools/inherited");
const DemoLayout = require("../gui-layouts/demo-layout");
const Conf = require('../tools/conf');
const Resource = require('../resource').res;
const Utils = require('../tools/utils');
const Data = require('../data/pet-data');
const Tools = require('../tools/tools');
const configManager = require('../tools/config-manager');
const TimerButton = require('../buttons/timer-button');

function DemoLayer() {
    const LayerJson = "./assets/themes/demo-theme.json";
    let that = Inherited(BaseLayer());
    let _petAnimation = null;
    let _layerGui = null;
    let _actionData = null;

    let _feedTimerButton = null;
    let _batheTimerButton = null;
    let _shopTimerButton = null;
    let _exerciseTimerButton = null;

    that.inheritOn("init", function () {
        _actionData = configManager.getConfigByType(Conf.ConfigType.PetActions);

        let layer = EZGUI.Theme.load([LayerJson], function () {
            _layerGui = EZGUI.create(DemoLayout, "demo");
            //for (let i in EZGUI.components) {
            //    if (EZGUI.components[i].settings.component === "Button") {
            //        EZGUI.components[i].on('click', ClickedOn);
            //    }
            //}
            _feedTimerButton = TimerButton(EZGUI.components.feed, _actionData.feed.time);
            _batheTimerButton = TimerButton(EZGUI.components.bathe, _actionData.bathe.time);
            _shopTimerButton = TimerButton(EZGUI.components.shopping, _actionData.shopping.time);
            _exerciseTimerButton = TimerButton(EZGUI.components.exercise, _actionData.exercise.time);

            _feedTimerButton.click(ClickedOn);
            _batheTimerButton.click(ClickedOn);
            _shopTimerButton.click(ClickedOn);
            _exerciseTimerButton.click(ClickedOn);

            that.node.addChild(_layerGui);
            initAnimation();
            refreshLayerInfo();
        });

    });

    function refreshLayerInfo() {
        initLayerInfo();
    }

    function initLayerInfo() {
        EZGUI.components.attack_num.text = Data.getPetData().attack;
        EZGUI.components.life_num.text = Data.getPetData().life;
    };

    function initAnimation() {
        let stage = new PIXI.Container();
        _petAnimation = Utils.createSpine(Resource.catSpine);
        _petAnimation.position.x = Conf.Canvas.posX_center + 70;
        _petAnimation.position.y = Conf.Canvas.posY_center + 100;
        //_petAnimation.scale.set(1.5);
        _petAnimation.state.setAnimationByName(0, 'stand', true);
        stage.addChild(_petAnimation);
        stage.on('touchdown', function () {
            console.log('click,Animation');
            _petAnimation.state.setAnimationByName(0, 'upgrade', true);
        });
        _layerGui.addChild(stage);
    };

    const animations = {
        'shopping': 'guangjie',
        'bathe': 'xizao',
        'feed': 'weishi',
        'exercise': 'duanlian'
    };

    function ClickedOn(event, me) {
        console.log('EZGUI.components', me.guiID);
        _petAnimation.state.setAnimationByName(0, animations[me.guiID], true);
        let data = _actionData[me.guiID];
        Data.addExp(data.exp);
        if (me.guiID === 'feed') {

        } else if (me.guiID === 'bathe') {

        } else if (me.guiID === 'shop') {

        } else if (me.guiID === 'exercise') {

        }
    }

    that.inheritOn('update', function (dt) {
        if(_feedTimerButton)
        _feedTimerButton.update(dt);
        if(_batheTimerButton)
        _batheTimerButton.update(dt);
        if(_shopTimerButton)
        _shopTimerButton.update(dt);
        if(_exerciseTimerButton)
        _exerciseTimerButton.update(dt);
    });

    Tools.event.on('levelUp', refreshLayerInfo);

    return that;
}
module.exports = DemoLayer;