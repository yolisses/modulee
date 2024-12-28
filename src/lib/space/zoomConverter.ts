import type { Converter } from "./converter";
import type { Vector } from "./vector";

export class ZoomConverter implements Converter {
    constructor(private zoom: number) { }

    getScreenPosition(dataPosition: Vector): Vector {
        return {
            x: dataPosition.x * this.zoom,
            y: dataPosition.y * this.zoom,
        }
    }

    getDataPosition(screenPosition: Vector): Vector {
        return {
            x: screenPosition.x / this.zoom,
            y: screenPosition.y / this.zoom,
        }
    }
}