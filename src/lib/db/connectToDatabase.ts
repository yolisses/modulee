import { connect } from 'mongoose';

export async function connectToDatabase() {
	await connect('mongodb://127.0.0.1:27017/test');
}
