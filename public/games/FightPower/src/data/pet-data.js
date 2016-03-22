/**
 * Created by guolei on 16/3/22.
 */
const configManager = require('../tools/config-manager');
const Tool = require('../tools/tools');
const PetData = (()=> {
    let that = {};
    let _petSumExp = 900;
    let _petData = {
        level: 0,
        currentLevelExp: 0,
        levelExp: 0,
        life: 100,
        attack: 5
    };
    let _petLevelData = null;

    that.init = function () {
        _petLevelData = configManager.getConfigByType(Tool.conf.ConfigType.PetLevels);
        let level = 0;
        let sumExp = 0;
        for (let i in _petLevelData) {
            let levelExp = _petLevelData[i].experience;
            sumExp += levelExp;

            if (_petSumExp <= sumExp) {
                _petData.life = _petLevelData[i].life;
                _petData.attack = _petLevelData[i].attack;
                _petData.currentLevelExp = sumExp - _petSumExp;
                _petData.levelExp = _petLevelData[i].experience;
                _petData.level = level;
                return;
            }
            level++;
        }
    };

    that.addExp = function (exp) {
        _petSumExp += exp;
        console.log('levelExp', _petData.levelExp, 'level', _petData.level, 'currentLevelExp', _petData.currentLevelExp);
        _petData.currentLevelExp += exp;
        if (_petData.currentLevelExp >= _petData.levelExp) {
            _petData.level += 1;
            let levelData = _petLevelData['level_' + _petData.level];
            _petData.currentLevelExp = _petData.currentLevelExp - _petData.levelExp;
            _petData.levelExp = levelData.experience;
            _petData.life = levelData.life;
            _petData.attack = levelData.attack;
            Tool.event.fire('levelUp');
        }
    };

    that.getPetData = ()=>_petData;

    return that;

})();
module.exports = PetData;