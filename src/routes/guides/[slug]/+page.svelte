<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();

	const guide = $derived(data.guide);
</script>

<svelte:head>
	<title>{guide.title} — Migrating to ES modules</title>
	<meta name="description" content={guide.description} />

	<meta property="og:url" content="https://esmodule.com/guides/{guide.slug}" />
	<meta property="og:title" content="{guide.title} — Migrating to ES modules" />
	<meta property="og:description" content={guide.description} />
</svelte:head>

<main class="page">
	<div class="container">
		<a class="back" href="{resolve('/')}#migrate">← all guides</a>

		<header>
			<p class="eyebrow">{guide.stack}</p>
			<h1>{guide.title}</h1>
			<p class="intro">{guide.description}</p>
		</header>

		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div class="body">{@html guide.html}</div>

		<footer>
			<a
				href="https://github.com/e18e/esmodule.com/blob/main/guides/{guide.slug}.md"
				target="_blank"
				rel="noopener noreferrer"
			>
				edit this guide
			</a>
		</footer>
	</div>
</main>

<style>
	.page {
		min-height: 100vh;
		padding: 6rem 0 4rem;
		box-sizing: border-box;
	}

	.back {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--subtle-contrast);
		text-decoration: none;
		margin-bottom: 2rem;
	}

	.back:hover {
		color: var(--accent-text-hover);
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--subtle-contrast);
		margin: 0 0 0.75rem;
	}

	h1 {
		font-family: var(--font-mono);
		font-size: min(2.5rem, 8cqi);
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin: 0;
	}

	.intro {
		margin: 1rem 0 0;
		font-size: 1.0625rem;
		line-height: 1.7;
		color: var(--muted);
	}

	.body {
		margin-top: 3rem;
	}

	/* The body is injected as HTML, so its styles cannot be scoped. */
	.body :global(h2) {
		font-family: var(--font-mono);
		font-size: 1.25rem;
		font-weight: 700;
		margin: 3rem 0 1rem;
		scroll-margin-top: 2rem;
	}

	.body :global(h3) {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 700;
		margin: 2rem 0 0.75rem;
	}

	.body :global(p) {
		margin: 0 0 1rem;
		font-size: 1rem;
		line-height: 1.7;
		color: var(--muted);
	}

	.body :global(ul),
	.body :global(ol) {
		margin: 0 0 1rem;
		padding-left: 1.25rem;
		font-size: 1rem;
		line-height: 1.7;
		color: var(--muted);
	}

	.body :global(li) {
		margin-bottom: 0.35rem;
	}

	.body :global(a) {
		color: var(--accent-text);
	}

	.body :global(a:hover) {
		color: var(--accent-text-hover);
	}

	.body :global(pre) {
		margin: 0 0 1.5rem;
	}

	.body :global(:not(pre) > code) {
		font-size: 0.875em;
		padding: 0.1em 0.3em;
		background: var(--code-bg);
		border: 1px solid var(--border);
		border-radius: 4px;
	}

	.body :global(blockquote) {
		margin: 0 0 1.5rem;
		padding: 0.25rem 0 0.25rem 1rem;
		border-left: 3px solid var(--accent);
		color: var(--muted);
	}

	footer {
		margin-top: 4rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border);
	}

	footer a {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--subtle-contrast);
		text-decoration: none;
	}

	footer a:hover {
		color: var(--accent-text-hover);
	}
</style>
