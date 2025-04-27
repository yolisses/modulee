import { describe, expect, it } from 'vitest';
import { formatNumber } from './formatNumber'; // Adjust path as needed

describe('formatNumber', () => {
	it('handles zero', () => {
		expect(formatNumber(0)).toBe('0');
	});

	it('handles very small numbers (< 0.001)', () => {
		expect(formatNumber(0.00005)).toBe('~0.00');
		expect(formatNumber(-0.000123)).toBe('-~0.00');
		expect(formatNumber(0.000999)).toBe('~0.00');
	});

	it('handles small decimals (< 0.01)', () => {
		expect(formatNumber(0.005678)).toBe('0.006');
		expect(formatNumber(-0.00789)).toBe('-0.008');
	});

	it('handles decimals (< 1)', () => {
		expect(formatNumber(0.75)).toBe('0.75');
		expect(formatNumber(-0.123)).toBe('-0.12');
	});

	it('handles small integers (< 1000)', () => {
		expect(formatNumber(123.456)).toBe('123.5');
		expect(formatNumber(-999.99)).toBe('-1000.0');
	});

	it('handles thousands (< 1,000,000)', () => {
		expect(formatNumber(12345)).toBe('12.3K');
		expect(formatNumber(-98765.432)).toBe('-98.8K');
	});

	it('handles millions (< 1,000,000,000)', () => {
		expect(formatNumber(4500000)).toBe('4.5M');
		expect(formatNumber(-123456789)).toBe('-123.5M');
	});

	it('handles billions (>= 1,000,000,000)', () => {
		expect(formatNumber(2100000000)).toBe('2.1B');
		expect(formatNumber(-9876543210)).toBe('-9.9B');
	});

	it('handles edge cases', () => {
		expect(formatNumber(0.00999)).toBe('0.010'); // Just below 0.01
		expect(formatNumber(999.999)).toBe('1000.0'); // Just below 1000
		expect(formatNumber(999999.999)).toBe('1000.0K'); // Just below 1M
		expect(formatNumber(999999999.999)).toBe('1000.0M'); // Just below 1B
	});
});
