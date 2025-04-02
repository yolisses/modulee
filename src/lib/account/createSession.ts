import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { createClient } from 'redis';
import type { Session } from './Session.js';

export async function createSession(token: string, userId: number): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
	};

	const redis = await createClient().connect();
	await redis.set(
		`session:${session.id}`,
		JSON.stringify({
			id: session.id,
			user_id: session.userId,
			expires_at: Math.floor(session.expiresAt.getTime() / 1000),
		}),
		{
			EXAT: Math.floor(session.expiresAt.getTime() / 1000),
		},
	);
	await redis.sAdd(`user_sessions:${userId}`, sessionId);

	return session;
}
