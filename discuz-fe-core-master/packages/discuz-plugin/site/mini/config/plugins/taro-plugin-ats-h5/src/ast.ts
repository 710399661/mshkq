import * as $ from "gogocode";
const names = {
  View: "div",
  Text: "span",
  Image: "img",
  Input: "input",
  ScrollView: "div",
};
export default (path: string, componentName: string): string => {
  const code = $.loadFile(path);
  let ASTStr = $(code)
    .replace(`${componentName}MiniLayout`, `${componentName}WebLayout`)
    .replace(`import { $$$ } from '@tarojs/components'`, "")
    .replace(`import $_$ from '@tarojs/taro'`, "")
    .find([`<$_$></$_$>`, `<$_$/>`])
    .each((node) => {
      if (node && node.match && node.match[0]) {
        node.match[0].forEach((match) => {
          if (match.node) {
            const tagName = match.value || "";
            if (names[tagName]) {
              match.node.name = names[tagName];
            }
          }
        });
      }
    })
    .root()
    .generate();

  // 处理特殊逻辑
  ASTStr = ASTStr.replace(`/mini';`, `/web';`);

  return ASTStr;
};
