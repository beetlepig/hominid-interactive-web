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

/**
 * Maps a number from one range to another.
 *
 * @param {number} num - The number to map.
 * @param {number} inMin - The lower bound of the input range.
 * @param {number} inMax - The upper bound of the input range.
 * @param {number} outMin - The lower bound of the output range.
 * @param {number} outMax - The upper bound of the output range.
 * @returns {number} The mapped number in the output range.
 */
const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
	((clamp(num, inMin, inMax) - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export { clamp, mapNumRange };
