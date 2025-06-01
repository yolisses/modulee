import prisma from '$lib/prisma';
import { createSession } from '$lib/session/createSession';
import { generateSessionToken } from '$lib/session/generateSessionToken';
import { setSessionTokenCookie } from '$lib/session/setSessionTokenCookie';
import { createGuestUser } from '$lib/user/createGuestUser';
import type { UserData } from '$lib/user/UserData';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const { userId } = locals.session || {};

	if (userId) {
		const data = await prisma.user.findUnique({ where: { id: userId } });
		const userData = data as UserData;
		return { userData };
	} else {
		const userData = await createGuestUser();
		const token = generateSessionToken();
		const session = await createSession(token, userData.id);
		setSessionTokenCookie(cookies, token, session.expiresAt);
		return { userData: userData as UserData };
	}
};
