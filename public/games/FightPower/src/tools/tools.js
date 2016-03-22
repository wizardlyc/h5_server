/**
 * Created by guolei on 16/3/21.
 */
const Utils = require('./utils');
const Conf = require('./conf');
const Eventuality = require('./eventuality');

let Tools = Tools || {};
Tools.utils = Utils;
Tools.conf = Conf;
Tools.event = Eventuality({});


module.exports = Tools;