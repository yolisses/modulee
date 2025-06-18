import { getRandomInt } from './getRandomInt';
import { range } from './range';

export function randomRange(min: number, max: number) {
	return range(getRandomInt(min, max));
}
