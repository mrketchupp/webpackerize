const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_[contenthash].js',
        clean: true,
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@images': path.resolve(__dirname, 'src/assets/images'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name]_[hash][ext]'
                }
            },
            {
                test: /\.(woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name]_[hash][ext]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './public/index.html',
            filename: './index.html',
            chunks: ['index']
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name]_[contenthash].css',
        }),
        new Dotenv(),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src', 'assets/images'),
        //             to: 'assets/images'
        //         }
        //     ]
        // }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}