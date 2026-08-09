<script lang="ts">
	import { resolve } from '$app/paths';
	import type { GuideMeta } from '$lib/guides';

	interface Props {
		guides: GuideMeta[];
	}

	let { guides }: Props = $props();
</script>

<ul class="guides">
	{#each guides as guide (guide.slug)}
		<li>
			<a href={resolve('/guides/[slug]', { slug: guide.slug })}>
				<span class="stack">{guide.stack}</span>
				<h3>{guide.title}</h3>
				<p>{guide.description}</p>
			</a>
		</li>
	{/each}

	<li class="contribute">
		<a
			href="https://github.com/e18e/esmodule.com/tree/main/guides"
			target="_blank"
			rel="noopener noreferrer"
		>
			<span class="stack">Missing yours?</span>
			<h3>Write a guide</h3>
			<p>Guides are markdown files in <code>guides/</code>. Add one and open a pull request.</p>
		</a>
	</li>
</ul>

<style>
	.guides {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: 1fr;
		list-style: none;
		padding: 0;
		margin: 0;

		@container (width > 34rem) {
			grid-template-columns: 1fr 1fr;
		}
	}

	a {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		height: 100%;
		box-sizing: border-box;
		padding: 1rem 1.1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	a:hover {
		border-color: var(--border-strong);
		background: var(--accent-tint);
	}

	.stack {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--subtle-contrast);
	}

	h3 {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 700;
		margin: 0;
	}

	p {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--muted);
	}

	.contribute a {
		background: none;
		border-style: dashed;
	}

	.contribute code {
		font-size: 0.8125rem;
	}
</style>
