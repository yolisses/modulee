import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// TODO use real path instead of this
		'../modulee-nodes-editor/dist/**/*.{html,js,svelte,ts}',
	],

	theme: {
		extend: {},
	},

	plugins: [],
} satisfies Config;
