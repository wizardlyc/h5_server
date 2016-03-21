/**
 * Created by hewenlong on 16-3-15.
 */

var AnimationInterface = function (spec) {
  var that = {};

  that.init = function (parent, callBack) {
    return true;
  };

  that.getAnimationNode = function () {
    console.log('error: virtual getAnimationNode function');
  };

  that.playOnce = function (actionName, cb, isHard) {
    that.playTimes(actionName, 1, cb);
  };

  that.playTimes = function (actionName, times, cb, isHard) {
    console.log('error: virtual playTimes function');
  };

  that.playList = function (actionList, cb, isHard) {
    console.log('error: virtual function');
  };

  that.playLoop = function (actionName, isHard) {
    console.log('error: virtual playLoop function');
  };

  that.reset = function () {
    console.log('error: virtual reset function');
  };

  that.aimTo = function (direction) {
    console.log('error: virtual function');
  };

  that.setVisible = function (isVisible) {
    console.log('error: virtual setVisible function');
  };

  that.destroy = function () {
    console.log('error: virtual destroy function');
  };

  that.turnAround = function (faceTo) {
    console.log('error: virtual  turnAround function');
  };

  that.setSlotVisible = function (slotName, isVisible) {
    console.log('error: virtual setSlotVisible function');
  };

  that.setTimeScale = function (timeScale) {
    console.log('error: virtual setTimeScale function');
  };
  that.setSkin = function (name) {
    console.log('error: virtual setSkin function');
  };
  that.setLocalZOrder = function (zOrder) {
    console.log("error: virtual set local zOrder func");
  } ;

  return that;
};

module.exports = AnimationInterface;