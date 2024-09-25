<script>
	import { css } from 'styled-system/css';
	import { onDestroy, onMount } from 'svelte';

	/**
	 * @type {HTMLDivElement}
	 */
	let sectionRef;

	/** @type {IntersectionObserver} */
	let interceptionObserver;

	/** @type {IntersectionObserverCallback} */
	function onVisible(entries) {
		console.log('ddd', entries);
	}

	onMount(() => {
		interceptionObserver = new IntersectionObserver(onVisible, {
			root: null,
			threshold: [0, 0.25, 0.5, 0.75, 1]
		});

		interceptionObserver.observe(sectionRef);
	});

	onDestroy(() => {
		interceptionObserver.disconnect();
	});
</script>

<div bind:this={sectionRef} class={css({ padding: '32' })}>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae scelerisque erat.
		Phasellus ex metus, volutpat et varius eget, pellentesque quis quam. Suspendisse sed blandit
		arcu. Nullam nec elit fringilla, sollicitudin massa eu, auctor lorem. Morbi vitae imperdiet leo.
		Duis mollis metus imperdiet dui placerat, non consequat risus malesuada. Cras commodo sapien
		vitae ultricies interdum. Phasellus accumsan lacus vitae odio elementum mattis eu a orci.
	</p>
</div>
