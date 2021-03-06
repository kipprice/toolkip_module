const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'toolkip.js',
        path: path.resolve(__dirname, 'compiled_js'),
        library:'',
        libraryTarget:'commonjs'
    },

    // don't minimize function or class names
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    keep_fnames: true,
                    keep_classnames: true
                }
            })
        ]
    },
};	
