/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'mono': ['Courier New', 'Courier', 'monospace'],
		},
		extend: {
			colors: {
				"lime": {
					"200": "#eaff47",
					"500": "#8ad435",
				},
			},
		},
	},
	plugins: [],
}
