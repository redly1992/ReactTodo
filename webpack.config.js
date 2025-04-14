const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

const rootDir = fs.realpathSync(process.cwd());
const srcDir = path.resolve(rootDir, 'src');
const serverDir = path.resolve(rootDir, 'server');
const buildDir = path.resolve(rootDir, 'build');

const common = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },
    resolve: {
        modules: ['node_modules', srcDir, serverDir],
        extensions: ['.js', '.jsx', '.json'],
    },
};

const clientConfig = {
    ...common,
    target: 'web',
    name: 'client',
    entry: {
        client: path.resolve(srcDir, 'Client.js'),
    },
    output: {
        publicPath: '/',
        path: buildDir,
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: module => /node_modules/.test(module.resource),
                    enforce: true,
                },
            },
        },
    },
    module: {
        ...common.module,
        rules: [
            ...common.module.rules,
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ]
    },
    devtool: 'eval-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css', // Output as client.css
        }),
    ],
};

const serverConfig = {
    ...common,
    target: 'node',
    name: 'server',
    entry: {
        server: path.resolve(serverDir, 'server.js'),
    },
    output: {
        publicPath: '/',
        path: buildDir,
        filename: 'server.js',
    },
    devtool: 'eval-source-map',
    externals: [nodeExternals()],
    node: {
        __dirname: false,
    },
    module: {
        ...common.module,
        rules: [
            ...common.module.rules,
            {
                test: /\.css$/,
                use: 'ignore-loader',
            },
        ]
    },
};

module.exports = [clientConfig, serverConfig];
