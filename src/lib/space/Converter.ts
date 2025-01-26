import type { Vector } from 'nodes-editor';

export interface Converter {
	getScreenPosition(dataPosition: Vector): Vector;
	getDataPosition(screenPosition: Vector): Vector;
}
