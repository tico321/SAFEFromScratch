// Basic configuration for development.
// A more robust guide can be found here: https://github.com/fable-compiler/webpack-config-template
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    // required property, either "development" or "production".
    mode: "development",
    // Webpack uses this file as a starting point for dependency tree walking.
    // We use the main file generated by Fable.
    entry: "./tests/Client/Program.fs.js",
    // integrated in webpack, controls how source maps are generated https://webpack.js.org/configuration/devtool/
    devtool: "eval-source-map",
    // the resulting output
    output: {
        // An absolute path for the resulting bundle.
        path: path.join(__dirname, "./tests/Client/dist"),
        // the resulting file, by convention bundle.js
        filename: "bundle.js",
    },
    devServer: {
        static: './tests/Client/dist',
        // hot true automatically adds Hot Module Replacement, no longer needed to add the plugin new webpack.HotModuleReplacementPlugin()
        hot: true,
        port: 8080,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                // by default copies to output folder
                { from: path.join(__dirname,'./tests/Client/public') }
            ],
        }),
    ],
    module: {
        // Loaders allow webpack to process files other than JS and convert them into valid
        // modules that can be consumed by your application and added to the dependency graph
        rules: [
            // style loaders
            {
                // The test property identifies which file or files should be transformed.
                test: /\.(sass|scss|css)$/,
                // The use property indicates which loader should be used to do the transforming.
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ]
            },
            // JS source map loader https://webpack.js.org/loaders/source-map-loader/
            // extracts existing source maps from all JavaScript entries and passes them to the specified devtool
            {
                test: /\.js$/,
                enforce: "pre",
                use: ['source-map-loader']
            }
        ]
    }
}
