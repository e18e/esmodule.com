<script lang="ts">
	import '@fontsource/iosevka/400.css';
	import '@fontsource/iosevka/500.css';
	import '@fontsource/iosevka/700.css';
	import favicon from '$lib/assets/favicon.svg';
	import Controls from '$lib/Controls.svelte';
	import './global.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="esmodule.com" />
</svelte:head>

<Controls />

{@render children()}
