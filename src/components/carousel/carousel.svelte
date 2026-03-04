<script>
	/** @import {Snippet} from "svelte" */
	import { carouselState } from '$components/carousel/context.svelte.js';

	/**
	 * @typedef {object} CarouselProps
	 * @property {Snippet} [content] - Slot snippet that renders the carousel content.
	 * @property {Snippet} [buttons] - Slot Snippet that renders the carousel navigation buttons.
	 *   beneath the description.
	 */
	/** @type {CarouselProps} */
	const { content, buttons } = $props();
</script>

<div class="space-y-10">
	<ul
		bind:this={carouselState.carouselRef}
		class="scrollbar-hide grid snap-x snap-mandatory grid-flow-col gap-x-6 overflow-x-scroll px-[calc(50%-min(460px,87.5%)/2)] py-2 md:px-[calc(50%-min(1260px,87.5%)/2)]"
	>
		{@render content?.()}
	</ul>

	<div class="mx-auto flex max-w-7xl justify-end gap-5 px-3">
		{@render buttons?.()}
	</div>
</div>
