import { audioBackendContextKey, type AudioBackendContext } from '$lib/audio/audioBackendContext';
import { isMutedContextKey, type IsMutedContext } from '$lib/audio/isMutedContexts';
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
	externalModulesDataContextKey,
	type ExternalModulesDataContext,
} from '$lib/module/externalModule/externalModulesDataContext';
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
import {
	projectNavbarSelectionContextKey,
	type ProjectNavbarSelectionContext,
} from '$lib/project/projectNavbarSelectionContext';
import { projectDataContextKey, type ProjectDataContext } from '$lib/project/ui/projectDataContext';
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
	[audioBackendContextKey]: AudioBackendContext;
	[isMutedContextKey]: IsMutedContext;
	[editorContextKey]: EditorContext;
	[isCommandPaletteActiveContextKey]: IsCommandPaletteActiveContext;
	[copyDataContextKey]: CopyDataContext;
	[graphContextKey]: GraphContext;
	[graphRegistryContextKey]: GraphRegistryContext;
	[homeNavbarSelectionContextKey]: HomeNavbarSelectionContext;
	[externalModulesDataContextKey]: ExternalModulesDataContext;
	[likedExternalModulesContextKey]: LikedExternalModulesContext;
	[internalModuleIdContextKey]: InternalModuleIdContext;
	[useExternalModuleInContextKey]: UseExternalModuleInContext;
	[projectDataContextKey]: ProjectDataContext;
	[projectNavbarSelectionContextKey]: ProjectNavbarSelectionContext;
	[contextsContextKey]: ContextsContext;
	[shortcutHandlerContextKey]: ShortcutHandlerContext;
	[zoomContextKey]: ZoomContext;
	[spaceContextKey]: SpaceContext;
	[baseRouteContextKey]: BaseRouteContext;
	[modalRootContextKey]: ModalRootContext;
	[userDataContextKey]: UserDataContext;
	[rootElementContextKey]: RootElementContext;
	[selectedNodeIdsContextKey]: SelectedNodeIdsContext;
	[previewConnectionContextKey]: PreviewConnectionContext;
};
