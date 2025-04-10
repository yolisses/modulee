import { beforeEach, describe, expect, test, vi } from 'vitest';
import { generateVariation } from './generateVariation';

describe('generateVariation', () => {
	const mockRandom = vi.fn();

	beforeEach(() => {
		mockRandom.mockClear();
	});

	test('adds sequential numbers for early attempts', () => {
		mockRandom.mockReturnValue(0.5);
		expect(generateVariation('john_doe', 1, mockRandom)).toBe('john_doe_1');
		expect(generateVariation('john_doe', 3, mockRandom)).toBe('john_doe_3');
	});

	test('adds random numbers for mid attempts', () => {
		mockRandom.mockReturnValue(0.5); // 0.5 * 90 + 10 = 55
		expect(generateVariation('john_doe', 6, mockRandom)).toBe('john_doe_55');
	});

	test('adds suffixes for later attempts', () => {
		mockRandom.mockReturnValue(0.2); // 0.2 * 5 = index 1 ('official')
		expect(generateVariation('john_doe', 20, mockRandom)).toBe('john_doe_official');
	});
});
