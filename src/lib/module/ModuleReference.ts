import type { ExternalModuleReference } from './externalModule/ExternalModuleReference';
import type { InternalModuleReference } from './internalModule/InternalModuleReference';

export type ModuleReference = InternalModuleReference | ExternalModuleReference;
