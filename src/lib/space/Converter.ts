import type { Vector } from './Vector';

export interface Converter {
	getScreenPosition(dataPosition: Vector): Vector;
	getDataPosition(screenPosition: Vector): Vector;
}
