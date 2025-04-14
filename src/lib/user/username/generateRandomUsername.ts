/**
 * Generate a completely random username as fallback
 */
export function generateRandomUsername(getRandomValue: () => number): string {
	const adjectives = [
		'radiant',
		'stellar',
		'azure',
		'noble',
		'vivid',
		'harmonic',
		'luminous',
		'valiant',
		'jade',
		'aurora',
		'zenith',
		'echo',
		'mystic',
		'solar',
		'crimson',
		'ember',
		'sapphire',
		'celestial',
		'iron',
		'whisper',
	];

	const nouns = [
		'phoenix',
		'voyager',
		'summit',
		'aegis',
		'horizon',
		'pioneer',
		'breeze',
		'tide',
		'oracle',
		'falcon',
		'warden',
		'drifter',
		'haven',
		'monarch',
		'ember',
		'rune',
		'aurora',
		'zephyr',
		'cipher',
		'vortex',
	];

	const adj = adjectives[Math.floor(getRandomValue() * adjectives.length)];
	const noun = nouns[Math.floor(getRandomValue() * nouns.length)];
	const num = Math.floor(getRandomValue() * 1000);

	return `${adj}_${noun}_${num}`;
}
