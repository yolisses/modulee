import { getExternalModulesData } from '$lib/db/externalModule/getExternalModulesData';
import prisma from '$lib/prisma';
import { getSession } from '$lib/user/getSession';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	let text = url.searchParams.get('text');
	let sort = url.searchParams.get('sort');
	let likedBy = url.searchParams.get('likedBy');
	const cursor = url.searchParams.get('cursor');
	const userId = url.searchParams.get('userId');

	if (text === '') {
		text = null;
	}
	if (sort === '') {
		sort = null;
	}
	if (likedBy === '') {
		likedBy = null;
	}

	const sortOptions = new Set(['createdAt', 'likeCount']);
	if (sort && !sortOptions.has(sort)) {
		error(400, 'Invalid sort parameter');
	}

	const externalModulesData = await getExternalModulesData({
		text: text ?? undefined,
		sort: sort ?? undefined,
		cursor: cursor ?? undefined,
		userId: userId ?? undefined,
		likedBy: likedBy ?? undefined,
	});
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
			// likeCount: 0,
			// usageCount: 0,
			// version: { major: 0, minor: 1, patch: 0 },
		},
	});
	return json(externalModuleData);
};
