import type { InternalModuleData } from '$lib/data/InternalModuleData';
import { Schema } from 'mongoose';

export const InternalModuleSchema = new Schema<InternalModuleData>({
	name: { type: String, required: true },
});
