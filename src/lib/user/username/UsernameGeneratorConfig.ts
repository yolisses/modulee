// Configuration type

export interface UsernameGeneratorConfig {
	maxAttempts?: number;
	getRandomValue: () => number;
}
