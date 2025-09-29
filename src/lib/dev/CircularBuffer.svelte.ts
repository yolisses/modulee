export class CircularBuffer {
	public buffer: number[] = $state([]);
	private size: number;
	private tail: number = 0;

	constructor(size: number) {
		this.buffer = new Array(size);
		this.size = size;
	}

	push(item: number): void {
		this.buffer[this.tail] = item;
		this.tail = (this.tail + 1) % this.size;
	}
}
