import type { Version } from '$lib/module/externalModule/Version';

export function getVersionString(version: Version) {
	const { major, minor, patch } = version;
	return `${major}.${minor}.${patch}`;
}
