/**
 * Created by hewenlong on 16-3-18.
 */

var ResourceManager = function () {
  var that = {};
  that.loadingMap = {};
  that.init = function () {
    return true;
  };

  that.loadSpineRes = function (spineName, cb) {
    var globalRes = PIXI.loader.resources;
    if (globalRes[spineName] && globalRes[spineName].spineData) {
      console.log(" res has load, call back", spineName)
      cb(null, globalRes);
    } else {
      if (!that.loadingMap[spineName]) {
        that.loadingMap[spineName] = [];
        that.loadingMap[spineName].push(cb);
        console.log(' load res');
        PIXI.loader.add(spineName, './assets/' + spineName + '.json').load(function (loader, res) {
          for (var i = 0; i < that.loadingMap[spineName].length; i++) {
            that.loadingMap[spineName][i](loader, res);
          }
          delete that.loadingMap[spineName];
        });
      } else {
        console.log('waiting load ');
        that.loadingMap[spineName].push(cb);
      }
    }
  }
  return that;
};
var resourceManager = ResourceManager();
resourceManager.init();
module.exports = resourceManager;