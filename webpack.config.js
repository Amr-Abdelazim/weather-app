const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Add this line to import the plugin

module.exports = {
    // Entry point for the application
    entry: './src/index.js',

    // Output configuration
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'main.js', // Output file name
        clean: true, // Cleans the output folder on every build
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './static/index.html', // Your source HTML file
            filename: 'index.html', // Output HTML file name
        }),
    ],

    // Mode: development or production
    mode: 'development', // Use 'production' for optimized builds

    // Module rules
    module: {
        rules: [
            {
                test: /\.css$/, // Handle CSS files
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/, // Handle image files
                type: 'asset/resource',
            },
            {
                test: /\.js$/, // Handle JavaScript files
                exclude: /node_modules/, // Ignore node_modules
                use: {
                    loader: 'babel-loader', // Transpile JS using Babel
                },
            },
        ],
    },

    // Devtool for debugging (optional)
    devtool: 'inline-source-map',

    // DevServer configuration (optional, for development)
    devServer: {
        static: './dist', // Serve files from the 'dist' directory
        port: 8080, // Specify the port
        hot: true, // Enable Hot Module Replacement (HMR)
    },
};
