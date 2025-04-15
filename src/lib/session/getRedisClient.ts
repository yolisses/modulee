import { REDIS_DB_URL } from '$env/static/private';
import { createClient } from 'redis';

export async function getRedisClient() {
	return await createClient({ url: REDIS_DB_URL }).connect();
}
