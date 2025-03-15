import { getGraphContext } from '$lib/data/graphContext';
import { getEditorContext } from '$lib/editor/editorContext';
import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
import { getIsMutedContext } from '$lib/engine/isMutedContexts';
import { getGraphRegistryContext } from '$lib/graph/graphRegistryContext';
import { getInternalModuleIdContext } from '$lib/internalModule/internalModuleIdContext';
import { getProjectDataContext } from '$lib/project/projectDataContext';
import { getIsSidebarVisibleContext } from '$lib/sidebar/isSidebarVisibleContext';
import { getSelectedTabContext } from '$lib/sidebar/selectedTabContext';
import { getZoomContext } from '$lib/space/zoom/zoomContext';
import { getSelectedNodeIdsContext } from '../../../../nodes-editor/dist/selection/selectedNodeIdsContext';
import { defaultShortcuts } from './defaultShortcuts';

export class Contexts {
	shortcuts = defaultShortcuts;
	zoomContext = getZoomContext();
	graphContext = getGraphContext();
	editorContext = getEditorContext();
	isMutedContext = getIsMutedContext();
	projectDataContext = getProjectDataContext();
	selectedTabContext = getSelectedTabContext();
	audioBackendContext = getAudioBackendContext();
	graphRegistryContext = getGraphRegistryContext();
	selectedNodeIdsContext = getSelectedNodeIdsContext();
	internalModuleIdContext = getInternalModuleIdContext();
	isSidebarVisibleContext = getIsSidebarVisibleContext();
}
