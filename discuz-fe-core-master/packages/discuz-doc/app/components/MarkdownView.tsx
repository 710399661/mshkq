// / <reference types="@paperist/types-remark" />
import React from "react";
import { Link } from "react-router-dom";
import PrismCode from "react-prism";
import { ComponentDocument } from "!!toc-loader!@discuz/design/../README.md";
import {
  MarkdownNode,
  isHeading,
  isExample,
  isInterface,
  isList,
  isCode,
  isThematicBreak,
  isLink,
  isEmphasis,
  isStrong,
  isInlineCode,
  isText,
  isParent,
  isImage,
  isTable,
} from "@app/utils/md-guard";
import DemoLayout from "@app/components/DemoLayout";
import ExampleShowCase from "./ExampleShowCase";
import ApiDoc from "./ApiDoc";
import { getHeadingText } from "./MarkdownToc";
import HeadingAnchor, { HeadingAnchorProps } from "./HeadingAnchor";

export interface MarkdownViewProps {
  componentKey?: string;
  document: ComponentDocument;
  variables?: object;
}

export default function MarkdownView({
  componentKey,
  document,
  variables = {},
}: MarkdownViewProps) {
  return createFragment(
    documentToFragments({ componentKey, document, variables })
  );
}

function createFragment(nodes: React.ReactNodeArray) {
  return React.createElement(React.Fragment, {}, ...nodes);
}

function documentToFragments({
  document,
  skipExampleResolution = false,
  componentKey,
  variables = {},
}: MarkdownViewProps & { skipExampleResolution?: boolean }) {
  const { blocks, exampleMap = {} } = document;
  const consuming = blocks.slice();
  const fragments: React.ReactNodeArray = [];

  while (consuming.length) {
    const block = consuming.shift();
    // 标题
    if (isHeading(block)) {
      if (block.depth === 3 && !skipExampleResolution) {
        const demoBlocks: MarkdownNode[] = [block];
        while (consuming.length) {
          const demoBlock = consuming.shift();

          if (isHeading(demoBlock) && demoBlock.depth <= 3) {
            // 结束一个示例，此 block 退回
            consuming.unshift(demoBlock);
            break;
          }
          demoBlocks.push(demoBlock);
        }
        fragments.push(
          consumeDemo({ blocks: demoBlocks, exampleMap }, componentKey)
        );
      } else {
        // 渲染标签适配样式后推一级
        const level = [null, "h2", "h3", "h4", "h5", "h6", "div"][
          block.depth
        ] as HeadingAnchorProps["level"];
        const text = getHeadingText(block);
        if (componentKey) {
          fragments.push(
            <HeadingAnchor
              componentKey={componentKey}
              level={level}
              name={text.replace(/\s+/g, "")}
            >
              {childrenToFragment(block.children, variables)}
            </HeadingAnchor>
          );
          fragments.push(<div className="heading-match-box"></div>);
        } else {
          fragments.push(
            React.createElement(level, {
              children: childrenToFragment(block.children, variables),
            })
          );
        }
      }
    }
    // 示例代码
    else if (isExample(block) && exampleMap[block.name]) {
      const { component: Example, code } = exampleMap[block.name];
      fragments.push(
        <ExampleShowCase example={<Example />} code={code}></ExampleShowCase>
      );
    }
    // 接口文档
    else if (isInterface(block)) {
      fragments.push(
        <ApiDoc
          name={block.name}
          path={block.path}
          componentKey={componentKey}
        ></ApiDoc>
      );
    }
    // 列表
    else if (isList(block)) {
      const type = block.ordered ? "ol" : "ul";
      fragments.push(
        React.createElement(
          type,
          {},
          ...block.children.map((item, id) => (
            <li key={id}>{childrenToFragment([item], variables)}</li>
          ))
        )
      );
    }
    // 代码块
    else if (isCode(block)) {
      fragments.push(
        <pre>
          <code>
            {injectEnvVariables(block.value, variables)}
          </code>
        </pre>
      );
    }
    // HR
    else if (isThematicBreak(block)) {
      fragments.push(<hr />);
    }
    // Table
    else if (isTable(block)) {
      const renderCol = (col) => {
          return (
            <td>
              {col.children.map((colItem) => {
                return colItem.value;
              })}
            </td>
          );
      }
      fragments.push(
        <table>
          {block.children.map((row) => {
            if (row.type === "tableRow") {
              return (
                <tr>
                  {row.children.map(col => renderCol(col))}
                </tr>
              );
            } else {
              return (
                <th>
                  {row.children.map(col => renderCol(col))}
                </th>
              )
            }
          })}
        </table>
      );
    }
    // 无法识别的当做普通段落处理
    else {
      fragments.push(<p>{childrenToFragment(block["children"], variables)}</p>);
    }
  }
  return fragments;
}

function consumeDemo(
  document: ComponentDocument,
  componentKey: string,
  col: 1 | 2 = 1
) {
  const { blocks } = document;
  let currentGroup = [blocks.shift()];
  const groups = [currentGroup];

  for (let block of blocks) {
    if (isHeading(block) && block.depth === 3) {
      groups.push((currentGroup = [block]));
    } else {
      currentGroup.push(block);
    }
  }

  return (
    <DemoLayout col={col}>
      {groups.map((group, idx) => (
        <DemoLayout.Block
          key={idx}
          className={`tdesign-demo-item--${componentKey}`}
        >
          {React.createElement(
            React.Fragment,
            {},
            ...documentToFragments({
              document: { ...document, blocks: group },
              skipExampleResolution: true,
              componentKey,
            })
          )}
        </DemoLayout.Block>
      ))}
    </DemoLayout>
  );
}

export function childrenToFragment(
  children: import("unist").UNIST.Node[],
  variables = {}
) {
  const fragments: React.ReactNodeArray = [];

  for (const child of children || []) {
    if (isLink(child)) {
      const { url } = child;
      const forceBlankLink = url.indexOf("!!") === 0;
      if (url[0] === "/" && url[1] !== "/" && !forceBlankLink) {
        fragments.push(
          <Link
            title={child.title}
            to={url}
            style={{ verticalAlign: "inherit" }}
          >
            {childrenToFragment(child.children, variables)}
          </Link>
        );
      } else {
        fragments.push(
          <a
            title={child.title}
            href={forceBlankLink ? url.slice(2) : url}
            target="_blank"
            style={{ verticalAlign: "inherit" }}
          >
            {childrenToFragment(child.children, variables)}
          </a>
        );
      }
    } else if (isEmphasis(child)) {
      fragments.push(<em>{childrenToFragment(child.children, variables)}</em>);
    } else if (isStrong(child)) {
      fragments.push(
        <strong>{childrenToFragment(child.children, variables)}</strong>
      );
    } else if (isInlineCode(child)) {
      fragments.push(<code>{injectEnvVariables(child.value, variables)}</code>);
    } else if (isText(child)) {
      fragments.push(injectEnvVariables(child.value, variables));
    } else if (isParent(child)) {
      fragments.push(childrenToFragment(child.children, variables));
    } else if (isImage(child)) {
      fragments.push(<img src={child.url} alt={child.title}></img>);
    } else if (child["value"]) {
      fragments.push(child["value"]);
    }
  }

  return createFragment(fragments);
}

function injectEnvVariables(content: string, variables = {}): string {
  return content.replace(
    /\${env:([a-zA-Z]+)}/g,
    (match, $1) => variables[$1] || match
  );
}
