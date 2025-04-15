import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { Types } from 'mongoose';

export type ExternalModuleDocument = Omit<ExternalModuleData, 'userId'> & {
	isSeeded: boolean;
	userId: Types.ObjectId;
};
