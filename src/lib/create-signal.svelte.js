/**
 * @template T
 * @param {T} initial - the initial value
 * @returns {[() => T, (newScrollPercentage: T) => void]} return signal's getter and setter
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
