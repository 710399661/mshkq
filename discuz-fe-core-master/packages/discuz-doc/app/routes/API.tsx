import React, { useEffect, useState } from 'react';
import { Menu, Tag, Toast } from '@discuzq/design';
const SwaggerParser = require("@apidevtools/swagger-parser");
import JSONSchemaView from 'json-schema-view-js';
import 'json-schema-view-js/dist/style.min.css';
import { Table } from '../components/ApiDoc';
import copyText from '../utils/copyText';
import mergeAllOf from 'json-schema-merge-allof';
import { get, has, set, forIn, isObject } from 'lodash-es';
import swaggerInfo from "../docs/swagger.json";
import { DocumentMainContent } from "../components/DocumentMainContent";
import { NavLink, Route, Switch, Redirect, useHistory } from "react-router-dom";

const API_REFERENCE_MAP = process.env.API_REFERENCE_MAP;

const parseSwaggerInfo = () => {
    return new Promise((resolve, reject) => {
        SwaggerParser.dereference(swaggerInfo, (err, api) => {
            const swaggerInfoLoader = (spec) => {
                const menus = [];

                const refs = [];

                const apiInfo = {};

                const findTargetMenu = (key) => {
                    const targetMenu = menus.find(menu => {
                        if (menu.title === key) {
                            return menu;
                        }

                        return false;
                    })

                    return targetMenu;
                }

                spec.tags.forEach(tag => {
                    menus.push({
                        title: tag.name,
                        description: tag.description,
                        subMenus: []
                    })
                })

                Object.keys(spec.components.schemas).forEach(schameName => {
                    refs.push(spec.components.schemas[schameName]);
                })

                Object.keys(spec.paths).forEach(path => {
                    Object.keys(spec.paths[path]).forEach(requestMethod => {
                        spec.paths[path][requestMethod].tags.forEach(menuTitle => {
                            const targetMenu = findTargetMenu(menuTitle);

                            if (targetMenu) {
                                targetMenu.subMenus.push({
                                    title: spec.paths[path][requestMethod].summary,
                                    description: spec.paths[path][requestMethod].description,
                                    ref: requestMethod + ':' + path
                                })
                            }
                        })

                        apiInfo[`${requestMethod}:${path}`] = spec.paths[path][requestMethod];
                    })
                })

                resolve({
                    menus,
                    refs,
                    apiInfo
                })
            }

            swaggerInfoLoader(api);
        })
    })
}


const SwaggerRequestHeaderTable = ({ requestHeaderInfo }) => {
    const tableConfig = [{
        key: 'key',
        header: '字段',
        width: '20%',
        render: (data) => {
            return data.name
        }
    }, {
        key: 'type',
        header: '类型',
        width: '20%',
        render: (data) => {
            return data.schema.type
        }
    }, {
        key: 'required',
        header: '是否必须',
        width: '20%',
        render: (data) => {
            return data.required ? '是' : '否'
        }
    }, {
        key: 'description',
        header: '字段描述',
        width: '40%',
        render: (data) => {
            return data.description
        }
    }]
    return <Table records={requestHeaderInfo} recordKey={"requestHeader"} columns={tableConfig} />;
}

const SwaggerRequestQueryTable = ({ requestQueryInfo = [] }) => {
    const tableConfig = [{
        key: 'key',
        header: '字段',
        width: '20%',
        render: (data) => {
            return data.name
        }
    }, {
        key: 'type',
        header: '类型',
        width: '20%',
        render: (data) => {
            return data.schema.type
        }
    }, {
        key: 'required',
        header: '是否必须',
        width: '20%',
        render: (data) => {
            return data.required ? '是' : '否'
        }
    }, {
        key: 'description',
        header: '字段描述',
        width: '20%',
        render: (data) => {
            return data.description
        }
    }, {
        key: 'default',
        header: '默认值',
        width: '10%',
        render: (data) => {
            return data.schema.default
        }
    }, {
        key: 'enum',
        header: '可选值',
        width: '10%',
        render: (data) => {
            if (data.schema && data.schema.enum) {
                return data.schema.enum.join(',')
            } else {
                return 'any'
            }
        }
    }]

    if (requestQueryInfo.length === 0) {
        return null;
    }

    return <Table records={requestQueryInfo} recordKey={"requestHeader"} columns={tableConfig} />;
}

// 兜底 schema 的 array 类型不标准的问题
const schemaDFS = (schema) => {
  forIn(schema, (value) => {
    if (isObject(value)) {
      if (value.type === 'array') {
        if (!value.items) {
          value.items = []
        }
      }
      schemaDFS(value);
    }
  })
}

