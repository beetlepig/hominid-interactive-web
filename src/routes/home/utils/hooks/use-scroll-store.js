import { createSignal } from '$lib';

const scrollStore = createSignal(0);
const useScrollStore = () => scrollStore;

export { useScrollStore };
