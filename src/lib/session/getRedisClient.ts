import { REDISDB_URI } from '$env/static/private';
import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
	if (!redisClient) {
		redisClient = createClient({ url: REDISDB_URI });
		await redisClient.connect();
	}

	return redisClient;
}
