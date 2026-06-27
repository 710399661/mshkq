declare global {
    interface Window {
        Aegis: any;
    }
}
export declare enum MonitorCallTypes {
    SETCONFIG = "setConfig",
    INFO = "info",
    REPORT = "report",
    ERROR = "error",
    REPORT_EVENT = "reportEvent",
    REPORT_TIME = "reportTime"
}
export interface MonitorProps {
    id: string;
}
export interface MonitorCallData {
    msg: string;
    eventName?: string;
    ext?: MonitorCallExt;
    duration: number;
}
export interface MonitorCallExt {
    ext1?: string;
    ext2?: string;
    ext3?: string;
}
