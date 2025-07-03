import { audioBackendContextKey } from '$lib/audio/audioBackendContext';
import { isMutedContextKey } from '$lib/audio/isMutedContexts';
import { editorContextKey } from '$lib/editor/editorContext';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import { copyDataContextKey } from '$lib/graph/copy/copyDataContext';
import { graphContextKey } from '$lib/graph/graphContext';
import { graphRegistryContextKey } from '$lib/graph/graphRegistryContext';
import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { zoomContextKey } from '$lib/space/zoom/zoomContext';

// TODO consider using getContext without possible throwing to make shortcuts
// not so dependent of page setup
export class Contexts {
	zoomContext = getRequiredContext(zoomContextKey);
	graphContext = getRequiredContext(graphContextKey);
	editorContext = getRequiredContext(editorContextKey);
	isMutedContext = getRequiredContext(isMutedContextKey);
	copyDataContext = getRequiredContext(copyDataContextKey);
	projectDataContext = getRequiredContext(projectDataContextKey);
	audioBackendContext = getRequiredContext(audioBackendContextKey);
	graphRegistryContext = getRequiredContext(graphRegistryContextKey);
	selectedNodeIdsContext = getRequiredContext(selectedNodeIdsContextKey);
	internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);
}
