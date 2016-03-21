/**
 * Created by hewenlong on 16-3-15.
 */

var defines = require("./../game-defines.js");
var PIXI = require("pixi.js");
PIXI.spine = require("pixi-spine");
var AnimationInterface = require("./animation-interface.js");

var SpineAnimation = function (spec) {
  var that = AnimationInterface(spec);

  var _spine = null;
  var _spineName = spec.spineName;
  var _actionList = [];
  var _parent = null;
  var _faceTo = 1;
  that.zOrder = 0;
  var spineData = spec.spineData;

  that.init = function (container) {
    container.addChild(_spine);
    _parent = container;
    return true;
  };

  that.setPosition = function (x, y) {
    console.log("animations set position", _spineName, x, y);
    _spine.position.x = x;
    _spine.position.y = y;
  };

  that.setSkin = function (skin) {
    _spine.skeleton.setSkinByName(skin);
  };

  that.turnAround = function (dir) {
    var scaleX = _spine.scale.x;
    _faceTo *= dir;
    _spine.scale.x = scaleX * _faceTo;
  };



  that.getPosition = function () {
    return {x: _spine.position.x, y: _spine.position.y};
  };


  that.setScale = function (x, y) {
    if (y === undefined) {
      _spine.scale.set(x * _faceTo, x);
    } else {
      _spine.scale.set(x * _faceTo, y);
    }
  };

  that.playLoop = function (action , isSoft) {
    if (!isSoft) {
      applyAllCallBack();
      _spine.skeleton.setToSetupPose();
      _spine.state.setAnimationByName(0, action, true);
    } else {
      _spine.state.addAnimationByName(0, action, true, 0);
    }

  };

  var applyAllCallBack = function () {
    while (_actionList.length > 0) {
      var action = _actionList.shift();
      if (action.cb) {
        action.cb();
      }
    }
  };

  that.getAnimationNode = function () {
    return _spine;
  };

  that.playTimes = function (action, times, callBack, isSoft) {
    var list = [];
    for (var i = 0; i < times; i++) {
      list.push(action);
    }
    that.playList(list, callBack, isSoft);
  };

  that.playList = function (list, callBack, isSoft) {
    if (list.length === 0) {
      if (callBack) {
        callBack();
      }
    }
    _spine.skeleton.setToSetupPose();
    var track;

    if (!isSoft) {
      applyAllCallBack();
      track = _spine.state.setAnimationByName(0, list[0], false);
    } else {
      track = _spine.state.addAnimationByName(0, list[0], false, 0);
    }
    if (!track) {
      if (callBack) {
        callBack();
      }
      return;
    }
    for (var i = 1; i < list.length; i++) {
      _spine.state.addAnimationByName(0, list[i], false, 0);
    }

    if (callBack) {
      var data = {
        waitingCount: list.length,
        cb: callBack
      };
      _actionList.push(data);
    }

  };

  that.destroy = function () {
    if (_parent && _spine) {
      var index = _parent.getChildIndex(_spine);
      if (index !== -1) {
        _parent.children.splice(index, 1);
      }
    }
  };

  that.reset = function () {
    _spine.skeleton.setBonesToSetupPose();
    _spine.skeleton.setSlotsToSetupPose();
    _spine.skeleton.clearTracks();
    _actionList = [];
  };

  that.setLocalZOrder = function (zOrder) {
    _spine.zOrder = zOrder;
    (_parent.children).sort(function (temp1, temp2) {
      if (!temp1.zOrder) {
        temp1.zOrder = 0;
      }
      if (!temp2.zOrder) {
        temp2.zOrder = 0;
      }
      return temp1.zOrder >= temp2.zOrder;
    });
  };

  var _onComplete = function () {
    if (_actionList <= 0) {
      return;
    }

    var data = _actionList[0];
    data.waitingCount--;
    if (data.waitingCount === 0) {
      _actionList.shift();
      data.cb();
    }
  };

  var createSpine = function() {
    _spine = new PIXI.spine.Spine(spineData);

    if (spec.dir) {
      that.turnAround(spec.dir);
    }
    if (spec.position) {
      that.setPosition(spec.position.x, spec.position.y);
    }
    if (spec.skin) {
      that.setSkin(spec.skin);
    }
    if (spec.scale) {
      that.setScale(spec.scale);
    }

    if (spec.action) {
      that.playLoop(spec.action);
    }

    _spine.state.onComplete = _onComplete;
  };
  createSpine();

  return that;
};

module.exports = SpineAnimation;