// TODO: 目前针对 require 引入的编译有问题。暂时不进行整包打包

// https://www.npmjs.com/package/@rollup/plugin-node-resolve
import { nodeResolve } from '@rollup/plugin-node-resolve';
// https://www.npmjs.com/package/@rollup/plugin-commonjs
import commonjs from '@rollup/plugin-commonjs';
// https://www.npmjs.com/package/@rollup/plugin-babel
import { babel } from '@rollup/plugin-babel';
// https://www.npmjs.com/package/@rollup/plugin-replace
import replace from '@rollup/plugin-replace';
// https://www.npmjs.com/package/@rollup/plugin-eslint
// import eslint from '@rollup/plugin-eslint';
import { resolve } from 'path';

const cwd = __dirname;

const baseConfig = {
  input: resolve(cwd, 'utils/index.js'),
  output: [
    {
      file: resolve(cwd, `dist/index.${process.env.DISCUZ_ENV}.umd.js`),
      format: 'umd',
      name: 'DiscuzQ',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    replace({
      'process.env.DISCUZ_ENV': JSON.stringify(process.env.DISCUZ_ENV),
    }),
    commonjs(),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          modules: false,
        }],
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-arrow-functions',
      ],
    }),
    // eslint(),
  ],
};

function rollup() {
  return baseConfig;
}

module.exports = rollup();
