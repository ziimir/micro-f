const {getHashDigest} = require('loader-utils');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const {rootDir, getIconFolders} = require('./utils');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }, {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {sourceMap: true}
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        // куда положить файл, считается от webpack.output.path
                        outputPath: './',
                        // что будет в урле вместо require(path)
                        publicPath: '/assets'
                    }
                }]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        // куда положить файл, считается от webpack.output.path
                        outputPath: './',
                        // что будет в урле вместо require(path)
                        publicPath: '/assets'
                    }
                }]
            },
            {
                test: /\.svg$/i,
                use: [{
                    loader: 'svg-sprite-loader',
                    options: {
                        symbolId: '[hash]',
                        esModule: false,
                        spriteFilename: (svgPath) => {
                            const svgExt = '.svg';
                            const MAX_FILE_NAME_LENGTH = 38;
                            const MAX_FILE_NAME_LENGTH_WITHOUT_EXT = MAX_FILE_NAME_LENGTH - svgExt.length;
                            const pathHash = getHashDigest(
                                svgPath,
                                'sha1',
                                'hex',
                                MAX_FILE_NAME_LENGTH_WITHOUT_EXT / 2
                            );

                            return `${pathHash}[contenthash:${MAX_FILE_NAME_LENGTH_WITHOUT_EXT / 2}]${svgExt}`;
                        },
                        extract: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new SpriteLoaderPlugin({plainSprite: true})
    ]
};
