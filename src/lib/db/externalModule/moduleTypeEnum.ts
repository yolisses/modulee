import type z from '../../../../node_modules/zod/dist/types/v4/classic/external';

export const moduleTypeEnum = z.enum(['effect', 'utility', 'instrument']);
