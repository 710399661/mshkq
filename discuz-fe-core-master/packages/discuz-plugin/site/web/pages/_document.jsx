import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import {monitorScript} from '../../../lib/monitor';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  

  render() {
    return (
      <Html lang="cn">
        <Head>
          {monitorScript()}
        </Head>
        <body>
          <Main />
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
