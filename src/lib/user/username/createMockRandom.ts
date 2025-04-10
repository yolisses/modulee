export function createMockRandom(sequence: number[]): () => number {
	let counter = 0;
	return () => {
		const value = sequence[counter % sequence.length];
		counter++;
		console.log(`Mock random value: ${value}`); // Debugging line
		return value;
	};
}
