import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { Types } from 'mongoose';
import type { HasIsSeeded } from './HasIsSeeded';

export type ExternalModuleDocument = Omit<ExternalModuleData, 'userId'> & {
	userId: Types.ObjectId;
} & HasIsSeeded;
