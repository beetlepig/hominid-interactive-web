<script>
	import '../app.css';

	import { css } from 'styled-system/css';
</script>

<main class={css({ h: '[100lvh]' })}>
	<slot />
</main>
