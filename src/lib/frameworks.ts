export type ModuleKind = 'esm' | 'dual' | 'cjs' | 'unknown';

export interface Framework {
	name: string;
	package: string;
	logo: string;
	logo_dark?: string;
}

export interface CheckedFramework extends Framework {
	kind: ModuleKind;
}

export const frameworks: Framework[] = [
	{
		name: 'Next.js',
		package: 'next',
		logo: '/frameworks/nextdotjs.svg',
		logo_dark: '/frameworks/nextdotjs-light.svg'
	},
	{ name: 'Nuxt', package: 'nuxt', logo: '/frameworks/nuxt.svg' },
	{ name: 'Astro', package: 'astro', logo: '/frameworks/astro.svg' },
	{ name: 'SvelteKit', package: '@sveltejs/kit', logo: '/frameworks/svelte.svg' },
	{ name: 'React Router', package: 'react-router', logo: '/frameworks/reactrouter.svg' },
	{ name: 'SolidStart', package: '@solidjs/start', logo: '/frameworks/solid-start.svg' }
];

export function publishes_esm(kind: ModuleKind): boolean {
	return kind === 'esm' || kind === 'dual';
}

const labels: Record<ModuleKind, string> = {
	esm: 'ESM only',
	dual: 'ESM + CJS',
	cjs: 'CJS only',
	unknown: 'Not known yet'
};

export function kind_label(kind: ModuleKind): string {
	return labels[kind];
}
