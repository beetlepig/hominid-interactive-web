import { css } from 'styled-system/css';
import { container } from 'styled-system/patterns';

const mainStyle = container({ pt: '[10svh]' });
const canvasAndSlotBoxStyle = css({
	pointerEvents: 'none',
	pos: 'relative',
	z: '20',
	h: '[500vh]'
});
const canvasBoxStyle = css({
	pos: 'fixed',
	left: '0',
	top: '0',
	z: '10',
	h: '[100lvh]',
	w: 'screen'
});

export { mainStyle, canvasAndSlotBoxStyle, canvasBoxStyle };
