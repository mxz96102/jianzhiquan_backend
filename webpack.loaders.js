module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components|public)/,
		loader: "babel"
	},
	{
		test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=application/font-woff"
	}, {
		test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=application/font-woff"
	}, {
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=application/octet-stream"
	}, {
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		loader: "file"
	}, {
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=image/svg+xml"
	},
	{
		test: /\.gif/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/gif"
	},
	{
		test: /\.jpg/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/jpg"
	},
	{
		test: /\.png/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/png"
	}
];
