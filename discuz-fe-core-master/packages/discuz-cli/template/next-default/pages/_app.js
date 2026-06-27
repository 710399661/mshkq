import { Provider } from 'mobx-react';
import App from 'next/app';
import initializeStore from '../store';
import '../styles/index.scss';


class DzqApp extends App {
  static async getInitialProps(appContext) {
    const appStore = initializeStore();
    // eslint-disable-next-line no-param-reassign
    appContext.ctx.appStore = appStore;
    const appProps = await App.getInitialProps(appContext);
    return {
      ...appProps,
      initialAppStore: appStore,
    };
  }

  constructor(props) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.appStore = isServer ? props.initialAppStore : initializeStore();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider {...this.appStore}>
          <Component {...pageProps} />
      </Provider>
    );
  }
}

export default DzqApp;
