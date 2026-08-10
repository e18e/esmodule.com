/** A package that has switched to ES modules. */
export interface MigratedPackage {
	name: string;
	migrated_at: string;
	npm_url: string;
	github_url: string | null;
}

/** How many recent migrations the page lists (and the registry cache holds). */
export const recent_migration_limit = 12;
