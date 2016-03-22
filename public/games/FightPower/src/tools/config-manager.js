/**
 * Created by guolei on 16/3/22.
 */
const configType = require('./conf').ConfigType;
const ConfigManager = (()=> {
    let that = {};
    let configMaps = {};

    that.init = function (callFunc) {
        readConfig(callFunc);
    };

    that.getConfigByType = (type)=> {
        return configMaps[type];
    };

    function readConfig(callFunc) {
        for (let i in configType) {
            EZGUI.utils.loadJSON(configType[i], function (themeConfig) {
                configMaps[configType[i]] = themeConfig;
                callFunc();
            });

        }
    }

    return that;
})();
module.exports = ConfigManager;
