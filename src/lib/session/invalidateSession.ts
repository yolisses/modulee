import { createClient } from 'redis';

export async function invalidateSession(sessionId: string, userId: string): Promise<void> {
	const redis = await createClient().connect();
	await redis.del(`session:${sessionId}`);
	await redis.sRem(`user_sessions:${userId}`, sessionId);
}
