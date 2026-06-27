"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("./file");
// import { chalk } from "@tarojs/helper";
exports.default = (ctx, pluginOpts) => {
    ctx.onBuildFinish(async () => {
        // onlyExample: 仅处理示例
        const { componentNames = [], onlyExample = false } = pluginOpts;
        if (componentNames.length) {
            componentNames.forEach((item) => {
                file_1.default(item, onlyExample);
            });
        }
    });
};
//# sourceMappingURL=index.js.map