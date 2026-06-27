import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import styles from './index.module.scss';

import monitor from '../../../lib/monitor';

@inject('site')
@inject('store')
@observer
class Index extends React.Component {
  componentDidMount() {
    const target = monitor('KqnrSUjzgfvqboCluu');
    console.log(target);
  }
  render() {
    return (
        <div className='index'>
            <Link href="/monitor">monitor</Link>
        </div>
    );
  }
}

export default Index;
