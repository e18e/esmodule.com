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
		<header>
			<p class="eyebrow">esmodule.com</p>
			<h1>What are <span class="highlight">ES modules</span>?</h1>
		</header>

		<div class="description">
			<p>TODO</p>
		</div>

		<footer>
			<a href="https://e18e.dev" target="_blank" rel="noopener noreferrer">powered by e18e.dev</a>
		</footer>
	</div>
</main>

<style>
	.page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6rem 1.5rem 3rem;
		box-sizing: border-box;
	}

	.container {
		width: 100%;
		max-width: 40rem;
		container-type: inline-size;
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

	.description {
		margin-top: 2rem;
		padding: 1.5rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-left: 3px solid var(--accent);
		border-radius: 8px;
	}

	.description p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.7;
		color: var(--muted);
	}

	footer {
		margin-top: 2.5rem;
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
