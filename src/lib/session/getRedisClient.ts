import { REDISDB_URI } from '$env/static/private';
import { createClient } from 'redis';

export async function getRedisClient() {
	return await createClient({ url: REDISDB_URI }).connect();
}
