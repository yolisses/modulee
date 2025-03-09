import type { GraphDataV2 } from '$lib/data/GraphDataV2';

/**
 * The probable next format of project data. This was created instead of simply
 * editing the ProjectData because the scope is not so defined, and it may not
 * worth reimplementing all the dependent pieces of code.
 */
export type ProjectDataV2 = {
	id: string;
	name: string;
	graphDataV2: GraphDataV2;
};
