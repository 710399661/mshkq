import Check from '../../check';
import Icon from '../../icon';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { get } from '../../../utils/get';
import React from 'react';
import hljs from 'highlight.js/lib/core';
import { InlineStyleToObject } from './util';
const qs = require('qs');

const initHighLight = () => {
  hljs.registerLanguage('c', require('highlight.js/lib/languages/c'));
  hljs.registerLanguage('cpp', require('highlight.js/lib/languages/c'));
  hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
  hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
  hljs.registerLanguage(
    'javascript',
    require('highlight.js/lib/languages/javascript'),
  );
  hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
  hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'));
  hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
  hljs.registerLanguage(
    'typescript',
    require('highlight.js/lib/languages/typescript'),
  );
  hljs.registerLanguage(
    'markdown',
    require('highlight.js/lib/languages/markdown'),
  );
  hljs.registerLanguage('go', require('highlight.js/lib/languages/go'));
  hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
  hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
  hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
};

initHighLight();

export const RichTextMiniAdapter = {
  getNodeText(node) {
    let nodeText = '';
    if (node.children && node.children.length > 0) {
      node.children.forEach((element) => {
        nodeText += this.adapter.getNodeText(element);
      });
    }
    if (node.name === 'br') {
      nodeText += '\n';
    }
    if (node.type === 'text') {
      nodeText += `${node.data}`;
    }
    return nodeText;
  },
  /**
   * 解析 Code 模块
   * @param node 目标节点
   */
  parseCodeContent(node) {
    const codeString = this.adapter.getNodeText(node);

    // hljs处理后，把回车换行符标记替换为带类名的view标签，用于小程序代码块保持换行
    let highlightedHTML = hljs.highlightAuto(codeString).value;
    highlightedHTML = highlightedHTML.replace(/\r|\n/g, '<view class="dzq-code__divider"></view>');

    const highlightedNodes = htmlparser2.parseDOM(highlightedHTML, {
      decodeEntities: true,
    });
    node.children = highlightedNodes;
    node.name = View;
    return node;
  },

  /**
   * 适配于 Taro 的转换函数，使用特定的 class，用 View 模拟
   * @param {*} node
   * @param {*} index
   */
  transform(node, index) {
    if (node.type === 'tag') {
      this.idCount += 1;
      if (node.attribs) {
        node.attribs = {
          ...node.attribs,
          class: `dzq-${node.name} ${get(node.attribs, 'class', '')}`,
          'data-nodeId': this.idCount,
          dataNodeId: this.idCount,
          dataset: {
            nodeId: this.idCount,
          },
          originType: node.name,
          transformedStyle: InlineStyleToObject(get(node.attribs, 'style', '')),
        };
        this.nodes[this.idCount] = node;
      }

      switch (node.name) {
        case 'img':
          node.name = Image;
          this.imgUrls.push(node.attribs.src);
          return (
            <Image
              {...node.attribs}
              dataset={{
                nodeId: node.attribs.dataNodeId,
              }}
              style={node.attribs.transformedStyle}
              mode={'widthFix'}
            />
          );
        case 'code': {
          node = this.adapter.parseCodeContent(node);
          node.name = View;
          break;
        }
        case 'span': {
          node.name = Text;
          break;
        }
        case 'input': {
          const checkLabelState = get(
            node,
            'parent.attribs.data-task-state',
            {},
          );
          return <Check checked={checkLabelState === 'checked'} />;
        }
        case 'iframe': {
          node.attribs.originType = 'a';
          this.nodes[this.idCount] = node;
          // 白名单内的节点才渲染
          if (this.isValidIframeSrc(node.attribs.src)) {
            // return <View {...node.attribs} className="dzq-a">复制音视频链接</View>
            return this.adapter.iframeRender(node);
          }
          return null;
        }
        default:
          node.name = View;
      }

      node.attribs = {
        ...node.attribs,
      };

      node.attribs.transformedStyle = get(node.attribs, "style", "");

      return convertNodeToElement(node, index, this.adapter.transform);
    }
  },

  /**
   * 小程序 iframe 渲染函数，渲染可跳转小程序的 iframe
   * @param node
   */
  iframeRender(node) {
    const [hostname, query = ''] = node.attribs.src.split('?');

    let jumpStrategy = () => {};
    const parsedQuery = qs.parse(query);

    jumpStrategy = this.adapter.iframeJumpStrategy({ hostname, query: parsedQuery, node });

    const urlRegexp = /^(http[s]?[\:]?)?\/\/([a-zA-Z0-9\.]+)\/[\s\S]*/;

    const [,, realHostname] = urlRegexp.exec(hostname) || [];

    return (
      <View {...node.attribs} onClick={jumpStrategy} className="dzq-a dzq-mini-iframe">
        <View className={'dzq-mini-iframe-icon'}>
          <Icon name={'VideoOutlined'} size={28} />
        </View>
        <View className={'dzq-mini-iframe-info'}>
          <View  className={'dzq-mini-iframe-host'}>来自 {realHostname} 的音视频</View>
          <View  className={'dzq-mini-iframe-action'}>查看</View>
        </View>
      </View>
    );
  },

  iframeJumpStrategy({
    hostname = '',
    query = {},
    node = {},
  }) {
    const callbackFactory = cb => (e) => {
      this.onLinkClick(node, e);
      this.onClick(e, node);
      e.stopPropagation();

      cb();
    };


    if (hostname.indexOf('bilibili') !== -1) {
      const { aid } = query as any;

      if (aid) {
        return callbackFactory(() => Taro.navigateToMiniProgram({
          appId: 'wx7564fd5313d24844',
          path: `pages/video/video?avid=${aid}`,
        }));
      }
    }

    if (hostname.indexOf('163') !== -1) {
      const { id } = query as any;

      if (id) {
        return callbackFactory(() => Taro.navigateToMiniProgram({
          appId: 'wx32431e4d2e38cc7b',
          path: `pages/song/song?id=${id}&source=list`,
        }));
      }
    }

    if (hostname.indexOf('qq') !== -1) {
      const { vid } = query as any;

      if (vid) {
        return callbackFactory(() => Taro.navigateToMiniProgram({
          appId: 'wxa75efa648b60994b',
          path: `preload_play/play/index?vid=${vid}`,
        }));
      }
    }

    if (hostname.indexOf('youku') !== -1) {
      const splitArray = hostname.split('/');
      if (splitArray.length > 1) {
        const id = splitArray[splitArray.length - 1];

        if (id) {
          return callbackFactory(() => Taro.navigateToMiniProgram({
            appId: 'wx5de0c309a1472da6',
            path: `pages/play/play?srcType=1&showId=${id}`,
          }));
        }
      }
    }

    // FIXME: 爱奇艺需要获取 qipuid 才能跳转成功
    // if (hostname.indexOf('iqiyi') !== -1) {
    //   const { tvid } = query as any;
    //
    //   return () => Taro.navigateToMiniProgram({
    //     appId: 'wxcd10170e55a1f55d',
    //     path: `pages/video/video?aid=${tvid}&rfr=wx_home&useRecord=false&qipuId=${tvid}`
    //   })
    // }

    const noop = () => {};

    return callbackFactory(noop);
  },

  onWrapperClick(e) {
    const nodeId = get(e, 'target.dataset.nodeId', '') || get(e, 'target.dataset.nodeid', '');
    if (!nodeId) {
      this.onClick(e, {});
      return;
    }
    const targetNode = this.nodes[nodeId];
    if (targetNode) {
      const originType = get(targetNode, 'attribs.originType', '');
      if (originType === 'img') {
        // emoji 表情外才能触发点击事件
        if (get(targetNode, 'attribs.class', '').indexOf('qq-emotion') === -1) {
          this.onImgClick(targetNode, e);
        }
      }

      if (originType === 'a') {
        console.log('no link click', targetNode, e);
        this.onLinkClick(targetNode, e);
        e && e.stopPropagation();
      }

      this.onClick(e, targetNode);
    }
  },
};
