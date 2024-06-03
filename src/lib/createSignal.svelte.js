/**
 * @template T
 * @param {T} initial - the initial percentage
 * @returns {[() => T, (newScrollPercentage: T) => void]} return signal's getter and setter
 */
const createSignal = (initial) => {
	let scrollPercentage = $state(initial);

	return [
		() => scrollPercentage,
		(newScrollPercentage) => {
			scrollPercentage = newScrollPercentage;
		}
	];
};

export { createSignal };
