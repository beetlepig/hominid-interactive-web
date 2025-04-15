<script>
	import '../app.css';
	import '@fontsource-variable/raleway';
	import '@fontsource-variable/oswald';
	import Menu from '../components/organisms/Menu.svelte';

	let { children } = $props();
</script>

<Menu />
{@render children()}
