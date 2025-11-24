<script>
	import { page } from '$app/state';
	import { Menu } from '$components/ui/organisms/menu';
	import faviconSVG from '$lib/assets/favicon.svg';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import '../app.css';
	import '@fontsource-variable/oswald';
	import '@fontsource-variable/raleway';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={faviconSVG} type="image/svg+xml" />
</svelte:head>

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>

<header>
	<Menu />
</header>

{@render children?.()}
