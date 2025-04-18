import { getCopyDataContext } from '$lib/copy/copyDataContext';
import { getGraphContext } from '$lib/data/graphContext';
import { getEditorContext } from '$lib/editor/editorContext';
import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
import { getIsMutedContext } from '$lib/engine/isMutedContexts';
import { getGraphRegistryContext } from '$lib/graph/graphRegistryContext';
import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
import { getProjectDataContext } from '$lib/project/projectDataContext';
import { getZoomContext } from '$lib/space/zoom/zoomContext';
import { getSelectedNodeIdsContext } from 'nodes-editor';
import { defaultShortcuts } from './defaultShortcuts';

// TODO consider using getContext without possible throwing to make shortcuts
// not so dependent of page setup
export class Contexts {
	shortcuts = defaultShortcuts;
	zoomContext = getZoomContext();
	graphContext = getGraphContext();
	editorContext = getEditorContext();
	isMutedContext = getIsMutedContext();
	copyDataContext = getCopyDataContext();
	projectDataContext = getProjectDataContext();
	audioBackendContext = getAudioBackendContext();
	graphRegistryContext = getGraphRegistryContext();
	selectedNodeIdsContext = getSelectedNodeIdsContext();
	internalModuleIdContext = getInternalModuleIdContext();
}
