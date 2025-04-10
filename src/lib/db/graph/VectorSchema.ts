import type { VectorData } from '$lib/data/VectorData';
import { Schema } from 'mongoose';

export const VectorSchema = new Schema<VectorData>({
	x: { type: Number, required: true },
	y: { type: Number, required: true },
});
