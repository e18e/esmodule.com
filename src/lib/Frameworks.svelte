<script lang="ts">
	import { kind_label, publishes_esm, type CheckedFramework } from '$lib/frameworks';

	interface Props {
		frameworks: CheckedFramework[];
	}

	let { frameworks }: Props = $props();

	function describe(framework: CheckedFramework) {
		if (publishes_esm(framework.kind)) return `${framework.name} publishes ES modules.`;
		if (framework.kind === 'cjs') return `${framework.name} is CommonJS only.`;
		return `Whether ${framework.name} publishes ES modules is not known yet.`;
	}
</script>

<ul class="frameworks">
	{#each frameworks as framework (framework.package)}
		<li class="framework" data-kind={framework.kind}>
			<img class="logo" class:has-dark={framework.logo_dark} src={framework.logo} alt="" />
			{#if framework.logo_dark}
				<img class="logo dark" src={framework.logo_dark} alt="" />
			{/if}

			<span class="name">{framework.name}</span>
			<code class="package">{framework.package}</code>

			<span class="kind">
				<span class="dot" aria-hidden="true"></span>
				{kind_label(framework.kind)}
			</span>

			<span class="sr-only">{describe(framework)}</span>
		</li>
	{/each}
</ul>

<style>
	.frameworks {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
		gap: 0.75rem;
	}

	.framework {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.3rem;
		padding: 1rem;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 8px;
	}

	.logo {
		width: 1.75rem;
		height: 1.75rem;
		object-fit: contain;
		object-position: left center;
		margin-bottom: 0.5rem;
	}

	.logo.dark {
		display: none;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) .logo.has-dark {
			display: none;
		}

		:global(:root:not([data-theme='light'])) .logo.dark {
			display: block;
		}
	}

	:global(:root[data-theme='dark']) .logo.has-dark {
		display: none;
	}

	:global(:root[data-theme='dark']) .logo.dark {
		display: block;
	}

	:global(:root[data-theme='light']) .logo.has-dark {
		display: block;
	}

	:global(:root[data-theme='light']) .logo.dark {
		display: none;
	}

	.name {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text);
	}

	.package {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--subtle-contrast);
		overflow-wrap: anywhere;
	}

	.kind {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--muted);
	}

	.dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--subtle);
	}

	[data-kind='esm'] .dot,
	[data-kind='dual'] .dot {
		background: var(--accent);
	}

	[data-kind='esm'] .kind,
	[data-kind='dual'] .kind {
		color: var(--accent-text);
	}

	[data-kind='cjs'] .dot {
		background: transparent;
		border: 1px solid var(--border-strong);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>
