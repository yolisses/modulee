import prisma from '$lib/prisma';
import { ProjectSchema } from '$lib/schemas/ProjectSchema';
import { error } from '@sveltejs/kit';
import z from 'zod/v4';
import type { ProjectData } from '../ProjectData';

export async function createProject(arg: object): Promise<ProjectData> {
	const res = ProjectSchema.omit({ id: true, createdAt: true, updatedAt: true }).safeParse(arg);

	if (!res.success) {
		error(400, z.prettifyError(res.error));
	}

	return prisma.project.create({ data: res.data });
}
