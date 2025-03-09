import { getGraphContext } from '$lib/data/graphContext';
import { getEditorContext } from '$lib/editor/editorContext';
import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
import { getIsMutedContext } from '$lib/engine/isMutedContexts';
import { getGraphRegistryContext } from '$lib/graph/graphRegistryContext';
import { getGroupIdContext } from '$lib/group/groupIdContext';
import { getProjectDataContext } from '$lib/project/projectDataContext';
import { getIsSidebarVisibleContext } from '$lib/sidebar/isSidebarVisibleContext';
import { getZoomContext } from '$lib/space/zoom/zoomContext';
import { getSelectedNodeIdsContext } from '../../../../nodes-editor/dist/selection/selectedNodeIdsContext';
import { defaultShortcuts } from './defaultShortcuts';

// TODO find a better and shorter name for it
export class Contexts {
	shortcuts = defaultShortcuts;
	zoomContext = getZoomContext();
	graphContext = getGraphContext();
	editorContext = getEditorContext();
	groupIdContext = getGroupIdContext();
	isMutedContext = getIsMutedContext();
	graphRegistryContext = getGraphRegistryContext();
	projectDataContext = getProjectDataContext();
	audioBackendContext = getAudioBackendContext();
	selectedNodeIdsContext = getSelectedNodeIdsContext();
	isSidebarVisibleContext = getIsSidebarVisibleContext();
}
