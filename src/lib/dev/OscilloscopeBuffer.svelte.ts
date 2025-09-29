export class OscilloscopeBuffer {
	public accumulator: number = 0;
	public buffer: number[] = $state([]);
	public ratio: number = 1;
	public size: number = 0;
	public tail: number = 0;

	push(item: number): void {
		this.buffer[this.tail] = item;
		this.tail = (this.tail + 1) % this.size;
	}

	setSize(size: number) {
		this.size = size;
		this.buffer = this.buffer.slice(-this.size);
	}
}
