<script lang="ts">
	interface Props {
		count: number;
	}

	let { count }: Props = $props();

	const formatted = $derived(new Intl.NumberFormat('en').format(count));
</script>

<p class="count">
	<strong>{formatted}+</strong>
	<span>npm packages publish ES modules</span>
</p>

<style>
	.count {
		margin: 4rem 0 0;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.25rem 0.75rem;
	}

	strong {
		font-family: var(--font-mono);
		font-size: clamp(2.25rem, 7vw, 3rem);
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.03em;
		box-shadow: inset 0 -0.18em var(--accent-tint);
	}

	span {
		font-size: 1.0625rem;
		line-height: 1.7;
		color: var(--muted);
	}
</style>
