import { audioBackendContextKey, type AudioBackendContext } from '$lib/audio/audioBackendContext';
import { isMutedContextKey, type IsMutedContext } from '$lib/audio/isMutedContexts';
import type {
	OscilloscopeBackendContext,
	oscilloscopeBackendContextKey,
} from '$lib/audio/oscilloscopeBackendContext';
import { editorContextKey, type EditorContext } from '$lib/editor/editorContext';
import {
	isCommandPaletteActiveContextKey,
	type IsCommandPaletteActiveContext,
} from '$lib/editor/isCommandPaletteActiveContext';
import { copyDataContextKey, type CopyDataContext } from '$lib/graph/copy/copyDataContext';
import { graphContextKey, type GraphContext } from '$lib/graph/graphContext';
import {
	graphRegistryContextKey,
	type GraphRegistryContext,
} from '$lib/graph/graphRegistryContext';
import {
	homeNavbarSelectionContextKey,
	type HomeNavbarSelectionContext,
} from '$lib/home/homeNavbarSelectionContext';
import {
	likedExternalModulesContextKey,
	type LikedExternalModulesContext,
} from '$lib/module/externalModule/likedExternalModulesContext';
import type {
	InternalModuleIdContext,
	internalModuleIdContextKey,
} from '$lib/module/internalModule/internalModuleIdContext';
import {
	useExternalModuleInContextKey,
	type UseExternalModuleInContext,
} from '$lib/module/internalModule/useExternalModuleInContext';
import type {
	AddNodeInputContext,
	addNodeInputContextKey,
} from '$lib/node/add/addNodeInputContext';
import type {
	AddNodeMenuParamsContext,
	addNodeMenuParamsContextKey,
} from '$lib/node/add/addNodeMenuParamsContext';
import type {
	ActivePitchesContext,
	activePitchesContextKey,
} from '$lib/piano/activePitchesContext';
import {
	projectNavbarSelectionContextKey,
	type ProjectNavbarSelectionContext,
} from '$lib/project/projectNavbarSelectionContext';
import { projectDataContextKey, type ProjectDataContext } from '$lib/project/ui/projectDataContext';
import type {
	ProjectToolbarContext,
	projectToolbarContextKey,
} from '$lib/project/ui/projectToobalContext';
import { contextsContextKey, type ContextsContext } from '$lib/shortcut/contextsContext';
import {
	shortcutHandlerContextKey,
	type ShortcutHandlerContext,
} from '$lib/shortcut/shortcutHandlerContext';
import { spaceContextKey, type SpaceContext } from '$lib/space/spaceContext';
import { zoomContextKey, type ZoomContext } from '$lib/space/zoom/zoomContext';
import { baseRouteContextKey, type BaseRouteContext } from '$lib/ui/baseRouteContext';
import { modalRootContextKey, type ModalRootContext } from '$lib/ui/modalRootContext';
import { userDataContextKey, type UserDataContext } from '$lib/user/userDataContext';
import type {
	PreviewConnectionContext,
	previewConnectionContextKey,
	RootElementContext,
	rootElementContextKey,
	SelectedNodeIdsContext,
	selectedNodeIdsContextKey,
} from 'nodes-editor';

export type ContextsByKey = {
	[activePitchesContextKey]: ActivePitchesContext;
	[addNodeInputContextKey]: AddNodeInputContext;
	[addNodeMenuParamsContextKey]: AddNodeMenuParamsContext;
	[audioBackendContextKey]: AudioBackendContext;
	[baseRouteContextKey]: BaseRouteContext;
	[contextsContextKey]: ContextsContext;
	[copyDataContextKey]: CopyDataContext;
	[editorContextKey]: EditorContext;
	[graphContextKey]: GraphContext;
	[graphRegistryContextKey]: GraphRegistryContext;
	[homeNavbarSelectionContextKey]: HomeNavbarSelectionContext;
	[internalModuleIdContextKey]: InternalModuleIdContext;
	[isCommandPaletteActiveContextKey]: IsCommandPaletteActiveContext;
	[isMutedContextKey]: IsMutedContext;
	[likedExternalModulesContextKey]: LikedExternalModulesContext;
	[modalRootContextKey]: ModalRootContext;
	[oscilloscopeBackendContextKey]: OscilloscopeBackendContext;
	[previewConnectionContextKey]: PreviewConnectionContext;
	[projectDataContextKey]: ProjectDataContext;
	[projectNavbarSelectionContextKey]: ProjectNavbarSelectionContext;
	[projectToolbarContextKey]: ProjectToolbarContext;
	[rootElementContextKey]: RootElementContext;
	[selectedNodeIdsContextKey]: SelectedNodeIdsContext;
	[shortcutHandlerContextKey]: ShortcutHandlerContext;
	[spaceContextKey]: SpaceContext;
	[useExternalModuleInContextKey]: UseExternalModuleInContext;
	[userDataContextKey]: UserDataContext;
	[zoomContextKey]: ZoomContext;
};
