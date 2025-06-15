import prisma from '$lib/prisma';
import { ProjectSchema } from '$lib/schemas/ProjectSchema';
import { error } from '@sveltejs/kit';
import z from 'zod/v4';
import type { ProjectData } from '../ProjectData';

export async function createProject(arg: object) {
	const res = ProjectSchema.omit({ id: true, createdAt: true, updatedAt: true }).safeParse(arg);

	if (!res.success) {
		error(400, z.prettifyError(res.error));
	}

	const projectData = await prisma.project.create({ data: res.data });
	return projectData as unknown as ProjectData;
}
