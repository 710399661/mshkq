import React, { Component } from 'react';
import Parser from 'react-html-parser';
import classNames from 'classnames';
import { ConfigContext } from '../../../extends/configContext';
import { RichTextLayoutProps } from '../index';
import hljs from 'highlight.js/lib/core';
import { get } from '../../../utils/get';
import ErrorBoundary from './errorBoundary';

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
  hljs.registerLanguage('apache', require('highlight.js/lib/languages/apache'));
  hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
  hljs.registerLanguage(
    'typescript',
    require('highlight.js/lib/languages/typescript'),
  );
  hljs.registerLanguage(
    'markdown',
    require('highlight.js/lib/languages/markdown'),
  );
  hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
  hljs.registerLanguage('go', require('highlight.js/lib/languages/go'));
  hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
  hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
  hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
};

initHighLight();


export class RichTextWebLayout extends Component<RichTextLayoutProps> {
  static contextType = ConfigContext;
  id = null;
  ref = null;

  constructor(props) {
    super(props);
    const { content = '' } = this.props;
    let parsedDom = null;
    try {
      parsedDom = Parser(content, this.props.parserOptions);

      if (this.props.transformer) {
        parsedDom = this.props.transformer(parsedDom);
      }
      // parsedDom = this.elementAdapter(parsedDom);
    } catch (e) {
      console.error(e);
    }
    this.state = {
      dom: parsedDom,
    };
  }

  // 处理元素节点
  elementAdapter(elements) {
    if (!elements || elements.length === 0) {
      return [];
    }
    elements[elements.length - 1] = React.cloneElement(elements[elements.length - 1], {
      ...get(elements[elements.length - 1], 'props', {}),
      className: `${get(elements[elements.length - 1], 'props.className')} is-last`,
    });
    return elements;
  }

  parseCodeBlock() {
    // if not ssr
    if (typeof window !== 'undefined') {
      document.querySelectorAll(`[data-rich-id="${this.id}"] code`).forEach((block) => {
        // then highlight each
        hljs.highlightBlock(block);
      });
    }
  }

  componentDidMount() {
    this.id = Date.now() + parseInt(Math.random() * 100);
    if (this.ref) {
      this.ref.setAttribute('data-rich-id', this.id);
    }
    this.parseCodeBlock();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      let parsedDom = null;

      try {
        parsedDom = Parser(this.props.content, this.props.parserOptions);

        if (this.props.transformer) {
          parsedDom = this.props.transformer(parsedDom);
        }
        // parsedDom = this.elementAdapter(parsedDom);
      } catch (e) {
        console.error(e);
      }

      if (!parsedDom) return;

      this.setState({
        dom: parsedDom,
      }, () => {
        this.parseCodeBlock();
      });
    }
  }

  render() {
    const { content = '', className = '', style = {} } = this.props;
    const { clsPrefix } = this.context;
    return (
      <div ref={(ref) => {
        this.ref = ref;
      }} style={{ ...style }} onClick={this.props.onWrapperClick} className={classNames(`${clsPrefix}-richText`, className)}>
        <ErrorBoundary>
          {this.state.dom}
        </ErrorBoundary>
      </div>
    );
  }
}
