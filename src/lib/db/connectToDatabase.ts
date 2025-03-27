import { MONGO_DB_URL } from '$env/static/private';
import { connect } from 'mongoose';

export async function connectToDatabase() {
	await connect(MONGO_DB_URL);
}
