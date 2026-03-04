<script>
	import { FIRST_CARD_INDEX_KEY } from '$components/carousel/contants.js';
	import { carouselState, firstAndLastCard } from '$components/carousel/context.svelte.js';
	import { onClickArrowButton } from '$components/carousel/utils.js';
	import { Button } from '$components/ui/atoms/button';
	import { m } from '$lib/paraglide/messages.js';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';

	const carouselRef = $derived(carouselState.carouselRef);
	const allItemsRef = $derived(
		Array.from(carouselState.allItemsRef).toSorted((a, b) => a[0] - b[0])
	);
</script>

<Button
	variant="default"
	size="icon"
	class="size-16 rounded-full"
	disabled={firstAndLastCard[FIRST_CARD_INDEX_KEY] === 0}
	onclick={() => {
		if (carouselRef && allItemsRef) {
			onClickArrowButton('back', carouselRef, allItemsRef, firstAndLastCard);
		}
	}}
	title={m.button_previous_project()}
>
	<ChevronLeftIcon aria-hidden="true" role="presentation" class="size-8" />
</Button>
