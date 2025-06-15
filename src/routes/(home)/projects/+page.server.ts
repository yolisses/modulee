import prisma from '$lib/prisma';
import { createEmptyGraphData } from '$lib/project/create/createEmptyGraphData';
import { createProject } from '$lib/project/create/createProject';
import { createProjectFromExternalModule } from '$lib/project/create/createProjectFromExternalModule';
import { getProjects } from '$lib/project/getProjects';
import type { ProjectData } from '$lib/project/ProjectData';
import { getSession } from '$lib/user/getSession';
import { type Actions, error, redirect } from '@sveltejs/kit';
import { z } from 'zod/v4';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { userId } = getSession(locals);

	const projects = await getProjects(userId);
	return { projects };
};

function redirectFromProjectData(projectData: ProjectData) {
	if (projectData.moduleType === 'instrument') {
		redirect(303, `/projects/${projectData.id}/rack`);
	} else {
		const { mainInternalModuleId } = projectData.graph;
		redirect(303, `/projects/${projectData.id}/internalModules/${mainInternalModuleId}/graph`);
	}
}

export const actions = {
	create: async ({ locals, request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const graph = createEmptyGraphData();
		const { userId } = getSession(locals);
		const moduleType = data.get('moduleType');
		const projectData = await createProject({ name, graph, userId, moduleType });
		redirectFromProjectData(projectData);
	},

	createFromExternalModule: async ({ locals, request }) => {
		const data = await request.formData();
		const externalModuleId = data.get('externalModuleId');

		if (typeof externalModuleId !== 'string') {
			error(400, 'Invalid externalModuleId');
		}

		const { userId } = getSession(locals);
		const projectData = await createProjectFromExternalModule(externalModuleId, userId);
		redirectFromProjectData(projectData);
	},

	delete: async ({ locals, request }) => {
		const data = await request.formData();
		const projectId = z.string().parse(data.get('projectId'));
		const { userId } = getSession(locals);
		await prisma.project.delete({ where: { userId, id: projectId } });
	},
} satisfies Actions;
