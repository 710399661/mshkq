import React from 'react';
import Link from 'next/link';
import Test from '@component/test';
import { inject, observer } from 'mobx-react';
import styles from './index.module.scss';

@inject('site')
@inject('store')
@observer
class Index extends React.Component {
  render() {
    return (
        <div className='index'>
            <h1>hello world!!!{this.props.store.value}</h1>
            <p>name: {this.props.store.user.name}</p>
            <p>age: {this.props.store.user.age}</p>
            <p>other: {this.props.store.user.other.a} --- {this.props.store.user.other.b}</p>
            <button onClick={() => {
              this.props.store.changeUser();
            }}>click</button>
            <p className={styles.text}>123</p>
            <Link href="/detail">detail</Link>
            <Test/>
        </div>
    );
  }
}

export default Index;
