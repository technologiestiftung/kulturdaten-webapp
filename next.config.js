/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["lucide-react"],
	i18n: {
		locales: ["de"],
		defaultLocale: "de",
	},
};

module.exports = nextConfig;
