import { model } from 'mongoose';
import { ExternalModuleSchema } from './ExternalModuleSchema';

export const ExternalModuleModel = model('ExternalModule', ExternalModuleSchema);
