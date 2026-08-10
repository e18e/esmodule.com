import { frameworks, type CheckedFramework, type ModuleKind } from '../frameworks.ts';

const REGISTRY = 'https://registry.npmjs.org';

interface Manifest {
	type?: unknown;
	exports?: unknown;
}

/** Whether an `exports` map offers an `import` condition anywhere inside it. */
function has_import_condition(exports: unknown): boolean {
	if (typeof exports !== 'object' || exports === null) return false;

	if (Array.isArray(exports)) return exports.some(has_import_condition);

	return Object.entries(exports).some(
		([condition, value]) => condition === 'import' || has_import_condition(value)
	);
}

/**
 * `type: module` means ESM, otherwise an `import` export condition means
 * dual, and everything else is CJS.
 */
export function detect_kind(manifest: Manifest): ModuleKind {
	if (manifest.type === 'module') return 'esm';

	return has_import_condition(manifest.exports) ? 'dual' : 'cjs';
}

async function fetch_kind(name: string): Promise<ModuleKind> {
	try {
		const response = await fetch(`${REGISTRY}/${name}/latest`, {
			headers: { accept: 'application/json' }
		});

		if (!response.ok) return 'unknown';

		return detect_kind((await response.json()) as Manifest);
	} catch {
		return 'unknown';
	}
}

export function resolve_framework_kinds(): Promise<CheckedFramework[]> {
	return Promise.all(
		frameworks.map(async (framework) => ({
			...framework,
			kind: await fetch_kind(framework.package)
		}))
	);
}
