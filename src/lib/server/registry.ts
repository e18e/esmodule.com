import type { MigratedPackage } from '../migrated-projects.ts';
import { list_recent_migrations } from './migrations.ts';

const GITHUB = /(?:github(?:\.com[/:]|:))([^/]+)\/([^/#?]+?)(?:\.git)?(?:[/#?]|$)/i;

function github_url(repository: unknown): string | null {
	const url =
		typeof repository === 'string'
			? repository
			: typeof repository === 'object' && repository !== null && 'url' in repository
				? repository.url
				: undefined;

	if (typeof url !== 'string') return null;

	const match = GITHUB.exec(url);

	return match ? `https://github.com/${match[1]}/${match[2]}` : null;
}

/**
 * Resolved links, keyed by package name.
 */
const cache = new Map<string, string | null>();

async function fetch_github_url(name: string): Promise<string | null> {
	try {
		const response = await fetch(`https://registry.npmjs.org/${name}/latest`, {
			headers: { accept: 'application/json' }
		});

		if (!response.ok) return null;

		const manifest = (await response.json()) as { repository?: unknown };

		return github_url(manifest.repository);
	} catch {
		return null;
	}
}

async function resolve(name: string): Promise<string | null> {
	const cached = cache.get(name);

	if (cached !== undefined) return cached;

	const url = await fetch_github_url(name);

	cache.set(name, url);

	return url;
}

/** The recent migrations, with their npm and GitHub links resolved. */
export async function list_migrated_packages(): Promise<MigratedPackage[]> {
	const migrations = list_recent_migrations();

	const current = new Set(migrations.map((migration) => migration.name));

	for (const name of cache.keys()) {
		if (!current.has(name)) cache.delete(name);
	}

	return Promise.all(
		migrations.map(async (migration) => ({
			...migration,
			npm_url: `https://www.npmjs.com/package/${migration.name}`,
			github_url: await resolve(migration.name)
		}))
	);
}
