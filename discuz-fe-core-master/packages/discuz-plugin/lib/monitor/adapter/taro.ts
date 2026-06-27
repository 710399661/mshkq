import Aegis from 'aegis-mp-sdk'; 
import { MonitorProps, MonitorCallTypes, MonitorCallData, MonitorCallExt } from '../interface';

class Monitor {

    constructor(props: MonitorProps) {
        this.monitor = this.init(props.id);
    }

    monitor: any = null;

    init (id: string): any {
       return new Aegis({
            id, // 项目ID，即上报key
            reportApiSpeed: true // 接口测速
        })
    }
    call(type: MonitorCallTypes, data: MonitorCallData): void {

        if ( !this.monitor ) return;
        switch(type) {
            case 'setConfig': this._setConfig(data);
            break;
            case 'info': this._info(data.msg);
            break;
            case 'report': this._report(data.msg);
            break;
            case 'error': this._error(data.msg);
            break;
            case 'reportEvent': this._reportEvent(data.eventName, data.ext);
            break;
            case 'reportTime': this._reportTime(data.eventName, data.duration, data.ext);
            break;
        }
    }

    _setConfig(data: MonitorCallData) {
        this.monitor.setConfig && this.monitor.setConfig(data);
    }
    _info(msg: string) {
        this.monitor.info && this.monitor.info(msg);
    }
    _report(msg: string) {
        this.monitor.report && this.monitor.report(msg);
    }
    _error(msg: string) {
        this.monitor.error && this.monitor.error(msg);
    }
    _reportEvent(eventName?: string, ext: MonitorCallExt = {}) {
        this.monitor.reportEvent && this.monitor.reportEvent({...ext, name: eventName});
    }
    _reportTime(eventName?: string, duration?: number, ext:MonitorCallExt = {}) {
        this.monitor.reportEvent && this.monitor.reportTime({...ext, name: eventName, duration});
    }

}

export default Monitor;