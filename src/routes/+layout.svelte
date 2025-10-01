<script>
	import { Menu } from '$components/ui/organisms/menu';
	import faviconSVG from '$lib/assets/favicon.svg';
	import '../app.css';
	import '@fontsource-variable/oswald';
	import '@fontsource-variable/raleway';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={faviconSVG} type="image/svg+xml" />
</svelte:head>

<Menu />

{@render children?.()}
