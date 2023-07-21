/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(glb)$/i,
			use: {
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
					publicPath: "/_next/static/files",
					outputPath: "static/files",
				},
			},
		});
		return config;
	},
};

module.exports = nextConfig;
