import { audioBackendContextKey } from '$lib/audio/audioBackendContext';
import { isMutedContextKey } from '$lib/audio/isMutedContexts';
import { editorContextKey } from '$lib/editor/editorContext';
import { getTypedContext } from '$lib/global/getTypedContext';
import { copyDataContextKey } from '$lib/graph/copy/copyDataContext';
import { graphContextKey } from '$lib/graph/graphContext';
import { graphRegistryContextKey } from '$lib/graph/graphRegistryContext';
import { internalModuleContextKey } from '$lib/module/internalModule/internalModuleContext';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { zoomContextKey } from '$lib/space/zoom/zoomContext';
import { selectedNodeIdsContextKey } from 'nodes-editor';

// TODO consider using getContext without possible throwing to make shortcuts
// not so dependent of page setup
export class Contexts {
	zoomContext = getTypedContext(zoomContextKey);
	graphContext = getTypedContext(graphContextKey);
	editorContext = getTypedContext(editorContextKey);
	isMutedContext = getTypedContext(isMutedContextKey);
	copyDataContext = getTypedContext(copyDataContextKey);
	projectDataContext = getTypedContext(projectDataContextKey);
	audioBackendContext = getTypedContext(audioBackendContextKey);
	graphRegistryContext = getTypedContext(graphRegistryContextKey);
	selectedNodeIdsContext = getTypedContext(selectedNodeIdsContextKey);
	internalModuleContext = getTypedContext(internalModuleContextKey);
}
