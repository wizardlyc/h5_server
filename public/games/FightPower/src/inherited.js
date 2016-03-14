/**
 * Created by wizard on 15/3/3.
 */

var Inherited = function (obj) {
    var registry = {};

    obj.inheritOn = function (name, handler) {

        if (!obj.hasOwnProperty(name)) {
            obj[name] = handler;
            return;
        }

        if (registry.hasOwnProperty(name)) {
            registry[name].push(handler);
        }
        else {
            var parentHandler = obj[name];
            registry[name] = [parentHandler, handler];

            obj[name] = function () {
                var result;
                var handlerList = registry[name];
                for (var index in handlerList) {
                    result = handlerList[index].apply(this, arguments);
                    if (result != undefined && !result) {
                        return result;
                    }
                }

                return result;
            }
        }
    };

    return obj;
}
module.exports = Inherited;