const SwaggerRequestBodyTable = ({ requestBodyInfo }) => {
    const renderViewElementRef = React.useRef(null);

    useEffect(() => {
        const schema = get(requestBodyInfo, `['content']['application/json']['schema']`, {})
        let mergedSchema = schema;

        // 由于 dzq 的 schema 结构可能存在冲突，用这个办法来处理冲突，以后续 key 的 type 为主
        if (schema.allOf) {
            let dataType = get(schema.allOf[schema.allOf.length - 1], 'properties.Data.type');
            schema.allOf.forEach(allOfItem => {
                if (has(allOfItem, 'properties.Data.type')) {
                    set(allOfItem, 'properties.Data.type', dataType);
                }
            })

            mergedSchema = schema;
        }

        try {
            mergedSchema = mergeAllOf(
                schema
            )
            schemaDFS(mergedSchema);
        } catch (e) {
            console.error(e);
        }

        const view = new JSONSchemaView(mergedSchema, 3);

        if (renderViewElementRef.current) {
            renderViewElementRef.current.innerHTML = '';

            try {
                const jsonSchemaView = view.render();
                renderViewElementRef.current.appendChild(jsonSchemaView);
            } catch (e) {
                console.error(e);
            }
        }
    }, [requestBodyInfo])

    return (
        <div>
            <div ref={renderViewElementRef} className={"swagger-schema"} />
        </div>
    )
}

const SwaggerResponseBodyTable = ({ responseBodyInfo }) => {

    const renderViewElementRef = React.useRef(null);

    useEffect(() => {
        const schema = get(responseBodyInfo, `[200]['content']['application/json']['schema']`, {})
        let mergedSchema = schema;

        // 由于 dzq 的 schema 结构可能存在冲突，用这个办法来处理冲突，以后续 key 的 type 为主
        if (schema.allOf) {
            let dataType = get(schema.allOf[schema.allOf.length - 1], 'properties.Data.type');
            schema.allOf.forEach(allOfItem => {
                if (has(allOfItem, 'properties.Data.type')) {
                    set(allOfItem, 'properties.Data.type', dataType);
                }
            })

            mergedSchema = schema;
        }

        try {
            mergedSchema = mergeAllOf(
                schema
            )

            schemaDFS(mergedSchema);
        } catch (e) {
            console.error(e);
        }

        const view = new JSONSchemaView(mergedSchema, 3);

        if (renderViewElementRef.current) {
            renderViewElementRef.current.innerHTML = '';

            try {
                const jsonSchemaView = view.render();
                renderViewElementRef.current.appendChild(jsonSchemaView);
            } catch (e) {
                console.error(e);
            }
        }
    }, [responseBodyInfo])

    return (
        Object.keys(responseBodyInfo).map((key, index) => {
            return (<div key={index}>
                <h4>状态码：{key}</h4>
                <div ref={renderViewElementRef} className={"swagger-schema"} />
            </div>)
        })
    );
}
const onClickCopy = (text: string) => {
    copyText(text, () => {
        Toast.info({ content: '复制成功' })
    }, () => {
        Toast.info({ content: '复制失败' })
    })
}

const SDKContainer = ({ path, method }) => {
    // 如果不存在某个 SDK，则不显示
    if (!API_REFERENCE_MAP[method + ':' + path]) {
        return null;
    }

    const codeText = `${API_REFERENCE_MAP[method + ':' + path]?.importRule}

${API_REFERENCE_MAP[method + ':' + path][`${method}Req`]}`;

    return <div>
        <h2>SDK</h2>
        <div key={method + ':' + path}>
            <h3>使用方法</h3>
            <div style={{position: 'relative'}}>
                <span
                    style={{
                        position: 'absolute',
                        top: 6,
                        right: 15,
                        cursor: 'pointer',
                        fontSize: '12px',
                        color: 'hsla(0,0%,54.9%,.8)',
                    }}
                    onClick={()=>onClickCopy(codeText)}
                >
                    复制代码
                </span>
                <pre>
                    <code>
                        {codeText}
                        // axiosOptions参考:http://axios-js.com/zh-cn/docs/index.html#axios-config
                    </code>
                </pre>
            </div>
        </div>
    </div>
}

