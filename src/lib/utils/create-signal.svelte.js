/**
 * @template T
 * @param {T} initial - The initial value
 * @returns {[() => T, (newScrollPercentage: T) => void]} Return signal's getter and setter
 */
const createSignal = (initial) => {
	let value = $state(initial);

	return [
		() => value,
		(newValue) => {
			value = newValue;
		}
	];
};

export { createSignal };
