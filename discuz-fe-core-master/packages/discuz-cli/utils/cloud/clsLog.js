class ClsLog {
    constructor() {
        this.logInfo = {};
    }
    init(data) {
        this.logInfo = data;
    }
    set(data) {
        this.logInfo = data;
    }
    get() {
        return this.logInfo;
    }
    console(data) {
        console._stdout.write(JSON.stringify({
            ...this.logInfo,
            ...data,
            'LOG_TIME': new Date().getTime()
        }) + '\n');
    }
}
const clsLog = new ClsLog();
module.exports = clsLog;