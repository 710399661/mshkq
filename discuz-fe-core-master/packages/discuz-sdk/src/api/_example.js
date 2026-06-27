
class Request {
    request = null;
    getRequestContext() {
        return this.request;
    }
    setRequestContext(request) {
        if (this.request) {
            console.warn('已存在request实例！重复创建可能引起意想不到的情况！！！');
        }
        this.request = request;
    }
    async dispatcher(options) {
        if ( !this.request ) {
            console.error('未实例化request实例！');
            return;
        }
        return await this.request.http(options);
    }
}

const request = new Request();

export default request;