export class Vector {
	constructor(
		public x: number,
		public y: number,
	) {
		Object.freeze(this);
	}

	static zero() {
		return new Vector(0, 0);
	}

	static one() {
		return new Vector(1, 1);
	}

	static fromNumber(number: number) {
		return new Vector(number, number);
	}

	clone() {
		return new Vector(this.x, this.y);
	}

	add(vector: Vector) {
		return new Vector(this.x + vector.x, this.y + vector.y);
	}

	subtract(vector: Vector) {
		return new Vector(this.x - vector.x, this.y - vector.y);
	}

	multiply(vector: Vector) {
		return new Vector(this.x * vector.x, this.y * vector.y);
	}

	divide(vector: Vector) {
		return new Vector(this.x / vector.x, this.y / vector.y);
	}
}
