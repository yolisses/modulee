import { model } from 'mongoose';
import { ProjectSchema } from './ProjectSchema';

export const ProjectModel = model('Project', ProjectSchema);
