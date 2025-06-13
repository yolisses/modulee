import z from 'zod';

export const moduleTypeEnum = z.enum(['effect', 'utility', 'instrument']);
