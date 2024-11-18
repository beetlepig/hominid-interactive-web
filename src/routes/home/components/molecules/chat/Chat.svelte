<script>
	import { css } from 'styled-system/css';
	import { sections } from '$lib/constans';
	import { inView } from 'motion';

	/** @type {{ onVisible: () => void }} */
	let { onVisible } = $props();

	/** @type {HTMLElement | null} */
	let chatContainerRef = $state(null);

	$effect(() => {
		if (chatContainerRef) {
			const stop = inView(
				chatContainerRef,
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
	id={sections.chat.id}
	class={css({ height: '[100vh]', bgColor: 'indigo.950/50' })}
	bind:this={chatContainerRef}
>
	<p>chat</p>
</div>
