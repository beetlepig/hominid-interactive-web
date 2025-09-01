<script>
	import favicon from '$lib/assets/favicon.png';
	import '../app.css';
	import Menu from '../components/organisms/Menu.svelte';
	import '@fontsource-variable/oswald';
	import '@fontsource-variable/raleway';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Menu />

{@render children?.()}
