import { Vector } from 'nodes-editor';
import type { Converter } from './Converter.js';

export class Space {
	constructor(private converters: Converter[] = []) {}

	getScreenPosition(dataPosition: Vector): Vector {
		let screenPosition = dataPosition;
		this.converters.forEach((converter) => {
			screenPosition = converter.getScreenPosition(screenPosition);
		});
		return screenPosition;
	}

	getDataPosition(screenPosition: Vector): Vector {
		let dataPosition = screenPosition;
		this.converters.toReversed().forEach((converter) => {
			dataPosition = converter.getDataPosition(dataPosition);
		});
		return dataPosition;
	}

	// For now, size conversions are equal to position convertions.
	// This can change in the future due to limitations like
	// positive-only sizes in screen. Therefore, these are separate
	// functions.

	getScreenSize(dataSize: Vector): Vector {
		const screenZero = this.getScreenPosition(Vector.zero());
		return this.getScreenPosition(dataSize).subtract(screenZero);
	}

	getDataSize(screenSize: Vector): Vector {
		const dataZero = this.getDataPosition(Vector.zero());
		return this.getDataPosition(screenSize).add(dataZero);
	}
}
