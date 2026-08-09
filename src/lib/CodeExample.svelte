<script lang="ts">
	interface File {
		name: string;
		html: string;
	}

	interface Props {
		esm: File[];
		cjs: File[];
	}

	let { esm, cjs }: Props = $props();

	const variants = $derived([
		{
			label: 'CommonJS',
			note: 'Node.js only, and never part of the language.',
			current: false,
			files: cjs
		},
		{
			label: 'ES modules',
			note: 'The same code, in every runtime and bundler.',
			current: true,
			files: esm
		}
	]);
</script>

<div class="compare">
	{#each variants as variant (variant.label)}
		<article class="variant" class:current={variant.current}>
			<header>
				<h3>{variant.label}</h3>
				<p>{variant.note}</p>
			</header>

			{#each variant.files as file (file.name)}
				<figure>
					<figcaption>{file.name}</figcaption>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html file.html}
				</figure>
			{/each}
		</article>
	{/each}
</div>

<style>
	.compare {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: 1fr;

		@container (width > 44rem) {
			grid-template-columns: 1fr 1fr;
			gap: 1.25rem;
		}
	}

	.variant {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1.25rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 8px;
	}

	.variant.current {
		border-color: var(--border-strong);
		box-shadow: inset 3px 0 var(--accent);
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	h3 {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin: 0;
	}

	header p {
		margin: 0;
		font-size: 0.8125rem;
		line-height: 1.5;
		color: var(--subtle-contrast);
	}

	figure {
		margin: 0;
		border: 1px solid var(--border);
		border-radius: 6px;
		overflow: hidden;
	}

	figcaption {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.04em;
		color: var(--subtle-contrast);
		padding: 0.4rem 0.75rem;
		background: var(--code-bg);
		border-bottom: 1px solid var(--border);
	}
</style>
