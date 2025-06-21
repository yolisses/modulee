export function formatNumber(value: number): string {
	if (isNaN(value)) return 'NaN';

	const abs = Math.abs(value);
	const sign = value < 0 ? '-' : '';

	if (abs === 0) return '0';
	if (abs < 0.001) return `${sign}~0.00`; // e.g., ~0.00 for 0.00005
	if (abs < 0.01) return value.toFixed(3); // e.g., 0.006
	if (abs < 1) return value.toFixed(2); // e.g., 0.75
	if (abs < 1000) return value.toFixed(1); // e.g., 123.4
	if (abs < 1000000) return `${sign}${(abs / 1000).toFixed(1)}K`; // e.g., 12.3K
	if (abs < 1000000000) return `${sign}${(abs / 1000000).toFixed(1)}M`; // e.g., 4.5M
	return `${sign}${(abs / 1000000000).toFixed(1)}B`; // e.g., 2.1B
}
