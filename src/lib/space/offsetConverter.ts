import type { Converter } from './converter';
import type { Vector } from './vector';

export class OffsetConverter implements Converter {
	constructor(private offset: Vector) {}

	getScreenPosition(dataPosition: Vector): Vector {
		return dataPosition.add(this.offset);
	}

	getDataPosition(screenPosition: Vector): Vector {
		return screenPosition.subtract(this.offset);
	}
}
