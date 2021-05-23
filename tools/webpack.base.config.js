const {rootDir} = require('./utils');

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
                            ['@babel/preset-env']
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-regenerator'
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
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
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
            }
        ]
    }
};
