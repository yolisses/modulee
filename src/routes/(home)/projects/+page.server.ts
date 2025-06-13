import { createId } from '$lib/data/createId';
import prisma from '$lib/prisma';
import { createProject } from '$lib/project/createProject';
import { getProjects } from '$lib/project/getProjects';
import { getSession } from '$lib/user/getSession';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { userId } = getSession(locals);

	const projects = await getProjects(userId);
	return { projects };
};

export const actions = {
	create: async ({ locals, request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const moduleType = data.get('moduleType');

		if (typeof name !== 'string') {
			throw new Error('Project name is required and must be a string');
		}
		if (typeof moduleType !== 'string') {
			throw new Error('Project moduleType is required and must be a string');
		}

		const { userId } = getSession(locals);

		const mainInternalModuleId = createId();

		const graph = {
			nodes: [],
			connections: [],
			mainInternalModuleId,
			externalModuleReferences: [],
			internalModules: [{ id: mainInternalModuleId, name: 'Main internal module' }],
		};

		const project = await createProject({
			id,
			name,
			graph,
			userId,
			moduleType,
		});
		redirect(303, `/projects/${project.id}/internalModules/${mainInternalModuleId}/graph`);
	},

	delete: async ({ locals, request }) => {
		const data = await request.formData();
		const projectId = data.get('projectId');
		const { userId } = getSession(locals);
		await prisma.project.delete({ where: { userId, id: projectId } });
	},
} satisfies Actions;
