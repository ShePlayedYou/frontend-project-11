const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist/'),
        clean: true,

    },
    plugins: [
        require('autoprefixer'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', 
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './public/images/'),
                    to: path.resolve(__dirname, './dist/images/')
                }
            ]
        }),
       new ESLintPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader',
                    {
                    loader: 'sass-loader',
                    options: {
                      sassOptions: {
                        quietDeps: true // Отключение предупреждений
                      }
                    }
                  }],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource", // !! Для шрифтов подключение
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    devServer: {
        port: 5001,
        hot: true,
        open: true,
    }
}