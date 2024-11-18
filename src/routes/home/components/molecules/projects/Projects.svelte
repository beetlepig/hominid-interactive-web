<script>
	import { css } from 'styled-system/css';
	import { sections } from '$lib/constans';
	import { inView } from 'motion';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let projectsContainerRef = $state(null);

	$effect(() => {
		if (projectsContainerRef) {
			const stop = inView(
				projectsContainerRef,
				() => {
					onVisible();

					return () => {};
				},
				{ amount: 0.9 }
			);

			return () => {
				stop();
			};
		}
	});
</script>

<div
	id={sections.projects.id}
	class={css({ height: '[100vh]', bgColor: 'green.200/50' })}
	bind:this={projectsContainerRef}
>
	<p>carrousel</p>
</div>
