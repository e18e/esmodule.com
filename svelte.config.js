import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
		experimental: { async: true }
	},
	kit: {
		adapter: adapter(),
		experimental: { remoteFunctions: true },
		prerender: {
			origin: 'https://esmodule.com',
			entries: ['/', '/llms.txt']
		}
	}
};

export default config;
