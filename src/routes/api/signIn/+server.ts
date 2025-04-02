import { verifyGoogleCredential } from '$lib/account/verifyGoogleCredential';
import { type RequestHandler, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { credential } = await request.json();
	const payload = await verifyGoogleCredential(credential);
	console.log(payload);
	return json(payload);
};
