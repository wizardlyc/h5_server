/**
 * Created by guolei on 16/3/22.
 */
const TimerButton = function (button, time) {
    let that = {};
    let _cdTime = time;
    let _fixedTime = 1.0;
    let _goCD = false;
    let _showText = button.text;

    that.click = function (callFunc) {
        button.on('click', function (event, me) {
            if (_goCD)return;
            _goCD = true;
            button.text = _cdTime;
            callFunc(event, me);
        });
    };

    button.on('touchdown', function (event, me) {
        if (!_goCD) {

        }

    });

    that.update = function (dt) {
        if (!_goCD)return;

        _fixedTime -= dt;
        if (_fixedTime <= 0) {
            if (_cdTime > 0) {
                _cdTime -= 1.0;
                button.text = _cdTime;
            } else {
                button.text = _showText;
                _goCD = false;
            }
            _fixedTime += 1.0;
        }
    }


    return that;
};
module.exports = TimerButton;