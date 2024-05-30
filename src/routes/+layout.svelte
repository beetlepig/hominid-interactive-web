<script>
	import '../app.css';

	import * as styles from './styles';

	import Scene from './Scene.svelte';
	import { Canvas } from '@threlte/core';
</script>

<main class={styles.mainStyle}>
	<div class={styles.canvasAndSlotBoxStyle}>
		<div class={styles.canvasBoxStyle}>
			<Canvas colorSpace="display-p3" useLegacyLights={false}>
				<Scene />
			</Canvas>
		</div>

		<slot />
	</div>
</main>
