import { MonitorProps, MonitorCallTypes, MonitorCallData, MonitorCallExt } from '../interface';
declare class Monitor {
    constructor(props: MonitorProps);
    monitor: any;
    init(id: string): any;
    call(type: MonitorCallTypes, data: MonitorCallData): void;
    _setConfig(data: MonitorCallData): void;
    _info(msg: string): void;
    _report(msg: string): void;
    _error(msg: string): void;
    _reportEvent(eventName?: string, ext?: MonitorCallExt): void;
    _reportTime(eventName?: string, duration?: number, ext?: MonitorCallExt): void;
}
export default Monitor;
