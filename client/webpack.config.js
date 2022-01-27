const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  //mode: "production",
    mode: "development", devtool: "inline-source-map",

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        client: {
            progress: true,
        },
        historyApiFallback: true,
    },

    watchOptions: {
        ignored: /node_modules/,
    },

    entry: [ "./src/index.tsx" ],
    output: {
        publicPath: '/',
        path: path.resolve(process.cwd(), 'dist'),
        filename: "./bundle.js"  // in /dist
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".css", ".scss", ".sass"]
    },
    module: {
        rules: [

            { test: /\.tsx?$/, loader: "ts-loader" },

            { test: /\.(sass|less|scss|css)$/, use: [
                { loader: "style-loader" },  // to inject the result into the DOM as a style block
                { loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                { loader: "css-loader", options: { modules: true } },
                //{ loader: "postcss-loader" },
                { loader: "sass-loader" },  // to convert SASS to CSS
                // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
            ] },

            {
              test: /\.(jpe?g|gif|png|ico)$/,
              use: ['file-loader?name=[name].[ext]']
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Application name",
            template: './public/index.html',
            filename: './index.html',
            favicon: './public/favicon.ico',
        }),
        new WebpackManifestPlugin({ basePath: './public/' }),
        new WebpackNotifierPlugin(),
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
    ]
};