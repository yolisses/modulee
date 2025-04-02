import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { createClient } from 'redis';
import type { Session } from './Session.js';

export async function validateSessionToken(token: string): Promise<Session | null> {
	const redis = await createClient().connect();
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const item = await redis.get(`session:${sessionId}`);
	if (item === null) {
		return null;
	}

	const result = JSON.parse(item);
	const session: Session = {
		id: result.id,
		userId: result.user_id,
		expiresAt: new Date(result.expires_at * 1000),
	};
	if (Date.now() >= session.expiresAt.getTime()) {
		await redis.del(`session:${sessionId}`);
		await redis.sRem(`user_sessions:${result.userId}`, sessionId);
		return null;
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
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
	}
	return session;
}
