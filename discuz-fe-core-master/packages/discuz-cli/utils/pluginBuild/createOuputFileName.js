
function outputJSFileName(chunkhash) {
    return process.env.OMG_ENV === 'production' && chunkhash ? '[name]/index-[contenthash:8].js' : '[name]/index.js';
}
function outputCSSFileName(chunkhash) {
    return process.env.OMG_ENV === 'production' && chunkhash ? '[name]/index-[contenthash:8].css' : '[name]/index.css';
}

module.exports = function createOuputFileName(type, chunkhash) {
    switch(type) {
        case 'js' : return outputJSFileName(chunkhash);
        case 'css' : return outputCSSFileName(chunkhash);
    }
}