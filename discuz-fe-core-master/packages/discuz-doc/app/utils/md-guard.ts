import {
  ComponentDocument,
  ExampleNode,
  InterfaceNode,
} from "!!toc-loader!@discuzq/design/../README.md";

export type MarkdownNode = ComponentDocument["blocks"] extends (infer T)[]
  ? T
  : never;

export function isExample(node: MarkdownNode): node is ExampleNode {
  return node.type === "example";
}

export function isInterface(node: MarkdownNode): node is InterfaceNode {
  return node.type === "interface";
}

export function isParent(
  node: MarkdownNode
): node is import("unist").UNIST.Parent {
  return node && node["children"];
}

export function isHeading(
  node: MarkdownNode
): node is import("mdast").MDAST.Heading {
  return node && node.type === "heading";
}

export function isParagraph(
  node: MarkdownNode
): node is import("mdast").MDAST.Paragraph {
  return node && node.type === "paragraph";
}

export function isList(node: MarkdownNode): node is import("mdast").MDAST.List {
  return node && node.type === "list";
}

export function isListItem(
  node: MarkdownNode
): node is import("mdast").MDAST.ListItem {
  return node && node.type === "listItem";
}

export function isLink(node: MarkdownNode): node is import("mdast").MDAST.Link {
  return node && node.type === "link";
}

export function isLinkReference(
  node: MarkdownNode
): node is import("mdast").MDAST.LinkReference {
  return node && node.type === "linkReference";
}

export function isText(
  node: MarkdownNode
): node is import("mdast").MDAST.TextNode {
  return node && node.type === "text";
}

export function isCode(node: MarkdownNode): node is import("mdast").MDAST.Code {
  return node && node.type === "code";
}

export function isInlineCode(
  node: MarkdownNode
): node is import("mdast").MDAST.InlineCode {
  return node && node.type === "inlineCode";
}

export function isThematicBreak(
  node: MarkdownNode
): node is import("mdast").MDAST.ThematicBreak {
  return node && node.type === "thematicBreak";
}

export function isEmphasis(
  node: MarkdownNode
): node is import("mdast").MDAST.Emphasis {
  return node && node.type === "emphasis";
}

export function isStrong(
  node: MarkdownNode
): node is import("mdast").MDAST.Strong {
  return node && node.type === "strong";
}

export function isImage(
  node: MarkdownNode
): node is import("mdast").MDAST.Image {
  return node && node.type === "image";
}

export function isTable(
  node: MarkdownNode
): node is import("mdast").MDAST.Table {
  return node && node.type === "table";
}
