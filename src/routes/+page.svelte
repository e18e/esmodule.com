<script lang="ts">
	import CodeExample from '$lib/CodeExample.svelte';
	import GuideList from '$lib/GuideList.svelte';
	import Frameworks from '$lib/Frameworks.svelte';
	import PackageCount from '$lib/PackageCount.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>ES Modules - The JavaScript module system</title>
	<meta name="description" content="A guide to ES modules, the module system of JavaScript." />

	<meta property="og:url" content="https://esmodule.com/" />
	<meta property="og:title" content="ES Modules - The JavaScript module system" />
	<meta
		property="og:description"
		content="A guide to ES modules, the module system of JavaScript."
	/>
</svelte:head>

<main class="page">
	<div class="container">
		<header class="hero">
			<p class="eyebrow">esmodule.com</p>
			<h1>What are <span class="highlight">ES modules</span>?</h1>

			<p class="intro">Introduced in the ES6 specification, ECMAScript modules (ES modules or ESM) is the standardized format for packaging and organizing JavaScript code. It provides a native, standard way to import and export code across files and packages.</p>

			<p>ES modules enable better code organization, dependency management, and enable tools to perform static analysis for optimizations like tree-shaking. Since its official addition to the JavaScript specification, ES modules are now widely available in modern browsers, Node.js, and bundlers, making it the de facto standard for JavaScript development.</p>


			<p class="jump">
				<a href="#example">See an example</a>
				<a href="#migrate">Migrate a project</a>
			</p>
		</header>
	</div>

	<div class="container bleed">
		<section aria-labelledby="example">
			<h2 id="example">How it looks</h2>

			<CodeExample {...data.examples} />
		</section>
	</div>

	<div class="container">
		<section aria-labelledby="migrate">
			<h2 id="migrate">Migration guides</h2>

			<p class="section-intro">
				If you want to migrate your project to ES modules, check out the guides for one which covers
				your stack!
			</p>

			<GuideList guides={data.guides} />
		</section>

		<PackageCount count={data.esm_package_count} />
	</div>

	<div class="container bleed">
		<section aria-labelledby="frameworks">
			<h2 id="frameworks">Frameworks</h2>

			<p class="section-intro">Whether the frameworks you already use publish ES modules on npm.</p>

			<Frameworks frameworks={data.frameworks} />
		</section>
	</div>

	<div class="container bleed">
		<footer>
			<a href="https://e18e.dev" target="_blank" rel="noopener noreferrer">powered by e18e.dev</a>
		</footer>
	</div>
</main>

<style>
	.page {
		min-height: 100vh;
		padding: 6rem 0 4rem;
		box-sizing: border-box;
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
		font-size: min(3rem, 9cqi);
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin: 0;
	}

	.highlight {
		background: linear-gradient(var(--accent-tint), var(--accent-tint)) no-repeat;
		background-size: 100% 0.4em;
		background-position: 0 88%;
		box-decoration-break: clone;
	}

	.intro {
		margin: 1.5rem 0 0;
		font-size: 1.0625rem;
		line-height: 1.7;
		color: var(--muted);
	}

	.jump {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1.5rem 0 0;
	}

	.jump a {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		line-height: 1;
		padding: 0.6rem 0.9rem;
		color: var(--text);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 6px;
		text-decoration: none;
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	.jump a:first-child {
		box-shadow: inset 0 -0.18em var(--accent-tint);
	}

	.jump a:hover {
		border-color: var(--border-strong);
		background: var(--accent-tint);
	}

	section {
		margin-top: 4rem;
	}

	h2 {
		font-family: var(--font-mono);
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		margin: 0 0 1rem;
		scroll-margin-top: 2rem;
	}

	section p {
		margin: 0 0 1rem;
		font-size: 1rem;
		line-height: 1.7;
		color: var(--muted);
	}

	.section-intro {
		margin-bottom: 1.5rem;
	}

	footer {
		margin-top: 5rem;
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
