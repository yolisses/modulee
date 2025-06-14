import { ModuleTypeSchema } from '$lib/db/externalModule/ModuleTypeSchema';
import prisma from '$lib/prisma';
import { createProject } from '$lib/project/createProject';
import { createProjectFromExternalModule } from '$lib/project/createProjectFromExternalModule';
import { getProjects } from '$lib/project/getProjects';
import { getSession } from '$lib/user/getSession';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getGraphTemplate } from './getGraphTemplate';

export const load: PageServerLoad = async ({ locals }) => {
	const { userId } = getSession(locals);

	const projects = await getProjects(userId);
	return { projects };
};

export const actions = {
	create: async ({ locals, request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const { userId } = getSession(locals);
		const moduleType = ModuleTypeSchema.safeParse(data.get('moduleType'));
		if (moduleType.error) {
			error(400, moduleType.error);
		}
		const graph = getGraphTemplate(moduleType.data);

		const project = await createProject({
			name,
			graph,
			userId,
			moduleType,
		});

		redirect(303, `/projects/${project.id}/rack`);
	},

	createFromExternalModule: async ({ locals, request }) => {
		const data = await request.formData();
		const externalModuleId = data.get('externalModuleId');

		if (typeof externalModuleId !== 'string') {
			error(400, 'Invalid externalModuleId');
		}

		const { userId } = getSession(locals);
		const project = await createProjectFromExternalModule(externalModuleId, userId);
		redirect(303, `/projects/${project.id}/rack`);
	},

	delete: async ({ locals, request }) => {
		const data = await request.formData();
		const projectId = data.get('projectId');
		const { userId } = getSession(locals);
		await prisma.project.delete({ where: { userId, id: projectId } });
	},
} satisfies Actions;
