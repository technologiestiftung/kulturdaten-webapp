const nextConfig = {
	poweredByHeader: false,
	devIndicators: {
		autoPrerender: false,
	},
	publicRuntimeConfig: {
		api: process.env.API_BASE_URL || '192.168.178.21:5000',
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.yml$/,
			use: 'js-yaml-loader',
		});
		return config;
	},
};

module.exports = nextConfig;
