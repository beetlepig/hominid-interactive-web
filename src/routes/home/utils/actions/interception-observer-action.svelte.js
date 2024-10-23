/** @import { Action } from 'svelte/action' */

/**
 * @description A closure function used to set up interception observer callbacks.
 * @param {() => void} interceptedCallback - A callback indicating when an interception happens.
 * @param {IntersectionObserverCallback} [intersectionObserverCallback] - A regular interception observer callback, used to listen to the raw entries.
 * @returns {IntersectionObserverCallback} IntersectionObserverCallback
 */
const handleInterception = (interceptedCallback, intersectionObserverCallback) => {
	return (entries, observer) => {
		const intercepted = entries.some((entry) => entry.isIntersecting);
		intersectionObserverCallback?.(entries, observer);

		if (intercepted) {
			interceptedCallback();
		}
	};
};

/**
 * @typedef {Object} InterceptionObserverActionParams
 * @property {() => void} onIntercepted
 * @property {number[]} threshold
 * @property {IntersectionObserverCallback} [intersectionObserverCallback]
 */

/**
 * @description Action to listen to the interception of the current element against root.
 * @type {Action<HTMLElement, InterceptionObserverActionParams>}
 * @param {HTMLElement} node - Node Element.
 * @param {InterceptionObserverActionParams} params - Action Params.
 */
const interceptionObserverAction = (
	node,
	{ onIntercepted, intersectionObserverCallback, threshold }
) => {
	$effect(() => {
		let interceptionObserver = new IntersectionObserver(
			handleInterception(onIntercepted, intersectionObserverCallback),
			{
				root: null,
				threshold: threshold
			}
		);

		interceptionObserver.observe(node);

		return () => {
			console.log('remove observer');
			interceptionObserver.disconnect();
		};
	});
};

export { interceptionObserverAction };
