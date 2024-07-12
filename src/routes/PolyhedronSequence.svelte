<script context="module">
	/**
	 * @typedef {keyof PolyhedronSequenceEnum} PolyhedronSequenceEnumType
	 */
	const PolyhedronSequenceEnum = Object.freeze({
		EnterPyramid: 'EnterPyramid',
		IdlePyramid: 'IdlePyramid',
		ExitPyramid: 'ExitPyramid'
	});

	/**
	 * @type {{[key in PolyhedronSequenceEnumType]: [number, number, number]}}
	 */
	const rangeByFrequency = {
		[PolyhedronSequenceEnum.EnterPyramid]: [0, 1, 1],
		[PolyhedronSequenceEnum.IdlePyramid]: [1, 6, Infinity],
		[PolyhedronSequenceEnum.ExitPyramid]: [6, 7.5, 1]
	};

	export { PolyhedronSequenceEnum };
</script>

<script>
	import { Sequence } from '@threlte/theatre';

	/**
	 * @type {{ targetObjectSequence: PolyhedronSequenceEnumType }}
	 */
	const { targetObjectSequence = $bindable() } = $props();

	/**
	 * @type {((opts?: {}) => Promise<boolean>) | undefined}
	 */
	let play = $state();

	/**
	 * @type {number | undefined}
	 */
	let position = $state();

	/**
	 * @type {number}
	 */
	let iterationCount = $state(Infinity);

	/**
	 * @type {PolyhedronSequenceEnumType}
	 */
	let currentObjectSequence = $state(targetObjectSequence);

	const currentRange = $derived(rangeByFrequency[currentObjectSequence]);
	/**
	 * @type {[number, number]}
	 */
	const currentAnimationRange = $derived([currentRange[0], currentRange[1]]);

	$effect(() => {
		iterationCount = currentRange[2];
	});

	$effect(() => {
		if (targetObjectSequence !== currentObjectSequence) {
			iterationCount = 1;
			if (currentRange[1] === position) {
				currentObjectSequence = targetObjectSequence;
				play?.();
			}
		}
	});
</script>

<Sequence bind:position bind:play range={currentAnimationRange} {iterationCount} autoplay />
