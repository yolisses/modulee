export class Vector {
    constructor(
        public x: number,
        public y: number
    ) { }

    static one() {
        return new Vector(1, 1)
    }
}