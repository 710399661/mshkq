
module.exports = () => {
    const babelConfig = {
        babelrc: false,
        configFile: false,
        sourceMaps: false, // map不构建
        inputSourceMap: false,// map不构建
        highlightCode: true, // 错误高亮
        presets: [
            [
                require.resolve('@babel/preset-env'),
                {
                  targets: { browsers: ['> 1%', 'last 2 versions', 'not ie <= 9'] },
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
            ],
            require.resolve('@babel/preset-react')
        ],
        plugins: [
            [
                require.resolve("@discuzq/discuz-babel-plugin-import"),
                {
                  "libraryName": "@discuzq/design",
                  "libraryDirectory": "dist-pure/components"
                }
            ],
            require.resolve('@babel/plugin-transform-runtime'),
            require.resolve('@babel/plugin-proposal-class-properties'),
        ]
    };

    return babelConfig;
}