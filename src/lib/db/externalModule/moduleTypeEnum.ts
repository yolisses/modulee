import z from 'zod/v4';

export const moduleTypeEnum = z.enum(['effect', 'utility', 'instrument']);
