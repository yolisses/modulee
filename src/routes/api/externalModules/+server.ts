import { ExternalModuleModel } from '$lib/db/externalModule/ExternalModuleModel';
import { getExternalModulesData } from '$lib/db/externalModule/getExternalModulesData';
import { getSession } from '$lib/user/getSession';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const text = url.searchParams.get('text');
	const sort = url.searchParams.get('sort');
	const cursor = url.searchParams.get('cursor');
	const externalModulesData = await getExternalModulesData({
		text: text ?? undefined,
		sort: sort ?? undefined,
		cursor: cursor ?? undefined,
	});
	return json(externalModulesData);
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const { userId } = getSession(locals);
	const { project } = await request.json();
	const { name, graph, description, id: projectId } = project;

	const externalModuleDocument = new ExternalModuleModel({
		name,
		graph,
		userId,
		projectId,
		description,
		likeCount: 0,
		usageCount: 0,
		version: { major: 0, minor: 1, patch: 0 },
	});
	await externalModuleDocument.save();
	return json({ externalModuleData: externalModuleDocument });
};
