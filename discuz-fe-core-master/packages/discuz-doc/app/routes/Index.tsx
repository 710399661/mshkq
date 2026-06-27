import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Component from './Component';
import Theme from './Theme';
import SDK from './Sdk';
import Cli from './Cli';
import Header from '@app/components/Header';
import Helper from './Helper';
import Help from './Help';
import Api from './API';
import Plugin from './Plugin';

export default function Index() {

  // 路由 hash 变化时，返回顶部
  React.useEffect(() => {
    const jumpToTop = () => {
      scrollTo(0, 0);
    };

    window.addEventListener('hashchange', jumpToTop);

    return () => {
      window.removeEventListener('hashchange', jumpToTop);
    }
  }, []);

  return (
    <div className="tdesign-wrapper tdesign-page-doc">
      <Header />
      <div className="tdesign-body">
        <div className="tdesign-container tdesign-container--fullpage tdesign-doc-container">
          <Switch>
            <Route path="/components" component={Component} />
            <Route path="/sdk" component={SDK} />
            <Route path="/api" component={Api} />
            <Route path="/plugin" component={Plugin} />
            <Route path="/theme" component={Theme} />
            <Route path="/cli" component={Cli} />
            <Route path="/helper" component={Helper}/>
            <Route path="/help" component={Help}/>
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
