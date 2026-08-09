<script lang="ts">
	import { browser } from '$app/environment';
	import { recent_migrations } from '$lib/migrated-projects.remote';
	import { esm_package_count, recent_migration_limit } from '$lib/migrated-projects';

	interface Props {
		count?: number;
	}

	let { count = esm_package_count }: Props = $props();

	const formatted_count = $derived(new Intl.NumberFormat('en').format(count));
	const date_format = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' });

	function format_date(iso: string) {
		return date_format.format(new Date(`${iso}T00:00:00Z`));
	}
</script>

<section class="band" aria-labelledby="esm-count">
	<div class="inner">
		<p class="count">
			<strong id="esm-count">{formatted_count}+</strong>
			<span>npm packages ship ES modules</span>
		</p>

		<h2 class="label">Latest to switch</h2>

		{#if browser}
			{#await recent_migrations()}
				<ul class="packages" aria-busy="true">
					{#each { length: recent_migration_limit }, i (i)}
						<li class="package placeholder"><span class="bar"></span></li>
					{/each}
				</ul>
			{:then packages}
				<ul class="packages">
					{#each packages as pkg (pkg.name)}
						<li class="package">
							<span class="name">{pkg.name}</span>
							<time datetime={pkg.migrated_at}>{format_date(pkg.migrated_at)}</time>
							<span class="links">
								<a href={pkg.npm_url} target="_blank" rel="noopener noreferrer">npm</a>
								{#if pkg.github_url}
									<a href={pkg.github_url} target="_blank" rel="noopener noreferrer">github</a>
								{/if}
							</span>
						</li>
					{/each}
				</ul>
			{:catch}
				<p class="failed">Couldn't load the latest packages just now.</p>
			{/await}
		{/if}
	</div>
</section>

<style>
	.band {
		margin: 4rem 0;
		padding: 3rem 1.5rem;
		background: var(--surface);
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	.inner {
		max-width: var(--width-content);
		margin: 0 auto;
	}

	.count {
		margin: 0 0 2.5rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.35rem;
	}

	.count strong {
		font-family: var(--font-mono);
		font-size: clamp(2.5rem, 8vw, 4rem);
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.03em;
		box-shadow: inset 0 -0.18em var(--accent-tint);
	}

	.count span {
		font-size: 1rem;
		color: var(--muted);
	}

	.label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--subtle-contrast);
		margin: 0 0 0.5rem;
	}

	.packages {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.package {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding: 0.6rem 0;
		border-bottom: 1px solid var(--border);
	}

	.name {
		font-family: var(--font-mono);
		font-size: 0.9375rem;
		color: var(--text);
		overflow-wrap: anywhere;
	}

	time {
		font-size: 0.75rem;
		color: var(--subtle);
		white-space: nowrap;
	}

	.links {
		display: flex;
		gap: 0.75rem;
		margin-left: auto;
	}

	.links a {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--subtle-contrast);
		text-decoration: none;
		border-bottom: 1px solid transparent;
	}

	.links a:hover {
		color: var(--accent-text-hover);
		border-bottom-color: currentColor;
	}

	.placeholder .bar {
		display: block;
		width: 40%;
		height: 0.9375rem;
		border-radius: 3px;
		background: var(--border);
		opacity: 0.6;
	}

	.failed {
		margin: 0.75rem 0 0;
		font-size: 0.875rem;
		color: var(--muted);
	}
</style>
