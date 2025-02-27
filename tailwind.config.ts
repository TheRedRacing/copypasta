import type { Config } from "tailwindcss";
import tailwindcssanimate from "tailwindcss-animate";

export default {
	darkMode: ["class", '[data-theme^="dark-"]'],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					"50": "rgba(var(--primary-50),<alpha-value>)",
					"100": "rgba(var(--primary-100),<alpha-value>)",
					"200": "rgba(var(--primary-200),<alpha-value>)",
					"300": "rgba(var(--primary-300),<alpha-value>)",
					"400": "rgba(var(--primary-400),<alpha-value>)",
					"500": "rgba(var(--primary-500),<alpha-value>)",
					"600": "rgba(var(--primary-600),<alpha-value>)",
					"700": "rgba(var(--primary-700),<alpha-value>)",
					"800": "rgba(var(--primary-800),<alpha-value>)",
					"900": "rgba(var(--primary-900),<alpha-value>)",
				},
			},
		},
	},
	plugins: [tailwindcssanimate],
} satisfies Config;
