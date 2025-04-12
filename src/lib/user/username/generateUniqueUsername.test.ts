import { beforeEach, describe, expect, test, vi } from 'vitest';
import { generateUniqueUsername } from './generateUniqueUsername';

describe('generateUniqueUsername', () => {
	const mockRandom = vi.fn();
	const mockIsAvailable = vi.fn();

	beforeEach(() => {
		mockRandom.mockClear();
		mockIsAvailable.mockClear();
	});

	test('returns clean name if available', async () => {
		mockIsAvailable.mockResolvedValue(true);
		const username = await generateUniqueUsername(
			'John Doe',
			{ getRandomValue: mockRandom },
			mockIsAvailable,
		);
		expect(username).toBe('john_doe');
	});

	test('tries variations when base is taken', async () => {
		mockIsAvailable
			.mockResolvedValueOnce(false) // base
			.mockResolvedValueOnce(false) // attempt 1
			.mockResolvedValueOnce(true); // attempt 2

		mockRandom.mockReturnValue(0.5);

		const username = await generateUniqueUsername(
			'John Doe',
			{ getRandomValue: mockRandom },
			mockIsAvailable,
		);
		expect(username).toBe('john_doe_2');
		expect(mockIsAvailable).toHaveBeenCalledTimes(3);
	});

	test('falls back to random username after max attempts', async () => {
		mockIsAvailable.mockResolvedValue(false);
		mockRandom
			.mockReturnValue(0.5) // for variations
			.mockReturnValueOnce(0.25) // adjective
			.mockReturnValueOnce(0.75) // noun
			.mockReturnValueOnce(0.5); // number

		const username = await generateUniqueUsername(
			'John Doe',
			{ getRandomValue: mockRandom, maxAttempts: 2 },
			mockIsAvailable,
		);
		expect(username).toBe('sunny_dolphin_500');
	});
});
