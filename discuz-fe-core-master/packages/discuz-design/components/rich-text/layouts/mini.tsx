import { View } from "@tarojs/components";
import React, { Component } from "react";
import Parser from "react-html-parser";
import classNames from "classnames";
import { ConfigContext } from "../../../extends/configContext";
import { RichTextLayoutProps } from "..";
import { get } from "../../../utils/get";

export class RichTextMiniLayout extends Component<RichTextLayoutProps> {
  static contextType = ConfigContext;
  nodes = [];
  renderFlag = 0;
  timer = null;

  constructor(props) {
    super(props);
    this.state = {
      renderNodes: [],
    };
  }

  group(array, subGroupLength) {
    let index = 0;
    const newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, (index += subGroupLength)));
    }
    return newArray;
  }

  // 处理元素节点
  elementAdapter(elements) {
    elements[elements.length - 1] = React.cloneElement(
      elements[elements.length - 1],
      {
        className: `${get(
          elements[elements.length - 1],
          "props.className"
        )} is-last`,
      }
    );
    return elements;
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.content !== this.props.content) {
     this.renderNodes();
    }
  };

  renderNodes() {
    this.nodes = Parser(this.props.content, this.props.parserOptions);

    if (this.nodes.length > 10000) {
      this.nodes = this.group(this.nodes, 5000);

      const createRenderStream = () => {
        // 1s 分段渲染, 每秒 5000 nodes
        this.timer = setTimeout(() => {
          const { renderNodes } = this.state;
          renderNodes.push(this.nodes[this.renderFlag]);

          let transformedNodes = renderNodes;
          if (this.props.transformer) {
            transformedNodes = this.props.transformer(transformedNodes);
          }

          this.setState({
            renderNodes: transformedNodes,
          });

          this.renderFlag += 1;

          if (this.renderFlag < this.nodes.length) {
            createRenderStream();
          }
        }, 1000);
      };

      createRenderStream();
    } else {
      let transformedNodes = this.nodes;
      if (this.props.transformer) {
        transformedNodes = this.props.transformer(transformedNodes);
      }
      this.setState({
        renderNodes: transformedNodes,
      });
    }
  }

  componentDidMount() {
    this.renderNodes();
  }

  componentWillUnmount() {
    this.nodes = [];
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { className = "", style = {} } = this.props;
    const { clsPrefix } = this.context;
    return (
      <View
        style={{ ...style }}
        onClick={this.props.onWrapperClick}
        className={classNames(`${clsPrefix}-richText--mini`, className)}
      >
        {this.state.renderNodes.map((element) => element)}
      </View>
    );
  }
}
