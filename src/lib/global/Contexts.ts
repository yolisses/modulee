import type {
	InternalModuleIdContext,
	internalModuleIdContextKey,
} from '$lib/module/internalModule/internalModuleIdContext';

// Context store types
export type Contexts = {
	[internalModuleIdContextKey]: InternalModuleIdContext;
};
