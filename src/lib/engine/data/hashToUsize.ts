// FNV-1a hash algorithm
export function hashToUsize(string: string): number {
	const FNV_PRIME = 16777619;
	const OFFSET_BASIS = 2166136261;
	let hash = OFFSET_BASIS;

	for (let i = 0; i < string.length; i++) {
		hash ^= string.charCodeAt(i);
		hash *= FNV_PRIME;
		hash >>>= 0; // Ensure the hash is a 32-bit unsigned integer
	}

	return hash;
}
