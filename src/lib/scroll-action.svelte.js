/** @import { Action } from 'svelte/action' */

import { mapNumRange } from '$lib/map-num-range';

/**
 * @description Check if the element has a scroll and it is visible.
 * @param { HTMLElement } ele - The target node.
 * @returns { boolean } Indicates if the element has a scroll.
 */
const isScrollable = (ele) => {
	const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

	const overflowYStyle = window.getComputedStyle(ele).overflowY;
	const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

	return hasScrollableContent && !isOverflowHidden;
};
/**
 * @description Get the first scrollable parent node.
 * @param { HTMLElement | null } ele - The target node.
 * @returns { HTMLElement } The closest scrollable parent.
 */
const getScrollableParent = (ele) => {
	return !ele || ele === document.body
		? document.body
		: isScrollable(ele)
			? ele
			: getScrollableParent(ele.parentElement);
};

/**
 * @description Get the first scrollable parent node.
 * @param { HTMLElement } target - The target node.
 * @returns { number } The scroll y percentage, between 0 and 1.
 */
const calculateScrollProgress = (target) => {
	const rect = target.getBoundingClientRect();

	return Math.max(0, Math.min(1, mapNumRange(rect.bottom, 0, rect.height, 1, 0)));
};

/**
 * @typedef {(event: CustomEvent<{scrollYProgress: number}>) => void} ScrollYProgressEventType
 */

/**
 * @description Action to calculate the scrollYProgress of the selected target.
 * @type { Action<HTMLElement, undefined, {scrollprogress: ScrollYProgressEventType}> }
 */
const scrollAction = (node) => {
	const handleScroll = () => {
		node.dispatchEvent(
			new CustomEvent('scrollprogress', {
				detail: { scrollYProgress: calculateScrollProgress(node) }
			})
		);
	};

	$effect(() => {
		const container = getScrollableParent(node);
		container.addEventListener('scroll', handleScroll);

		return () => {
			container.removeEventListener('scroll', handleScroll);
		};
	});
};

export { scrollAction };
