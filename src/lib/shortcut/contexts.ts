import type { GraphDataContext } from '$lib/graph/graphDataContext';
import type { ZoomContext } from '$lib/space/zoom/zoomContext';
import type { SelectedNodeIdsContext } from '../../../../nodes-editor/dist/selection/selectedNodeIdsContext';

export type Contexts = {
	zoomContext: ZoomContext;
	graphDataContext: GraphDataContext;
	selectedNodeIdsContext: SelectedNodeIdsContext;
};

// TODO fix SelectedNodeIdsContext import
