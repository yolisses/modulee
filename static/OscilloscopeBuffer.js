export class OscilloscopeBuffer {
	accumulator = 0;
	ratio = 1;
	tail = 0;

	constructor(size) {
		this.buffer = new Float32Array(size);
	}

	push(value) {
		this.accumulator += this.ratio;
		while (this.accumulator >= 1) {
			this.buffer[this.tail] = value;
			this.tail = (this.tail + 1) % this.buffer.length;
			this.accumulator = this.accumulator - 1;
		}
	}

	setRatio(ratio) {
		this.ratio = ratio;
	}

	getBuffer() {
		return this.buffer;
	}
}
