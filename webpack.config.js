let path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { loadConfig  } = require("svgo");
const CopyPlugin = require("copy-webpack-plugin");





var autoprefixer = {
	loader: "postcss-loader",
	options: {
		postcssOptions: {
			plugins: [ "autoprefixer" ],
		},
	},
}



let conf = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'), // путь на уровне файловой системы
		filename: '[name].js',
		publicPath: '/dist/', // путь на уровне тега script и т.д.
		clean: true
	},
	devServer: {
		static: path.join(__dirname, '/'),
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [
					'thread-loader',
					'babel-loader'
				],
				exclude: '/node_modules'
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: "asset/resource",
				generator: {
          filename: 'assets/img/[name][ext]',
        },
			},
			{
        test: /\.module\.(sa|sc|c)ss$/i,
        use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "./",
						},
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
							modules: {
								localIdentName: '[local]_[sha1:hash:hex:7]'
							}
						}
					},
					autoprefixer,
					"sass-loader",
				],
      },
			{
        test: /^((?!\.module).)*(css|scss|sass)$/,
        use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "./",
						},
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
						}
					},
					autoprefixer,
					"sass-loader",
				],
      },

			{
				test: /\.(woff(2)?|eot|ttf|otf)$/,
				type: 'asset/resource',
				generator: {
          filename: 'assets/fonts/[name][ext]',
        },
			},
			{
        test: /\.svg$/,
				type: 'asset/resource',
        use: [
          {
            loader: 'svgo-loader',
            options: {
              multipass: true,
              js2svg: {
                indent: 2,
                pretty: false,
              },
							plugins: [
								{
									name: 'preset-default',
									params: {
										overrides: {
											removeViewBox: false,
										}
									},
								},
							],
            }
          }
        ],
				generator: {
          filename: 'assets/img/[name][ext]',
        },
      }

		]
	},
	resolve: {
    extensions: ['.js', '.jsx'],
  },

	optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
				parallel: true,
        terserOptions: {
          compress: {
            drop_console: true, // remove console statement
          },
        },
      }),
			new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['pngquant', { quality: [0.7, 0.7] }],
							['mozjpeg', { quality: 60, progressive: true }],
							['gifsicle', { interlaced: true, optimizationLevel: 3 }],
            ],
          },
        },
      }),
    ],
		splitChunks: {
			cacheGroups: {
				defaultVendors: {
					name: 'chunk-vendors',
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial'
				},
				common: {
					name: 'chunk-common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				}
			}
		}
  },

	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		// new CopyPlugin({
		// 	patterns: [
		// 		{
		// 			from: "src/assets/img/*.*",
    //       to: "assets/img/[name][ext]",
		// 		},
		// 	]
		// })
		// new CopyPlugin({
		// 	patterns: [
		// 		{
		// 			from: "src/assets/img/*.png",
    //       to: "assets/img/[name].webp",
		// 		},
		// 		{
		// 			from: "src/assets/img/*.jpg",
    //       to: "assets/img/[name].webp",
		// 		},
		// 		{
		// 			from: "src/assets/fonts/*.*",
    //       to: "assets/fonts/[name][ext]",
		// 		},
		// 	]
		// })
	],

	watch: false,
	cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
  },

};

module.exports = (env, options) => {

	let isProd = options.mode === 'production';
	conf.devtool = isProd ? 'nosources-source-map' : 'eval-cheap-module-source-map';

	return conf
}