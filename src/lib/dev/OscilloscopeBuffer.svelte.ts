export class OscilloscopeBuffer {
	public accumulator: number = 0;
	public buffer: number[] = $state([]);
	public ratio: number = 1;
	public size: number = 0;
	public tail: number = 0;

	push(item: number): void {
		this.accumulator += this.ratio;

		if (this.accumulator >= 1) {
			this.buffer[this.tail] = item;
			this.tail = (this.tail + 1) % this.size;
			this.accumulator = this.accumulator - Math.floor(this.accumulator);
		}
	}

	setSize(size: number) {
		this.size = size;
		this.buffer = this.buffer.slice(-this.size);
	}
}
