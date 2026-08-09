import { query } from '$app/server';
import { list_migrated_packages } from './server/registry.ts';

export const recent_migrations = query(list_migrated_packages);
