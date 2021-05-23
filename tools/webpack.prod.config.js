const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [
            new CompressionPlugin({
                test: /\.js$|\.css$/,
                filename: '[file].gz',
                algorithm: 'gzip'
            })
        ]
    },
};
