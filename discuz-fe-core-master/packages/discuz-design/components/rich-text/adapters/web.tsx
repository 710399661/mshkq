import React from "react";
import Check from "../../check";
import { convertNodeToElement } from "react-html-parser";
import { get } from "../../../utils/get";
import { InlineStyleToObject } from "./util";

export const RichTextWebAdapter = {
  transform(node, index) {
    if (node.type === "tag") {
      this.idCount += 1;
      if (node.attribs) {
        node.attribs = {
          ...node.attribs,
          transformedStyle: InlineStyleToObject(get(node.attribs, "style", "")),
          class: `dzq-${node.name} ${get(node, "attribs.class", "")}`,
          "data-nodeId": this.idCount,
          originType: node.name,
        };
      }
      this.nodes[this.idCount] = node;

      switch (node.name) {
        case "img":
          this.imgUrls.push(node.attribs.src);
          return (
            <img
              {...node.attribs}
              style={node.attribs.transformedStyle}
              className={node.attribs.class}
              onLoad={(e) => {
                this.loadedImgs.push(node.attribs["data-nodeId"]);
                this.onImgsLoaded(e);
              }}
              onError={(error) => {
                this.erroredImgs.push(node.attribs["data-nodeId"]);
                this.onImgsErrored(error);
              }}
              alt="图片"
            />
          );
        case "iframe": {
          // 非白名单内的节点不渲染
          if (!this.isValidIframeSrc(node.attribs.src)) {
            return null;
          }

          // 转换内部属性到 style，支持自定义宽高
          if (!node.attribs.style) {
            node.attribs.style = "";
          }

          if (get(node, "attribs.width")) {
            if (Number(get(node, "attribs.width")) === NaN) {
              node.attribs.style += `width: ${get(node, "attribs.width")};`;
            } else {
              node.attribs.style += `width: ${get(node, "attribs.width")}px;`;
            }
          }

          if (get(node, "attribs.height")) {
            if (Number(get(node, "attribs.height")) === NaN) {
              node.attribs.style += `height: ${get(node, "attribs.height")};`;
            } else {
              node.attribs.style += `height: ${get(node, "attribs.height")}px;`;
            }
          }

          // iframe 允许全屏
          node.attribs.allowfullscreen = true;

          break;
        }
        case "input": {
          const checkLabelState = get(
            node,
            "parent.attribs.data-task-state",
            {}
          );
          return <Check checked={checkLabelState === "checked"} />;
        }
        case "a":{
          // 通过a标签的过滤
          if (get(node, 'attribs.href', '').indexOf('javascript:') !== -1) {
            return null;
          }

          break;
        }
      }

      node.attribs.transformedStyle = get(node.attribs, "style", "");

      return convertNodeToElement(node, index, this.adapter.transform);
    }
  },

  onWrapperClick(e) {
    e.stopPropagation();
    this.onClick(e);
    const nodeId = get(e, "target.dataset.nodeid", "");
    if (!nodeId) return;
    const targetNode = this.nodes[nodeId];
    if (targetNode) {
      const originType = get(e, "target.nodeName", "");

      if (originType === "IMG") {
        // emoji 表情外才能触发点击事件
        if (get(targetNode, "attribs.class", "").indexOf("qq-emotion") === -1) {
          this.onImgClick(targetNode, e);
        }
      }

      if (originType === "A") {
        this.onLinkClick(targetNode, e);
      }
    }
  },
};
