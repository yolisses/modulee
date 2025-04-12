export function createMockRandom(sequence: number[]): () => number {
	let counter = 0;
	return () => {
		const value = sequence[counter % sequence.length];
		counter++;
		return value;
	};
}
