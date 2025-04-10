import type { UsernameGeneratorConfig } from './UsernameGeneratorConfig';
import { cleanName } from './cleanName';
import { generateRandomUsername } from './generateRandomUsername';
import { generateVariation } from './generateVariation';

/**
 * Main username generator function
 */
export async function generateUniqueUsername(
	name: string,
	config: UsernameGeneratorConfig,
	isAvailable: (username: string) => Promise<boolean>,
): Promise<string> {
	const { random, maxAttempts = 100 } = config;
	const baseUsername = cleanName(name);

	// Check if base username is available
	if (await isAvailable(baseUsername)) {
		return baseUsername;
	}

	// Try variations
	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		const variation = generateVariation(baseUsername, attempt, random);
		if (await isAvailable(variation)) {
			return variation;
		}
	}

	// Fallback to random username
	return generateRandomUsername(random);
}
