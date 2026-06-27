import React from 'react';
import { BackToTop, Button, Icon } from '@discuzq/design'
import { HashRouter } from 'react-router-dom';
import Index from './routes/Index';

import './App.less';
import '../style/site/index.less';
import '../../discuz-design/styles/index.scss';
import { FeedBack } from "@app/components/FeedBack";

const App = () => (
  <HashRouter>
    <BackToTop bottom={100}>
        <div className={"back-to-top-wrapper"} title={"返回顶部"}>
            <Icon name={"TopOutlined"} size={"24px"} />
        </div>
    </BackToTop>
    <FeedBack />
    <Index />
  </HashRouter>
);

export default App;
