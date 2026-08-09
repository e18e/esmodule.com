import { recent_migration_limit } from '../migrated-projects.ts';

/**
 * The most recent packages to switch to ES modules, newest first.
 *
 * TODO: pull this from somewhere
 */
const migrations = Array.from({ length: 28 }, (_, i) => ({
	name: `pkg-${i + 1}`,
	migrated_at: new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10)
}));

/** The newest migrations, most recent first, capped at what the page shows. */
export function list_recent_migrations() {
	return [...migrations]
		.sort((a, b) => b.migrated_at.localeCompare(a.migrated_at))
		.slice(0, recent_migration_limit);
}
