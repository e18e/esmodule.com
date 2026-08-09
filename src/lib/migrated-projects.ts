/** A package that has switched to ES modules. */
export interface MigratedPackage {
	name: string;
	migrated_at: string;
	npm_url: string;
	github_url: string | null;
}

/**
 * Total number of npm packages shipping ES modules.
 *
 * TODO: calculate this from anna's db
 */
export const esm_package_count = 12480;

/** How many recent migrations the page lists (and the registry cache holds). */
export const recent_migration_limit = 12;
