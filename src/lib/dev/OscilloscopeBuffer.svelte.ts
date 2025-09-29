export class OscilloscopeBuffer {
	public buffer: number[] = $state([]);
	public size: number;
	public tail: number = 0;

	constructor(size: number) {
		this.buffer = new Array(size);
		this.size = size;
	}

	push(item: number): void {
		this.buffer[this.tail] = item;
		this.tail = (this.tail + 1) % this.size;
	}

	setSize(size: number) {
		this.size = size;
		this.buffer = this.buffer.slice(-this.size);
	}
}
