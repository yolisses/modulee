import type { Converter } from "./converter";
import type { Vector } from "./vector";

export class Space {
    converters: Converter[] = []

    getScreenPosition(dataPosition: Vector): Vector {
        let screenPosition = structuredClone(dataPosition)
        this.converters.forEach(converter => {
            screenPosition = converter.getScreenPosition(screenPosition)
        })
        return screenPosition
    }

    getDataPosition(screenPosition: Vector): Vector {
        let dataPosition = structuredClone(screenPosition)
        this.converters.forEach(converter => {
            dataPosition = converter.getDataPosition(dataPosition)
        })
        return dataPosition
    }
}