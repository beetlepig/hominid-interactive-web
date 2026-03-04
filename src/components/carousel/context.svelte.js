import { FIRST_CARD_INDEX_KEY, LAST_CARD_INDEX_KEY } from './contants.js';
import { SvelteMap } from 'svelte/reactivity';

export let carouselState = $state({
	/** @type {HTMLElement | null} */
	carouselRef: null,
	/** @type {SvelteMap<number, HTMLElement>} */
	allItemsRef: new SvelteMap()
});

export const firstAndLastCard = $state({
	[FIRST_CARD_INDEX_KEY]: 0,
	[LAST_CARD_INDEX_KEY]: 0
});
