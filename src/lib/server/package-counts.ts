const VIEW_URL = 'https://npm.devminer.xyz/live_registry/_design/esm/_view/by_kind?group_level=2';

const ESM_KINDS = new Set(['esm', 'dual']);
const CACHE_TTL = 6 * 60 * 60;

interface ByKindView {
	rows: { key: [number, string]; value: number }[];
}

export function sum_esm_packages(view: ByKindView): number {
	let total = 0;

	for (const row of view.rows) {
		if (ESM_KINDS.has(row.key[1])) total += row.value;
	}

	return total;
}

export async function count_esm_packages(): Promise<number> {
	const response = await fetch(VIEW_URL, {
		headers: { accept: 'application/json' },
		cf: { cacheEverything: true, cacheTtl: CACHE_TTL }
	});

	if (!response.ok) {
		throw new Error(`by_kind view responded with ${response.status}`);
	}

	const view = (await response.json()) as ByKindView;

	if (!Array.isArray(view.rows)) {
		throw new Error('by_kind view returned no rows');
	}

	const count = sum_esm_packages(view);

	if (count === 0) {
		throw new Error('by_kind view returned no ESM packages');
	}

	return count;
}
