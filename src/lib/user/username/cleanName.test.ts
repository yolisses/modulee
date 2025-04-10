import { describe, expect, test } from 'vitest';
import { cleanName } from './cleanName';

describe('cleanName', () => {
	test('replaces spaces with underscores', () => {
		expect(cleanName('John Doe')).toBe('john_doe');
	});

	test('removes special characters', () => {
		expect(cleanName('Jöhn Dœ!')).toBe('jhn_d');
	});

	test('collapses multiple spaces', () => {
		expect(cleanName('John   Doe')).toBe('john_doe');
	});
});
