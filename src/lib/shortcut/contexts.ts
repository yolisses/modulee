import type { GraphContext } from '$lib/data/graphContext';
import type { EditorContext } from '$lib/editor/editorContext';
import type { AudioBackendContext } from '$lib/engine/audioBackendContext';
import type { IsMutedContext } from '$lib/engine/isMutedContexts';
import type { GraphDataContext } from '$lib/graph/graphDataContext';
import type { GroupIdContext } from '$lib/group/groupIdContext';
import type { IsLateralBarVisibleContext } from '$lib/lateralBar/isLateralBarVisibleContext';
import type { ProjectDataContext } from '$lib/project/projectDataContext';
import type { ZoomContext } from '$lib/space/zoom/zoomContext';
import type { SelectedNodeIdsContext } from '../../../../nodes-editor/dist/selection/selectedNodeIdsContext';

export type Contexts = {
	zoomContext: ZoomContext;
	graphContext: GraphContext;
	editorContext: EditorContext;
	groupIdContext: GroupIdContext;
	isMutedContext: IsMutedContext;
	graphDataContext: GraphDataContext;
	projectDataContext: ProjectDataContext;
	audioBackendContext: AudioBackendContext;
	selectedNodeIdsContext: SelectedNodeIdsContext;
	isLateralBarVisibleContext: IsLateralBarVisibleContext;
};

// TODO fix SelectedNodeIdsContext import
