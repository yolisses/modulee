import { getExternalModulesData } from '$lib/db/externalModule/getExternalModulesData';
import prisma from '$lib/prisma';
import { getSession } from '$lib/user/getSession';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const externalModulesData = await getExternalModulesData(Object.fromEntries(url.searchParams));
	return json(externalModulesData);
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const { userId } = getSession(locals);
	const { project } = await request.json();
	const { name, graph, moduleType, description, id: projectId } = project;

	const externalModuleData = await prisma.externalModule.create({
		data: {
			name,
			graph,
			userId,
			projectId,
			moduleType,
			description,
		},
	});
	return json(externalModuleData);
};
