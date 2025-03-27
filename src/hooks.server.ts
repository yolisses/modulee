import { connectToDatabase } from '$lib/db/connectToDatabase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	await connectToDatabase();
	const response = await resolve(event);
	return response;
};
