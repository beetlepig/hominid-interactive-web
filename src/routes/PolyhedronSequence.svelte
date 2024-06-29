<script>
	import { Sequence } from '@threlte/theatre';
	import { polyhedronSequence } from '$lib';

	/**
	 * @type {{[key: symbol]: [number, number]}}
	 */
	const rangeByFrequency = {
		[polyhedronSequence.Enter]: [0, 1],
		[polyhedronSequence.Idle]: [1, 6],
		[polyhedronSequence.Exit]: [6, 7]
	};

	/**
	 * @type {number}
	 */
	let position = $state(0);

	/**
	 * @type {((opts?: {}) => Promise<boolean>) | undefined}
	 */
	let play = $state();

	/**
	 * @type {{ currentObjectSequence: symbol }}
	 */
	let { currentObjectSequence = $bindable(polyhedronSequence.Idle) } = $props();
</script>

<Sequence
	bind:position
	bind:play
	range={rangeByFrequency[currentObjectSequence]}
	iterationCount={Infinity}
	autoplay
/>
