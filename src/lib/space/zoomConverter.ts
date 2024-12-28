import type { Converter } from './converter';
import { Vector } from './vector';

export class ZoomConverter implements Converter {
	constructor(private zoom: number) {}

	getScreenPosition(dataPosition: Vector): Vector {
		return dataPosition.multiply(Vector.fromNumber(this.zoom));
	}

	getDataPosition(screenPosition: Vector): Vector {
		return screenPosition.divide(Vector.fromNumber(this.zoom));
	}
}
