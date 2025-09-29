export class OscilloscopeBuffer {
	public accumulator: number = 0;
	public buffer: number[] = $state([]);
	public ratio: number = 1;
	public tail: number = 0;

	constructor(public size: number) {
		this.buffer = new Array(size);
	}

	push(item: number): void {
		this.accumulator += this.ratio;

		while (this.accumulator >= 1) {
			this.buffer[this.tail] = item;
			this.tail = (this.tail + 1) % this.size;
			this.accumulator = this.accumulator - 1;
		}
	}
}
