export default class PluginRequest {
    constructor(props) {
        const { pluginName, author, type, app_id, pluginVersion, pluginComponentName, pluginData, callback, preCallback } = props;
        const {disables, pluginFiles} = pluginData;
        const {js, css} = pluginFiles;
        if ( disables ) return;
        this.task = {};
        this.pluginComponentName = pluginComponentName;
        this.callback = callback;
        this.preCallback = preCallback;
        if ( js && js.length !== 0 ) {
            for ( let i = 0; i < js.length; i++ ) {
                this.task[js[i]] = {
                    type: 'js',
                    done: false
                };
            }
        }
        if ( css && css.length !== 0 ) {
            for ( let i = 0; i < js.length; i++ ) {
                this.task[css[i]] = {
                    type: 'css',
                    done: false
                };
            }
        }

        if ( !this.isEmptyObject(this.task) ) {
            this.preRegister({
                ...pluginData, 
                pluginName: pluginName, 
                version: pluginVersion, 
                author,
                type,
                app_id,
                component: 'padding'
            });
            this.start();
        }
    }

    preRegister(data) {
        const {
            pluginName,
            disables,
            version,
            target,
            hookName,
            component,
            author,
            type,
            app_id,
            platform,
            path = '',
            options = {}
        } = data;
        this.preCallback(data);
    }

    isEmptyObject(s) {
        // eslint-disable-next-line no-restricted-syntax
        for (const name in s) {
          return false;
        }
        return true;
    }

    start() {
        for ( let key in this.task ) {
            const { type } = this.task[key];
            if ( type === 'js' ) {
                this.createJS(key);
            }
            else if ( type === 'css' ) {
                this.createCSS(key);
            }
        }
    }

    createJS(url) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            if(this.task[url]) this.task[url]['done'] = true;
            this.check() && this.callback(this.pluginComponentName);
        }
        script.onerror = () => {
            console.error(`${this.pluginComponentName}, 资源加载失败：${url}`);
        }
        document.body.appendChild(script);
       
    }

    createCSS(url) {
        const link = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.onload = () => {
            if(this.task[url]) this.task[url]['done'] = true;
            this.check() && this.callback(this.pluginComponentName);
        }
        link.onerror = () => {
            console.error(`${this.pluginComponentName}, 资源加载失败：${url}`);
        }
        document.head.appendChild(link);
    }

    check() {
        for ( let key in this.task ) {
            const { done } = this.task[key];
            if (!done) return false;
        }
        return true;
    }
    
}