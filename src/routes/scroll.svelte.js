/**
 * @param {number} initial
 */
const createScrollStore = (initial) => {
	let scrollPercentage = $state(initial);

	return {
		get scrollPercentage() {
			return scrollPercentage;
		},
		set scrollPercentage(newPercentage) {
			scrollPercentage = newPercentage;
		}
	};
};

const scrollStore = createScrollStore(0);

export { scrollStore };
