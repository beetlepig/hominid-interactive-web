/** @import { Action } from 'svelte/action' */

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

	/**
	 * @description Maps a number from one range to another.
	 * @param { number } num - The number to map.
	 * @param { number } inMin - The lower bound of the input range.
	 * @param { number } inMax - The upper bound of the input range.
	 * @param { number } outMin - The lower bound of the output range.
	 * @param { number } outMax - The upper bound of the output range.
	 * @returns { number } The mapped number in the output range.
	 */
	const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
		((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

	return Math.max(0, Math.min(1, mapNumRange(rect.bottom, 0, rect.height, 1, 0)));
};

/**
 * @description Action to calculate the scrollYProgress of the selected target.
 * @type { Action<HTMLElement> }
 * @param { HTMLElement } node - Node Element.
 */
const scrollAction = (node) => {
	const handleScroll = () => {
		node.dispatchEvent(
			new CustomEvent('emit', {
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
