"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var aegis_mp_sdk_1 = require("aegis-mp-sdk");
var Monitor = /** @class */ (function () {
    function Monitor(props) {
        this.monitor = null;
        this.monitor = this.init(props.id);
    }
    Monitor.prototype.init = function (id) {
        return new aegis_mp_sdk_1.default({
            id: id,
            reportApiSpeed: true // 接口测速
        });
    };
    Monitor.prototype.call = function (type, data) {
        if (!this.monitor)
            return;
        switch (type) {
            case 'setConfig':
                this._setConfig(data);
                break;
            case 'info':
                this._info(data.msg);
                break;
            case 'report':
                this._report(data.msg);
                break;
            case 'error':
                this._error(data.msg);
                break;
            case 'reportEvent':
                this._reportEvent(data.eventName, data.ext);
                break;
            case 'reportTime':
                this._reportTime(data.eventName, data.duration, data.ext);
                break;
        }
    };
    Monitor.prototype._setConfig = function (data) {
        this.monitor.setConfig && this.monitor.setConfig(data);
    };
    Monitor.prototype._info = function (msg) {
        this.monitor.info && this.monitor.info(msg);
    };
    Monitor.prototype._report = function (msg) {
        this.monitor.report && this.monitor.report(msg);
    };
    Monitor.prototype._error = function (msg) {
        this.monitor.error && this.monitor.error(msg);
    };
    Monitor.prototype._reportEvent = function (eventName, ext) {
        if (ext === void 0) { ext = {}; }
        this.monitor.reportEvent && this.monitor.reportEvent(tslib_1.__assign(tslib_1.__assign({}, ext), { name: eventName }));
    };
    Monitor.prototype._reportTime = function (eventName, duration, ext) {
        if (ext === void 0) { ext = {}; }
        this.monitor.reportEvent && this.monitor.reportTime(tslib_1.__assign(tslib_1.__assign({}, ext), { name: eventName, duration: duration }));
    };
    return Monitor;
}());
exports.default = Monitor;
