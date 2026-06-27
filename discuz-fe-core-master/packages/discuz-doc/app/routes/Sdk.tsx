import React, { ReactNode, useEffect } from "react";
import useRouter from "use-react-router";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import DocumentView from "@app/components/DocumentView";
import MarkdownView from "@app/components/MarkdownView";
import SDKDoc from "@app/docs/sdk.md";
import ChangeLogDoc from "@app/docs/changelog.md";
import toc, {
  Component as TeaComponent,
  Category,
} from "!!toc-loader?importRoot=@discuzq/sdk/!@discuzq/sdk/README.md";
import { DocumentMainContent } from "@app/components/DocumentMainContent";
import ReactMarkdown from "react-markdown";

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

export default function Component() {
  return (
    <div className="tdesign-doc">
      <ComponentMenu />
      <ComponentDocument />
    </div>
  );
}

function ComponentMenu() {
  const { history } = useRouter();
  const pathname = history.location && history.location.pathname;

  useEffect(() => {
    const name = pathname.replace(/\/sdk\//, "");
    const component = Array.from(componentMap.values()).find(
      ({ sourceName }) => sourceName === name
    );
    if (name && component) {
      document.title = `${component.componentName} ${component.chineseName} - Discuz-sdk`;
    } else {
      document.title = "Discuz-sdk";
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
                to={"/sdk/install"}
                className="tdesign-main-link tdesign-sidenav-link"
                activeClassName="router-link-exact-active router-link-active tdesign-sidenav-link--active"
              >
                安装
              </NavLink>
            </li>
          </div>
        </div>
        {toc.map(({ category, components }, index) => (
          <div
            key={index}
            className="tdesign-sidenav-group tdesign-sidenav-group--deep0"
          >
            <div className="tdesign-sidenav-group__title">{category}</div>
            <div className="tdesign-sidenav-group__children">
              {components.map((component) => (
                <li key={component.sourceName} className="tdesign-sidenav-item">
                  <NavLink
                    to={`/sdk/${component.sourceName}`}
                    className="tdesign-main-link tdesign-sidenav-link"
                    activeClassName="router-link-exact-active router-link-active tdesign-sidenav-link--active"
                  >
                    {component.done ? "" : "🏃"}
                    {component.componentName} {component.chineseName}
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

function ComponentDocument() {
  return (
    <Route path="/sdk/:component?">
      {({ match }) => {
        const key: string = match && match.params && match.params.component;
        if (!key) {
          return <Redirect to="/sdk/install" />;
        }
        if (key === "install") {
          return (
            <DocumentMainContent fileMTime={SDKDoc?.fileMTime || ''}>
              <ReactMarkdown>{SDKDoc.sourceMarkdown}</ReactMarkdown>
            </DocumentMainContent>
          );
        }
        if (key === "changelog") {
          return (
            <DocumentMainContent fileMTime={ChangeLogDoc?.fileMTime || ''}>
              <MarkdownView document={ChangeLogDoc} />
            </DocumentMainContent>
          );
        }

        const component = componentMap.get(key.toLowerCase());
        if (!component) {
          return <Redirect to="/sdk/install" />;
        }

        const { done, componentName, chineseName, document } = component;
        return (
          <DocumentMainContent key={key} fileMTime={document?.fileMTime || ''}>
            <ReactMarkdown>{document.sourceMarkdown}</ReactMarkdown>
          </DocumentMainContent>
        );
      }}
    </Route>
  );
}
