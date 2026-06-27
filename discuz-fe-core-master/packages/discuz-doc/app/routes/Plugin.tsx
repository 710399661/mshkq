import React, {useEffect} from "react";
import { DocumentMainContent } from "../components/DocumentMainContent";
import ReactMarkdown from 'react-markdown'
import { NavLink, Route, Switch, Redirect, useHistory } from "react-router-dom";
import useRouter from "use-react-router";
import Introduce from '@discuz/plugin-center/README.md';
import Init from '@discuz/plugin-center/docs/start/init.md';
import Dir from '@discuz/plugin-center/docs/start/dir.md';
import Config from '@discuz/plugin-center/docs/start/config.md';
import Import from '@discuz/plugin-center/docs/start/import.md';
import Build from '@discuz/plugin-center/docs/start/build.md';
import Develop from '@discuz/plugin-center/docs/start/develop.md';
import toc, { Component as TeaComponent } from "!!toc-loader?importRoot=@discuz/plugin-center/&mode=text!@discuz/plugin-center/README.md";

const componentMap = new Map<string, TeaComponent>();
const nextMap = new Map<string, string>();
const prevMap = new Map<string, string>();

let lastKey: string = null;
// eslint-disable-next-line no-restricted-syntax
for (const category of toc) {
  // eslint-disable-next-line no-restricted-syntax
  for (const component of category.components) {
    const currentKey = component.sourceName;
    componentMap.set(currentKey, component);
    nextMap.set(lastKey, currentKey);
    prevMap.set(currentKey, lastKey);
    lastKey = currentKey;
  }
}

