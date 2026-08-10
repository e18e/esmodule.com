import { query } from '$app/server';
import { count_esm_packages } from './server/package-counts.ts';
import { list_migrated_packages } from './server/registry.ts';

export const recent_migrations = query(list_migrated_packages);

export const esm_package_count = query(count_esm_packages);
