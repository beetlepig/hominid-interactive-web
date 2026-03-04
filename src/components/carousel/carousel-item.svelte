<script>
	/** @import {Snippet} from "svelte" */
	import { FIRST_CARD_INDEX_KEY, LAST_CARD_INDEX_KEY } from '$components/carousel/contants.js';
	import { carouselState, firstAndLastCard } from '$components/carousel/context.svelte.js';
	import { inView } from 'motion';

	/**
	 * @typedef {object} CarouselItemProps
	 * @property {Snippet} [children] - Children slot snippet.
	 */
	/** @type {CarouselItemProps} */
	const { children } = $props();

	/** @type {number | null} */
	let currentItemIndex = $state(null);

	/** @type {HTMLElement | null} */
	let itemRef = $state(null);

	const carouselRef = $derived(carouselState.carouselRef);

	const onItemVisible = (/** @type {number} */ projectIndex) => {
		const firstCard = firstAndLastCard[FIRST_CARD_INDEX_KEY];
		const lastCard = firstAndLastCard[LAST_CARD_INDEX_KEY];

		if (projectIndex < firstCard) {
			firstAndLastCard[FIRST_CARD_INDEX_KEY] = projectIndex;
		}

		if (projectIndex > lastCard) {
			firstAndLastCard[LAST_CARD_INDEX_KEY] = projectIndex;
		}
	};
	const onItemHidden = (/** @type {number} */ projectIndex) => {
		const firstCard = firstAndLastCard[FIRST_CARD_INDEX_KEY];
		const lastCard = firstAndLastCard[LAST_CARD_INDEX_KEY];

		if (projectIndex === firstCard) {
			firstAndLastCard[FIRST_CARD_INDEX_KEY] = projectIndex + 1;
		}

		if (projectIndex === lastCard) {
			firstAndLastCard[LAST_CARD_INDEX_KEY] = projectIndex - 1;
		}
	};

	$effect(() => {
		const itemIndex = currentItemIndex;
		const itemReference = itemRef;

		if (itemReference !== null && itemIndex !== null) {
			carouselState.allItemsRef.set(itemIndex, itemReference);

			return () => {
				carouselState.allItemsRef.delete(itemIndex);
			};
		}
	});
	$effect(() => {
		const parent = carouselState.carouselRef;
		const itemReference = itemRef;

		if (parent !== null && itemReference !== null) {
			const items = Array.from(parent.children);
			currentItemIndex = items.findIndex((el) => el === itemReference);
		}
	});
	$effect(() => {
		const carouselReference = carouselRef;
		const itemIndex = currentItemIndex;
		const itemReference = itemRef;

		if (itemReference !== null && carouselReference !== null && itemIndex !== null) {
			const stop = inView(
				itemReference,
				() => {
					onItemVisible(itemIndex);

					return () => {
						onItemHidden(itemIndex);
					};
				},
				{ root: carouselReference, amount: 0.99 }
			);

			return () => {
				stop();
			};
		}
	});
</script>

<li
	bind:this={itemRef}
	class="w-[82vw] snap-center rounded-3xl bg-background p-8 shadow-sm md:w-xl md:p-20"
>
	{@render children?.()}
</li>
