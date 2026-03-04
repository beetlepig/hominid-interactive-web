import { FIRST_CARD_INDEX_KEY, LAST_CARD_INDEX_KEY } from '$components/carousel/contants.js';

/**
 * @param {'back' | 'forward'} type - Scrollable container
 * @param {HTMLElement} carouselRef - Parent container to scroll
 * @param {[number, HTMLElement][]} allItemsRefSorted - Array of items refs
 * @param {{ first: number; last: number }} firstAndLastCard - Array of items refs
 */
export function onClickArrowButton(type, carouselRef, allItemsRefSorted, firstAndLastCard) {
	/**
	 * Scroll parent so child is visible.
	 *
	 * @param {HTMLElement} parent - Scrollable container
	 * @param {HTMLElement} child - Element inside parent to scroll to
	 */
	function scrollParentToChild(parent, child) {
		const parentRect = parent.getBoundingClientRect();
		const childRect = child.getBoundingClientRect();

		const childLeftWithinParent = childRect.left - parentRect.left + parent.scrollLeft;

		let targetScrollLeft;

		targetScrollLeft = childLeftWithinParent - (parent.clientWidth - child.offsetWidth) / 2;

		targetScrollLeft = Math.max(
			0,
			Math.min(targetScrollLeft, parent.scrollWidth - parent.clientWidth)
		);

		parent.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
	}

	const firstCard = firstAndLastCard[FIRST_CARD_INDEX_KEY];
	const lastCard = firstAndLastCard[LAST_CARD_INDEX_KEY];

	switch (type) {
		case 'back': {
			const previousCardRef = allItemsRefSorted[firstCard - 1][1];
			const lastCardRef = allItemsRefSorted[allItemsRefSorted.length - 1][1];

			if (previousCardRef) {
				scrollParentToChild(carouselRef, previousCardRef);
			} else if (lastCardRef) {
				scrollParentToChild(carouselRef, lastCardRef);
			}

			break;
		}
		case 'forward': {
			const nextCardRef = allItemsRefSorted[lastCard + 1][1];
			const firstCardRef = allItemsRefSorted[0][1];

			if (nextCardRef) {
				scrollParentToChild(carouselRef, nextCardRef);
			} else if (firstCardRef) {
				scrollParentToChild(carouselRef, firstCardRef);
			}

			break;
		}
	}
}
