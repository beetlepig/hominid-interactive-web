<script>
	import { LAST_CARD_INDEX_KEY } from '$components/carousel/contants.js';
	import { carouselState, firstAndLastCard } from '$components/carousel/context.svelte.js';
	import { onClickArrowButton } from '$components/carousel/utils.js';
	import { Button } from '$components/ui/atoms/button';
	import { m } from '$lib/paraglide/messages.js';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';

	const carouselRef = $derived(carouselState.carouselRef);
	const allItemsRef = $derived(
		Array.from(carouselState.allItemsRef).toSorted((a, b) => a[0] - b[0])
	);
</script>

<Button
	variant="default"
	size="icon"
	class="size-16 rounded-full"
	disabled={firstAndLastCard[LAST_CARD_INDEX_KEY] === allItemsRef[allItemsRef.length - 1]?.[0]}
	onclick={() => {
		if (carouselRef && allItemsRef) {
			onClickArrowButton('forward', carouselRef, allItemsRef, firstAndLastCard);
		}
	}}
	title={m.button_next_project()}
>
	<ChevronRightIcon aria-hidden="true" role="presentation" class="size-8" />
</Button>
