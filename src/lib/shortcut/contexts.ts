import type { GraphContext } from '$lib/data/graphContext';
import type { EditorContext } from '$lib/editor/editorContext';
import type { GraphDataContext } from '$lib/graph/graphDataContext';
import type { GroupIdContext } from '$lib/group/groupIdContext';
import type { ProjectDataContext } from '$lib/project/projectDataContext';
import type { ZoomContext } from '$lib/space/zoom/zoomContext';
import type { SelectedNodeIdsContext } from '../../../../nodes-editor/dist/selection/selectedNodeIdsContext';

export type Contexts = {
	zoomContext: ZoomContext;
	graphContext: GraphContext;
	editorContext: EditorContext;
	groupIdContext: GroupIdContext;
	graphDataContext: GraphDataContext;
	projectDataContext: ProjectDataContext;
	selectedNodeIdsContext: SelectedNodeIdsContext;
};

// TODO fix SelectedNodeIdsContext import
