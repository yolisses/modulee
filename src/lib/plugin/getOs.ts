import { UAParser } from 'ua-parser-js';

export function getOs(): Os | null {
	const parser = new UAParser();
	const result = parser.getOS();

	if (!result.name) return null;

	const osString = result.name.toLowerCase();

	if (osString.includes('windows')) return 'windows';
	if (osString.includes('mac')) return 'mac';
	if (
		osString.includes('linux') ||
		osString.includes('ubuntu') ||
		osString.includes('centos') ||
		osString.includes('fedora') ||
		osString.includes('debian') ||
		osString.includes('redhat') ||
		osString.includes('mint') ||
		osString.includes('suse') ||
		osString.includes('manjaro')
	)
		return 'linux';

	return null;
}
