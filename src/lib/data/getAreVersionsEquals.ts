import type { Version } from '$lib/module/externalModule/Version';

export function getAreVersionsEquals(version1: Version, version2: Version) {
	return (
		version1.major === version2.major &&
		version1.minor === version2.minor &&
		version1.patch === version2.patch
	);
}