const SwaggerInfoContainer = ({ apiInfo = {}, apiKey = '' }) => {
    const [method, path] = apiKey.split(':');
    // 解析请求头表格信息
    const parseRequestHeaderInfo = (parameters = []) => {
        return parameters.filter((param) => {
            if (param.in === 'header') {
                return true;
            }
            return false;
        })
    }

    const parseRequestQueryInfo = (parameters = []) => {
        return parameters.filter((param) => {
            if (param.in === 'query') {
                return true;
            }
            return false;
        })
    }


    const parseResponseBodyInfo = (responses = {}) => {
        return responses;
    }

    useEffect(() => {
        const chineseName = get(apiInfo, 'summary', '');
        if (chineseName) {
            document.title = `${chineseName} - API`;
        } else {
            document.title = 'API';
        }
    }, [apiInfo]);


    const requestHeaderInfo = parseRequestHeaderInfo(apiInfo.parameters || []))

    const requestQueryInfo = parseRequestQueryInfo(apiInfo.parameters || []);

    const responseBodyInfo = parseResponseBodyInfo(apiInfo.responses || []);

    return (
        <div>
            <div>
                {get(apiInfo, 'summary') && <h1>{get(apiInfo, 'summary')}</h1>}
                {get(apiInfo, 'description') && <p>接口描述：<code>{get(apiInfo, 'description')}</code></p>}
                {method && <p>请求方法: <Tag size={"md"} type="success">{method}</Tag></p>}
                {
                    path
                    && <p>
                            请求路径: <Tag size={"md"} type={"primary"}>{path}</Tag>
                            <span
                                style={{
                                    marginLeft: 8,
                                    cursor: 'pointer',
                                    color: 'hsla(0,0%,54.9%,.8)',
                                    fontSize: 12
                                }}
                                onClick={()=>onClickCopy(path)}
                            >
                                复制路径
                            </span>
                        </p>
                }
            </div>
            <div>
                <SDKContainer path={path} method={method} />
                <h2>请求信息</h2>
                {requestHeaderInfo.length > 0 && <h3>请求头 Request Header</h3>}
                {requestHeaderInfo.length > 0 && <SwaggerRequestHeaderTable requestHeaderInfo={requestHeaderInfo} />}
                {requestQueryInfo.length > 0 && <h3>请求体 Request Query</h3>}
                {requestQueryInfo.length > 0 && <SwaggerRequestQueryTable requestQueryInfo={requestQueryInfo} />}
                {apiInfo.requestBody && <h3>请求体 Request Body</h3>}
                {apiInfo.requestBody && <SwaggerRequestBodyTable requestBodyInfo={apiInfo.requestBody} />}
                {responseBodyInfo && <h3>返回体 Response Body</h3>}
                {responseBodyInfo && <SwaggerResponseBodyTable responseBodyInfo={responseBodyInfo} />}
            </div>
        </div>
    )
}


const SwaggerContainer = () => {

    const [menus, setMenus] = useState([]);

    const [refs, setRefs] = useState({});

    const [apiInfo, setApiInfo] = useState({});

    const history = useHistory();

    useEffect(() => {
        const { location } = history;
        const { pathname } = location;

        const query = pathname.split('/api/')[1];

        if (query === 'undefined' || !query) {
            initSwaggerInfo().then((res) => {

                const apiPath = Object.keys(res.apiInfo)[0]?.key?.split('/')?.join('_');

                if (apiPath !== 'undefined') {
                    history.push('/api/' + apiPath);
                }
            })
        }
    }, [history]);

    const initSwaggerInfo = () => {
        return parseSwaggerInfo().then((res) => {
            const { menus: resMenus, refs: resRefs, apiInfo: resApiInfo } = res;

            setMenus(resMenus);

            setRefs(resRefs);

            setApiInfo(resApiInfo);

            return res;
        });
    }

    if (!menus || menus.length === 0) {
        initSwaggerInfo();
    }

    return (
        <div className="tdesign-doc">
            <div className="tdesign-fixed-side">
                <div className="tdesign-sidenav">
                    {menus.map((menu, index) => (
                        <div key={index} className="tdesign-sidenav-group tdesign-sidenav-group--deep0">
                            <div className="tdesign-sidenav-group__title">{menu.title}</div>
                            <div className="tdesign-sidenav-group__children">
                                {menu.subMenus.map((subMenu) => (
                                    <li key={subMenu.ref} className="tdesign-sidenav-item">
                                        <NavLink
                                            to={`/api/${subMenu.ref?.split('/')?.join('_')}`}
                                            className="tdesign-main-link tdesign-sidenav-link"
                                            activeClassName="router-link-exact-active router-link-active tdesign-sidenav-link--active"
                                        >
                                            {subMenu.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DocumentMainContent fileMTime={API_REFERENCE_MAP?.fileMTime || ''}>
                <Route path={"/api/:apiRef"}>
                    {({ match }) => {
                        const key: string = match && match.params && match.params.apiRef;

                        if (!apiInfo || Object.keys(apiInfo).length === 0) {
                            initSwaggerInfo();
                        }

                        if (!key || key === 'undefined') {
                            return <Redirect to={`/api/get:_api_v3_check.user.get.redpacket`} />;
                        }

                        const parsedKey = key?.split('_')?.join('/');

                        return <SwaggerInfoContainer apiInfo={apiInfo[parsedKey]} apiKey={parsedKey} />
                    }}
                </Route>
            </DocumentMainContent>
        </div>

    )
}

export default SwaggerContainer;
