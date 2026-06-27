import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import api from '../api-entry';

export default class Home extends React.Component {
  static async getInitialProps() {
    const res = await api.readCategories({
      timeout: 100,
    });
    console.log('readCategories------------', res);
    return { res };
  }

  render() {
    console.log(this.props);
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    );
  }
}
