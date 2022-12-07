const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require('path');
module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "./dist/bundle.js")
    },
    devtool: "source-map",
    resolve: {
        extensions:  ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" },
          ],
        },      
// Other rules like entry, output, devserver....,
plugins: [
    new NodePolyfillPlugin()
],
target: "node"};