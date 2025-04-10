import type { RandomFn } from './RandomFn';

/**
 * Generate a completely random username as fallback
 */

export function generateRandomUsername(random: RandomFn): string {
	const adjectives = ['happy', 'sunny', 'clever', 'brave'];
	const nouns = ['panda', 'tiger', 'eagle', 'dolphin'];

	const adj = adjectives[Math.floor(random() * adjectives.length)];
	const noun = nouns[Math.floor(random() * nouns.length)];
	const num = Math.floor(random() * 1000);

	return `${adj}_${noun}_${num}`;
}
