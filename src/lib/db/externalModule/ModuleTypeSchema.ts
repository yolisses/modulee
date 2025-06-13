import z from 'zod/v4';

export const ModuleTypeSchema = z.enum(['effect', 'utility', 'instrument']);
