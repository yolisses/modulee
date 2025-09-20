import prisma from '$lib/prisma';
import { getSession } from '$lib/user/getSession';
import { redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod/v4';

export const actions = {
	delete: async ({ locals, request }) => {
		const data = await request.formData();
		const externalModuleId = z.string().parse(data.get('externalModuleId'));
		const { userId } = getSession(locals);
		await prisma.externalModule.delete({ where: { userId, id: externalModuleId } });
		redirect(307, '/');
	},
} satisfies Actions;
