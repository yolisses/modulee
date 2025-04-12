import { UserModel } from '$lib/user/UserModel';
import { config } from 'dotenv';
import { connect, disconnect } from 'mongoose';
import { process } from './process';

// TODO find a more secure way to run seed.ts as a server only file.
//
// This is a bypass to SvelteKit env variables protection.
config();

await connect(process.env.MONGO_DB_URL);
await UserModel.deleteMany({ isSeeded: true });
await disconnect();
