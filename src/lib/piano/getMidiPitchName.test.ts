import { describe, expect, test } from 'vitest';
import { getMidiPitchName } from './getMidiPitchName';

describe('getMidiPitchName', () => {
	test('returns C4 for MIDI note 60', () => {
		expect(getMidiPitchName(60)).toBe('C4');
	});

	test('returns C-1 for MIDI note 0', () => {
		expect(getMidiPitchName(0)).toBe('C-1');
	});

	test('returns G9 for MIDI note 127', () => {
		expect(getMidiPitchName(127)).toBe('G9');
	});

	test('returns A#4 for MIDI note 70', () => {
		expect(getMidiPitchName(70)).toBe('A#4');
	});

	test('returns F#4 for MIDI note 66', () => {
		expect(getMidiPitchName(66)).toBe('F#4');
	});
});
