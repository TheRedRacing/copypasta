import type { Config } from "tailwindcss";
import tailwindcssanimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  	],
  	theme: {},
  	plugins: [tailwindcssanimate],
} satisfies Config;
