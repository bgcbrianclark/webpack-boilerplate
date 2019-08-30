// OPTIONS
const options = {
  entry: "./src/js/index.js",
  jsOutputPath: "dist/js/",
  jsOutputFilename: "app.min.js",
  css: "../css/styles.min.css"
};

// Webpack uses this to work with directories
const path = require("path");

// CSS Minification and Bundling
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Autoclean the dist folder when things are removed
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin his work
  entry: options.entry,

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, options.jsOutputPath),
    filename: options.jsOutputFilename
  },

  // Add transpile modules to change different filetypes into something we can use
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: 'css/'
          //   }
          // }
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          { loader: "postcss-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        // Using rules for image files
        test: /\.(png|pge?g|gif|svg)$/,
        use: [
          {
            // Using file-loader for image files
            loader: "file-loader",

            // output hashed files where we need them in the dist folder
            options: {
              outputPath: "img"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: options.css
    })
  ],

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript
  // minifying and other thing so let's set mode to development
  mode: "development"
};