function ComponentMenu() {
  const { history } = useRouter();
  const pathname = history.location && history.location.pathname;

  useEffect(() => {
    const name = pathname.replace(/\/plugin\//, '');
    const component = Array.from(componentMap.values()).find(
        ({ sourceName }) => sourceName === name,
    );
    if (name && component) {
      document.title = `${component.chineseName} - 插件开发`;
    } else {
      document.title = '插件开发';
    }
  }, [pathname]);

  return (
      <div className="tdesign-fixed-side">
        <div className="tdesign-sidenav">
          <div className="tdesign-sidenav-group tdesign-sidenav-group--deep0">
            <div className="tdesign-sidenav-group__title">开始</div>
            <div className="tdesign-sidenav-group__children">
              <li className="tdesign-sidenav-item">
                <NavLink
                    to={'/plugin/start'}
                    className="tdesign-main-link tdesign-sidenav-link"
                    activeClassName="router-link-exact-active router-link-active tdesign-sidenav-link--active"
                >
                  介绍
                </NavLink>
              </li>
              <li className="tdesign-sidenav-item">
                <NavLink
                    to={'/plugin/init'}
                    className="tdesign-main-link tdesign-sidenav-link"
                    activeClassName="router-link-exact-active router-link-active tdesign-sidenav-link--active"
                >
                  初始化插件
                </NavLink>
              </li>
              <li className="tdesign-sidenav-item">
                <NavLink
                    to={'/plugin/dir'}
                    className="tdesign-main-link tdesign-sidenav-link"
                    activeClassName="router-link-exact-active router-link-active tdesign-sidenav-link--active"
                >
                  目录规范
                </NavLink>
              </li>
              <li className="tdesign-sidenav-item">
                <NavLink
                    to={'/plugin/config'}
                    className="tdesign-main-link tdesign-sidenav-link"
                    activeClassName="router-link-exact-active router-link-active tdesign-sidenav-link--active"
                >
                  插件配置
                </NavLink>
              </li>
              <li className="tdesign-sidenav-item">
                <NavLink
                    to={'/plugin/build'}
                    className="tdesign-main-link tdesign-sidenav-link"
                    activeClassName="router-link-exact-active router-link-active tdesign-sidenav-link--active"
                >
                  插件构建
                </NavLink>
              </li>
              <li className="tdesign-sidenav-item">
                <NavLink
                    to={'/plugin/import'}
                    className="tdesign-main-link tdesign-sidenav-link"
                    activeClassName="router-link-exact-active router-link-active tdesign-sidenav-link--active"
                >
                  插件加载
                </NavLink>
              </li>
              <li className="tdesign-sidenav-item">
                <NavLink
                    to={'/plugin/develop'}
                    className="tdesign-main-link tdesign-sidenav-link"
                    activeClassName="router-link-exact-active router-link-active tdesign-sidenav-link--active"
                >
                  本地开发
                </NavLink>
              </li>
            </div>
          </div>
          {toc.map(({ category, components }, index) => (
              <div key={index} className="tdesign-sidenav-group tdesign-sidenav-group--deep0">
                <div className="tdesign-sidenav-group__title">{category}</div>
                <div className="tdesign-sidenav-group__children">
                  {components.map((component) => (
                      <li key={component.sourceName} className="tdesign-sidenav-item">
                        <NavLink
                            to={`/plugin/${component.sourceName}`}
                            className="tdesign-main-link tdesign-sidenav-link"
                            activeClassName="router-link-exact-active router-link-active tdesign-sidenav-link--active"
                        >
                          {component.done ? '' : '🏃'}
                          {component.chineseName}
                        </NavLink>
                      </li>
                  ))}
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}

const PluginPage = () => {
  return (
    <div className="tdesign-doc">
      <ComponentMenu />
        <Route path="/plugin/:doc?">
        {({ match }) => {
          const key: string = match && match.params && match.params.doc;
            if (key === 'start') {
              return (
                <DocumentMainContent fileMTime={Introduce?.fileMTime || ''}>
                  <ReactMarkdown>
                    {Introduce.sourceMarkdown.split('<\!--<TextMenu>-->')[0]}
                  </ReactMarkdown>
                </DocumentMainContent>
              )
            }
            else if (key === 'init') {
              return (
                <DocumentMainContent fileMTime={Init?.fileMTime || ''}>
                  <ReactMarkdown>
                    {Init.sourceMarkdown.split('<\!--<TextMenu>-->')[0]}
                  </ReactMarkdown>
                </DocumentMainContent>
              )
            }
            else if (key === 'develop') {
              return (
                <DocumentMainContent fileMTime={Develop?.fileMTime || ''}>
                  <ReactMarkdown>
                    {Develop.sourceMarkdown.split('<\!--<TextMenu>-->')[0]}
                  </ReactMarkdown>
                </DocumentMainContent>
              )
            }
            else if (key === 'dir') {
              return (
                <DocumentMainContent fileMTime={Dir?.fileMTime || ''}>
                  <ReactMarkdown>
                    {Dir.sourceMarkdown.split('<\!--<TextMenu>-->')[0]}
                  </ReactMarkdown>
                </DocumentMainContent>
              )
            }
            else if (key === 'config') {
              return (
                <DocumentMainContent fileMTime={Config?.fileMTime || ''}>
                  <ReactMarkdown>
                    {Config.sourceMarkdown.split('<\!--<TextMenu>-->')[0]}
                  </ReactMarkdown>
                </DocumentMainContent>
              )
            }
            else if (key === 'build') {
              return (
                <DocumentMainContent fileMTime={Build?.fileMTime || ''}>
                  <ReactMarkdown>
                    {Build.sourceMarkdown.split('<\!--<TextMenu>-->')[0]}
                  </ReactMarkdown>
                </DocumentMainContent>
              )
            }
            else if (key === 'import') {
              return (
                <DocumentMainContent fileMTime={Import?.fileMTime || ''}>
                  <ReactMarkdown>
                    {Import.sourceMarkdown.split('<\!--<TextMenu>-->')[0]}
                  </ReactMarkdown>
                </DocumentMainContent>
              )
            }
          if (!key) {
            return <Redirect to={"/plugin/start"} />;
          }
          const component = componentMap.get(key.toLowerCase());

          return (
            <DocumentMainContent key={key} fileMTime={component?.document?.fileMTime || ''}>
              <ReactMarkdown>
                {component.document.sourceMarkdown}
              </ReactMarkdown>
              </DocumentMainContent>
          )

          // return key;
        }}
        </Route>
    </div>
  );
};

export default PluginPage;
