import { createClient } from 'redis';

export async function invalidateAllSessions(userId: number): Promise<void> {
	const redis = await createClient().connect();
	const sessionIds: string[] = await redis.sMembers(`user_sessions:${userId}`);
	if (sessionIds.length < 1) {
		return;
	}

	await Promise.all([
		...sessionIds.map((sessionId) => {
			redis.del(`session:${sessionId}`);
		}),
		redis.del(`user_sessions:${userId}`),
	]);
}
