/** @import {ClassValue} from 'clsx' */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @template T
 * @typedef {T extends { child?: unknown } ? Omit<T, 'child'> : T} WithoutChild
 */

/**
 * @template T
 * @typedef {T extends { children?: unknown } ? Omit<T, 'children'> : T} WithoutChildren
 */

/**
 * Remove either `child` or `children` (or both) from `T` if they exist.
 *
 * @template T
 * @typedef {WithoutChildren<WithoutChild<T>>} WithoutChildrenOrChild
 */

/**
 * @template T
 * @template {HTMLElement} [U=HTMLElement] Default is `HTMLElement`
 * @typedef {T & { ref?: U | null }} WithElementRef
 */

/**
 * Merge class names with Tailwind merge strategy.
 *
 * @param {...ClassValue} inputs - One or more class values to combine.
 * @returns {string} - The merged class name string.
 */
function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export { cn };
