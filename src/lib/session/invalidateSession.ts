import { getRedisClient } from './getRedisClient';

export async function invalidateSession(sessionId: string, userId: string): Promise<void> {
	const redis = await getRedisClient();
	await redis.del(`session:${sessionId}`);
	await redis.sRem(`user_sessions:${userId}`, sessionId);
}
