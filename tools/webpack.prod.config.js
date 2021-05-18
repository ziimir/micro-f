const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({}),
            new OptimizeCssAssetsPlugin({}),
            new CompressionPlugin({
                test: /\.js$|\.css$/,
                filename: '[file].gz',
                algorithm: 'gzip'
            }),
            new ImageminPlugin()
        ]
    },
};
