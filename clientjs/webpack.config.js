const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const config = (env, options) => {
    return {
        entry: [
            './src/index.js'
        ],
        devtool: 'inline-source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
        },
        watch: Boolean(options.mode === "development"),
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ],
                    exclude: /\.module\.css$/
                },
                {
                    test: /\.ts(x)?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true
                            }
                        }
                    ],
                    include: /\.module\.css$/
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.svg$/,
                    use: 'file-loader'
                },
                {
                    test: /\.png$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                mimetype: 'image/png'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [
                '.js',
                '.jsx',
                '.tsx',
                '.ts'
            ],
            fallback: {
                "stream": require.resolve("stream-browserify"),
                "crypto": require.resolve("crypto-browserify"),
                "buffer": require.resolve("buffer/")
            }
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new HtmlWebpackPlugin({
                title: 'HRM',
                template: "./public/index.html"
            }),
            new CleanWebpackPlugin(),
            new ESLintPlugin({
                extensions: ["js", "jsx", "ts", "tsx"],
            }),
            ...(env.USE_ENV_FILE ? [new Dotenv()] : [])
        ],
        devServer: {
            contentBase: './dist'
        }
    }
};

module.exports = (env, options) => config(env, options);
