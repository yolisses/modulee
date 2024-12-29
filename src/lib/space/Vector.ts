import type { VectorData } from './VectorData';

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

	static fromData(vectorData: VectorData) {
		return new Vector(vectorData.x, vectorData.y);
	}

	getData(): VectorData {
		return { x: this.x, y: this.y };
	}

	clone() {
		return new Vector(this.x, this.y);
	}

	negate() {
		return new Vector(-this.x, -this.y);
	}

	round() {
		return new Vector(Math.round(this.x), Math.round(this.y));
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
