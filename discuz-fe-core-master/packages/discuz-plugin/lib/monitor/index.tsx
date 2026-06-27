let Monitor: any;
if (process.env.DISCUZ_ENV === 'mini') {
    // taro项目的小程序
    Monitor = require('./adapter/taro').default;
}
if (process.env.DISCUZ_ENV === 'web') {
    Monitor = require('./adapter/next').default;
}

export default (id: string) => {
    return new Monitor({id});
};

export function monitorScript(): JSX.IntrinsicElements {
    // @ts-ignore
    return (<script src="https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js?_bid=3977"/>);
};