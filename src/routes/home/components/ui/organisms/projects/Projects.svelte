<script>
	/** @import {Snippet} from "svelte" */
	import CarouselButtonNext from '$components/carousel/carousel-button-next.svelte';
	import CarouselButtonPrevious from '$components/carousel/carousel-button-previous.svelte';
	import CarouselItem from '$components/carousel/carousel-item.svelte';
	import Carousel from '$components/carousel/carousel.svelte';
	import { sections } from '$lib/constans/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import { projectsArray } from './projectsData.svelte';
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
				{ amount: 0.5 }
			);

			return () => {
				stop();
			};
		}
	});
</script>

<section id={sections.projects.id} class="flex min-h-dvh flex-col justify-center bg-gray-50 py-20">
	<div bind:this={projectsContainerRef} class="space-y-10">
		<h2 class="text-center font-raleway text-6xl font-black md:text-8xl">
			{m.projects_title()}
		</h2>
		<Carousel>
			{#snippet content()}
				{#each projectsArray as project, i (i)}
					<CarouselItem>{@render project()}</CarouselItem>
				{/each}
			{/snippet}
			{#snippet buttons()}
				<CarouselButtonPrevious />
				<CarouselButtonNext />
			{/snippet}
		</Carousel>
	</div>
</section>
