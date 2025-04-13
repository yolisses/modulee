/**
 * Generate a username variation based on attempt number
 */
export function generateVariation(
	baseUsername: string,
	attempt: number,
	getRandom: () => number,
): string {
	// Different strategies based on attempt number
	if (attempt <= 5) {
		return `${baseUsername}_${attempt}`;
	}

	if (attempt <= 15) {
		const randomNum = Math.floor(getRandom() * 90) + 10;
		return `${baseUsername}_${randomNum}`;
	}

	if (attempt <= 30) {
		const suffixes = ['real', 'official', 'true', 'only', 'one'];
		const suffix = suffixes[Math.floor(getRandom() * suffixes.length)];
		return `${baseUsername}_${suffix}`;
	}

	const randomString = Math.floor(getRandom() * 36 ** 4).toString(36);
	return `${baseUsername}_${randomString}`;
}
