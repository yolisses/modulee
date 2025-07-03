import { getAudioBackendContext } from '$lib/audio/audioBackendContext';
import { getIsMutedContext } from '$lib/audio/isMutedContexts';
import { getEditorContext } from '$lib/editor/editorContext';
import { getCopyDataContext } from '$lib/graph/copy/copyDataContext';
import { getGraphContext } from '$lib/graph/graphContext';
import { getGraphRegistryContext } from '$lib/graph/graphRegistryContext';
import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
import { getProjectDataContext } from '$lib/project/ui/projectDataContext';
import { getZoomContext } from '$lib/space/zoom/zoomContext';
import { getSelectedNodeIdsContext } from 'nodes-editor';

// TODO consider using getContext without possible throwing to make shortcuts
// not so dependent of page setup
export class Contexts {
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
