import { useEffect, useLayoutEffect } from 'react';
import '../../../styles/index.scss';

export default function MyApp({ Component, pageProps }) {
  useLayoutEffect(() => {
    const {
      domainLookupEnd,
      domainLookupStart,
      connectEnd,
      connectStart,
      responseEnd,
      responseStart,
      domComplete,
      domInteractive,
      navigationStart,
      domContentLoadedEventEnd,
      loadEventEnd,
      redirectEnd,
      redirectStart,
    } = performance.timing;
    console.log({
      重定向耗时: redirectEnd - redirectStart,
      DNS查询耗时: domainLookupEnd - domainLookupStart,
      TCP链接耗时: connectEnd - connectStart,
      HTTP请求耗时: responseEnd - responseStart,
      解析dom树耗时: domComplete - domInteractive,
      白屏时间: responseStart - navigationStart,
      DOMready时间: domContentLoadedEventEnd - navigationStart,
      onload时间: loadEventEnd - navigationStart,
    });
  }, []);
  return <Component {...pageProps} />;
}
