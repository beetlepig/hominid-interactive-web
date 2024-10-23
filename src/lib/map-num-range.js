import { clamp } from '$lib/clamp.js';

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
	((clamp(num, inMin, inMax) - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export { mapNumRange };
