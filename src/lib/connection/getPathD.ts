import type { Space } from '$lib/space/Space.js';
import { getVectorsString, getVectorString, Vector } from 'nodes-editor';

export function getPathD(screenStartPosition: Vector, screenEndPosition: Vector, space: Space) {
	const dataStartPosition = space.getDataPosition(screenStartPosition);
	const dataEndPosition = space.getDataPosition(screenEndPosition);

	let dataOffsetX = (dataEndPosition.x - dataStartPosition.x) / 2;
	if (dataOffsetX < 0) {
		dataOffsetX *= 2;
	}
	dataOffsetX = Math.abs(dataOffsetX);
	dataOffsetX = Math.min(dataOffsetX, 6);

	const dataPoint0 = new Vector(dataStartPosition.x + dataOffsetX, dataStartPosition.y);
	const dataPoint1 = new Vector(dataEndPosition.x - dataOffsetX, dataEndPosition.y);

	const screenPoint0 = space.getScreenPosition(dataPoint0);
	const screenPoint1 = space.getScreenPosition(dataPoint1);

	return (
		'M' +
		getVectorString(screenStartPosition) +
		'C' +
		getVectorsString([screenPoint0, screenPoint1, screenEndPosition])
	);
}
