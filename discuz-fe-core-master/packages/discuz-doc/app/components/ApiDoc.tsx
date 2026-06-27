import React, { useRef } from 'react';
import { Type, TypeDisplay } from './Type';
import MarkdownView from './MarkdownView';
import HeadingAnchor from './HeadingAnchor';
import allDoc from '!!props-loader!@discuzq/design/../tsconfig.json';

const GIT_BLOB_SRC = 'https://gitee.com/Discuz/discuz-core/tree/master/packages/discuz-design';

interface Doc {
  comment: any;
  tags: {
    name: string;
    text: string;
  }[];
}

interface Interface {
  name: string;
  doc: Doc;
  properties?: Property[];
  type?: Property;
}

interface Property {
  name: string;
  type: Type;
  isRequired: boolean;
  doc: Doc;
  source: {
    path: string;
    startLine: string;
    endLine: string;
  };
}

export interface ApiDocProps {
  path?: string;
  name?: string;
  id?: string;
  componentKey?: string;
}

export default function ApiDoc({ path, name, id, componentKey }: ApiDocProps) {
  const docKey = id || `${path.replace('/discuz-design', '')}#${name}`;
  const interfaceDoc: Interface = allDoc[docKey];
  const type = interfaceDoc ? interfaceDoc.type : null;
  const properties = interfaceDoc ? interfaceDoc.properties : [];
  const comment = interfaceDoc ? interfaceDoc.doc.comment : null;

  // const { match } = useRoute({
  //   path: `/components/${componentKey}/${interfaceDoc.name}/:propName`,
  //   strict: true,
  //   exact: true,
  // });

  if (!type && !properties.length) {
    return interfaceDoc ? (
      <>
        <h4>{interfaceDoc.name}</h4>
        {comment && (
          <div className="markdown-view">
            <MarkdownView document={comment}></MarkdownView>
          </div>
        )}
      </>
    ) : null;
  }

  const records = type ? [type] : properties;
  return (
    <>
      {componentKey ? (
        <HeadingAnchor level="h4" componentKey={componentKey} name={name}>
          {interfaceDoc.name}
        </HeadingAnchor>
      ) : (
        <h4>{interfaceDoc.name}</h4>
      )}
      {comment && (
        <div className="markdown-view">
          <MarkdownView document={comment} />
        </div>
      )}
      <Table
        records={records.filter((x) => {
          // 过滤 @ignore 属性
          if (x.doc) {
            const tags = x.doc.tags || [];
            return !tags.find(({ name }) => name === 'ignore');
          }
          return true;
        })}
        recordKey="name"
        columns={[
          {
            key: 'name',
            header: '属性',
            width: '18%',
            render: (x) => {
              if (x.doc) {
                const tags = x.doc.tags || [];
                const deprecatedTag = tags.find(({ name }) => name === 'deprecated');
                if (deprecatedTag) {
                  return <code className="property deprecated">{x.name}</code>;
                }
              }
              return (
                <PropertyName
                  interfaceName={interfaceDoc.name}
                  property={x}
                  componentKey={componentKey}
                />
              );
            },
          },
          {
            key: 'desc',
            header: '说明',
            render: (x) => {
              if (!x.doc || !x.doc.comment) {
                return '-';
              }
              return (
                <div className="markdown-view">
                  {x.doc.comment && <MarkdownView document={x.doc.comment} />}
                </div>
              );
            },
          },
          {
            key: 'type',
            header: '类型',
            width: '25%',
            render: (x) => {
              if (x.doc) {
                const tags = x.doc.tags || [];
                const docTag = tags.find(({ name }) => name === 'docType');
                if (docTag) {
                  return <code className="type">{docTag.text || '-'}</code>;
                }
              }
              return (
                <code className="type">
                  <TypeDisplay type={x.type} />
                </code>
              );
            },
          },
          {
            key: 'default',
            header: '默认值',
            width: '16%',
            render: (x) => {
              if (!x.doc) {
                return '-';
              }
              const tags = x.doc.tags || [];
              const defaultTag = tags.find(({ name }) => name === 'default');
              return <code>{defaultTag ? defaultTag.text : '-'}</code>;
            },
          },
          {
            key: 'version',
            header: '版本',
            width: 80,
            render: (x) => {
              if (!x.doc) {
                return '-';
              }
              const tags = x.doc.tags || [];
              const versionTag = tags.find(({ name }) => name === 'version');
              return <code>{versionTag ? versionTag.text : '-'}</code>;
            },
          },
        ]}
      />
    </>
  );
}

function PropertyName({
  property,
  componentKey,
  interfaceName,
}: {
  property: Property;
  componentKey: string;
  interfaceName: string;
}) {
  const contentRef = useRef(null);

  if (!property.source) {
    return null;
  }

  const { path, startLine, endLine } = property.source;
  const sharp = startLine === endLine ? startLine : `${startLine}-${endLine}`;

  return (
    <div title={`定义于 ${GIT_BLOB_SRC}${path}#L${sharp}`}>
      <code className="property" ref={contentRef}>
        {property.isRequired && <code className="type">* </code>}
        {property.name}
        {/* {componentKey && (
          <div className="anchor">
            <HeadingAnchor
              level="h4"
              componentKey={componentKey}
              name={`${interfaceName}/${property.name}`}
              scrollCenter
            >
              {' '}
              #
            </HeadingAnchor>
          </div>
        )} */}
      </code>
    </div>
  );
}

export function Table({ records, recordKey, columns }) {
  return (
    <table>
      <colgroup>
        {columns.map(({ key, width }) => (
          <col
            key={key}
            style={{
              width: typeof width === 'undefined' ? 'auto' : width,
            }}
          />
        ))}
      </colgroup>
      <thead>
        <tr>
          {columns.map(({ key, header }) => (
            <th key={key}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record[recordKey]}>
            {columns.map(({ key, render }) => (
              <td key={key}>{render(record)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
