import type { RandomFn } from './RandomFn';

/**
 * Generate a username variation based on attempt number
 */
export function generateVariation(baseUsername: string, attempt: number, random: RandomFn): string {
	// Different strategies based on attempt number
	if (attempt <= 5) {
		return `${baseUsername}_${attempt}`;
	}

	if (attempt <= 15) {
		const randomNum = Math.floor(random() * 90) + 10;
		return `${baseUsername}_${randomNum}`;
	}

	if (attempt <= 30) {
		const suffixes = ['real', 'official', 'true', 'only', 'one'];
		const suffix = suffixes[Math.floor(random() * suffixes.length)];
		return `${baseUsername}_${suffix}`;
	}

	const randomString = Math.floor(random() * 36 ** 4).toString(36);
	return `${baseUsername}_${randomString}`;
}
