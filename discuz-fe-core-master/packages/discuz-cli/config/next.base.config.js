// https://github.com/vercel/next.js/tree/5e9d1aae3d1c078878b3d8cdf81c307ad33552e7/docs/api-reference/next.config.js
const projectName = require('../utils/getProjectName')();
module.exports = () => ({
  basePath: '', // 默认路径https://www.nextjs.cn/docs/api-reference/next.config.js/basepath
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  assetPrefix: '',
  compress: process.env.NODE_ENV === 'production',
  serverRuntimeConfig: {
  },
  publicRuntimeConfig: {
  },
  poweredByHeader: false,
  distDir: projectName,
});
