<script>
	import '../app.css';
	import '@fontsource-variable/raleway';
	import '@fontsource-variable/oswald';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Menu from '../components/organisms/Menu.svelte';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<Menu />
	{@render children()}
</ParaglideJS>
