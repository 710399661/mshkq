import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { RichTextViewAdapter } from './layouts/index';
import { RichTextLogicalAdapter } from './adapters/index';
import { RichTextProps, NodeType } from './interface';
import { isCallable } from '../../utils/is-callable';
import { StyledProps } from 'utils/_type/StyledProps';
export { htmlparser2, htmlToDOM } from 'react-html-parser';
import report from '../../utils/report';

interface RichTextState {}

export interface RichTextLayoutProps extends StyledProps {
  content: string;
  onImgClick?: RichTextProps['onImgClick'];
  onLinkClick?: RichTextProps['onLinkClick'];
  onParse?: RichTextProps['onParse'];
  transform: (node: NodeType, index: string) => any;
  onWrapperClick: (e) => any;
  parserOptions: any;
  style: React.CSSProperties;
  transformer: RichTextProps['transformer'];
  iframeWhiteList: string[];
}

interface RichTextAdapter {
  transform: (node: NodeType, index: string) => any;
  onWrapperClick: (e) => any;
}

export default class RichText extends baseComponentFactory<
  RichTextProps,
  RichTextState,
  RichTextLayoutProps,
  RichTextAdapter
>({
  viewAdapter: RichTextViewAdapter,
  logicalAdapter: RichTextLogicalAdapter,
}) {
  /**
   * 在 web 的实现中，因为 SSR 也会执行一遍，所以这里采用顺序索引
   */
  idCount = 0;

  nodes = {};

  nodeTree = [];

  imgUrls = [];

  loadedImgs = [];

  erroredImgs = [];

  options = {
    transform: this.adapter.transform,
    decodeEntities: true,
    preprocessNodes: (nodes) => {
      this.nodeTree = nodes;
      return nodes;
    },
  };

  constructor(props) {
    super(props);
    report({
      componentName: 'richText'
    })
  }

  static getTransformFn() {
    return RichTextLogicalAdapter.transform;
  }

  static defaultProps = {
    iframeWhiteList: [],
  }

  /**
   * 校验是否在 iframe 白名单中
   * @param src
   * @returns
   */
  isValidIframeSrc(src) {
    let validateResult = false;

    // if try to add xss field, stop!
    if (src.indexOf('javascript:') !== -1) {
      return validateResult;
    }

    this.props.iframeWhiteList.forEach((srcReg) => {
      const testReg = new RegExp(srcReg);
      if (testReg.test(src)) {
        validateResult = true;
      }
    });

    return validateResult;
  }

  componentDidMount() {
    this.onParse(this.nodeTree);
  }

  onImgClick(node, e) {
    if (this.props.onImgClick && isCallable(this.props.onImgClick)) {
      this.props.onImgClick(node, e);
    }
  }

  onLinkClick(node, e) {
    if (this.props.onLinkClick && isCallable(this.props.onLinkClick)) {
      this.props.onLinkClick(node, e);
    }
  }

  onClick(e, targetNode: null | NodeType) {
    if (this.props.onClick && isCallable(this.props.onClick)) {
      this.props.onClick(e, targetNode);
    }
  }

  onParse(nodeTree) {
    if (this.props.onParse && isCallable(this.props.onParse)) {
      this.props.onParse(nodeTree, this.imgUrls);
    }
  }

  onImgsLoaded(e) {
    if (this.props.onImgsLoaded && isCallable(this.props.onImgsLoaded)) {
      this.props.onImgsLoaded(e);
    }
  }

  onImgsErrored(error) {
    if (this.props.onImgsErrored && isCallable(this.props.onImgsErrored)) {
      this.props.onImgsErrored(error);
    }
  }

  render() {
    const { RenderComponent } = this;
    const { content, className = '', style = {} } = this.props;
    return (
      <RenderComponent
        className={className}
        style={style}
        parserOptions={this.options}
        onWrapperClick={this.adapter.onWrapperClick}
        transform={this.adapter.transform}
        onParse={this.onParse}
        onImgClick={this.onImgClick}
        onLinkClick={this.onLinkClick}
        content={content}
        transformer={this.props.transformer}
        iframeWhiteList={this.props.iframeWhiteList}
      />
    );
  }
}
