const path = require('path');
const merge = require('webpack-merge');
const config = require('config');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');

const baseConfig = require('./tools/webpack.base.config');
const devConfig = require('./tools/webpack.dev.config');
const prodConfig = require('./tools/webpack.prod.config');

const {rootDir} = require('./tools/utils');

const buildPath = config.get('build.clientOutput');
const publicPath = config.get('build.publicPath');

const clientConfig = {
    target: 'web',
    entry: {
        main: path.resolve(rootDir, 'src/client/index.tsx'),
        shared: path.resolve(rootDir, 'services/shared-component/index.tsx'),
        polyfills: path.resolve(rootDir, 'src/client/polyfills')
    },
    output: {
        path: path.resolve(rootDir, buildPath),
        filename: '[name].js',
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            import: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(rootDir, 'tools/config')
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
        new WebpackManifestPlugin({
            fileName: path.resolve(rootDir, config.get('build.serverOutput'), 'manifest.json'),
            publicPath: publicPath,
            filter: (fileDescriptor) => fileDescriptor.isInitial  && !fileDescriptor.name.includes('shared')
        })
    ]
};

module.exports = merge(
    baseConfig,
    process.env.NODE_ENV === 'production' ? prodConfig : devConfig,
    clientConfig
);
