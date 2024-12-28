import type { Converter } from "./converter";
import type { Vector } from "./vector";

export class OffsetConverter implements Converter {
    constructor(private offset: Vector) { }

    getScreenPosition(dataPosition: Vector): Vector {
        return {
            x: dataPosition.x + this.offset.x,
            y: dataPosition.y + this.offset.y,
        }
    }

    getDataPosition(screenPosition: Vector): Vector {
        return {
            x: screenPosition.x - this.offset.x,
            y: screenPosition.y - this.offset.y,
        }
    }
}