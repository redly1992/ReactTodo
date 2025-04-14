const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const nodeExternals = require('webpack-node-externals');

const target = 'server1';
const srcDir = path.resolve(__dirname, 'src');
const buildDirClient = path.resolve(__dirname, 'build-client');
const buildDirServer = path.resolve(__dirname, 'build-server');

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
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        modules: ['node_modules', srcDir],
        extensions: ['.js', '.jsx', '.json'],
    },
};

const clientConfig = {
    ...common,
    target: 'web',
    name: 'client',
    entry: './src/Client.js',
    output: {
        path: buildDirClient,
    },
};

const serverConfig = {
    ...common,
    target: 'node',
    name: 'server',
    entry: './server/server.js',
    output: {
        publicPath: '/',
        path: buildDirServer,
        filename: 'server.js',
    },
    externals: [nodeExternals()],
    node: {
        __dirname: false,
    },
};

module.exports = override(
    // addWebpackPlugin(
    //     new ModuleFederationPlugin({
    //         name: 'remoteApp', // Unique name for this app
    //         filename: 'remoteEntry.js', // Output file for the remote entry
    //         exposes: {
    //             // Example: Expose a component
    //             './AppTest': './src/App', // Expose the AppTest module
    //         },
    //         shared: {
    //             // Share dependencies (e.g., React) between apps
    //             react: {
    //                 singleton: true,
    //                 requiredVersion: '^19.0.0',
    //             },
    //             'react-dom': {
    //                 singleton: true,
    //                 requiredVersion: '^19.0.0',
    //             },
    //         },
    //         // runtime: 'runtime-name' // Uncomment and set if needed (string | false)
    //     })
    // ),
    // Add more customizations here
    (config) => {
        if (target !== 'server') {
            config.target = clientConfig.target;
            config.name = clientConfig.name;
            config.entry = clientConfig.entry;
            config.output.path = clientConfig.output.path;

            console.log(JSON.stringify(config, null, 2));

            return config;
        } else if (target == 'server') {
            config.externals = serverConfig.externals;
            config.node = serverConfig.node;
            config.mode = serverConfig.mode;
            config.module = serverConfig.module;
            config.resolve = serverConfig.resolve;
            config.target = serverConfig.target;
            config.name = serverConfig.name;
            config.entry = serverConfig.entry;
            config.output = serverConfig.output;

            config.module.rules.push(
                {
                    test: /\.css$/,
                    use: 'ignore-loader',
                }
            );
        }



        // if (target == 'server') {
        //     return {
        //         ...config,
        //         name: 'server',
        //         target: 'node',
        //         entry: './server/server.js',
        //         output: {
        //             ...config.output,
        //             path: buildDir,
        //             filename: 'server.bundle.js',
        //         },
        //         externals: [nodeExternals()],
        //         module: {
        //             rules: [
        //                 {
        //                     test: /\.jsx?$/,
        //                     exclude: /node_modules/,
        //                     use: {
        //                         loader: 'babel-loader',
        //                         options: {
        //                             presets: ['@babel/preset-env', '@babel/preset-react'],
        //                         },
        //                     },
        //                 },
        //                 {
        //                     test: /\.css$/,
        //                     use: 'ignore-loader',
        //                 },
        //             ],
        //         },
        //     };
        // }
        //
        // config.name = 'client';
        // config.target = 'web';
        // config.entry.client = './src/client.js';
        // config.output = {
        //     publicPath: '/',
        //     path: buildDir,
        //     filename: '[name].js',
        //     chunkFilename: '[name].js',
        // };
        //
        // config.optimization = {
        //     splitChunks: {
        //         cacheGroups: {
        //             vendor: {
        //                 chunks: 'initial',
        //                 name: 'vendor',
        //                 test: module => /node_modules/.test(module.resource),
        //                 enforce: true,
        //             },
        //         },
        //     },
        // };
        //
        // // Modify config directly if needed
        // config.module.rules.push({
        //     test: /\.custom$/,
        //     use: 'raw-loader',
        // });

        return config;
    }
);