import type { Converter } from "./converter";
import type { Vector } from "./vector";

export class Space {
    constructor(private converters: Converter[] = []) { }

    getScreenPosition(dataPosition: Vector): Vector {
        let screenPosition = dataPosition
        this.converters.forEach(converter => {
            screenPosition = converter.getScreenPosition(screenPosition)
        })
        return screenPosition
    }

    getDataPosition(screenPosition: Vector): Vector {
        let dataPosition = screenPosition
        this.converters.forEach(converter => {
            dataPosition = converter.getDataPosition(dataPosition)
        })
        return dataPosition
    }

    // For now, size conversions are equal to position convertions. 
    // This can change in the future due to limitations like 
    // positive-only sizes in screen. Therefore, these are separate 
    // functions.

    getScreenSize(dataSize: Vector): Vector {
        return this.getScreenPosition(dataSize)
    }

    getDataSize(screenSize: Vector): Vector {
        return this.getDataPosition(screenSize)
    }
}