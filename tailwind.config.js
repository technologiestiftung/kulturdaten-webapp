/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			white: "#FFFFFF",
			highlight: "#993539",
			text: "#381516",
			error: "#CC411E",
			warning: "#A4660A",
			success: "#4F7D63",
		},
		extend: {
			maxWidth: {
				110: "27.5rem",
				130: "32.5rem",
				mobile: "375px",
				tablet: "744px",
				desktop: "1280px",
			},
			screens: {
				mobile: "375px",
				tablet: "744px",
				desktop: "1280px",
			},
		},
	},
	plugins: [],
};
