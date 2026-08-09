import { get_guide, list_guides } from '$lib/server/guides';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => list_guides().map(({ slug }) => ({ slug }));

export const load: PageServerLoad = async ({ params }) => {
	const guide = await get_guide(params.slug);

	if (!guide) {
		error(404, `No guide named "${params.slug}"`);
	}

	return { guide };
};
