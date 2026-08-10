import { list_guides } from '$lib/server/guides';
import { get_highlighter, highlight } from '$lib/server/highlight';
import { count_esm_packages } from '$lib/server/package-counts';
import cjs_app from '../../examples/cjs/app.cjs?raw';
import cjs_math from '../../examples/cjs/math.cjs?raw';
import esm_app from '../../examples/esm/app.js?raw';
import esm_math from '../../examples/esm/math.js?raw';
import type { PageServerLoad } from './$types';

const sources = {
	esm: [
		{ name: 'math.js', code: esm_math },
		{ name: 'app.js', code: esm_app }
	],
	cjs: [
		{ name: 'math.cjs', code: cjs_math },
		{ name: 'app.cjs', code: cjs_app }
	]
};

export const load: PageServerLoad = async () => {
	const highlighter = await get_highlighter();

	const render = (files: { name: string; code: string }[]) =>
		files.map(({ name, code }) => ({
			name,
			html: highlight(highlighter, code.trimEnd(), 'javascript')
		}));

	return {
		examples: {
			esm: render(sources.esm),
			cjs: render(sources.cjs)
		},
		guides: list_guides(),
		esm_package_count: await count_esm_packages()
	};
};
