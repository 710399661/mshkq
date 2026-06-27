import miniToWeb from "./file";
// import { chalk } from "@tarojs/helper";

export default (ctx, pluginOpts) => {
  ctx.onBuildFinish(async () => {

    // onlyExample: 仅处理示例
    const { componentNames = [], onlyExample = false } = pluginOpts;

    if (componentNames.length) {
      componentNames.forEach((item) => {
        miniToWeb(item, onlyExample);
      });
    }
  });
};
