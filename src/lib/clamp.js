/**
 * Clamps a number within the inclusive range specified by the given minimum and maximum bounds.
 *
 * @param {number} value - The number to be clamped.
 * @param {number} min - The minimum bound.
 * @param {number} max - The maximum bound.
 * @returns {number} - The clamped value, which will be within the range [min, max].
 */
const clamp = (value, min, max) => {
	return Math.min(Math.max(value, min), max);
};

export { clamp };
