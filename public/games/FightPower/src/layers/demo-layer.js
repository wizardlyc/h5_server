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
const RendererManager = require("../tools/renderer-manager");

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

    let _gameBgLayer = null;

    let _tweenLeft = null;
    let _tweenBgPos = null;
    let _tweenRight = null;
    let _tweenMid = null;

    let _tweenPetPos = null;
    let _tweenPetFront = null;
    let _tweenPetBack = null;
    let _tweenPetMid = null;

    that.inheritOn("init", function () {

        _gameBgLayer = PIXI.Sprite.fromImage(Resource.game_bg);
        _gameBgLayer.position.x = -192;
        _gameBgLayer.position.y = 100;
        that.node.addChild(_gameBgLayer);
        moveActions();

        _actionData = configManager.getConfigByType(Conf.ConfigType.PetActions);

        let layer = EZGUI.Theme.load([LayerJson], function () {
            _layerGui = EZGUI.create(DemoLayout, "demo");
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
            petActions();

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
        _petAnimation = Utils.createSpine(Resource.catSpine);
        _petAnimation.interactive = true;
        _petAnimation.buttonMode = true;
        _petAnimation.position.x = Conf.Canvas.posX_center;
        _petAnimation.position.y = Conf.Canvas.posY_center + 100;
        _petAnimation.scale.set(0.5);
        _petAnimation.state.setAnimationByName(0, 'stand', true);
        //stage.addChild(_petAnimation);
        _petAnimation
        // events for drag start
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            // events for drag end
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            // events for drag move
            .on('mousemove', onDragMove)
            .on('touchmove', onDragMove);

        _layerGui.addChild(_petAnimation);
    };


    function moveActions() {
        let actionTime = 1000;
        _tweenBgPos = {x: -192};

        _tweenLeft = new EZGUI.Tween(_tweenBgPos)
            .to({x: 0}, actionTime);

        _tweenMid = new EZGUI.Tween(_tweenBgPos)
            .to({x: -192}, actionTime);

        _tweenRight = new EZGUI.Tween(_tweenBgPos)
            .to({x: -384}, actionTime);

    };

    function playBgMoveActions() {
        if (_tweenBgPos.x === -192) {
            var random = Utils.random(0, 2);
            if (random > 0) {
                _tweenLeft.start();
            } else {
                _tweenRight.start();
            }
        } else {
            _tweenMid.start();
        }
    }

    function petActions() {
        let actionTime = 1000;

        _tweenPetPos = {y: Conf.Canvas.posY_center + 80, scale: 0.5};

        _tweenPetFront = new EZGUI.Tween(_tweenPetPos)
            .to({y: Conf.Canvas.posY_center + 160, scale: 0.60}, actionTime);

        _tweenPetMid = new EZGUI.Tween(_tweenPetPos)
            .to({y: Conf.Canvas.posY_center + 80, scale: 0.5}, actionTime);

        _tweenPetBack = new EZGUI.Tween(_tweenPetPos)
            .to({y: Conf.Canvas.posY_center, scale: 0.4}, actionTime);
    }

    function playPetMoveActions() {
        if (_tweenPetPos.scale === 0.5) {
            var random = Utils.random(0, 2);
            if (random > 0) {
                _tweenPetFront.start();
            } else {
                _tweenPetBack.start();
            }
        } else {
            _tweenPetMid.start();
        }
    }

    function playActions() {
        var random = Utils.random(0, 2);
        if (random > 0) {
            playPetMoveActions();
        } else {
            playBgMoveActions();
        }
    }

    function onDragStart(event) {
        this.data = event.data;
        this.dragging = true;
        //_petAnimation.state.setAnimationByName(0, animations.bathe, true);
    }

    function onDragEnd() {
        this.dragging = false;
        this.data = null;
        playActions();
        //_petAnimation.state.setAnimationByName(0, animations.exercise, true);

    }

    function onDragMove() {
        if (this.dragging) {
            //let newPosition = this.data.getLocalPosition(this.parent);
            //this.position.x = newPosition.x;
            //this.position.y = newPosition.y + 50;
        }
    }

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
    }

    that.inheritOn('update', function (dt) {
        EZGUI.Tween.update(dt);

        if (_feedTimerButton)
            _feedTimerButton.update(dt);
        if (_batheTimerButton)
            _batheTimerButton.update(dt);
        if (_shopTimerButton)
            _shopTimerButton.update(dt);
        if (_exerciseTimerButton)
            _exerciseTimerButton.update(dt);
        if (_gameBgLayer) {
            _gameBgLayer.position.x = _tweenBgPos.x;
        }
        if (_petAnimation) {
            _petAnimation.position.y = _tweenPetPos.y;
            _petAnimation.scale.set(_tweenPetPos.scale);
        }


    });

    Tools.event.on('levelUp', refreshLayerInfo);

    return that;
}
module.exports = DemoLayer;