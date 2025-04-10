import { describe, expect, test, vi } from 'vitest';
import { generateRandomUsername } from './generateRandomUsername';

describe('generateRandomUsername', () => {
	const mockRandom = vi.fn();

	test('generates expected pattern', () => {
		mockRandom
			.mockReturnValueOnce(0.25) // adjective index 1
			.mockReturnValueOnce(0.75) // noun index 3
			.mockReturnValueOnce(0.5); // number 500

		const username = generateRandomUsername(mockRandom);
		expect(username).toBe('sunny_dolphin_500');
	});
});
