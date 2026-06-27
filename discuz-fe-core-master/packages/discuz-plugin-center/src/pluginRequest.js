
import PluginRequest from "./request";
import DZQPluginCenter from './index';

function taskCallback(name, setPluginComponent) {
    if ( !window.DZQPlugin[name].default ) {
        console.error(`${name}没有找到default属性${window.DZQPlugin[name]}`);
    }
    const result = DZQPluginCenter.register(window.DZQPlugin[name].default);

    if ( result && result.map && result.pluginName ) {
        setPluginComponent(result.pluginName, result.map);
    }
}

function preTaskCallback(data, setPluginComponent) {
    const result = DZQPluginCenter.register(data);

    if ( result && result.map && result.pluginName ) {
        setPluginComponent(result.pluginName, result.map);
    }
}

function task(pluginData, setPluginComponent) {
    const { name_en, version, view, author } = pluginData;
    if ( !view ) {
        return;
    }

    for ( let key in view ) {
        if ( !view[key]['pluginFiles'] ) continue;

        new PluginRequest({
            pluginName: name_en,
            pluginVersion: version,
            pluginComponentName: key,
            pluginData: view[key],
            author, 
            callback: (name) => {taskCallback(name, setPluginComponent)},
            preCallback: (data) => {preTaskCallback(data, setPluginComponent);}
        })
    }
}

export default function pluginRequest(data, setPluginComponent) {
    if ( !data || data.length === 0 ) return;
    for ( let i = 0; i < data.length; i++ ) {
        task(data[i], setPluginComponent);
    }
} 