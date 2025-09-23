import { createSignal } from '$lib/utils';

export const activeNavigationHashState = /** @type {typeof createSignal<string | null>} */ (
	createSignal
)(null);
