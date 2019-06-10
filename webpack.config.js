module.exports = {
    devtool: 'source-map',
    entry: './dist/lib/index.js',
    module: {
        rules: [{
            test: /\.js$/,
            use: ['source-map-loader'],
            enforce: 'pre'
        }]
    }
};
