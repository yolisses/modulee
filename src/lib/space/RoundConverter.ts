import type { Converter } from './Converter';
import type { Vector } from './Vector';

export class RoundConverter implements Converter {
	getScreenPosition(dataPosition: Vector): Vector {
		return dataPosition;
	}

	getDataPosition(screenPosition: Vector): Vector {
		return screenPosition.round();
	}
}
