import { getExternalModulesData } from '$lib/db/externalModule/getExternalModulesData';
import prisma from '$lib/prisma';
import type { ModuleType } from '$lib/project/ModuleType';
import type { ProjectData } from '$lib/project/ProjectData';
import { getId } from '$lib/ui/getId';
import { getSession } from '$lib/user/getSession';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { getIsModuleType } from './getIsModuleType';

function normalizeParam(param: string | null): string | undefined {
	return param && param !== '' ? param : undefined;
}

async function getValidIds(usedIn: string | undefined): Promise<string[] | undefined> {
	if (!usedIn) return undefined;
	const project = (await prisma.project.findUnique({
		where: { id: usedIn },
	})) as ProjectData | null;
	return project ? project.graph.externalModuleReferences.map(getId) : undefined;
}

const SORT_OPTIONS = new Set(['createdAt', 'likeCount']);

export const GET: RequestHandler = async ({ url }) => {
	const text = normalizeParam(url.searchParams.get('text'));
	const sort = normalizeParam(url.searchParams.get('sort'));
	const cursor = normalizeParam(url.searchParams.get('cursor'));
	const userId = normalizeParam(url.searchParams.get('userId'));
	const usedIn = normalizeParam(url.searchParams.get('usedIn'));
	const likedBy = normalizeParam(url.searchParams.get('likedBy'));
	const moduleTypeString = normalizeParam(url.searchParams.get('moduleType'));

	if (sort && !SORT_OPTIONS.has(sort)) {
		throw error(400, 'Invalid sort parameter');
	}

	// Makes TypeScript happy
	let moduleType: ModuleType | undefined;
	if (moduleTypeString) {
		if (getIsModuleType(moduleTypeString)) {
			moduleType = moduleTypeString;
		} else {
			throw error(400, 'Invalid moduleType');
		}
	}

	const validIds = await getValidIds(usedIn);

	const externalModulesData = await getExternalModulesData({
		text,
		sort,
		cursor,
		userId,
		likedBy,
		validIds,
		moduleType,
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
		},
	});
	return json(externalModuleData);
};
