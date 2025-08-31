<script>
	import '../app.css';
	import Menu from '../components/organisms/Menu.svelte';
	import '@fontsource-variable/oswald';
	import '@fontsource-variable/raleway';

	let { children } = $props();
</script>

<Menu />
{@render children()}
