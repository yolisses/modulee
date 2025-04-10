import type { RandomFn } from './RandomFn';

// Configuration type

export interface UsernameGeneratorConfig {
	random: RandomFn;
	maxAttempts?: number;
}
