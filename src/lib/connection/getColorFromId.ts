import { getNumberHash } from './getNumberHash';

const colorOptions = [
	'oklch(63.7% 0.237 25.331)',
	'oklch(70.5% 0.213 47.604)',
	'oklch(76.9% 0.188 70.08)',
	'oklch(79.5% 0.184 86.047)',
	'oklch(76.8% 0.233 130.85)',
	'oklch(72.3% 0.219 149.579)',
	'oklch(72.3% 0.219 149.579)',
	'oklch(69.6% 0.17 162.48)',
	'oklch(70.4% 0.14 182.503)',
	'oklch(71.5% 0.143 215.221)',
	'oklch(68.5% 0.169 237.323)',
	'oklch(62.3% 0.214 259.815)',
	'oklch(58.5% 0.233 277.117)',
	'oklch(60.6% 0.25 292.717)',
	'oklch(62.7% 0.265 303.9)',
	'oklch(66.7% 0.295 322.15)',
	'oklch(65.6% 0.241 354.308)',
	'oklch(64.5% 0.246 16.439)',
];

export function getColorFromId(id: string): string {
	const hash = getNumberHash(id);
	return colorOptions[hash % colorOptions.length];
}
